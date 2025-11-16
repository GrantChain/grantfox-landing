"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Radar, SearchCode, Workflow, BadgeCheck, Rocket, HandCoins, type LucideIcon } from "lucide-react";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  {
    title: "More Visibility for Your Project",
    description:
      "GrantFox helps projects reach active contributors by syncing repos, highlighting open issues, and showcasing activity across the platform.",
    icon: Radar,
  },
  {
    title: "Discover Work That Matches Your Skills",
    description:
      "Contributors get personalized issue recommendations based on languages, interests, and GitHub activity — making it easy to find meaningful tasks.",
    icon: SearchCode,
  },
  {
    title: "Streamlined Issue Management",
    description:
      "Maintainers can review applicants, assign tasks, follow PRs, and manage contributions from a clean and unified workspace.",
    icon: Workflow,
  },
  {
    title: "Build Your Verified OSS Reputation",
    description:
      "Every merged PR builds your verifiable contribution history, helping contributors stand out during grants, hackathons, and job opportunities.",
    icon: BadgeCheck,
  },
  {
    title: "Faster Collaboration, Less Overhead",
    description:
      "GrantFox reduces friction by syncing directly with GitHub, centralizing communication, and simplifying how teams onboard contributors.",
    icon: Rocket,
  },
  {
    title: "Rewards (soon)",
    description:
      "Earn rewards in USDC through transparent, trustless smart escrows — fully automated once work is approved.",
    icon: HandCoins,
  },
];

export default function BenefitsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">
            Why Builders Choose GrantFox
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GrantFox brings contributors and maintainers together with tools that simplify collaboration, boost visibility, and accelerate open-source development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="mb-4">{<benefit.icon className="h-12 w-12 text-orange-500" />}</div>
                  <CardTitle className="text-2xl text-white">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-400 text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
