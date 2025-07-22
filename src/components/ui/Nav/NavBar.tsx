// Fixed NavBar component - remove language from keys
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  Zap,
  Home,
  Wrench,
  Eye,
  Github,
  Globe,
  InstagramIcon,
} from "lucide-react";

const FloatingNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { language, setLanguage, t } = useI18n();

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    console.log(`🌍 NavBar: Switching from ${language} to ${newLang}`);
    setLanguage(newLang);
  };

  // Wait for component to mount before rendering i18n content
  if (!isMounted) {
    return (
      <motion.div
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-[#0f0f0f]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden">
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-black font-bold" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                debake.fun
              </span>
            </div>
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  const menuItems = [
    {
      id: "home", // Add stable ID
      label: t("common.home"),
      href: "/",
      icon: Home,
      fallback: "Home",
    },
    {
      id: "freebies", // Add stable ID
      label: t("common.freebies"),
      href: "/freebies/youruglyexcelhere",
      icon: Wrench,
      fallback: "Freebies",
    },
    {
      id: "showcase", // Add stable ID
      label: t("common.showcase"),
      href: "/freebies/youruglyexcelhere",
      icon: Eye,
      fallback: "Showcase",
    },
    {
      id: "contact", // Add stable ID
      label: t("common.contact"),
      href: "/contact",
      icon: User,
      fallback: "Contact",
    },
  ];

  const socialLinks = [
    { icon: Globe, href: "https://www.decodenext.dev", label: "Website" },
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/decodebrandon/",
      label: "Instagram",
    },
  ];

  console.log(`🌍 NavBar: Current language is ${language}`);
  console.log(
    `🌍 NavBar: Menu items:`,
    menuItems.map((item) => ({ label: item.label, fallback: item.fallback }))
  );

  return (
    <motion.div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-[#0f0f0f]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden"
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4,
        }}
      >
        {/* Collapsed State - Just the header bar */}
        <div className="flex items-center justify-between px-2 py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-black font-bold" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                debake.fun
              </span>
            </a>
          </motion.div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <motion.a
              href="https://www.instagram.com/decodebrandon/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
            >
              <Heart className="h-5 w-5" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/decodebrandon/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
            >
              <User className="h-5 w-5" />
            </motion.a>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10 border border-green-500/20"
              title={
                language === "en" ? "Switch to Spanish" : "Cambiar a Inglés"
              }
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" ? "ES" : "EN"}
              </span>
            </motion.button>

            {/* Menu Toggle Button */}
            <motion.button
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
              onClick={toggleExpanded}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 },
              }}
              className="border-t border-green-500/20"
            >
              {/* Navigation Menu */}
              <div className="px-6 py-4 space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const displayLabel = item.label || item.fallback;

                  return (
                    <motion.a
                      key={item.id} // FIXED: Use stable ID instead of href + language
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsExpanded(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-5 w-5 group-hover:text-green-400 transition-colors" />
                      <span className="font-medium">{displayLabel}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="px-6 py-4 border-t border-green-500/20">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/freebies/youruglyexcelhere">
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                      size="lg"
                    >
                      {t("hero.primaryCTA") || "Try Excel Transformer"}
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="px-6 py-4 border-t border-green-500/20">
                <motion.div
                  className="flex items-center justify-center space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        className="p-2 text-gray-500 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    );
                  })}
                </motion.div>
                <motion.p
                  className="text-center text-xs text-gray-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {t("hero.footer.author") ||
                    "Built with chaos by DecodeBrandon"}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Optional: Backdrop when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingNavbar;
