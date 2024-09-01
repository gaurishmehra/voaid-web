import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8"
    >
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <motion.form
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 bg-medium-purple bg-opacity-50 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 bg-medium-purple bg-opacity-50 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full p-2 bg-medium-purple bg-opacity-50 rounded"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-light-pink text-white rounded hover:bg-dark-pink transition-colors"
        >
          Send Message
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Contact;