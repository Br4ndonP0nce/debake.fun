// src/hooks/useI18n.ts
"use client";

import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, interpolations?: Record<string, string | number>) => string;
}

// Your existing translations (keeping them as they are)
export const translations = {
  en: {
    // Hero Section
    hero: {
      badge: "debake.fun v2.0 - Now with more chaos",
      subtitle: "Where I bake",
      description: "Here i show you how my clients' tools work, so you can use them in your business.",
      primaryCTA: "Try lead transformer",
      secondaryCTA: "Browse All Tools",
      tool1: "Excel Transformer",
      tool2: "API Debugger",
      tool3: "Data Visualizer", 
      tool4: "Workflow Automator",
      features: [
        {
          title: "Excel → CRM Magic",
          description: "Transform ugly spreadsheets into organized lead data",
          status: "🔥 Hot"
        },
        {
          title: "API Stress Tester",
          description: "Break your APIs before your users do",
          status: "🚧 Building"
        },
        {
          title: "Data Playground",
          description: "Visualize any dataset in seconds",
          status: "💭 Ideating"
        }
      ],
      footer: {
        caffeine: "Fueled by caffeine",
        chaos: "Built with chaos",
          author: "By DecodeBrandon",
        footerCaption:"I build tools that solve real problems. No boring corporate BS, just pure functional stuff",
      }
    },
    
    // Excel Freebie Section
    excel: {
      title: "Build a CRM",
      subtitle: "Upload ANY Excel and watch our tech transform it into professional intelligence about your clients",
      upload: {
        title: "Drag your Excel here",
        subtitle: "or click to select file",
        processing: "Analyzing your Excel...",
        analyzing: "Our system is automatically identifying the structure",
        formats: "Any Excel format (.xlsx, .xls) works",
        privacy: "Dont worry, everything is processed in your browser - We don't store any of your file",
        sampleDownload: "Don't have an Excel handy?",
        sampleButton: "Download Example",
        dragActive: "Drop your Excel file here...",
        error: "Please select a valid Excel file (.xlsx or .xls)",
        completed: "File Processed!",
        analysisComplete: "Automatic Analysis Completed",
        businessTypeDetected: "Business Type Detected",
        validRecords: "Valid Records",
        fieldsDetected: "Fields Detected",
        importantFields: "Important Fields",
        keyFieldsIdentified: "Key Fields Identified",
        investment: "Investment Capacity"
      },
      stats: {
        title: "Automatic Intelligent Analysis",
        subtitle: "Your {businessType} transformed into professional insights",
        totalRecords: "Total Records",
        highPriority: "High Priority",
        potentialValue: "Potential Value",
        conversionPotential: "Conversion Potential",
        readyToBuy: "🔥 Maximum priority",
        basedOnInvestment: "Smart estimate",
        estimatedProbability: "Automatic analysis",
        priorityBreakdown: "Priority Breakdown",
        specificInsights: "Specific Insights for {businessType}",
        immediateRecommendation: "🎯 Immediate Recommendation:",
        opportunityDetected: "💡 Opportunity Detected:",
        highPriorityDesc: "You have {count} high priority records. Focus on these first to maximize results.",
        mediumPriorityDesc: "Consider nurturing strategies to elevate the priority of your {count} medium priority records.",
        conversionImprovement: "With automatic analysis, your conversion rate can improve up to {rate}% by focusing on properly prioritized records."
      },
      table: {
        title: "Records Automatically Organized",
        subtitle: "{businessType} prioritized by our intelligent system",
        searchPlaceholder: "Search in any field...",
        allLevels: "All levels",
        highPriorityFilter: "🔥 High Priority",
        mediumPriorityFilter: "🟡 Medium Priority",
        lowPriorityFilter: "❄️ Low Priority",
        mainRecord: "Main Record",
        aiPriority: "AI Priority",
        status: "Status",
        category: "Category",
        contact: "Contact",
        valueReason: "Value/Reason",
        actions: "Actions",
        noRecords: "No records found",
        adjustFilters: "Try adjusting your search filters.",
        recordsAppear: "Records will appear here once you upload your Excel.",
        intelligentTip: "💡 Intelligent Prioritization System",
        algorithmDesc: "Our algorithm automatically analyzes all fields in your Excel to identify high conversion records. Scores 80+ are immediate opportunities."
      }
    },
    
    // Common elements
    common: {
      home: "Home",
      freebies: "Freebies", 
      showcase: "Showcase",
      contact: "Contact",
      backToLeads: "Back to Leads",
      viewDetails: "View Details",
      contactWhatsApp: "Contact via WhatsApp",
      createdAt: "Created",
      businessType: "Business Type",
      description: "Description",
      priority: "Priority",
      investment: "Investment",
      actions: "Actions",
      search: "Search by name, email, phone...",
      allLevels: "All levels",
      highPriorityFilter: "🔥 High Priority",
      mediumPriorityFilter: "🟡 Medium Priority", 
      lowPriorityFilter: "❄️ Low Priority",
      noResults: "No leads found",
      adjustFilters: "Try adjusting your search filters.",
      loadAnother: "Load Another Excel",
      getFullCRM: "Get Full CRM",
      name: "Name",
      email: "Email",
      phone: "Phone",
      status: "Status",
      records: "records",
      columns: "columns",
      critical: "critical",
      courses: "Online Courses",
      selectFile: "Select File",
      newExcel: "New Excel",
      completeCRM: "Complete CRM",
      noCategory: "No Category",
      noStatus: "No Status", 
      mainCategories: "Main Categories",
      mainStatuses: "Main Statuses",
      record: "record",
      recordsProcessed: "records processed",
      of: "of",
      maxPriority: "Maximum priority",
      mediumPriority: "Medium priority", 
      lowPriority: "Low priority"
    }
  },
  
  es: {
    // Hero Section
    hero: {
      badge: "debake.fun v2.0 - Ahora con más caos",
      subtitle: "Donde cocino",
      description: "Aqui te enseño como funcionan las herramientas de mis clientes, para que tu las puedas usar en tu negocio.",
      
     
      primaryCTA: "Probar transformador de leads",
      secondaryCTA: "Ver Todas las Herramientas",
      tool1: "Transformador de Excel",
      tool2: "Debugger de APIs",
      tool3: "Visualizador de Datos",
      tool4: "Automatizador de Flujos",
      features: [
        {
          title: "Excel → Magia CRM",
          description: "Transforma hojas de cálculo feas en datos organizados",
          status: "🔥 Trending"
        },
        {
          title: "Estresador de APIs",
          description: "Rompe tus APIs antes que lo hagan tus usuarios",
          status: "🚧 Construyendo"
        },
        {
          title: "Playground de Datos",
          description: "Visualiza cualquier dataset en segundos",
          status: "💭 Ideando"
        }
      ],
      footer: {
        caffeine: "Alimentado por cafeína",
        chaos: "Construido con caos",
          author: "Por DecodeBrandon",
        footerCaption:"Construyo herramientas que resuelven problemas reales. Nada de datos aburridos, solo cosas que funcionan.",
      }
    },
    
    // Excel Freebie Section
    excel: {
      title: "Arma Tu CRM",
      subtitle: "Sube CUALQUIER Excel y mira cómo nuestra tecnología lo transforma en inteligencia profesional sobre tus clientes",
      upload: {
        title: "Arrastra tu Excel aquí",
        subtitle: "o haz clic para seleccionar archivo",
        processing: "Analizando tu Excel...",
        analyzing: "Nuestro sistema está identificando automáticamente la estructura",
        formats: "Cualquier formato Excel (.xlsx, .xls) funciona",
        privacy: "No te preocupes, todo se procesa en tu navegador - No almacenamos nada de tu archivo",
        sampleDownload: "¿No tienes un Excel a la mano?",
        sampleButton: "Descargar Ejemplo",
        dragActive: "Suelta tu archivo Excel aquí...",
        error: "Por favor selecciona un archivo Excel válido (.xlsx o .xls)",
        completed: "¡Archivo Procesado!",
        analysisComplete: "Análisis Automático Completado",
        businessTypeDetected: "Tipo de Negocio Detectado",
        validRecords: "Registros Válidos",
        fieldsDetected: "Campos Detectados",
        importantFields: "Campos Importantes",
        keyFieldsIdentified: "Campos Clave Identificados",
        investment: "Capacidad de Inversión"
      },
      stats: {
        title: "Análisis Inteligente Automático",
        subtitle: "Tu {businessType} transformado en insights profesionales",
        totalRecords: "Total de Registros",
        highPriority: "Alta Prioridad",
        potentialValue: "Valor Potencial",
        conversionPotential: "Potencial de Conversión",
        readyToBuy: "🔥 Máxima prioridad",
        basedOnInvestment: "Estimado inteligente",
        estimatedProbability: "Análisis automático",
        priorityBreakdown: "Distribución por Prioridad",
        specificInsights: "Insights Específicos para {businessType}",
        immediateRecommendation: "🎯 Recomendación Inmediata:",
        opportunityDetected: "💡 Oportunidad Detectada:",
        highPriorityDesc: "Tienes {count} registros de alta prioridad. Enfócate primero en estos para maximizar resultados.",
        mediumPriorityDesc: "Considera estrategias de nutrición para elevar la prioridad de tus {count} registros de prioridad media.",
        conversionImprovement: "Con el análisis automático, tu tasa de conversión puede mejorar hasta un {rate}% enfocándote en los registros priorizados correctamente."
      },
      table: {
        title: "Registros Organizados Automáticamente",
        subtitle: "{businessType} priorizados por nuestro sistema inteligente",
        searchPlaceholder: "Buscar en cualquier campo...",
        allLevels: "Todos los niveles",
        highPriorityFilter: "🔥 Alta Prioridad",
        mediumPriorityFilter: "🟡 Media Prioridad",
        lowPriorityFilter: "❄️ Baja Prioridad",
        mainRecord: "Registro Principal",
        aiPriority: "Prioridad IA",
        status: "Estado",
        category: "Categoría",
        contact: "Contacto",
        valueReason: "Valor/Razón",
        actions: "Acciones",
        noRecords: "No se encontraron registros",
        adjustFilters: "Intenta ajustar tus filtros de búsqueda.",
        recordsAppear: "Los registros aparecerán aquí una vez que subas tu Excel.",
        intelligentTip: "💡 Sistema de Priorización Inteligente",
        algorithmDesc: "Nuestro algoritmo analiza automáticamente todos los campos de tu Excel para identificar registros de alta conversión. Los puntajes 80+ son oportunidades inmediatas."
      }
    },
    
    // Common elements
    common: {
      home: "Inicio",
      freebies: "Freebies",
      showcase: "Showcase", 
      contact: "Contacto",
      backToLeads: "Volver a Leads",
      viewDetails: "Ver Detalles",
      contactWhatsApp: "Contactar por WhatsApp",
      createdAt: "Creado",
      businessType: "Tipo de Negocio",
      description: "Descripción",
      priority: "Prioridad",
      investment: "Inversión",
      actions: "Acciones",
      search: "Buscar por nombre, email, teléfono...",
      allLevels: "Todos los niveles",
      highPriorityFilter: "🔥 Alta Prioridad",
      mediumPriorityFilter: "🟡 Media Prioridad", 
      lowPriorityFilter: "❄️ Baja Prioridad",
      noResults: "No se encontraron leads",
      adjustFilters: "Intenta ajustar tus filtros de búsqueda.",
      loadAnother: "Cargar Otro Excel",
      getFullCRM: "Obtener CRM Completo",
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      status: "Estado",
      records: "registros",
      columns: "columnas",
      critical: "críticos",
      courses: "Cursos Online",
      selectFile: "Seleccionar Archivo",
      newExcel: "Nuevo Excel",
      completeCRM: "CRM Completo",
      noCategory: "Sin Categoría",
      noStatus: "Sin Estado",
      mainCategories: "Categorías Principales", 
      mainStatuses: "Estados Principales",
      record: "registro",
      recordsProcessed: "registros procesados",
      of: "de",
      maxPriority: "Máxima prioridad",
      mediumPriority: "Prioridad media",
      lowPriority: "Prioridad baja"
    }
  }
};

// Create the context with proper typing
export const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Custom hook to use i18n
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Helper function to get nested translation
export const getTranslation = (translations: any, key: string, lang: Language): string => {
  const keys = key.split('.');
  let result = translations[lang];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
      return key; // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key;
};

// Browser storage helpers
export const saveLanguageToStorage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('debake-language', lang);
    console.log('Language saved to storage:', lang);
  }
};

export const getLanguageFromStorage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('debake-language') as Language;
    if (stored && ['en', 'es'].includes(stored)) {
      console.log('Language loaded from storage:', stored);
      return stored;
    }
  }
  return 'en'; // Default to English
};

// Detect browser language
export const detectBrowserLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    const detected = browserLang === 'es' ? 'es' : 'en';
    console.log('Browser language detected:', detected);
    return detected;
  }
  return 'en';
};