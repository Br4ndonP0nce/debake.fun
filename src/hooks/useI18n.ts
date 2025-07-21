// src/hooks/useI18n.ts
"use client";

import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations for the entire app
export const translations = {
  en: {
    // Hero Section
    hero: {
      badge: "debake.fun v2.0 - Now with more chaos",
      subtitle: "Where I bake",
      description: "I build wild, useful tools that solve real problems. No boring corporate BS, just pure functional chaos.",
      wildcaption: "wild, useful tools",
      chaosCation: "functional chaos",
      primaryCTA: "Try Excel Transformer",
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
        author: "By DecodeBrandon"
      }
    },
    
    // Excel Freebie Section
    excel: {
      title: "Free CRM Excel Preview",
      subtitle: "Upload your ugly Excel and see how a professional CRM organizes your leads",
      upload: {
        title: "Upload Your Excel Here",
        subtitle: "Drag & drop or click to select",
        processing: "Processing your Excel...",
        analyzing: "Analyzing and structuring your leads",
        formats: "Supported formats: .xlsx, .xls",
        privacy: "We don't store your data - everything processed locally",
        sampleDownload: "Don't have an Excel ready?",
        sampleButton: "Download Sample",
        dragActive: "Drop your Excel file here...",
        error: "Please upload an Excel file (.xlsx or .xls)"
      },
      stats: {
        title: "Smart Analysis of Your Leads",
        subtitle: "This is how our CRM automatically organizes and prioritizes your information",
        totalLeads: "Total Leads",
        highPriority: "High Priority",
        potentialRevenue: "Potential Revenue",
        conversionPotential: "Conversion Potential",
        readyToBuy: "Ready to buy",
        basedOnInvestment: "Based on investment levels",
        estimatedProbability: "Estimated probability"
      },
      insights: {
        title: "Automatic CRM Insights",
        prioritize: "🎯 Prioritize these leads:",
        prioritizeDesc: "You have {count} high priority leads who already have budget. Contact these first to maximize conversions.",
        potential: "💰 Revenue potential:",
        potentialDesc: "With a focused strategy, you could generate up to ${amount} with these leads."
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
      investment: "Investment ($200)",
      actions: "Actions",
      search: "Search by name, email, phone...",
      allLevels: "All levels",
      highPriorityFilter: "🔥 High Priority",
      mediumPriorityFilter: "🟡 Medium Priority", 
      lowPriorityFilter: "❄️ Low Priority",
      noResults: "No leads found",
      adjustFilters: "Try adjusting your search filters.",
      loadAnother: "Load Another Excel",
      getFullCRM: "Get Full CRM"
    }
  },
  
  es: {
    // Hero Section
    hero: {
      badge: "debake.fun v2.0 - Ahora con más caos",
      subtitle: "Donde hornea",
      description: "Construyo herramientas útiles y salvajes que resuelven problemas reales. Nada de corporativo aburrido, solo puro caos funcional.",
      wildcaption: "herramientas útiles y salvajes",
      chaosCation: "caos funcional",
      primaryCTA: "Probar Excel Transformer",
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
        author: "Por DecodeBrandon"
      }
    },
    
    // Excel Freebie Section
    excel: {
      title: "Vista Previa Gratuita del CRM",
      subtitle: "Sube tu Excel feo y ve cómo un CRM profesional organiza tus leads",
      upload: {
        title: "Sube Tu Excel Aquí",
        subtitle: "Arrastra y suelta o haz clic para seleccionar",
        processing: "Procesando tu Excel...",
        analyzing: "Analizando y estructurando tus leads",
        formats: "Formatos soportados: .xlsx, .xls",
        privacy: "No almacenamos tu información - todo se procesa localmente",
        sampleDownload: "¿No tienes un Excel listo?",
        sampleButton: "Descargar Ejemplo",
        dragActive: "Suelta tu archivo Excel aquí...",
        error: "Por favor sube un archivo Excel (.xlsx o .xls)"
      },
      stats: {
        title: "Análisis Inteligente de tus Leads",
        subtitle: "Así es como nuestro CRM organiza y prioriza automáticamente tu información",
        totalLeads: "Total de Leads",
        highPriority: "Alta Prioridad",
        potentialRevenue: "Ingresos Potenciales",
        conversionPotential: "Potencial de Conversión",
        readyToBuy: "Listos para comprar",
        basedOnInvestment: "Basado en niveles de inversión",
        estimatedProbability: "Probabilidad estimada"
      },
      insights: {
        title: "Insights Automáticos del CRM",
        prioritize: "🎯 Prioriza estos leads:",
        prioritizeDesc: "Tienes {count} leads de alta prioridad que ya cuentan con presupuesto. Contacta primero a estos para maximizar conversiones.",
        potential: "💰 Potencial de ingresos:",
        potentialDesc: "Con una estrategia enfocada, podrías generar hasta ${amount} con estos leads."
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
      investment: "Inversión ($200)",
      actions: "Acciones",
      search: "Buscar por nombre, email, teléfono...",
      allLevels: "Todos los niveles",
      highPriorityFilter: "🔥 Alta Prioridad",
      mediumPriorityFilter: "🟡 Media Prioridad", 
      lowPriorityFilter: "❄️ Baja Prioridad",
      noResults: "No se encontraron leads",
      adjustFilters: "Intenta ajustar tus filtros de búsqueda.",
      loadAnother: "Cargar Otro Excel",
      getFullCRM: "Obtener CRM Completo"
    }
  }
};

// Create the context
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
      return key; // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key;
};

// Browser storage helpers
export const saveLanguageToStorage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('debake-language', lang);
  }
};

export const getLanguageFromStorage = (): Language => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('debake-language') as Language;
    if (stored && ['en', 'es'].includes(stored)) {
      return stored;
    }
  }
  return 'en'; // Default to English
};

// Detect browser language
export const detectBrowserLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  }
  return 'en';
};