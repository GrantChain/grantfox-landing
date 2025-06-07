"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Users, Wallet, Award } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-10 w-10 text-orange-500" />,
    title: "Create Grant Program",
    description:
      "Define your grant program parameters, funding amounts, and milestone requirements.",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-500" />,
    title: "Applicants Submit Proposals",
    description:
      "Builders submit detailed proposals with milestone deliverables and timelines.",
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-orange-500" />,
    title: "Review and Approve",
    description:
      "Review submissions, provide feedback, and approve promising projects.",
  },
  {
    icon: <Wallet className="h-10 w-10 text-orange-500" />,
    title: "Fund via Smart Escrow",
    description:
      "Funds are locked in smart escrows and released as milestones are completed.",
  },
  {
    icon: <Award className="h-10 w-10 text-orange-500" />,
    title: "Milestone Verification",
    description:
      "Verify completed milestones through on-chain proof of work and release funds automatically.",
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" />

      <div
        ref={containerRef}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GrantFox simplifies the grant funding process with a secure,
            transparent workflow.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/80 via-orange-500/50 to-orange-500/10 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="flex-1">
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{step.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold z-10 relative">
                  {index + 1}
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
