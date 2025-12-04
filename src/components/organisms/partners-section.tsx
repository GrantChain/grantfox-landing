"use client";

import React from "react";
import { motion } from "framer-motion";

type Partner = {
  name: string;
  logoSrc: string;
};

const partners: Partner[] = [
  { name: "Stellar", logoSrc: "/images/stellar-logo.png" },
  { name: "Trustless Work", logoSrc: "/images/tw-logo.png" },
];

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="w-full bg-[#050608] py-6 md:py-8 border-t border-gray-900"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
          {/* Label */}
          <div className="flex-shrink-0">
            <div>
              <span className="text-base md:text-lg font-semibold text-white">
                Trusted by
              </span>
            </div>
          </div>

          {/* Logos area */}
          <div className="flex-1">
            <div className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {partners.map((p, i) => (
                  <motion.div
                    key={p.name}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.36,
                      ease: "easeOut",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={p.logoSrc}
                        alt={p.name}
                        className="h-10 md:h-12 lg:h-14 max-w-[160px] object-contain"
                      />
                      <p className="mt-2 text-xs md:text-sm text-gray-400 text-center">
                        {p.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
