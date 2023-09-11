// Import necessary dependencies and components
import React from "react";
import "./globals.css";

// Define metadata for the Task Vault AI application
export const metadata = {
    title: "Home",
    description: "AI-Powered Project Management web application",
};

// Define the RootLayout component
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-gray-100">
        {/* Render the children components */}
        {children}
        </body>
        </html>
    );
}
