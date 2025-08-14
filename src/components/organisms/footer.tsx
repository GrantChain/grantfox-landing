"use client";
import Link from "next/link";
import { Github, Twitter, DiscIcon as Discord, Linkedin } from "lucide-react";
import Logo from "@/components/atoms/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
          <div className="md:col-span-1">
            <Logo size="lg" />

            <p className="text-gray-400 mb-6">
              Open-source grants platform using smart escrows for secure
              milestone-based funding.
            </p>

            <div className="flex space-x-4 mb-4">
              <Link
                href="https://github.com/GrantChain"
                target="_blank"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/itsgrantfox"
                target="_blank"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/grantfox"
                target="_blank"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://docs.grantfox.xyz"
                  target="_blank"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} GrantFox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
