"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import WebGLBackground from "@/components/webgl-background";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Blockchains", "DAOs", "Hackathons", "Events"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  // Parallax effect for scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <WebGLBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Animated geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0.5],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * -200],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              delay: Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-orange-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              opacity: Math.random() * 0.3 + 0.1,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Hexagon grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              rotate: [0, 30],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              delay: Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute border border-orange-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              opacity: Math.random() * 0.2 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Fox logo */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50 10 L80 40 L50 90 L20 40 Z"
            fill="url(#orangeGradient)"
            stroke="#ff6b00"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M20 40 L50 60 L80 40"
            fill="none"
            stroke="#ff6b00"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M35 25 L20 40"
            fill="none"
            stroke="#ff6b00"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M65 25 L80 40"
            fill="none"
            stroke="#ff6b00"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          />
          <motion.circle
            cx="40"
            cy="35"
            r="3"
            fill="#ff6b00"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <motion.circle
            cx="60"
            cy="35"
            r="3"
            fill="#ff6b00"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <defs>
            <linearGradient
              id="orangeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff6b00" />
              <stop offset="100%" stopColor="#ff9500" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Main content with parallax effect */}
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-20 pt-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Title and description */}
          <div className="lg:col-span-7 space-y-8">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/20 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-400 text-sm font-medium">
                Web3 Grants Revolution
              </span>
            </motion.div>

            {/* Main title with creative layout */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                <span className="block text-white">Secure</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
                  Milestone-Based
                </span>
                <span className="block text-white">Funding</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center gap-2 text-xl md:text-2xl text-gray-400"
              >
                <div className="h-8 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute text-orange-400 font-medium"
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Description with creative design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent"></div>
              <p className="text-gray-300 text-lg pl-4 max-w-xl">
                GrantFox is an open-source platform using smart escrows to
                ensure secure milestone-based funding for your projects. No more
                trust issues, just transparent and efficient grant distribution.
              </p>
            </motion.div>

            {/* CTA buttons with creative design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none rounded-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 backdrop-blur-sm rounded-lg group"
              >
                <span className="flex items-center">
                  Learn More
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Animated card */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <div className="relative">
              {/* Glowing effect behind card */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-2xl blur-xl"></div>

              {/* Main card */}
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -ml-16 -mb-16"></div>

                {/* Card content */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                            stroke="#ff6b00"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Smart Escrow</h3>
                        <p className="text-gray-400 text-sm">
                          Trustless Funding
                        </p>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-orange-500/10 rounded text-orange-400 text-sm">
                      Active
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{
                          delay: 1.2,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">65%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Total Funding</p>
                      <p className="text-white font-medium">120,000 USDC</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Released</p>
                      <p className="text-white font-medium">78,000 USDC</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-sm">Next Milestone</p>
                      <p className="text-orange-400 text-sm">3 days left</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-white text-sm">
                        Frontend Implementation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <ArrowRight
            size={20}
            className="text-orange-400 transform rotate-90"
          />
        </motion.div>
      </div>
    </section>
  );
}
