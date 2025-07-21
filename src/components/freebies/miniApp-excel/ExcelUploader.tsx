// src/components/freebie/ExcelUploader.tsx (Updated with i18n)
"use client";

import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import {
  Upload,
  FileSpreadsheet,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  Sparkles,
} from "lucide-react";

interface ExcelUploaderProps {
  onDataProcessed: (leads: ProcessedLead[]) => void;
  onError: (error: string) => void;
}

export interface ProcessedLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  investmentLevel: "high" | "medium" | "low";
  investmentText: string;
  businessDescription: string;
  status: "lead" | "onboarding" | "sale" | "rejected";
  priority: number;
  createdAt: Date;
  rawData: Record<string, any>;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({
  onDataProcessed,
  onError,
}) => {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Business type mapping (multilingual)
  const mapBusinessType = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("agencia") || lowerText.includes("marketing"))
      return "Agencia de Marketing Digital";
    if (lowerText.includes("ecommerce") || lowerText.includes("tienda"))
      return "E-commerce / Tienda Online";
    if (lowerText.includes("saas") || lowerText.includes("software"))
      return "Software / SaaS / Tecnología";
    if (lowerText.includes("consultor") || lowerText.includes("servicios"))
      return "Consultoría / Servicios Profesionales";
    if (lowerText.includes("inmobiliaria") || lowerText.includes("bienes"))
      return "Bienes Raíces / Inmobiliaria";
    if (lowerText.includes("educación") || lowerText.includes("curso"))
      return "Educación / Cursos Online";
    if (lowerText.includes("salud") || lowerText.includes("médico"))
      return "Salud / Medicina / Wellness";
    if (lowerText.includes("restaurante") || lowerText.includes("comida"))
      return "Restaurante / Comida";
    if (lowerText.includes("retail") || lowerText.includes("física"))
      return "Retail / Tienda Física";
    if (lowerText.includes("freelancer") || lowerText.includes("independiente"))
      return "Freelancer / Profesional Independiente";
    if (lowerText.includes("startup") || lowerText.includes("emprendimiento"))
      return "Startup / Emprendimiento Nuevo";
    return "Otro Tipo de Negocio";
  };

  // Investment level analysis (multilingual)
  const analyzeInvestment = (
    text: string
  ): { level: "high" | "medium" | "low"; priority: number } => {
    const lowerText = text.toLowerCase();

    // Spanish indicators
    if (
      lowerText.includes("sí") ||
      lowerText.includes("claro") ||
      lowerText.includes("cuento con")
    ) {
      return { level: "high", priority: 90 + Math.random() * 10 };
    }
    if (
      lowerText.includes("puedo conseguir") ||
      lowerText.includes("una semana") ||
      lowerText.includes("pronto")
    ) {
      return { level: "medium", priority: 60 + Math.random() * 20 };
    }

    // English indicators
    if (
      lowerText.includes("yes") ||
      lowerText.includes("have the budget") ||
      lowerText.includes("available")
    ) {
      return { level: "high", priority: 90 + Math.random() * 10 };
    }
    if (
      lowerText.includes("can get") ||
      lowerText.includes("within a week") ||
      lowerText.includes("soon")
    ) {
      return { level: "medium", priority: 60 + Math.random() * 20 };
    }

    return { level: "low", priority: 20 + Math.random() * 30 };
  };

  // Smart field mapping (multilingual)
  const mapFields = (row: Record<string, any>) => {
    const keys = Object.keys(row).map((k) => k.toLowerCase());

    const findField = (patterns: string[]) => {
      for (const pattern of patterns) {
        const key = keys.find((k) => k.includes(pattern));
        if (key) return row[Object.keys(row)[keys.indexOf(key)]];
      }
      return "";
    };

    return {
      name:
        findField(["nombre", "name", "cliente", "contacto", "contact"]) ||
        `Lead ${Math.random().toString(36).substr(2, 5)}`,
      email: findField(["email", "correo", "mail", "e-mail"]) || "",
      phone:
        findField([
          "teléfono",
          "telefono",
          "phone",
          "celular",
          "whatsapp",
          "móvil",
          "mobile",
        ]) || "",
      businessType:
        findField([
          "negocio",
          "business",
          "empresa",
          "tipo",
          "giro",
          "industria",
          "industry",
        ]) || "",
      investment:
        findField([
          "inversión",
          "inversion",
          "presupuesto",
          "budget",
          "dinero",
          "200",
          "investment",
        ]) || "",
      description:
        findField([
          "descripción",
          "descripcion",
          "detalle",
          "porque",
          "why",
          "objetivo",
          "description",
        ]) || "",
      rawData: row,
    };
  };

  const processExcelData = async (file: File) => {
    try {
      setProcessing(true);

      // Dynamically import xlsx
      const XLSX = await import("xlsx");

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

      // Get headers from first row
      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1) as any[][];

      // Convert to objects
      const rawLeads = rows
        .filter((row) =>
          row.some((cell) => cell !== null && cell !== undefined && cell !== "")
        )
        .map((row) => {
          const obj: Record<string, any> = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || "";
          });
          return obj;
        });

      // Process and structure data
      const processedLeads: ProcessedLead[] = rawLeads.map((row, index) => {
        const mapped = mapFields(row);
        const investmentAnalysis = analyzeInvestment(mapped.investment);

        return {
          id: `lead_${index + 1}`,
          name: mapped.name,
          email: mapped.email,
          phone: mapped.phone,
          businessType: mapBusinessType(mapped.businessType),
          investmentLevel: investmentAnalysis.level,
          investmentText: mapped.investment,
          businessDescription: mapped.description,
          status: "lead" as const,
          priority: investmentAnalysis.priority,
          createdAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ), // Random date within last 30 days
          rawData: mapped.rawData,
        };
      });

      // Sort by priority (highest first)
      processedLeads.sort((a, b) => b.priority - a.priority);

      onDataProcessed(processedLeads);
    } catch (error) {
      console.error("Error processing Excel:", error);
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
    // Create sample Excel data based on current language
    const sampleData = [
      [
        "Nombre",
        "Email",
        "Teléfono",
        "Tipo de Negocio",
        "Inversión $200 USD",
        "Descripción del Negocio",
      ],
      [
        "María González",
        "maria@ejemplo.com",
        "+52 55 1234 5678",
        "Agencia de Marketing",
        "Sí, claro, cuento con la inversión",
        "Tenemos 15 clientes y queremos escalar",
      ],
      [
        "Carlos Mendoza",
        "carlos@tienda.com",
        "+52 33 9876 5432",
        "E-commerce",
        "Puedo conseguir la inversión en una semana",
        "Vendemos productos tecnológicos",
      ],
      [
        "Ana Rodríguez",
        "ana@consultora.com",
        "+52 81 5555 1234",
        "Consultoría",
        "No cuento con esa cantidad ahora",
        "Ofrecemos servicios de consultoría empresarial",
      ],
    ];

    const worksheet = window.XLSX?.utils.aoa_to_sheet(sampleData);
    const workbook = window.XLSX?.utils.book_new();
    window.XLSX?.utils.book_append_sheet(workbook, worksheet, "Leads");
    window.XLSX?.writeFile(workbook, "sample_leads.xlsx");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-purple-600" />
          {t("excel.title")}
        </CardTitle>
        <p className="text-gray-600">{t("excel.subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sample Download */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">
                {t("excel.upload.sampleDownload")}
              </h3>
              <p className="text-sm text-blue-700">
                {t("excel.upload.sampleButton")}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSampleExcel}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("excel.upload.sampleButton")}
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={processing}
          />

          <div className="space-y-4">
            {processing ? (
              <>
                <Loader2 className="h-12 w-12 text-purple-600 mx-auto animate-spin" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {t("excel.upload.processing")}
                  </h3>
                  <p className="text-gray-600">{t("excel.upload.analyzing")}</p>
                </div>
              </>
            ) : file ? (
              <>
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    ¡Archivo procesado!
                  </h3>
                  <p className="text-gray-600">{file.name}</p>
                </div>
              </>
            ) : (
              <>
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {t("excel.upload.title")}
                  </h3>
                  <p className="text-gray-600">{t("excel.upload.subtitle")}</p>
                </div>
                <Button variant="outline" className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Archivo
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Supported formats */}
        <div className="text-center">
          <p className="text-sm text-gray-500">{t("excel.upload.formats")}</p>
          <p className="text-xs text-gray-400 mt-1">
            {t("excel.upload.privacy")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUploader;
