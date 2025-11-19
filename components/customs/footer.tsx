import React from "react";
import { Twitter, Linkedin, Facebook, Github } from "lucide-react";
import Link from "next/link";

type FooterProps = {
  name: string;
  year: number;
  xLink: string;
  gitHubLink: string;
};

export const Footer = ({ name, year, xLink, gitHubLink }: FooterProps) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Copyright */}
          <div className="text-gray-600 dark:text-gray-400 text-sm">{`© ${year} ${name}`}</div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
            >
              Contact
            </Link>
            <Link
              href="/faqs"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
            >
              FAQs
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex gap-3 justify-center md:justify-start pt-4">
            {xLink && (
              <a
                href={xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="X"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            )}
            {gitHubLink && (
              <a
                href={gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 hover:scale-110 transition-all duration-200 shadow-md"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
