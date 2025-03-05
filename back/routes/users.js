const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
 const emailFound = await userModel.findOne({ email });
    if (emailFound) {
      return res.status(400).json({ message: "Email already registered" });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

    
    let user = new userModel({
      username,
      email,
      password: hashedPassword
    });

 
    await user.save();

    
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });


    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    
    const verificationLink = `http://localhost:3004/users/verify/${token}`;
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


router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);


    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

   
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
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
     
      if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email first" });
      }
  
     
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
    
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      
      res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });
module.exports = router;
