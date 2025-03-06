import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import image1 from './image1.png';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate()

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.3 } },
  };
  const navigates = () => {
    navigate('/auth')
  }


  return (
    <div className="min-h-screen flex flex-col  text-white">
      {/* Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div className="text-2xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          JobSprint AI
        </motion.div>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-6">
    
          </div>
          <motion.button onClick={navigates} className="px-6 py-2 bg-gray-800 rounded-full text-white font-semibold" whileHover={{ scale: 1.05, backgroundColor: '#4B5563' }} whileTap={{ scale: 0.95 }}>
            Sign In
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center px-6">
        <main className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10">
          <motion.div className="md:w-1/2 px-4" initial="hidden" animate="visible" variants={textVariants}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover <br />
              <span className="text-gray-400">JobSprint AI</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-lg mx-auto md:mx-0">
              Your ultimate AI-powered job search companion. Unlock opportunities with precision, speed, and style.
            </p>
            <div className="flex justify-center md:justify-start space-x-6">
              <motion.button className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-lg" whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }} whileTap={{ scale: 0.95 }}>
                Get Started
              </motion.button>
              <motion.button className="px-8 py-3 border-2 border-white text-white rounded-full text-lg font-semibold shadow-lg" whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }} whileTap={{ scale: 0.95 }}>
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="md:w-1/2 flex justify-center" initial="hidden" animate="visible" variants={imageVariants}>
            <motion.img src={image1} alt="JobSprint AI Illustration" className="w-72 md:w-[28rem] rounded-2xl shadow-2xl" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;