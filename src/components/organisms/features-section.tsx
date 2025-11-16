"use client";

import { motion } from "framer-motion";
import { GitBranch, Folders, Users, LayoutDashboard, Coins, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <GitBranch className="h-10 w-10 text-orange-500" />,
    title: "GitHub-Native Integration",
    description:
      "Sync your organizations, repositories, issues, and pull requests so you can manage everything from one place.",
  },
  {
    icon: <Folders className="h-10 w-10 text-orange-500" />,
    title: "Project Hubs",
    description:
      "Give each project a dedicated page with open issues, contribution guidelines, and live activity.",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-500" />,
    title: "Contributor Dashboard",
    description:
      "Discover projects, apply to issues, track your applications, and build a verifiable Web3 reputation.",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-orange-500" />,
    title: "Maintainer Workspace",
    description:
      "Review applicants, assign issues, follow PRs, and manage your contributor pipeline from a single, focused workspace.",
  },
  {
    icon: <Coins className="h-10 w-10 text-orange-500" />,
    title: "Rewards with smart escrows (soon)",
    description:
      "Rewards for contributors and maintainers in USDC using transparent smart escrows once work is completed and approved.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-orange-500" />,
    title: "Collaboration Campaigns",
    description:
      "Run time-boxed contribution campaigns to attract new builders, boost progress, and keep your repos moving.",
  },
];

export default function FeaturesSection() {
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
    <section id="features" className="py-20 relative overflow-hidden">
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
            Built for Open-Source Collaboration
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GrantFox gives maintainers and contributors the tools they need to discover each other, 
            coordinate work, and ship high-quality open source together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">
                    {feature.description}
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
