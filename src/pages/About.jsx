import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const featureVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 mb-6">
            About <span className="text-gray-900">Carrer Chowk</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing the way students access and share educational
            resources
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To democratize education by creating a vibrant community where
              students can freely exchange high-quality study materials,
              breaking down barriers to knowledge access.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              A world where no student struggles to find academic resources,
              where knowledge flows freely between peers, and education becomes
              truly borderless.
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-6xl mx-auto mt-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-700 mb-12"
          >
            Why Choose <span className="text-Gray-900">Carrer Chowk</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Vast Resource Library",
                description:
                  "Access thousands of PDFs, notes, and study materials across all disciplines.",
                icon: "📚",
              },
              {
                title: "Community Powered",
                description:
                  "Contribute and benefit from a growing network of students and educators.",
                icon: "👥",
              },
              {
                title: "Always Free",
                description:
                  "We believe education should be accessible to all, without paywalls.",
                icon: "💸",
              },

              {
                title: "Smart Search",
                description:
                  "Find exactly what you need with filters by course, semester, and subject.",
                icon: "🔍",
              },
              {
                title: "Regularly Updated",
                description:
                  "Stay ahead with frequently added content and up-to-date materials.",
                icon: "🔄",
              },
              {
                title: "Verified Content",
                description:
                  "Quality-checked resources to ensure accuracy and reliability.",
                icon: "✅",
              },
              {
                title: "Mobile Friendly",
                description:
                  "Access your study materials anytime, anywhere on any device.",
                icon: "📱",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={featureVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      
      </main>

      <Footer />
    </div>
  );
};

export default About;
