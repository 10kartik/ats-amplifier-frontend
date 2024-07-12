"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AtsForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseUrl, setResponseUrl] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled status

  useEffect(() => {
    const textarea = document.getElementById("text");
    if (textarea) {
      textarea.style.height = "inherit"; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  }, []);

  useEffect(() => {
    // Enable button only if a file is attached and text is not empty
    setIsButtonDisabled(!(pdfFile && text.trim()));
  }, [pdfFile, text]); // Depend on pdfFile and text

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    const textarea = event.target;
    // Ensure the textarea grows to fit content, but also shrinks when content is removed
    textarea.style.height = "inherit"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(event.target.value);
  };

  function handleFileAndTextUpload(file, text) {
    const fileSizeInMB = file.size / 1024 / 1024; // Convert bytes to MB
    const textLength = text.length;

    if (fileSizeInMB > 1.5 || textLength > 6000) {
      let message = "";
      if (fileSizeInMB > 1.5) {
        message +=
          "File size is more than 1.5MB. \nConsider using PDF Compressor to reduce the size.";
      }
      if (textLength > 6000) {
        message += "Text characters are more than 6k.";
      }
      showModal(message); // Show modal with the message
      return false; // Stop further execution
    }
  }

  // Example usage of showModal function
  function showModal(message) {
    // Implementation depends on how you show modals in your application
    // This could be a simple alert or a more complex modal component
    alert(message);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsButtonDisabled(true); // Disable button on submit

    const checkResult = handleFileAndTextUpload(pdfFile, text);
    if (checkResult === false) {
      setLoading(false);
      setIsButtonDisabled(false);
      return; // Stop the submission if the check fails
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("text", text);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/boost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseUrl(response.data.url);
    } catch (error) {
      console.error("Error posting the data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spinner-border {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          vertical-align: text-bottom;
          border: 0.25em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }
      `}</style>
      <div className="max-w-md mx-auto my-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="pdf"
              className="block text-sm font-medium text-gray-700"
            >
              PDF File:
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Text:
            </label>
            <textarea
              type="text"
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
              style={{
                color: "black",
                height: "auto",
                minHeight: "50px",
                resize: "vertical",
                maxHeight: "350px",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled || loading} // Disable button based on state or loading status
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isButtonDisabled || loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 2s linear infinite",
              }}
              role="status"
            >
              <span className="visually-hidden"> </span>
            </div>
          </div>
        )}
        {responseUrl && (
          <div className="mt-4 text-center">
            <a
              onClick={() =>
                window.open(responseUrl, "_blank", "noopener,noreferrer")
              }
              className="inline-block px-6 py-2 text-white font-bold bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150"
            >
              View Document
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default AtsForm;
