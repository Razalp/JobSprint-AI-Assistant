import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, User, Briefcase } from "lucide-react";

const Resume = () => {
  // State to manage editable fields
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    profile: "A passionate Backend AI Developer with expertise in building scalable, intelligent systems. Skilled in Python, Node.js, and machine learning frameworks, I thrive on solving complex problems and delivering innovative solutions.",
    experience: [
      {
        title: "Senior Backend Developer",
        company: "AI Innovations Inc.",
        duration: "Jan 2022 - Present",
        description: "Led a team of developers to design and implement AI-driven APIs using Python and TensorFlow. Improved system performance by 40% through optimized algorithms and cloud integration.",
      },
      {
        title: "Backend Engineer",
        company: "Tech Solutions Ltd.",
        duration: "Jun 2019 - Dec 2021",
        description: "Developed RESTful services with Node.js and integrated Gemini-like AI models for real-time data processing. Collaborated with frontend teams to ensure seamless user experiences.",
      },
    ],
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = resumeData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResumeData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            {resumeData.name}
          </h1>
          <p className="text-gray-300 text-lg mt-2">Backend AI Developer</p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-indigo-300" />
              <input
                type="email"
                value={resumeData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-indigo-300 transition-colors"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-indigo-300" />
              <input
                type="text"
                value={resumeData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-indigo-300 transition-colors"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin className="h-5 w-5 text-indigo-300" />
              <input
                type="text"
                value={resumeData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-indigo-300 transition-colors"
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-indigo-300" />
              <input
                type="text"
                value={resumeData.github}
                onChange={(e) => handleChange("github", e.target.value)}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:outline-none focus:border-indigo-300 transition-colors"
                placeholder="GitHub URL"
              />
            </div>
          </div>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 mb-8"
        >
          <h2 className="text-2xl font-semibold text-indigo-200 flex items-center mb-4">
            <User className="mr-2 h-6 w-6" /> Profile
          </h2>
          <textarea
            value={resumeData.profile}
            onChange={(e) => handleChange("profile", e.target.value)}
            className="w-full h-32 bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-indigo-300 resize-none transition-colors"
            placeholder="Write a brief summary about yourself..."
          />
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/20"
        >
          <h2 className="text-2xl font-semibold text-indigo-200 flex items-center mb-6">
            <Briefcase className="mr-2 h-6 w-6" /> Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="border-l-2 border-indigo-500 pl-4"
              >
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                  className="w-full bg-transparent text-xl font-medium text-white border-b border-gray-500 focus:outline-none focus:border-indigo-300 transition-colors mb-2"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  className="w-full bg-transparent text-gray-300 border-b border-gray-500 focus:outline-none focus:border-indigo-300 transition-colors mb-2"
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                  className="w-full bg-transparent text-gray-400 text-sm border-b border-gray-500 focus:outline-none focus:border-indigo-300 transition-colors mb-2"
                  placeholder="Duration (e.g., Jan 2022 - Present)"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  className="w-full h-24 bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-indigo-300 resize-none transition-colors"
                  placeholder="Describe your role and achievements..."
                />
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={() =>
              setResumeData((prev) => ({
                ...prev,
                experience: [
                  ...prev.experience,
                  { title: "", company: "", duration: "", description: "" },
                ],
              }))
            }
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Experience
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;