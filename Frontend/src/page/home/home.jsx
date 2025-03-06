import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation
import { BarChart2, FileText, Briefcase, UserCheck, Mail } from "lucide-react";
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

const Home = () => {
  // Mock data for the graph
  const graphData = [
    { name: "Mock Test 1", score: 85 },
    { name: "Mock Test 2", score: 92 },
    { name: "Mock Test 3", score: 78 },
    { name: "Mock Test 4", score: 95 },
    { name: "Mock Test 5", score: 88 },
  ];

  // Chart.js data and options
  const chartData = {
    labels: graphData.map((item) => item.name),
    datasets: [
      {
        label: "Score (%)",
        data: graphData.map((item) => item.score),
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(129, 140, 248, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: "#1f2937", titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "#d1d5db" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: { color: "#d1d5db" },
        grid: { display: false },
      },
    },
  };

  // Updated cardData with navigation paths
  const cardData = [
    {
      icon: FileText,
      title: "Create Resume",
      description: "Build a standout resume effortlessly",
      color: "bg-blue-500/20 border-blue-500/30",
      path: "/resume",
    },
    {
      icon: UserCheck,
      title: "Mock Interview",
      description: "Ace interviews with AI practice",
      color: "bg-green-500/20 border-green-500/30",
      path: "/mock-quiz",
    },
    {
      icon: Briefcase,
      title: "Job Search",
      description: "Find your dream job today",
      color: "bg-purple-500/20 border-purple-500/30",
      path: "/job-search",
    },
    {
      icon: Mail,
      title: "Cover Letter",
      description: "Craft compelling applications",
      color: "bg-orange-500/20 border-orange-500/30",
      path: "/cover-letter",
    },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-16 pb-8 text-center relative"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Career Awaits
        </motion.h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Elevate your career with cutting-edge AI tools for resumes, interviews, and job hunting.
        </p>
      </motion.div>

      {/* Graph Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 py-10"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center text-indigo-200">
          <BarChart2 className="mr-2 h-6 w-6" /> Mock Test Progress
        </h2>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-lg shadow-lg glow-effect">
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <p className="mt-4 text-center text-gray-400 text-sm">
            Track your performance over time
          </p>
        </div>
      </motion.section>

      {/* Cards Section with Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-10"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-indigo-200">
          Unlock Your Potential
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <Link to={card.path} key={index}> {/* Wrap card in Link */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className={`p-6 rounded-xl border ${card.color} backdrop-blur-md hover:shadow-2xl transition-all duration-300 cursor-pointer glow-effect`}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
              >
                <card.icon className="h-10 w-10 mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.description}</p>
                <motion.button
                  className="mt-4 text-indigo-300 hover:text-indigo-200 text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  Start Now →
                </motion.button>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 text-sm bg-white/5">
        © {new Date().getFullYear()} Career Hub. All rights reserved.
      </footer>

      {/* Custom CSS for Glow Effect */}
      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .glow-effect:hover {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;