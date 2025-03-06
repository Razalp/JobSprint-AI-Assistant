import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 z-10 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-300">
          Career Hub
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-14 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent`}
        >
          <Link to="/" className="block p-2 hover:text-indigo-300">
            Landing
          </Link>
          <Link to="/auth" className="block p-2 hover:text-indigo-300">
            Auth
          </Link>
          <Link to="/home" className="block p-2 hover:text-indigo-300">
            Home
          </Link>
          <Link to="/resume" className="block p-2 hover:text-indigo-300">
            Resume
          </Link>
          <Link to="/mock-quiz" className="block p-2 hover:text-indigo-300">
            Mock Quiz
          </Link>
          <Link to="/job-search" className="block p-2 hover:text-indigo-300">
            Job Search
          </Link>
          <Link to="/cover-letter" className="block p-2 hover:text-indigo-300">
            Cover Letter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;