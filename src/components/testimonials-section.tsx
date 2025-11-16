"use client";

import { motion } from "framer-motion";
import React from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "GrantFox makes it way easier to find serious contributors. We had PRs merged on day one of listing our repo.",
    name: "Ana Rodríguez",
    role: "Maintainer",
    project: "Stellar Wallet Toolkit",
  },
  {
    quote:
      "As a contributor, I finally have a clear place to discover Stellar projects and track my work across repos.",
    name: "Diego Morales",
    role: "Contributor",
    project: "Multiple Stellar Ecosystem Repos",
  },
  {
    quote:
      "Syncing issues from GitHub and managing applications in one place saves us hours every week.",
    name: "Jin Park",
    role: "Core Dev",
    project: "Stellar Indexer",
  },
  {
    quote:
      "GrantFox feels like the missing collaboration layer for open source on Stellar.",
    name: "Emily Carter",
    role: "Ecosystem Lead",
    project: "Stellar Dev Tools",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full flex flex-col items-center justify-center py-20 bg-neutral-950 border-t border-neutral-800"
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">
          What Builders Are Saying
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Maintainers and contributors across the Web3 ecosystem are already
          using GrantFox to collaborate, ship faster, and grow their projects.
        </p>
      </div>

      <div className="mt-10 w-full relative overflow-hidden">
        <motion.div
          className="flex gap-6 px-4 md:px-6 py-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {duplicatedTestimonials.map((t, index) => (
            <div
              key={index}
              className="min-w-[280px] max-w-sm md:min-w-[360px] md:max-w-md bg-gray-900/80 border border-gray-800 rounded-xl p-6 shadow-lg flex-shrink-0"
            >
              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                “{t.quote}”
              </p>
              <div className="mt-4 text-left">
                <p className="text-white font-semibold text-sm md:text-base">
                  {t.name}
                </p>
                <p className="text-gray-400 text-xs md:text-sm">
                  {t.role} · {t.project}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* edge gradients for nicer fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />
      </div>
    </section>
  );
}