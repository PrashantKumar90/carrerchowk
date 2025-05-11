import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ContactForm from "../Components/ContactForm";

const Contact = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      detail: "sahroshan221@gmail.com",
      action: "sahroshan221@gmail.com"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      detail: "+977 9864215329 ",
      action: "tel:+977 9864215329"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Visit Us",
      detail: "Nepal Polytechnic Institute, Mahendra Highway, Bharatpur 44207, Nepal",
      action: "https://maps.google.com"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex-grow container mx-auto px-4 py-16"
      >
        {/* Header Section */}
        <motion.div variants={item} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for inquiries, feedback, or just to say hello.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div 
            variants={item}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
            <p className="text-gray-600">
              Have questions about our resources or platform? Our team is here to help you with any inquiries.
            </p>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  href={method.action}
                  className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="mr-4 mt-1">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-gray-600">{method.detail}</p>
                  </div>
                </motion.a>
              ))}
            </div>

         
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
              <ContactForm />
            </div>
            
 
          </motion.div>
        </div>

        {/* Map Section */}
       <motion.div
  variants={item}
  className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
>
  <div className="h-64 md:h-96 w-full bg-gray-200 flex items-center justify-center">
    <iframe
      // src="https://www.google.com/maps/embed?pb=..."
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9000120087057!2d84.42303397525313!3d27.68948507619274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb3a298407ad%3A0xb2bf4f391821a393!2sNepal%20Polytechnic%20Institute!5e0!3m2!1sen!2sin!4v1746855208642!5m2!1sen!2sin"
      className="w-full h-full"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</motion.div>

      </motion.main>

      <Footer />
    </div>
  );
};

export default Contact;