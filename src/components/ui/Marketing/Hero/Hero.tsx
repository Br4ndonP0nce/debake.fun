"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";
import DecryptedText from "../../animated/DecryptedText";
import Link from "next/link";
import {
  Code2,
  Zap,
  ArrowRight,
  Github,
  Sparkles,
  Terminal,
  Coffee,
  Cpu,
  Database,
  FileSpreadsheet,
  Globe,
} from "lucide-react";

const DebakeHero = () => {
  const [currentTool, setCurrentTool] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { t, language } = useI18n();

  // Get tools array from translations
  const tools = [
    t("hero.tool1") || "Excel Transformer",
    t("hero.tool2") || "API Debugger",
    t("hero.tool3") || "Data Visualizer",
    t("hero.tool4") || "Workflow Automator",
  ];

  // Since your translations have features as an array, we need to access them differently
  // Let's create the features array directly in the component
  const features = [
    {
      icon: <FileSpreadsheet className="h-5 w-5" />,
      title: language === "en" ? "Excel → CRM Magic" : "Excel → Magia CRM",
      description:
        language === "en"
          ? "Transform ugly spreadsheets into organized lead data"
          : "Transforma hojas de cálculo feas en datos organizados",
      status: language === "en" ? "🔥 Hot" : "🔥 Trending",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: language === "en" ? "API Stress Tester" : "Estresador de APIs",
      description:
        language === "en"
          ? "Break your APIs before your users do"
          : "Rompe tus APIs antes que lo hagan tus usuarios",
      status: language === "en" ? "🚧 Building" : "🚧 Construyendo",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: language === "en" ? "Data Playground" : "Playground de Datos",
      description:
        language === "en"
          ? "Visualize any dataset in seconds"
          : "Visualiza cualquier dataset en segundos",
      status: language === "en" ? "💭 Ideating" : "💭 Ideando",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentTool((prev) => (prev + 1) % tools.length);
        setIsTyping(true);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [tools.length]);

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white overflow-hidden">
      {/* Circuit Board Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.15) 19px, rgba(34, 197, 94, 0.15) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.15) 39px, rgba(34, 197, 94, 0.15) 40px),
            radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.18) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.18) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Code2 className="h-8 w-8 text-green-400/30" />
      </div>
      <div
        className="absolute top-32 right-16 animate-bounce"
        style={{ animationDelay: "1s" }}
      >
        <Terminal className="h-6 w-6 text-emerald-400/40" />
      </div>
      <div
        className="absolute bottom-32 left-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      >
        <Cpu className="h-10 w-10 text-green-300/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center mt-30 md:mt-0 pb-5">
        {/* Header Badge */}
        <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 mr-2" />
          {t("hero.badge")}
        </Badge>

        {/* Main Headline */}
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent leading-tight">
            <DecryptedText
              key={`title-${language}`} // Force re-render on language change
              text="debake.fun"
              animateOn="view"
              speed={30}
              sequential={true}
              revealDirection="start"
              className="bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent"
              encryptedClassName="text-green-500/70"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
            />
          </h1>

          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-gray-300">
            <DecryptedText
              key={`subtitle-${language}`} // Force re-render on language change
              text={t("hero.subtitle")}
              animateOn="view"
              speed={50}
              sequential={true}
              revealDirection="start"
              className="text-gray-300"
              encryptedClassName="text-green-400/60"
            />
            <div className="relative h-10 w-auto min-w-[200px] max-w-[400px]">
              <span
                className={`absolute left-0 top-0 transition-all duration-300 whitespace-nowrap ${
                  isTyping
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0"
                }`}
              >
                <span className="text-green-400 font-mono font-bold text-xl md:text-2xl">
                  {tools && tools[currentTool]
                    ? tools[currentTool]
                    : "Loading..."}
                </span>
              </span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            <DecryptedText
              key={`description-${language}`} // Force re-render on language change
              text={t("hero.description")}
              animateOn="view"
              speed={15}
              sequential={true}
              revealDirection="start"
              className="text-gray-400"
              encryptedClassName="text-green-500/40"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+.,;:'"
            />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/freebies/youruglyexcelhere">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg group"
            >
              <FileSpreadsheet className="h-5 w-5 mr-2" />
              <DecryptedText
                key={`primary-cta-${language}`} // Force re-render on language change
                text={t("hero.primaryCTA")}
                animateOn="hover"
                speed={30}
                sequential={true}
                className="text-black font-semibold"
                encryptedClassName="text-black/70 font-semibold"
              />
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="border-green-500/50 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg"
          >
            <Github className="h-5 w-5 mr-2" />
            <DecryptedText
              key={`secondary-cta-${language}`} // Force re-render on language change
              text={t("hero.secondaryCTA")}
              animateOn="hover"
              speed={30}
              sequential={true}
              className="text-green-300"
              encryptedClassName="text-green-500/60"
            />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={`${index}-${language}`} // Add language to key for re-render
              className="group bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:border-green-400/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-400 group-hover:bg-green-500/30 transition-colors">
                  {feature.icon}
                </div>
                <Badge
                  variant="outline"
                  className="text-xs border-green-500/30 text-green-300"
                >
                  {feature.status}
                </Badge>
              </div>

              <h3 className="font-semibold text-white mb-2 group-hover:text-green-200 transition-colors">
                <DecryptedText
                  key={`feature-title-${index}-${language}`} // Force re-render on language change
                  text={feature.title}
                  animateOn="view"
                  speed={40}
                  sequential={true}
                  className="font-semibold text-white group-hover:text-green-200 transition-colors"
                  encryptedClassName="font-semibold text-green-400/70"
                />
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                <DecryptedText
                  key={`feature-desc-${index}-${language}`} // Force re-render on language change
                  text={feature.description}
                  animateOn="view"
                  speed={20}
                  sequential={true}
                  className="text-gray-400 text-sm leading-relaxed"
                  encryptedClassName="text-green-500/50 text-sm leading-relaxed"
                />
              </p>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 flex items-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <DecryptedText
              key={`footer-caffeine-${language}`} // Force re-render on language change
              text={t("hero.footer.caffeine")}
              animateOn="view"
              speed={25}
              className="text-gray-500 text-sm"
              encryptedClassName="text-green-500/40 text-sm"
            />
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <DecryptedText
              key={`footer-chaos-${language}`} // Force re-render on language change
              text={t("hero.footer.chaos")}
              animateOn="view"
              speed={25}
              className="text-gray-500 text-sm"
              encryptedClassName="text-green-500/40 text-sm"
            />
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <DecryptedText
              key={`footer-author-${language}`} // Force re-render on language change
              text={t("hero.footer.author")}
              animateOn="view"
              speed={25}
              className="text-gray-500 text-sm"
              encryptedClassName="text-green-500/40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
};

export default DebakeHero;
