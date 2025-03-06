import React, { useState } from "react";
import { motion } from "framer-motion";

const MockQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A backend framework",
        "A database management system",
        "A CSS preprocessor",
      ],
      correctAnswer: "A JavaScript library for building user interfaces",
    },
    {
      id: 2,
      question: "What is a React component?",
      options: [
        "A function or class that returns JSX",
        "A CSS file",
        "A database query",
        "An HTML template",
      ],
      correctAnswer: "A function or class that returns JSX",
    },
    {
      id: 3,
      question: "What hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: "useState",
    },
    {
      id: 4,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JSON XML",
        "Java Syntax Extension",
      ],
      correctAnswer: "JavaScript XML",
    },
    {
      id: 5,
      question: "Which method is used to update state in a class component?",
      options: ["setState", "updateState", "changeState", "modifyState"],
      correctAnswer: "setState",
    },
    {
      id: 6,
      question: "What is the purpose of useEffect?",
      options: [
        "To handle side effects in functional components",
        "To manage state",
        "To create context",
        "To render components",
      ],
      correctAnswer: "To handle side effects in functional components",
    },
    {
      id: 7,
      question: "What is a prop in React?",
      options: [
        "A property passed to a component",
        "A state variable",
        "A CSS style",
        "A lifecycle method",
      ],
      correctAnswer: "A property passed to a component",
    },
    {
      id: 8,
      question: "How do you conditionally render in React?",
      options: [
        "Using if statements or ternary operators",
        "Using switch statements only",
        "Using loops",
        "Using CSS",
      ],
      correctAnswer: "Using if statements or ternary operators",
    },
    {
      id: 9,
      question: "What is the virtual DOM?",
      options: [
        "A lightweight copy of the actual DOM",
        "A real DOM replacement",
        "A CSS framework",
        "A database",
      ],
      correctAnswer: "A lightweight copy of the actual DOM",
    },
    {
      id: 10,
      question: "Who developed React?",
      options: ["Google", "Facebook", "Microsoft", "Twitter"],
      correctAnswer: "Facebook",
    },
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Animation variants
  const questionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20">
        {!showResults ? (
          <>
            {/* Progress Indicator */}
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <div className="w-full bg-gray-600 h-2 rounded-full mt-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <motion.div
              key={currentQuestion.id}
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                {currentQuestion.id}. {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                      selectedAnswers[currentQuestion.id] === option
                        ? "bg-indigo-500/20 border-indigo-400 text-white"
                        : "bg-white/5 border-gray-600 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={selectedAnswers[currentQuestion.id] === option}
                      onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                      className="mr-3 accent-indigo-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  currentQuestionIndex === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                whileHover={{ scale: currentQuestionIndex === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentQuestionIndex === 0 ? 1 : 0.95 }}
              >
                Previous
              </motion.button>
              {currentQuestionIndex === questions.length - 1 ? (
                <motion.button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              )}
            </div>
          </>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Quiz Results</h2>
            <p className="text-2xl text-indigo-200 mb-4">
              Your Score: {calculateScore()} / {questions.length}
            </p>
            <p className="text-gray-300 mb-6">
              {calculateScore() >= 7
                ? "Great job! You’ve mastered React basics."
                : "Good effort! Keep practicing to improve."}
            </p>
            <motion.button
              onClick={() => {
                setSelectedAnswers({});
                setShowResults(false);
                setCurrentQuestionIndex(0);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MockQuiz;