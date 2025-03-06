import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Phone, Mail, UserCheck, Star, CheckCircle, XCircle, Edit2, Save, Trash2, X } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Custom Modal Component (Shadcn-inspired, Black & White)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-black border border-gray-700 p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        <div className="text-gray-200">{children}</div>
      </motion.div>
    </motion.div>
  );
};

const Job = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      companyName: "Tech Innovate",
      title: "Senior Backend Developer",
      status: "Interview Scheduled",
      response: "HR contacted for initial screening.",
      contact: { name: "Jane Doe", email: "hr@techinnovate.com", phone: "+1 (555) 123-4567" },
      appliedVia: "LinkedIn",
      possibility: 75,
      location: "San Francisco, CA",
      rounds: [
        { round: "Phone Screening", completed: true },
        { round: "Technical Interview", completed: false },
      ],
      appliedDate: "2025-02-15",
    },
    {
      id: 2,
      companyName: "AI Solutions Ltd.",
      title: "AI Engineer",
      status: "Offer Received",
      response: "Offered position after final round.",
      contact: { name: "John Smith", email: "careers@aisolutions.com", phone: "+1 (555) 987-6543" },
      appliedVia: "Company Website",
      possibility: 90,
      location: "New York, NY",
      rounds: [
        { round: "Coding Test", completed: true },
        { round: "Final Interview", completed: true },
      ],
      appliedDate: "2025-02-20",
    },
  ]);

  const [newJob, setNewJob] = useState({
    companyName: "",
    title: "",
    status: "Applied",
    response: "",
    contact: { name: "", email: "", phone: "" },
    appliedVia: "",
    possibility: 50,
    location: "",
    rounds: [],
    appliedDate: new Date().toISOString().split("T")[0],
  });
  const [activeTab, setActiveTab] = useState("unfinished");
  const [expandedJob, setExpandedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter jobs
  const finishedJobs = jobs.filter((job) => job.rounds.every((round) => round.completed));
  const unfinishedJobs = jobs.filter((job) => !job.rounds.every((round) => round.completed));

  // Graph data
  const statusCounts = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    "Interview Scheduled": jobs.filter((j) => j.status === "Interview Scheduled").length,
    "Offer Received": jobs.filter((j) => j.status === "Offer Received").length,
  };
  const avgPossibility = jobs.length > 0 ? (jobs.reduce((sum, j) => sum + j.possibility, 0) / jobs.length).toFixed(1) : 0;

  const chartData = {
    labels: ["Applied", "Interview Scheduled", "Offer Received"],
    datasets: [
      {
        label: "Applications",
        data: [statusCounts.Applied, statusCounts["Interview Scheduled"], statusCounts["Offer Received"]],
        backgroundColor: ["#ffffff", "#a1a1aa", "#3f3f46"],
        borderColor: ["#d4d4d8", "#71717a", "#27272a"],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: ["#e5e5e5", "#d4d4d8", "#52525b"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#27272a",
        titleColor: "#ffffff",
        bodyColor: "#d4d4d8",
        padding: 10,
        cornerRadius: 4,
      },
      title: {
        display: true,
        text: "Application Status Overview",
        color: "#ffffff",
        font: { size: 16, weight: "bold" },
        padding: { bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#d4d4d8", font: { size: 12 } },
        grid: { color: "#3f3f46", lineWidth: 1 },
        title: { display: true, text: "Number of Applications", color: "#d4d4d8" },
      },
      x: {
        ticks: { color: "#d4d4d8", font: { size: 12 } },
        grid: { display: false },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  const handleAddJob = () => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1, rounds: [{ round: "Initial Application", completed: true }] }]);
    setNewJob({
      companyName: "",
      title: "",
      status: "Applied",
      response: "",
      contact: { name: "", email: "", phone: "" },
      appliedVia: "",
      possibility: 50,
      location: "",
      rounds: [],
      appliedDate: new Date().toISOString().split("T")[0],
    });
    setIsAddModalOpen(false);
  };

  const handleEditJob = (job) => {
    setEditingJob({ ...job });
    setExpandedJob(job.id);
  };

  const handleSaveEdit = () => {
    setJobs(jobs.map((j) => (j.id === editingJob.id ? editingJob : j)));
    setEditingJob(null);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    setExpandedJob(null);
    setEditingJob(null);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">Job Application Tracker</h1>
          <p className="text-gray-400 text-lg mt-2">Easily manage and monitor your job applications.</p>
        </motion.div>

        {/* Graph Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-10 bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg"
        >
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <p className="text-center text-gray-400 mt-4">
            Average Success Chance: <span className="text-white">{avgPossibility}%</span>
          </p>
        </motion.div>

        {/* Add New Job Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Briefcase className="mr-2 h-5 w-5" /> Add Application
          </motion.button>
        </motion.div>

        {/* Add New Job Modal */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Job Application">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { field: "companyName", placeholder: "Company Name" },
              { field: "title", placeholder: "Job Title" },
              { field: "status", type: "select", options: ["Applied", "Interview Scheduled", "Offer Received"] },
              { field: "response", placeholder: "Company Response" },
              { field: "contact.name", placeholder: "Contact Name" },
              { field: "contact.email", placeholder: "Contact Email", type: "email" },
              { field: "contact.phone", placeholder: "Contact Phone" },
              { field: "appliedVia", placeholder: "Applied Via (e.g., LinkedIn)" },
              { field: "possibility", placeholder: "Success Chance (%)", type: "number", min: 0, max: 100 },
              { field: "location", placeholder: "Location" },
            ].map(({ field, placeholder, type = "text", options, min, max }, index) => (
              <div key={index} className="relative">
                {type === "select" ? (
                  <select
                    value={field.includes(".") ? newJob[field.split(".")[0]][field.split(".")[1]] : newJob[field]}
                    onChange={(e) =>
                      field.includes(".")
                        ? setNewJob({
                            ...newJob,
                            [field.split(".")[0]]: { ...newJob[field.split(".")[0]], [field.split(".")[1]]: e.target.value },
                          })
                        : setNewJob({ ...newJob, [field]: e.target.value })
                    }
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-800 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={field.includes(".") ? newJob[field.split(".")[0]][field.split(".")[1]] : newJob[field]}
                    onChange={(e) =>
                      field.includes(".")
                        ? setNewJob({
                            ...newJob,
                            [field.split(".")[0]]: {
                              ...newJob[field.split(".")[0]],
                              [field.split(".")[1]]: type === "number" ? Number(e.target.value) : e.target.value,
                            },
                          })
                        : setNewJob({ ...newJob, [field]: type === "number" ? Number(e.target.value) : e.target.value })
                    }
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                )}
              </div>
            ))}
          </div>
          <motion.button
            onClick={handleAddJob}
            className="mt-4 w-full py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Briefcase className="inline mr-2 h-5 w-5" /> Add Application
          </motion.button>
        </Modal>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {["unfinished", "finished"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 text-sm font-semibold rounded-md ${
                activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:bg-gray-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === "unfinished" ? "Unfinished Interviews" : "Finished Interviews"} (
              {(tab === "unfinished" ? unfinishedJobs : finishedJobs).length})
            </motion.button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {(activeTab === "unfinished" ? unfinishedJobs : finishedJobs).map((job) => (
            <motion.div
              key={job.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}>
                  <h2 className="text-xl font-semibold text-white">{job.title}</h2>
                  <p className="text-gray-400">{job.companyName}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      job.status === "Applied"
                        ? "bg-gray-700 text-white"
                        : job.status === "Interview Scheduled"
                        ? "bg-gray-600 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {job.status}
                  </p>
                  <motion.button
                    onClick={() => handleEditJob(job)}
                    className="text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit"
                  >
                    <Edit2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-gray-400 hover:text-red-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {expandedJob === job.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4"
                >
                  {editingJob && editingJob.id === job.id ? (
                    <Modal isOpen={true} onClose={() => setEditingJob(null)} title="Edit Job Application">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editingJob.companyName}
                            onChange={(e) => setEditingJob({ ...editingJob, companyName: e.target.value })}
                            placeholder="Company Name"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={editingJob.title}
                            onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                            placeholder="Job Title"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <select
                            value={editingJob.status}
                            onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value })}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offer Received">Offer Received</option>
                          </select>
                          <input
                            type="text"
                            value={editingJob.response}
                            onChange={(e) => setEditingJob({ ...editingJob, response: e.target.value })}
                            placeholder="Company Response"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={editingJob.contact.name}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, contact: { ...editingJob.contact, name: e.target.value } })
                            }
                            placeholder="Contact Name"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="email"
                            value={editingJob.contact.email}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, contact: { ...editingJob.contact, email: e.target.value } })
                            }
                            placeholder="Contact Email"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={editingJob.contact.phone}
                            onChange={(e) =>
                              setEditingJob({ ...editingJob, contact: { ...editingJob.contact, phone: e.target.value } })
                            }
                            placeholder="Contact Phone"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={editingJob.appliedVia}
                            onChange={(e) => setEditingJob({ ...editingJob, appliedVia: e.target.value })}
                            placeholder="Applied Via"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="number"
                            value={editingJob.possibility}
                            onChange={(e) => setEditingJob({ ...editingJob, possibility: Number(e.target.value) })}
                            min="0"
                            max="100"
                            placeholder="Success Chance (%)"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                          <input
                            type="text"
                            value={editingJob.location}
                            onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                            placeholder="Location"
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-white flex items-center">
                            <UserCheck className="mr-2 h-5 w-5" /> Edit Rounds
                          </h3>
                          {editingJob.rounds.map((round, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={round.round}
                                onChange={(e) =>
                                  setEditingJob({
                                    ...editingJob,
                                    rounds: editingJob.rounds.map((r, i) =>
                                      i === index ? { ...r, round: e.target.value } : r
                                    ),
                                  })
                                }
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white flex-1"
                              />
                              <input
                                type="checkbox"
                                checked={round.completed}
                                onChange={(e) =>
                                  setEditingJob({
                                    ...editingJob,
                                    rounds: editingJob.rounds.map((r, i) =>
                                      i === index ? { ...r, completed: e.target.checked } : r
                                    ),
                                  })
                                }
                                className="accent-white"
                              />
                            </div>
                          ))}
                        </div>
                        <motion.button
                          onClick={handleSaveEdit}
                          className="mt-4 w-full py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save className="inline mr-2 h-5 w-5" /> Save Changes
                        </motion.button>
                      </div>
                    </Modal>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-400">
                        <strong>Response:</strong> {job.response}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <UserCheck className="h-5 w-5 text-white" />
                          <p className="text-gray-400">{job.contact.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-white" />
                          <p className="text-gray-400">{job.contact.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-5 w-5 text-white" />
                          <p className="text-gray-400">{job.contact.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-5 w-5 text-white" />
                          <p className="text-gray-400">Applied Via: {job.appliedVia}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white flex items-center">
                          <UserCheck className="mr-2 h-5 w-5" /> Interview Rounds
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {job.rounds.map((round, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span
                                className={`h-2 w-2 rounded-full ${round.completed ? "bg-white" : "bg-gray-600"}`}
                              />
                              <span className="text-gray-400">{round.round}</span>
                              {round.completed ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-600" />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white flex items-center">
                          <Star className="mr-2 h-5 w-5" /> Success Chance
                        </h3>
                        <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                          <div className="bg-white h-2 rounded-full" style={{ width: `${job.possibility}%` }} />
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{job.possibility}%</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-white" />
                        <p className="text-gray-400">
                          {job.location} - Applied on: {job.appliedDate}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
          {(activeTab === "unfinished" ? unfinishedJobs : finishedJobs).length === 0 && (
            <p className="text-center text-gray-400">
              No {activeTab === "unfinished" ? "unfinished" : "finished"} interviews yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;