import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: "📚",
      title: "Comprehensive Resources",
      description: "Access thousands of PDFs, notes, and study materials",
    },
    {
      icon: "🚀",
      title: "Fast Downloads",
      description: "Quick access to all resources without any delays",
    },
    {
      icon: "💯",
      title: "Quality Content",
      description: "Verified materials from top students and educators",
    },
    {
      icon: "🆓",
      title: "Completely Free",
      description: "No subscriptions, no fees—just learning",
    },
    {
      icon: "🌟",
      title: "Top Rated Notes",
      description:
        "Most downloaded and highest-rated notes highlighted for you",
    },
    {
      icon: "🌐",
      title: "All Courses Covered",
      description: "From engineering to humanities—materials for every stream",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-white py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Blob effects - adjust opacity as needed */}
            <div className="absolute top-0 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob"></div>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-black"
            >
              Elevate Your <span className="text-yellow-300">Learning</span>{" "}
              Experience
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            >
              Discover, share and download the best study resources from top
              students across institutions
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Resources
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-500 hover:bg-opacity-10 transition-all"
              >
                How It Works
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        <div className="mb-10"></div>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-600 to-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Boost Your Grades?
              </h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto">
                Join thousands of students who are already acing their exams
                with our resources
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.button>
            </motion.div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose <span className="text-indigo-600">Career-Chowk</span>
                ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're revolutionizing the way students access educational
                resources
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
