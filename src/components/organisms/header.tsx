"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Logo from "@/components/atoms/logo";
import NavLink from "@/components/molecules/nav-link";
import WaitlistForm from "@/components/waitlist-form";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="GrantFox Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
            >
              GrantFox
            </motion.span>
          </Link>

          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <motion.nav
              variants={navVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-8"
            >
              <NavLink href="#features" animate delay={0.1}>
                Features
              </NavLink>
              <NavLink href="#how-it-works" animate delay={0.2}>
                How It Works
              </NavLink>
              <NavLink href="#use-cases" animate delay={0.3}>
                Use Cases
              </NavLink>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Launch App
                </Button>
              </motion.div>
            </motion.nav>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex flex-col gap-4 pb-4"
          >
            <NavLink
              href="#features"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink
              href="#how-it-works"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </NavLink>
            <NavLink
              href="#use-cases"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Use Cases
            </NavLink>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
