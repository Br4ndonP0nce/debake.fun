// src/components/ui/LanguageToggle.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface LanguageToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = "outline",
  size = "sm",
  className = "",
  showIcon = true,
  showText = true,
}) => {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const getDisplayText = () => {
    if (!showText) return null;
    return language === "en" ? "ES" : "EN";
  };

  const getAriaLabel = () => {
    return language === "en" ? "Switch to Spanish" : "Cambiar a Inglés";
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      className={className}
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      {showIcon && <Globe className="h-4 w-4 mr-2" />}
      {getDisplayText()}
    </Button>
  );
};

export default LanguageToggle;
