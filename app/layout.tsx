import React from "react";
import "./globals.css";

export const metadata = {
  title: "Rahul Ramane | GenAI Engineer",
  description: "Portfolio of Rahul Ramane - GenAI Engineer specializing in AI-driven testing solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <div className="gradient-glow top-0 left-0"></div>
        <div className="gradient-glow bottom-0 right-0"></div>

        {children}

      </body>
    </html>
  );
}