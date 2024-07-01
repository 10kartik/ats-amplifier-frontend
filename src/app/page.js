"use client";
import React, { useState, useRef } from "react";
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
