"use client";
import React, { useState, useEffect, useRef } from "react";
import AtsForm from "../pages/AtsForm";
import { FaGithub } from "react-icons/fa"; // Assuming you're using react-icons for icons

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-md w-full space-y-4">
        <button
          onClick={onClose}
          className="float-right font-bold text-black bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          &times; {/* Stylish cross symbol */}
        </button>
        <div className="text-black">{children}</div>{" "}
        {/* Ensure text is visible */}
      </div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const [gradientStyle, setGradientStyle] = useState({});

  useEffect(() => {
    const updateGradient = () => {
      // Function to generate random color
      const randomColor = () =>
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      // Update the gradient style for the button background
      setGradientStyle({
        background: `linear-gradient(45deg, ${randomColor()}, ${randomColor()})`,
        color: "#FFFFFF", // Ensure text color contrasts well with the background
        border: "none", // Optional: remove border for aesthetic purposes
        padding: "10px 20px", // Optional: adjust padding to your preference
        cursor: "pointer", // Change cursor to pointer to indicate it's clickable
        fontSize: "16px", // Optional: adjust font size for better readability
        fontWeight: "bold", // Optional: make text bold for better readability
      });
    };

    updateGradient(); // Initial update
    const intervalId = setInterval(updateGradient, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400">
        ATS Hacker
      </h1>
      {/* call component named ats-form */}
      <AtsForm />
      {/* Add a footer here */}
      <button
        onClick={() => setModalOpen(true)}
        className="text-lg font-semibold text-white"
      >
        How it Works?
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          The ATS booster project is designed to enhance the visibility of key
          skills and expertise in your resume when processed by Applicant
          Tracking Systems (ATS). The specified text, keywords, or areas of
          expertise are added to the PDF in a font size of 1 and in white color,
          rendering them invisible to the human eye but detectable by ATS
          algorithms. This hidden text is strategically placed at the top left
          corner of the first page of the PDF. Users can verify the added
          content by using the search or find function in any PDF reader. This
          approach helps improve the chances of your resume getting noticed by
          the ATS, thereby increasing your opportunities for landing the desired
          job.
        </p>
        <br />
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            lineHeight: "1.5",
            textAlign: "center",
          }}
          className="fadeInOut"
        >
          Happy Hacking! 🚀
        </p>
      </Modal>
      <div>
        <button
          onClick={() => setIsTipsModalOpen(true)}
          style={gradientStyle}
          className="text-lg font-semibold"
        >
          Tips to Boost ATS Score
        </button>
      </div>
      {/* Tips to Boost ATS Score modal */}
      <Modal isOpen={isTipsModalOpen} onClose={() => setIsTipsModalOpen(false)}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          <div>
            <strong>1. Use Keywords:</strong> Match the job description keywords
            exactly.
            <br />
            <strong>2. Simple Formatting:</strong> Avoid complex layouts,
            tables, and graphics.
            <br />
            <strong>3. Standard Fonts:</strong> Use common fonts like Arial,
            Times New Roman, or Calibri.
            <br />
            <strong>4. Section Headings:</strong> Use standard headings like
            &ldquo;Experience,&rdquo; &ldquo;Education,&rdquo; and
            &ldquo;Skills.&rdquo;
            <br />
            <strong>5. Consistent Formatting:</strong> Ensure consistent use of
            bullet points, dates, and headings.
            <br />
            <strong>6. Save as PDF:</strong> Ensure your resume is saved in PDF
            format for compatibility.
            <br />
            <strong>7. Avoid Headers and Footers:</strong> ATS systems might not
            read text in headers/footers.
            <br />
            <strong>8. Contact Information:</strong> Include your full name,
            phone number, and email address.
            <br />
            <strong>9. Professional Language:</strong> Use clear, professional
            language without abbreviations.
            <br />
            <strong>10. Relevant Information:</strong> Focus on relevant
            experience and skills for the job.
          </div>
        </div>
      </Modal>
      <footer className="flex flex-col items-center justify-center space-y-4">
        <a
          href="https://github.com/10kartik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-white text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-pulse"
        >
          Developed by KK
        </a>
        <div className="flex space-x-4">
          <a
            href="https://github.com/10kartik/ats-amplifier-frontend"
            target="_blank"
            rel="noopener noreferrer"
            title="Frontend Repository"
          >
            <FaGithub className="text-white text-2xl" />
          </a>
          <a
            href="https://github.com/10kartik/ats-amplifier"
            target="_blank"
            rel="noopener noreferrer"
            title="Backend Repository"
          >
            <FaGithub className="text-white text-2xl" />
          </a>
        </div>
      </footer>
    </main>
  );
}
