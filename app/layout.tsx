import React from "react";
import "./globals.css";
import SmoothScrollProvider from "../components/SmoothScrollProvider";

export const metadata = {
  title: "Rahul Ramane | GenAI Engineer",
  description: "Rahul Ramane — Gen AI Engineer & QA Automation Specialist at Capgemini. Expert in LLM pipelines, prompt engineering, agentic AI, Selenium, Python, and Django. Open to AI Engineering opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <div className="gradient-glow w-[600px] h-[600px] top-0 left-0" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08), transparent 65%)" }}></div>
        <div className="gradient-glow w-[600px] h-[600px] bottom-0 right-0" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 65%)" }}></div>

        <SmoothScrollProvider>{children}</SmoothScrollProvider>

      </body>
    </html>
  );
}