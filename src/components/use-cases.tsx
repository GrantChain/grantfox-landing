"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Code, Award, Building } from "lucide-react";

const useCases = [
  {
    icon: <Database className="h-12 w-12 text-orange-500" />,
    title: "Blockchains",
    description:
      "Fund ecosystem development, protocol improvements, and infrastructure projects with transparent milestone tracking.",
  },
  {
    icon: <Building className="h-12 w-12 text-orange-500" />,
    title: "DAOs",
    description:
      "Distribute community treasury funds to builders with decentralized governance and automated payments.",
  },
  {
    icon: <Code className="h-12 w-12 text-orange-500" />,
    title: "Hackathons",
    description:
      "Run hackathons with prize pools secured in smart escrows and released based on judging outcomes.",
  },
  {
    icon: <Award className="h-12 w-12 text-orange-500" />,
    title: "Events",
    description:
      "Organize bounty programs and challenges with secure funding and verifiable completion criteria.",
  },
];

export default function UseCases() {
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
    <section id="use-cases" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,107,0,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">
            Use Cases
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GrantFox is designed to serve various funding scenarios in the Web3
            ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="mb-4">{useCase.icon}</div>
                  <CardTitle className="text-2xl text-white">
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-400 text-base">
                    {useCase.description}
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
