const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// POST Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const emailFound = await userModel.findOne({ email });
    if (emailFound) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    let user = new userModel({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Setup mail transport (using Mailtrap for testing)
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    // Create a token for email verification
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Generate verification link
    const verificationLink = `http://localhost:3004/users/verify/${token}`;

    // Send verification email
    await transport.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification for Your App",
      html: `<a href="${verificationLink}">Click here to verify your email</a>`
    });

    res.status(200).json({ message: "Signup successful. Verification email sent!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET Email Verification Route
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by decoded email
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Update user to mark as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Check if the user is verified
      if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email first" });
      }
  
      // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Return the JWT token to the user
      res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
module.exports = router;