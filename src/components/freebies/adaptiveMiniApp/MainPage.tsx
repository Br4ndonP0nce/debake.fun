// src/app/(marketing)/freebies/youruglyexcelhere/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartExcelUploader from "./SmartExcelUploader";
import AdaptiveStats from "./AdaptiveStats";
import AdaptiveTable from "./AdaptiveTable";
import AdaptiveDetailView from "./AdaptiveDetailView";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/useI18n";
import {
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Star,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

type ViewState = "upload" | "overview" | "table" | "detail";

interface SmartProcessedRecord {
  id: string;
  displayName: string;
  primaryContact: string;
  secondaryContact: string;
  status: string;
  category: string;
  priority: number;
  priorityLevel: "high" | "medium" | "low";
  priorityReason: string;
  financialValue: number | null;
  createdAt: Date;
  rawData: Record<string, any>;
}

interface ExcelAnalysis {
  totalRows: number;
  columns: any[];
  businessType: string;
  hasValidData: boolean;
}

const SmartCRMFreebiePage: React.FC = () => {
  const { t, language } = useI18n();
  const [records, setRecords] = useState<SmartProcessedRecord[]>([]);
  const [analysis, setAnalysis] = useState<ExcelAnalysis | null>(null);
  const [selectedRecord, setSelectedRecord] =
    useState<SmartProcessedRecord | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("upload");
  const [error, setError] = useState<string | null>(null);

  const handleDataProcessed = (processedRecords: SmartProcessedRecord[]) => {
    setRecords(processedRecords);
    setCurrentView("overview");
    setError(null);
  };

  const handleAnalysisComplete = (excelAnalysis: ExcelAnalysis) => {
    setAnalysis(excelAnalysis);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRecordSelect = (record: SmartProcessedRecord) => {
    setSelectedRecord(record);
    setCurrentView("detail");
  };

  const handleReset = () => {
    setRecords([]);
    setAnalysis(null);
    setSelectedRecord(null);
    setCurrentView("upload");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Enhanced Circuit Board Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.08) 19px, rgba(34, 197, 94, 0.08) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.08) 39px, rgba(34, 197, 94, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.08) 19px, rgba(34, 197, 94, 0.08) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.08) 39px, rgba(34, 197, 94, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Floating Tech Elements */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Brain className="h-8 w-8 text-green-400/30" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-16"
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Target className="h-6 w-6 text-emerald-400/40" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20"
        animate={{ rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <TrendingUp className="h-10 w-10 text-green-300/20" />
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 py-20 mt-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-12 w-12 text-green-400 hidden md:flex" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent">
                {t("excel.title")}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t("excel.subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">
                      {language === "en"
                        ? "System Error:"
                        : "Error del Sistema:"}
                    </span>
                    {error}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {currentView !== "upload" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-4 sm:px-0"
          >
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                {/* Mobile: Stack vertically, Desktop: Horizontal */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
                  {[
                    {
                      id: "upload",
                      label:
                        language === "en"
                          ? "Excel Analyzed"
                          : "Excel Analizado",
                      icon: CheckCircle,
                      description: analysis
                        ? `${analysis.totalRows} ${t("common.records")} | ${
                            analysis.businessType
                          }`
                        : language === "en"
                        ? "Data processed"
                        : "Datos procesados",
                    },
                    {
                      id: "analysis",
                      label: language === "en" ? "AI Applied" : "IA Aplicada",
                      icon: CheckCircle,
                      description:
                        language === "en"
                          ? "Automatic prioritization completed"
                          : "Priorización automática completada",
                    },
                    {
                      id: "organization",
                      label:
                        language === "en"
                          ? "System Organized"
                          : "Sistema Organizado",
                      icon: CheckCircle,
                      description:
                        language === "en"
                          ? "Professional structure applied"
                          : "Estructura profesional aplicada",
                    },
                  ].map((step, index, array) => {
                    const Icon = step.icon;
                    return (
                      <React.Fragment key={step.id}>
                        <motion.div
                          className="flex items-center gap-3 sm:gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <motion.div
                            className="p-2 sm:p-3 rounded-full bg-green-500 text-black flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-green-200 text-sm sm:text-lg truncate">
                              {step.label}
                            </div>
                            <div className="text-xs sm:text-sm text-green-400 break-words">
                              {step.description}
                            </div>
                          </div>
                        </motion.div>
                        {index < array.length - 1 && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.3, duration: 0.5 }}
                            className="hidden lg:block flex-1 h-0.5 bg-gradient-to-r from-green-500 to-green-400 mx-4"
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {/* Better responsive navigation */}
        {records.length > 0 && (
          <motion.div
            className="mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile: Stack everything vertically */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Tab Navigation - Make it scrollable on mobile */}
              <div className="overflow-x-auto">
                <div className="flex space-x-2 bg-[#0f0f0f]/90 backdrop-blur-md p-2 rounded-xl border border-green-500/20 min-w-max">
                  {[
                    {
                      id: "overview",
                      label: language === "en" ? "Analysis" : "Análisis",
                      icon: Brain,
                      description:
                        language === "en"
                          ? "Automatic insights"
                          : "Insights automáticos",
                    },
                    {
                      id: "table",
                      label:
                        language === "en"
                          ? "Organized Records"
                          : "Registros Organizados",
                      icon: Users,
                      count: records.length,
                      description:
                        language === "en"
                          ? "Smart prioritized"
                          : "Priorizados por Inteligencia",
                    },
                  ].map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setCurrentView(tab.id as ViewState)}
                        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          currentView === tab.id
                            ? "bg-green-500/20 text-green-300 border border-green-500/40"
                            : "text-gray-400 hover:text-green-300 hover:bg-green-500/10"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <div className="text-left min-w-0">
                          <div className="truncate">{tab.label}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {tab.description}
                          </div>
                        </div>
                        {tab.count && (
                          <Badge className="ml-1 sm:ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs flex-shrink-0">
                            {tab.count}
                          </Badge>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Action buttons and info - Stack on mobile */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-3">
                {analysis && (
                  <motion.div
                    className="text-left sm:text-right text-sm order-last sm:order-first"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-green-300 font-medium truncate">
                      {analysis.businessType}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      {analysis.totalRows}{" "}
                      {language === "en"
                        ? "records processed"
                        : "registros procesados"}
                    </div>
                  </motion.div>
                )}

                {/* Button container - responsive layout */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="border-green-500/30 text-green-600 hover:bg-green-500/10 hover:border-green-400/50 hover:text-white w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{t("common.newExcel")}</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <a
                      href="https://leads.decodenext.dev/join"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="block w-full sm:w-auto"
                    >
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold w-full sm:w-auto text-xs sm:text-sm"
                      >
                        <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {t("common.completeCRM")}
                        </span>
                      </Button>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Content Views */}
        <AnimatePresence mode="wait">
          {currentView === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <SmartExcelUploader
                onDataProcessed={handleDataProcessed}
                onAnalysisComplete={handleAnalysisComplete}
                onError={handleError}
              />

              {/* Enhanced Features Preview */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {[
                  {
                    icon: Target,
                    title:
                      language === "en"
                        ? "Smart Prioritization"
                        : "Priorización Inteligente",
                    description:
                      language === "en"
                        ? "We process your data to deliver only what matters and boost your conversions"
                        : "Procesamos tus datos para entregarte solo lo que te sirve e incrementar tus conversiones",
                    color: "text-blue-400",
                  },
                  {
                    icon: TrendingUp,
                    title:
                      language === "en"
                        ? "Professional Insights"
                        : "Insights Profesionales",
                    description:
                      language === "en"
                        ? "Transform chaotic data into functional analysis that helps you make decisions"
                        : "Transforma datos caóticos en análisis funcionales que te ayudan a tomar decisiones",
                    color: "text-purple-400",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={`${feature.title}-${language}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="text-center p-8 bg-white/5 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
                      <motion.div
                        className={`h-16 w-16 mx-auto mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="h-full w-full" />
                      </motion.div>
                      <h3 className="font-bold text-white mb-3 text-xl group-hover:text-green-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "overview" && analysis && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <AdaptiveStats records={records} analysis={analysis} />
            </motion.div>
          )}

          {currentView === "table" && analysis && (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <AdaptiveTable
                records={records}
                analysis={analysis}
                onRecordSelect={handleRecordSelect}
              />
            </motion.div>
          )}

          {currentView === "detail" && selectedRecord && analysis && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <AdaptiveDetailView
                record={selectedRecord}
                analysis={analysis}
                onBack={() => setCurrentView("table")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced CTA Section */}
      <AnimatePresence>
        {records.length > 0 && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative z-10 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm border-t border-green-500/20 py-20 mt-20"
          >
            <div className="container mx-auto px-4 text-center space-y-8">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="h-10 w-10 text-yellow-400 fill-current hidden md:flex" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                  {language === "en"
                    ? "Do you want more like this for your business?"
                    : "¿Quieres algo así para tu negocio?"}
                </h2>
              </motion.div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {language === "en"
                  ? `You just saw our system automatically adapt to your ${analysis.businessType}. This is only 5% of what our complete CRM can do. Imagine this level of automatic intelligence applied to your entire business.`
                  : `Acabas de ver nuestro sistema adaptarse automáticamente a tu ${analysis.businessType}. Esto es solo el 5% de lo que puede hacer nuestro CRM completo. Imagina este nivel de inteligencia automática aplicado a todo tu negocio.`}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                {[
                  language === "en"
                    ? "🤖 Total Automation"
                    : "🤖 Automatización Total",
                  language === "en"
                    ? "🧠 Advanced Predictive Systems"
                    : "🧠 Sistemas predictivos avanzados",
                  language === "en"
                    ? "📱 WhatsApp/Email Integrations"
                    : "📱 Integraciones WhatsApp/Email",
                  language === "en"
                    ? "📊 Executive Reports"
                    : "📊 Reportes Ejecutivos",
                  language === "en"
                    ? "💰 Sales Prediction"
                    : "💰 Predicción de Ventas",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-6 py-3 text-lg font-medium">
                      {feature}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center items-center mt-12 px-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://leads.decodenext.dev/join"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-6 text-sm md:text-base text-center whitespace-normal leading-snug w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] min-h-[80px] flex flex-col items-center justify-center gap-3"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span className="break-words hyphens-auto">
                        {language === "en"
                          ? "CLICK HERE ANSWER THE FORM AND RECEIVE AN EXCLUSIVE OFFER"
                          : "HAZ CLIC AQUÍ RESPONDE EL FORMULARIO Y RECIBE UNA OFERTA EXCLUSIVA"}
                      </span>
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SmartCRMFreebiePage;
