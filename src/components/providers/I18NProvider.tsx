// src/components/providers/I18nProvider.tsx
"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  I18nContext,
  Language,
  translations,
  getTranslation,
  saveLanguageToStorage,
  getLanguageFromStorage,
  detectBrowserLanguage,
} from "@/hooks/useI18n";

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  defaultLanguage = "en",
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = () => {
      // Priority: 1. Stored preference, 2. Browser language, 3. Default
      const storedLang = getLanguageFromStorage();
      const browserLang = detectBrowserLanguage();

      const initialLang = storedLang || browserLang || defaultLanguage;
      setLanguageState(initialLang);
      setIsInitialized(true);
    };

    initializeLanguage();
  }, [defaultLanguage]);

  // Update language and persist to storage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguageToStorage(lang);
  };

  // Translation function with interpolation support
  const t = (key: string, interpolations?: Record<string, string | number>) => {
    let translation = getTranslation(translations, key, language);

    // Handle interpolations like {count}, {amount}, etc.
    if (interpolations) {
      Object.entries(interpolations).forEach(([placeholder, value]) => {
        translation = translation.replace(
          new RegExp(`\\{${placeholder}\\}`, "g"),
          String(value)
        );
      });
    }

    return translation;
  };

  // Don't render until language is initialized to prevent hydration issues
  if (!isInitialized) {
    return null;
  }

  const contextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export default I18nProvider;
