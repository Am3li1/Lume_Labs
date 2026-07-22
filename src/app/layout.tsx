import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";

import Conditionalnavbar from "@/components/layout/Conditionalnavbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumelabs.dev"),
  title: {
    default: "Lume Labs — Custom Software Consultancy",
    template: "%s | Lume Labs",
  },
  description:
    "Lume Labs builds custom web applications, business automation tools, APIs, and AI-powered software for growing businesses.",
  openGraph: {
    siteName: "Lume Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Conditionalnavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
