import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Aman Patre — Full-Stack & Backend Developer | VIT Bhopal",
  description:
    "Portfolio of Aman Patre — CS student at VIT Bhopal building scalable backend systems and AI-driven products. Projects, skills, and AI chatbot.",
  keywords: ["Aman Patre", "AmanPatre", "VIT Bhopal", "full-stack developer", "backend developer", "Next.js", "portfolio"],
  authors: [{ name: "Aman Patre", url: "https://github.com/AmanPatre" }],
  creator: "Aman Patre",
  openGraph: {
    type: "website",
    url: "https://amanpatre.me",
    title: "Aman Patre — Full-Stack & Backend Developer",
    description: "Building scalable backend systems and AI-driven products.",
    siteName: "Aman Patre Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Patre — Full-Stack & Backend Developer",
    description: "CS student at VIT Bhopal. Full-stack & Backend builder.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-display)" }}>
        <ThemeProvider>
          <LenisProvider>
            <ClientWrapper>
              <Navbar />
              <main style={{ minHeight: "100vh" }}>
                {children}
              </main>
              <Footer />
            </ClientWrapper>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
