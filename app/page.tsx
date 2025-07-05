"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 500);
    const timer2 = setTimeout(() => setShowButton(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 
          className={`text-4xl md:text-6xl font-pixel text-brown transition-all duration-1000 ${
            showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          WISIELEC
        </h1>
        
        <button
          className={`px-8 py-4 bg-accent text-cream font-pixel text-lg md:text-xl border-4 border-brown hover:bg-accent-light transition-all duration-300 hover:scale-105 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          onClick={() => alert("Rozpoczynamy grę!")}
        >
          GRAJ
        </button>
      </div>
    </div>
  );
}
