import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, User, Briefcase } from "lucide-react";
import html2pdf from "html2pdf.js"; // Install with `npm install html2pdf.js`

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    profile:
      "A passionate Backend AI Developer with expertise in building scalable, intelligent systems.",
    experience: [
      {
        title: "Senior Backend Developer",
        company: "AI Innovations Inc.",
        duration: "Jan 2022 - Present",
        description:
          "Led a team to design AI-driven APIs using Python and TensorFlow.",
      },
      {
        title: "Backend Engineer",
        company: "Tech Solutions Ltd.",
        duration: "Jun 2019 - Dec 2021",
        description:
          "Developed RESTful services with Node.js and integrated AI models.",
      },
    ],
  });

  const [template, setTemplate] = useState("modern"); // Default template

  const handleChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = resumeData.experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResumeData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Export resume as PDF
  const exportToPDF = () => {
    const element = document.getElementById("resume-content");
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `${resumeData.name}_Resume.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  // Template 1: Modern (Original)
  const ModernTemplate = () => (
    <div id="resume-content" className="max-w-4xl mx-auto text-white">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          {resumeData.name}
        </h1>
        <p className="text-gray-300 text-lg mt-2">Backend AI Developer</p>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-white/10 p-6 rounded-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-indigo-300" />
            <input
              type="email"
              value={resumeData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 text-white"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-indigo-300" />
            <input
              type="text"
              value={resumeData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 text-white"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Linkedin className="h-5 w-5 text-indigo-300" />
            <input
              type="text"
              value={resumeData.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 text-white"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Github className="h-5 w-5 text-indigo-300" />
            <input
              type="text"
              value={resumeData.github}
              onChange={(e) => handleChange("github", e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 text-white"
            />
          </div>
        </div>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-white/10 p-6 rounded-2xl mb-8">
        <h2 className="text-2xl font-semibold text-indigo-200 flex items-center mb-4">
          <User className="mr-2 h-6 w-6" /> Profile
        </h2>
        <textarea
          value={resumeData.profile}
          onChange={(e) => handleChange("profile", e.target.value)}
          className="w-full h-32 bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200"
        />
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold text-indigo-200 flex items-center mb-6">
          <Briefcase className="mr-2 h-6 w-6" /> Experience
        </h2>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-l-2 border-indigo-500 pl-4">
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                className="w-full bg-transparent text-xl font-medium text-white border-b border-gray-500 mb-2"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                className="w-full bg-transparent text-gray-300 border-b border-gray-500 mb-2"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                className="w-full bg-transparent text-gray-400 text-sm border-b border-gray-500 mb-2"
              />
              <textarea
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                className="w-full h-24 bg-transparent border border-gray-500 rounded-lg p-3 text-gray-200"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Template 2: Classic
  const ClassicTemplate = () => (
    <div id="resume-content" className="max-w-4xl mx-auto text-black bg-white p-8">
      <h1 className="text-3xl font-bold border-b-2 border-gray-800 pb-2">{resumeData.name}</h1>
      <div className="flex justify-between mt-4">
        <p>{resumeData.email}</p>
        <p>{resumeData.phone}</p>
        <p>{resumeData.linkedin}</p>
        <p>{resumeData.github}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-600">Profile</h2>
        <p className="mt-2">{resumeData.profile}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-600">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-medium">{exp.title}</h3>
            <p className="text-gray-600">{exp.company} | {exp.duration}</p>
            <p className="mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Template Chooser */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-center space-x-4">
        <motion.button
          onClick={() => setTemplate("modern")}
          className={`px-4 py-2 rounded-lg ${template === "modern" ? "bg-indigo-600" : "bg-gray-700"} text-white`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Modern Template
        </motion.button>
        <motion.button
          onClick={() => setTemplate("classic")}
          className={`px-4 py-2 rounded-lg ${template === "classic" ? "bg-indigo-600" : "bg-gray-700"} text-white`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Classic Template
        </motion.button>
        <motion.button
          onClick={exportToPDF}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Export to PDF
        </motion.button>
      </div>

      {/* Render Selected Template */}
      {template === "modern" ? <ModernTemplate /> : <ClassicTemplate />}
    </div>
  );
};

export default Resume;