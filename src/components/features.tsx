"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Lock, Coins, BarChart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Shield className="h-10 w-10 text-orange-500" />,
    title: "Trustless Escrows",
    description: "Smart contracts ensure funds are only released when milestones are completed and verified.",
  },
  {
    icon: <Zap className="h-10 w-10 text-orange-500" />,
    title: "Fast Deployment",
    description: "Set up grant programs in minutes with customizable templates and workflows.",
  },
  {
    icon: <Lock className="h-10 w-10 text-orange-500" />,
    title: "Secure Funding",
    description: "Multi-signature approvals and decentralized verification protect all transactions.",
  },
  {
    icon: <Coins className="h-10 w-10 text-orange-500" />,
    title: "Multi-Chain Support",
    description: "Compatible with major blockchains including Ethereum, Solana, and more.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-orange-500" />,
    title: "Analytics Dashboard",
    description: "Track grant performance, milestone completion, and fund distribution in real-time.",
  },
  {
    icon: <Users className="h-10 w-10 text-orange-500" />,
    title: "Community Governance",
    description: "Enable community voting and transparent decision-making for grant approvals.",
  },
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            GrantFox provides a comprehensive suite of tools to manage and distribute grants securely and efficiently.
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
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
