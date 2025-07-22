// src/components/freebies/miniApp-excel/SmartExcelUploader.tsx
"use client";

import React, { useState, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Download,
  Brain,
  CheckCircle,
  Upload,
  FileSpreadsheet,
  Zap,
  Terminal,
  Database,
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";

interface SmartExcelUploaderProps {
  onDataProcessed: (records: any[]) => void;
  onAnalysisComplete: (analysis: any) => void;
  onError: (error: string) => void;
}

const SmartExcelUploader: React.FC<SmartExcelUploaderProps> = ({
  onDataProcessed,
  onAnalysisComplete,
  onError,
}) => {
  const { t, language } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const processExcelData = async (file: File) => {
    try {
      setProcessing(true);

      // Dynamically import xlsx and our processor
      const XLSX = await import("xlsx");
      const { SmartExcelProcessor } = await import("./SmartExcelProcessor");

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, {
        cellStyles: true,
        cellFormula: true,
        cellDates: true,
        cellNF: true,
        sheetStubs: true,
      });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length < 2) {
        throw new Error(t("excel.upload.error"));
      }

      // Analyze the structure using our smart processor
      console.log("🔍 Analyzing Excel structure...");
      const excelAnalysis = SmartExcelProcessor.analyzeExcelStructure(jsonData);

      if (!excelAnalysis.hasValidData) {
        throw new Error(t("excel.upload.error"));
      }

      console.log("📊 Analysis complete:", excelAnalysis);
      setAnalysis(excelAnalysis);
      onAnalysisComplete(excelAnalysis);

      // Process the data using smart logic
      console.log("⚡ Processing data with smart algorithms...");
      const processedRecords = SmartExcelProcessor.processExcelData(
        jsonData,
        excelAnalysis
      );

      // Sort by priority (highest first)
      processedRecords.sort((a, b) => b.priority - a.priority);

      console.log(
        "✅ Processing complete:",
        processedRecords.length,
        "records"
      );
      onDataProcessed(processedRecords);
    } catch (error) {
      console.error("❌ Error processing Excel:", error);
      onError(error instanceof Error ? error.message : t("excel.upload.error"));
    } finally {
      setProcessing(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (
          file.type.includes("sheet") ||
          file.name.endsWith(".xlsx") ||
          file.name.endsWith(".xls")
        ) {
          setFile(file);
          processExcelData(file);
        } else {
          onError(t("excel.upload.error"));
        }
      }
    },
    [onError, t]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      processExcelData(file);
    }
  };

  const downloadSampleExcel = () => {
    const sampleData = [
      [
        t("common.name"),
        t("common.email"),
        t("common.phone"),
        t("common.status"),
        t("common.businessType"),
        t("excel.upload.investment"),
        t("common.description"),
        t("common.createdAt"),
      ],
      [
        "María González",
        "maria@ejemplo.com",
        "+52 55 1234 5678",
        "Nuevo Lead",
        "Agencia de Marketing",
        "Sí, cuento con la inversión",
        "Tenemos 15 clientes y queremos escalar",
        "2025-01-15",
      ],
      [
        "Carlos Mendoza",
        "carlos@tienda.com",
        "+52 33 9876 5432",
        "En Proceso",
        "E-commerce",
        "Puedo conseguir la inversión en una semana",
        "Vendemos productos tecnológicos online",
        "2025-01-14",
      ],
    ];

    const worksheet = window.XLSX?.utils.aoa_to_sheet(sampleData);
    const workbook = window.XLSX?.utils.book_new();
    window.XLSX?.utils.book_append_sheet(workbook, worksheet, "Leads");
    window.XLSX?.writeFile(workbook, "sample_leads.xlsx");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Main Upload Card - Dark Cyberpunk Theme */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl" />
        <div className="absolute inset-0 border border-green-500/20 rounded-2xl backdrop-blur-sm" />

        <div className="relative p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              className="flex items-center justify-center gap-3 "
              whileHover={{ scale: 1.05 }}
            >
              <Brain className="h-10 w-10 text-green-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent">
                {t("excel.title")}
              </h2>
            </motion.div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t("excel.subtitle")}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                ✅ {language === "en" ? "CRM Systems" : "Sistemas CRM"}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                ✅ {t("common.courses")}
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                ✅ E-commerce
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
                ✅ Marketing
              </Badge>
            </div>
          </div>

          {/* Sample Download Section */}
          <motion.div
            className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-6"
            whileHover={{ borderColor: "rgba(34, 197, 94, 0.4)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Download className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-300 text-lg">
                    📥 {t("excel.upload.sampleDownload")}
                  </h3>
                  <p className="text-sm text-blue-400/80">
                    {t("excel.upload.sampleButton")}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={downloadSampleExcel}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium transition-all hover:from-blue-600 hover:to-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4 mr-2 inline" />
                {t("excel.upload.sampleButton")}
              </motion.button>
            </div>
          </motion.div>

          {/* Main Upload Area */}
          <motion.div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-green-400 bg-green-500/10 shadow-lg shadow-green-500/20"
                : "border-green-500/30 hover:border-green-400/60 hover:bg-green-500/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: dragActive ? 1 : 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={processing}
            />

            <div className="space-y-8">
              {processing ? (
                <>
                  {/* Processing State */}
                  <motion.div
                    className="relative mx-auto"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="h-20 w-20 relative">
                      {/* Outer Ring */}
                      <motion.div
                        className="absolute inset-0 border-4 border-green-500/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {/* Inner Spinner */}
                      <motion.div
                        className="absolute inset-2 border-4 border-transparent border-t-green-500 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-green-300">
                      {t("excel.upload.processing")}
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      {t("excel.upload.analyzing")}
                    </p>

                    {/* Processing Steps */}
                    <div className="flex justify-center space-x-2 mt-6">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-green-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : file ? (
                <>
                  {/* Success State */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-400" />
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-green-300">
                      {t("excel.upload.completed")}
                    </h3>
                    <p className="text-green-400 font-mono text-lg">
                      {file.name}
                    </p>
                    {analysis && (
                      <motion.div
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              {t("common.records")}:
                            </span>
                            <span className="text-green-300 font-mono">
                              {analysis.totalRows}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              {language === "en" ? "Type" : "Tipo"}:
                            </span>
                            <span className="text-green-300">
                              {analysis.businessType}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Default Upload State */}
                  <motion.div
                    className="space-y-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-20 w-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <FileSpreadsheet className="h-10 w-10 text-green-400" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white">
                        {t("excel.upload.title")}
                      </h3>
                      <p className="text-gray-400 text-lg">
                        {t("excel.upload.subtitle")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("excel.upload.formats")}
                      </p>
                    </div>

                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Upload className="h-5 w-5 mr-3 inline" />
                      {t("common.selectFile")}
                    </motion.button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>

          {/* Analysis Results */}
          {analysis && (
            <motion.div
              className="bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-green-300 mb-6 flex items-center text-xl">
                <Zap className="h-5 w-5 mr-3" />
                🔍 {t("excel.upload.analysisComplete")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {t("excel.upload.businessTypeDetected")}
                    </div>
                    <div className="font-mono text-green-400 text-lg">
                      {analysis.businessType}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {t("excel.upload.validRecords")}
                    </div>
                    <div className="font-mono text-green-400 text-lg">
                      {analysis.totalRows} {t("common.records")}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {t("excel.upload.fieldsDetected")}
                    </div>
                    <div className="font-mono text-blue-400 text-lg">
                      {analysis.columns.length} {t("common.columns")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {t("excel.upload.importantFields")}
                    </div>
                    <div className="font-mono text-amber-400 text-lg">
                      {
                        analysis.columns.filter(
                          (c: any) => c.importance === "high"
                        ).length
                      }{" "}
                      {t("common.critical")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Fields Detected */}
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <div className="text-sm text-gray-500 mb-3">
                  🎯 {t("excel.upload.keyFieldsIdentified")}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedNameField && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                      👤 {analysis.suggestedNameField}
                    </Badge>
                  )}
                  {analysis.suggestedContactFields
                    .slice(0, 2)
                    .map((field: string) => (
                      <Badge
                        key={field}
                        className="bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                      >
                        📞 {field}
                      </Badge>
                    ))}
                  {analysis.suggestedStatusField && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                      📊 {analysis.suggestedStatusField}
                    </Badge>
                  )}
                  {analysis.suggestedFinancialFields
                    .slice(0, 1)
                    .map((field: string) => (
                      <Badge
                        key={field}
                        className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs"
                      >
                        💰 {field}
                      </Badge>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Notice */}
          <div className="text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              🔒 {t("excel.upload.privacy")}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartExcelUploader; // src/components/freebies/miniApp-excel/SmartExcelUploader.tsx
