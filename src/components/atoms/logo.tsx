"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export default function Logo({ size = "md", withText = true }: LogoProps) {
  const sizes = {
    sm: 40,
    md: 40,
    lg: 200,
  };

  return (
    <Link href="/" className="flex items-center gap-2 mb-6">
      <Image
        src="/favicon.ico"
        alt="GrantFox Logo"
        width={sizes[size]}
        height={sizes[size]}
        className={`w-${sizes[size] / 10} h-${sizes[size] / 10}`}
      />
      {withText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
        >
          GrantFox
        </motion.span>
      )}
    </Link>
  );
}
