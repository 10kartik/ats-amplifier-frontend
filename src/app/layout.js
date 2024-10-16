import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "10x Job Hunt - ATS Hacker",
  description: "ATS Score Booster by KK",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
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
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
