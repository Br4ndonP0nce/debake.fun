"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n"; // Add this import
import { Brain } from "lucide-react";

const Footer = () => {
  const { t, language } = useI18n();
  return (
    <footer className="relative z-10 bg-[#0a0a0a] border-t border-green-500/20 py-12">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <Brain className="h-8 w-8 text-green-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
            debake.fun
          </span>
        </motion.div>
        <p className="text-gray-400 mb-6 text-lg">
          {t("hero.footer.footerCaption")}
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          {["Términos", "Privacidad", "Contacto", "API"].map((link) => (
            <motion.a
              key={link}
              href="#"
              className="text-gray-500 hover:text-green-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
