"use client";

import { Suspense, useEffect, useState } from "react";

// Dynamically import the 3D components with no SSR to avoid React hydration issues
function ScenePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-t-orange-500 border-r-orange-300 border-b-orange-500 border-l-orange-300 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-orange-500 font-bold">Loading</span>
        </div>
      </div>
    </div>
  );
}

export default function FoxScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full h-full">
      <ScenePlaceholder />
    </div>
  );
}
