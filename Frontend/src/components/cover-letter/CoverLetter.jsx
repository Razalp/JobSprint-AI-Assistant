import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Briefcase, Copy } from "lucide-react";

const CoverLetter = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    jobTitle: "",
    hrName: "",
    companyName: "",
    applicantName: "",
    applicantEmail: "",
  });
  const [copied, setCopied] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generate cover letter content
  const generateCoverLetter = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${formData.applicantName}
${formData.applicantEmail}
${currentDate}

${formData.hrName}
Hiring Manager
${formData.companyName}

Dear ${formData.hrName},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my background and skills, I am confident that I would make a valuable addition to your team.

[Add your specific qualifications, experience, and achievements here]

I am particularly drawn to ${formData.companyName}'s commitment to [company value/mission]. My experience in [relevant field/skill] aligns well with the requirements of the ${formData.jobTitle} role, and I am excited about the opportunity to contribute to your organization's success.

I would welcome the opportunity to discuss how my skills and experience can benefit ${formData.companyName}. Please feel free to contact me at ${formData.applicantEmail} to schedule an interview at your convenience.

Thank you for your time and consideration. I look forward to hearing from you.

Sincerely,
${formData.applicantName}`;
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generateCoverLetter());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">Cover Letter Generator</h2>
          <p className="text-gray-400 text-lg mt-2">Craft a professional cover letter in seconds.</p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "applicantName", placeholder: "Your Full Name", icon: <User className="h-5 w-5" /> },
              { name: "applicantEmail", placeholder: "Your Email", type: "email", icon: <Mail className="h-5 w-5" /> },
              { name: "jobTitle", placeholder: "Job Title", icon: <Briefcase className="h-5 w-5" /> },
              { name: "hrName", placeholder: "Hiring Manager's Name", icon: <User className="h-5 w-5" /> },
              { name: "companyName", placeholder: "Company Name", icon: <Briefcase className="h-5 w-5" /> },
            ].map((field, index) => (
              <motion.div key={field.name} variants={inputVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-10 p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Generated Cover Letter Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg relative"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Your Cover Letter</h3>
            {formData.jobTitle &&
              formData.hrName &&
              formData.companyName &&
              formData.applicantName &&
              formData.applicantEmail && (
                <motion.button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="mr-2 h-5 w-5" />
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </motion.button>
              )}
          </div>
          <div
            className="whitespace-pre-wrap text-gray-300 font-mono text-sm"
            style={{ minHeight: "200px", padding: "10px", backgroundColor: "#1f1f1f", borderRadius: "4px" }}
          >
            {formData.jobTitle &&
            formData.hrName &&
            formData.companyName &&
            formData.applicantName &&
            formData.applicantEmail ? (
              generateCoverLetter()
            ) : (
              <span className="text-gray-500">
                Please fill in all fields to generate your cover letter.
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetter;