"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8729812116098552"
          crossorigin="anonymous"
        ></script>
        <title>ATS Score Booster by KK</title>
        <meta
          name="description"
          content="Maximize your resume's compatibility with Applicant Tracking Systems (ATS) using our free ATS score booster. Enhance your CV's visibility and increase your chances of landing job interviews."
        />
        <meta
          name="keywords"
          content="ATS score booster, increase Resume ATS score, ATS system, resume improvement, free ATS score booster, increase ATS score for resume, boost ATS score, free resume score improvement, ATS friendly resume, improve CV for ATS, free resume optimization for ATS"
        />
      </Head>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8729812116098552"
            data-ad-slot="7045878436"
            data-ad-format="auto"
          ></ins>
          <script>
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </script>
        </body>
      </html>
    </>
  );
}
