import React from "react";
import './AboutUs.css';
const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our Document Management System! Our platform is designed to
        help individuals and organizations securely store, manage, and share
        documents efficiently.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to simplify document management by providing a seamless,
        user-friendly, and secure solution. We aim to improve productivity and
        ensure easy access to important documents anytime, anywhere.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700">
        <li>Secure cloud-based storage</li>
        <li>Effortless document sharing</li>
        <li>Advanced search and categorization</li>
        <li>Version control and audit logs</li>
        <li>Seamless integration with other tools</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-lg text-gray-700">
        Have questions or need support? Reach out to us at
        <span className="text-blue-600"> support@dms.com</span>.
      </p>
    </div>
  );
};

export default AboutUs;
