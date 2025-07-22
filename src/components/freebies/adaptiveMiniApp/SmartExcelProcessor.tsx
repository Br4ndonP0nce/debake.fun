// src/components/freebies/miniApp-excel/SmartExcelProcessor.ts
"use client";

// Types and interfaces
export interface ColumnMapping {
  originalName: string;
  displayName: string;
  type:
    | "name"
    | "contact"
    | "status"
    | "category"
    | "priority"
    | "financial"
    | "date"
    | "text"
    | "number"
    | "boolean";
  importance: "high" | "medium" | "low";
  samples: string[];
}

export interface SmartProcessedRecord {
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
  columns: ColumnMapping[];
}

export interface ExcelAnalysis {
  totalRows: number;
  columns: ColumnMapping[];
  dataTypes: Record<string, string>;
  suggestedNameField: string | null;
  suggestedContactFields: string[];
  suggestedStatusField: string | null;
  suggestedPriorityFields: string[];
  suggestedFinancialFields: string[];
  hasValidData: boolean;
  businessType: string;
}

// Main processor class
export class SmartExcelProcessor {
  // Patterns for identifying common field types (multilingual)
  private static FIELD_PATTERNS = {
    name: [
      "name",
      "nombre",
      "nom",
      "cliente",
      "contact",
      "contacto",
      "lead",
      "full name",
      "first name",
      "last name",
      "apellido",
      "usuario",
      "user",
    ],
    email: [
      "email",
      "correo",
      "mail",
      "e-mail",
      "electronic mail",
      "email address",
    ],
    phone: [
      "phone",
      "telefono",
      "teléfono",
      "cel",
      "celular",
      "mobile",
      "móvil",
      "whatsapp",
      "number",
      "numero",
      "número",
      "contact number",
    ],
    status: [
      "status",
      "estado",
      "stage",
      "etapa",
      "phase",
      "fase",
      "condition",
      "condición",
      "situación",
      "situation",
      "level",
      "nivel",
    ],
    investment: [
      "investment",
      "inversión",
      "inversion",
      "budget",
      "presupuesto",
      "capacity",
      "capacidad",
      "money",
      "dinero",
      "funding",
      "financiamiento",
    ],
    business: [
      "business",
      "negocio",
      "company",
      "empresa",
      "industry",
      "industria",
      "sector",
      "giro",
      "tipo",
      "type",
      "category",
      "categoría",
    ],
    financial: [
      "price",
      "precio",
      "cost",
      "costo",
      "amount",
      "cantidad",
      "total",
      "value",
      "valor",
      "revenue",
      "ingreso",
      "payment",
      "pago",
      "monto",
    ],
    date: [
      "date",
      "fecha",
      "time",
      "tiempo",
      "created",
      "creado",
      "updated",
      "actualizado",
      "modified",
      "modificado",
    ],
  };

  // Status value patterns for priority scoring
  private static STATUS_PATTERNS = {
    high: [
      "venta",
      "sale",
      "sold",
      "vendido",
      "comprado",
      "purchased",
      "paid",
      "pagado",
      "active",
      "activo",
      "cliente",
      "customer",
      "converted",
      "convertido",
      "closed won",
      "ganado",
    ],
    medium: [
      "onboarding",
      "en proceso",
      "processing",
      "procesando",
      "qualified",
      "calificado",
      "interested",
      "interesado",
      "warm",
      "tibio",
      "engaged",
      "comprometido",
      "follow up",
      "seguimiento",
    ],
    low: [
      "lead",
      "nuevo",
      "new",
      "cold",
      "frío",
      "prospect",
      "prospecto",
      "unqualified",
      "no calificado",
      "pending",
      "pendiente",
      "contacted",
      "contactado",
    ],
  };

  // Investment/capacity patterns for priority scoring
  private static INVESTMENT_PATTERNS = {
    high: [
      "sí",
      "yes",
      "si",
      "claro",
      "sure",
      "definitely",
      "definitivamente",
      "tengo",
      "have",
      "cuento con",
      "dispuesto",
      "ready",
      "listo",
    ],
    medium: [
      "puedo conseguir",
      "can get",
      "maybe",
      "tal vez",
      "quizás",
      "perhaps",
      "semana",
      "week",
      "mes",
      "month",
      "pronto",
      "soon",
    ],
    low: [
      "no",
      "not",
      "dont",
      "don't",
      "cannot",
      "can't",
      "definitivamente no",
      "definitely not",
      "sin dinero",
      "no money",
      "broke",
    ],
  };

  static analyzeExcelStructure(data: any[]): ExcelAnalysis {
    if (data.length < 2) {
      return {
        totalRows: 0,
        columns: [],
        dataTypes: {},
        suggestedNameField: null,
        suggestedContactFields: [],
        suggestedStatusField: null,
        suggestedPriorityFields: [],
        suggestedFinancialFields: [],
        hasValidData: false,
        businessType: "Unknown",
      };
    }

    const headers = data[0] as string[];
    const rows = data.slice(1);
    const validRows = rows.filter((row: any[]) =>
      row.some(
        (cell: any) =>
          cell !== null && cell !== undefined && cell !== "" && cell !== "-"
      )
    );

    // Analyze each column
    const columns: ColumnMapping[] = headers.map((header, index) => {
      const values = validRows
        .map((row) => row[index])
        .filter((v) => v !== null && v !== undefined && v !== "" && v !== "-")
        .slice(0, 10); // Sample first 10 non-empty values

      const type = this.detectColumnType(header, values);
      const importance = this.determineImportance(header, type, values);

      return {
        originalName: header,
        displayName: this.generateDisplayName(header, type),
        type,
        importance,
        samples: values.slice(0, 5).map((v) => String(v)),
      };
    });

    // Find suggested fields
    const nameFields = columns.filter((c) => c.type === "name");
    const contactFields = columns.filter((c) => c.type === "contact");
    const statusFields = columns.filter((c) => c.type === "status");
    const priorityFields = columns.filter(
      (c) =>
        c.type === "status" ||
        c.originalName.toLowerCase().includes("inversión") ||
        c.originalName.toLowerCase().includes("investment") ||
        c.originalName.toLowerCase().includes("capacidad")
    );
    const financialFields = columns.filter((c) => c.type === "financial");

    // Determine business type based on column names
    const businessType = this.detectBusinessType(headers);

    return {
      totalRows: validRows.length,
      columns,
      dataTypes: this.analyzeDataTypes(headers, validRows),
      suggestedNameField: nameFields[0]?.originalName || null,
      suggestedContactFields: contactFields.map((c) => c.originalName),
      suggestedStatusField: statusFields[0]?.originalName || null,
      suggestedPriorityFields: priorityFields.map((c) => c.originalName),
      suggestedFinancialFields: financialFields.map((c) => c.originalName),
      hasValidData: validRows.length > 0,
      businessType,
    };
  }

  private static detectColumnType(
    header: string,
    values: any[]
  ): ColumnMapping["type"] {
    const lowerHeader = header.toLowerCase();

    // Check patterns
    for (const [type, patterns] of Object.entries(this.FIELD_PATTERNS)) {
      if (patterns.some((pattern) => lowerHeader.includes(pattern))) {
        if (type === "email" || type === "phone") return "contact";
        return type as ColumnMapping["type"];
      }
    }

    // Analyze values to determine type
    if (values.length === 0) return "text";

    const sampleValues = values.slice(0, 5);

    // Check if it's a boolean
    const booleanWords = ["sí", "no", "yes", "true", "false", "si"];
    if (
      sampleValues.every((v) => booleanWords.includes(String(v).toLowerCase()))
    ) {
      return "boolean";
    }

    // Check if it's a number
    if (sampleValues.every((v) => !isNaN(Number(v)) && v !== "")) {
      return "number";
    }

    // Check if it's a date
    if (sampleValues.some((v) => this.isDateLike(String(v)))) {
      return "date";
    }

    // Check if it looks like email
    if (sampleValues.some((v) => String(v).includes("@"))) {
      return "contact";
    }

    // Check if it looks like phone
    if (sampleValues.some((v) => /[\+\d\(\)\-\s]{7,}/.test(String(v)))) {
      return "contact";
    }

    return "text";
  }

  private static isDateLike(value: string): boolean {
    // Check various date formats
    const datePatterns = [
      /\d{1,2}\/\d{1,2}\/\d{4}/,
      /\d{4}-\d{1,2}-\d{1,2}/,
      /\d{1,2}-\d{1,2}-\d{4}/,
    ];
    return datePatterns.some((pattern) => pattern.test(value));
  }

  private static determineImportance(
    header: string,
    type: ColumnMapping["type"],
    values: any[]
  ): "high" | "medium" | "low" {
    const lowerHeader = header.toLowerCase();

    // High importance fields
    if (type === "name" || type === "contact") return "high";
    if (lowerHeader.includes("estado") || lowerHeader.includes("status"))
      return "high";
    if (lowerHeader.includes("inversión") || lowerHeader.includes("investment"))
      return "high";

    // Medium importance
    if (type === "financial" || type === "status" || type === "date")
      return "medium";

    // Check if values seem important (high variation, meaningful content)
    if (values.length > 0) {
      const uniqueValues = new Set(values.map((v) => String(v).toLowerCase()));
      if (uniqueValues.size > 1 && uniqueValues.size < values.length * 0.8) {
        return "medium";
      }
    }

    return "low";
  }

  private static generateDisplayName(
    originalName: string,
    type: ColumnMapping["type"]
  ): string {
    // Clean up the original name and make it more presentable
    let display = originalName
      .replace(/[_-]/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim();

    // Add emoji based on type
    const typeEmojis = {
      name: "👤",
      contact: "📧",
      status: "📊",
      category: "🏷️",
      priority: "⭐",
      financial: "💰",
      date: "📅",
      text: "📝",
      number: "🔢",
      boolean: "✅",
    };

    return `${typeEmojis[type] || "📄"} ${display}`;
  }

  private static detectBusinessType(headers: string[]): string {
    const allHeaders = headers.join(" ").toLowerCase();

    if (
      allHeaders.includes("edición") ||
      allHeaders.includes("video") ||
      allHeaders.includes("software")
    ) {
      return "Curso de Edición de Video";
    }
    if (allHeaders.includes("marketing") || allHeaders.includes("agencia")) {
      return "Marketing Digital";
    }
    if (allHeaders.includes("ecommerce") || allHeaders.includes("tienda")) {
      return "E-commerce";
    }
    if (allHeaders.includes("curso") || allHeaders.includes("estudiante")) {
      return "Educación Online";
    }
    if (allHeaders.includes("cliente") || allHeaders.includes("venta")) {
      return "CRM de Ventas";
    }

    return "Negocio General";
  }

  private static analyzeDataTypes(
    headers: string[],
    rows: any[]
  ): Record<string, string> {
    const types: Record<string, string> = {};

    headers.forEach((header, index) => {
      const values = rows
        .map((row) => row[index])
        .filter((v) => v !== null && v !== undefined && v !== "");

      if (values.length === 0) {
        types[header] = "empty";
        return;
      }

      const sample = values[0];
      if (typeof sample === "number") {
        types[header] = "number";
      } else if (typeof sample === "boolean") {
        types[header] = "boolean";
      } else if (this.isDateLike(String(sample))) {
        types[header] = "date";
      } else {
        types[header] = "text";
      }
    });

    return types;
  }

  static processExcelData(
    rawData: any[],
    analysis: ExcelAnalysis
  ): SmartProcessedRecord[] {
    const headers = rawData[0] as string[];
    const rows = rawData.slice(1);

    const validRows = rows.filter((row: any[]) =>
      row.some(
        (cell: any) =>
          cell !== null && cell !== undefined && cell !== "" && cell !== "-"
      )
    );

    return validRows.map((row, index) => {
      // Create object from row data
      const rowData: Record<string, any> = {};
      headers.forEach((header, headerIndex) => {
        rowData[header] = row[headerIndex];
      });

      // Extract key fields
      const name = this.extractName(rowData, analysis);
      const contacts = this.extractContacts(rowData, analysis);
      const status = this.extractStatus(rowData, analysis);
      const category = this.extractCategory(rowData, analysis);
      const financial = this.extractFinancialValue(rowData, analysis);
      const priority = this.calculatePriority(rowData, analysis);

      return {
        id: `record_${index + 1}`,
        displayName: name || `Registro ${index + 1}`,
        primaryContact: contacts.primary || "",
        secondaryContact: contacts.secondary || "",
        status: status || "Sin Estado",
        category: category || analysis.businessType,
        priority: priority.score,
        priorityLevel: priority.level,
        priorityReason: priority.reason,
        financialValue: financial,
        createdAt: this.extractDate(rowData, analysis) || new Date(),
        rawData: rowData,
        columns: analysis.columns,
      };
    });
  }

  private static extractName(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): string {
    if (analysis.suggestedNameField) {
      return String(data[analysis.suggestedNameField] || "");
    }

    // Fallback: find first non-empty text field
    for (const column of analysis.columns) {
      if (column.type === "name" || column.type === "text") {
        const value = data[column.originalName];
        if (value && String(value).trim()) {
          return String(value);
        }
      }
    }

    return "";
  }

  private static extractContacts(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): { primary: string; secondary: string } {
    const contacts = analysis.suggestedContactFields
      .map((field) => data[field])
      .filter((value) => value && String(value).trim())
      .map((value) => String(value));

    return {
      primary: contacts[0] || "",
      secondary: contacts[1] || "",
    };
  }

  private static extractStatus(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): string {
    if (analysis.suggestedStatusField) {
      return String(data[analysis.suggestedStatusField] || "");
    }

    // Look for status-like fields
    for (const column of analysis.columns) {
      if (column.type === "status") {
        const value = data[column.originalName];
        if (value) {
          return String(value);
        }
      }
    }

    return "";
  }

  private static extractCategory(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): string {
    // Look for category-like fields
    for (const column of analysis.columns) {
      if (
        column.type === "category" ||
        column.originalName.toLowerCase().includes("tipo") ||
        column.originalName.toLowerCase().includes("nivel") ||
        column.originalName.toLowerCase().includes("rol")
      ) {
        const value = data[column.originalName];
        if (value && String(value).trim() && String(value) !== "-") {
          return String(value);
        }
      }
    }

    return "";
  }

  private static extractFinancialValue(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): number | null {
    for (const field of analysis.suggestedFinancialFields) {
      const value = data[field];
      if (typeof value === "number" && value > 0) {
        return value;
      }
      if (
        typeof value === "string" &&
        !isNaN(Number(value)) &&
        Number(value) > 0
      ) {
        return Number(value);
      }
    }
    return null;
  }

  private static extractDate(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): Date | null {
    for (const column of analysis.columns) {
      if (column.type === "date") {
        const value = data[column.originalName];
        if (value) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }
      }
    }
    return null;
  }

  private static calculatePriority(
    data: Record<string, any>,
    analysis: ExcelAnalysis
  ): { score: number; level: "high" | "medium" | "low"; reason: string } {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Check status field
    const status = this.extractStatus(data, analysis).toLowerCase();
    for (const [level, patterns] of Object.entries(this.STATUS_PATTERNS)) {
      if (patterns.some((pattern) => status.includes(pattern))) {
        if (level === "high") {
          score += 40;
          reasons.push("Estado indica venta/cliente activo");
        } else if (level === "medium") {
          score += 20;
          reasons.push("Estado indica interés/proceso");
        } else {
          score += 5;
          reasons.push("Lead nuevo");
        }
        break;
      }
    }

    // Check investment/capacity fields
    for (const field of analysis.suggestedPriorityFields) {
      const value = String(data[field] || "").toLowerCase();
      for (const [level, patterns] of Object.entries(
        this.INVESTMENT_PATTERNS
      )) {
        if (patterns.some((pattern) => value.includes(pattern))) {
          if (level === "high") {
            score += 30;
            reasons.push("Tiene capacidad de inversión");
          } else if (level === "medium") {
            score += 15;
            reasons.push("Puede conseguir inversión");
          } else {
            score -= 10;
            reasons.push("Sin capacidad de inversión");
          }
          break;
        }
      }
    }

    // Check financial value
    const financial = this.extractFinancialValue(data, analysis);
    if (financial && financial > 0) {
      score += 20;
      reasons.push(`Valor financiero: ${financial}`);
    }

    // Check contact information quality
    const contacts = this.extractContacts(data, analysis);
    if (contacts.primary.includes("@")) {
      score += 10;
      reasons.push("Email válido");
    }
    if (contacts.secondary.includes("+") || contacts.secondary.length > 7) {
      score += 10;
      reasons.push("Teléfono válido");
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    // Determine level
    let level: "high" | "medium" | "low";
    if (score >= 80) level = "high";
    else if (score >= 50) level = "medium";
    else level = "low";

    return {
      score,
      level,
      reason: reasons.join(", ") || "Análisis automático basado en datos",
    };
  }
}
