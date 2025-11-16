"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WebGLBackground from "@/components/atoms/webgl-background";
import AnimatedSvgLogo from "@/components/atoms/animated-svg-logo";
import AnimatedParticles from "@/components/molecules/animated-particles";
import AnimatedHexagons from "@/components/molecules/animated-hexagons";
import HeroTitle from "@/components/molecules/hero-title";
import HeroDescription from "@/components/molecules/hero-description";
import CtaButtons from "@/components/molecules/cta-buttons";
import ProjectCard from "@/components/molecules/project-card";
import ScrollIndicator from "@/components/atoms/scroll-indicator";
import Badge from "@/components/atoms/badge";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute inset-0 bg-black pointer-events-none" />
      </div>

      {/* Animated elements */}
      <AnimatedParticles />
      <AnimatedHexagons />

      {/* Fox logo */}
      <AnimatedSvgLogo
        width={400}
        height={400}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* Main content with parallax effect */}
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-20 pt-20"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Title and description */}
          <div className="lg:col-span-7 space-y-8">
            {/* Animated badge */}
            <Badge
              animate
              delay={0.3}
              className="inline-flex items-center gap-2 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>Built for the community</span>
            </Badge>

            {/* Main title with creative layout */}
            <HeroTitle title={["The Open-Source", "Collaboration Hub", "for Web3"]} />

            {/* Description with creative design */}
            <HeroDescription>
              GrantFox connects projects with talent. 
              Discover, apply to issues, track progress, grow your reputation and collaborate seamlessly -all in one place.
            </HeroDescription>

            {/* CTA buttons */}
            <CtaButtons />
          </div>

          {/* Right side - Animated card */}
          <ProjectCard />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
