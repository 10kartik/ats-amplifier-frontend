"use client";
import React, { useState } from "react";
import axios from "axios";

const AtsForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseUrl, setResponseUrl] = useState("");

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      console.log("Success:", response.data);
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
            <input
              type="text"
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
              style={{ color: "black" }}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              href={responseUrl}
              className="text-blue-600 visited:text-purple-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
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
