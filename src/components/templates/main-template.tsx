import type React from "react";
import Header from "@/components/organisms/header";

interface MainTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate({ children }: MainTemplateProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      {children}
    </main>
  );
}
