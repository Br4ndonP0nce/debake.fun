"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n"; // Add this import
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
} from "lucide-react";

const FloatingNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, setLanguage, t } = useI18n(); // Add i18n hook

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleLanguage = () => setLanguage(language === "en" ? "es" : "en"); // Language toggle function

  const menuItems = [
    { label: t("common.home") || "Home", href: "/", icon: Home },
    {
      label: t("common.freebies") || "Freebies",
      href: "/freebies",
      icon: Wrench,
    },
    { label: t("common.showcase") || "Showcase", href: "/showcase", icon: Eye },
    { label: t("common.contact") || "Contact", href: "/contact", icon: User },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Globe, href: "#", label: "Website" },
    { icon: X, href: "#", label: "Twitter" },
  ];

  return (
    <motion.div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 "
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
            >
              <Heart className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-green-400 transition-colors rounded-lg hover:bg-green-500/10"
            >
              <User className="h-5 w-5" />
            </motion.button>

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
                  return (
                    <motion.a
                      key={item.label}
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
                      <span className="font-medium">{item.label}</span>
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
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                    size="lg"
                  >
                    {t("hero.primaryCTA") || "Try Excel Transformer"}
                  </Button>
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
