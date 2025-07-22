// src/components/ui/I18nTest.tsx - Add this temporarily to test
"use client";

import React from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";

const I18nTest: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <div className="text-sm space-y-2">
        <div>
          <strong>Current Language:</strong> {language}
        </div>
        <div>
          <strong>Home:</strong> {t("common.home")}
        </div>
        <div>
          <strong>Contact:</strong> {t("common.contact")}
        </div>
        <div>
          <strong>Excel Title:</strong> {t("excel.title")}
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant={language === "en" ? "default" : "outline"}
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            size="sm"
            variant={language === "es" ? "default" : "outline"}
            onClick={() => setLanguage("es")}
          >
            ES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default I18nTest;
