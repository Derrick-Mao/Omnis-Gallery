"use client"

import React from "react";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Amplify } from "aws-amplify";
import "./app.css";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });

import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator>
          {children} 
        </Authenticator>
      </body>
    </html>
  );
}
