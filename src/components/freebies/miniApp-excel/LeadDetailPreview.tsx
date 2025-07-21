// src/components/freebie/LeadDetailPreview.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Building,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Eye,
  Sparkles,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
} from "lucide-react";
import { ProcessedLead } from "./ExcelUploader";

interface LeadDetailPreviewProps {
  lead: ProcessedLead;
  onBack: () => void;
}

const LeadDetailPreview: React.FC<LeadDetailPreviewProps> = ({
  lead,
  onBack,
}) => {
  // Get investment level details
  const getInvestmentAnalysis = () => {
    switch (lead.investmentLevel) {
      case "high":
        return {
          level: "Alto Potencial",
          description: "Cuenta con la inversión de $200 USD",
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <DollarSign className="h-4 w-4 text-red-600" />,
          priority: "🔥 ALTA PRIORIDAD",
          actionAdvice:
            "Contactar INMEDIATAMENTE. Este lead está listo para comprar.",
          conversionRate: "80%",
        };
      case "medium":
        return {
          level: "Potencial Medio",
          description: "Puede conseguir la inversión de $200 USD",
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <DollarSign className="h-4 w-4 text-amber-600" />,
          priority: "🟡 PRIORIDAD MEDIA",
          actionAdvice: "Seguimiento en 1-2 días. Needs nurturing.",
          conversionRate: "45%",
        };
      case "low":
        return {
          level: "Bajo Potencial",
          description: "No cuenta con la inversión de $200 USD",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <DollarSign className="h-4 w-4 text-blue-600" />,
          priority: "❄️ PRIORIDAD BAJA",
          actionAdvice: "Seguimiento educativo. Enfoque en valor.",
          conversionRate: "15%",
        };
    }
  };

  const getBusinessTypeDetails = () => {
    const type = lead.businessType;
    let icon = <Building className="h-4 w-4" />;
    let insights = "";

    if (type.includes("Agencia")) {
      icon = <Target className="h-4 w-4" />;
      insights =
        "Las agencias suelen tener flujo de caja estable y necesidad de automatización.";
    } else if (type.includes("E-commerce")) {
      icon = <Building className="h-4 w-4" />;
      insights =
        "Los e-commerce valoran sistemas que mejoren conversiones y seguimiento.";
    } else if (type.includes("Consultoría")) {
      icon = <Target className="h-4 w-4" />;
      insights =
        "Los consultores necesitan optimizar tiempo y demostrar ROI a clientes.";
    } else {
      insights =
        "Analizar necesidades específicas del sector para personalizar propuesta.";
    }

    return { icon, insights };
  };

  const investmentAnalysis = getInvestmentAnalysis();
  const businessDetails = getBusinessTypeDetails();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate suggested next actions based on priority
  const getSuggestedActions = () => {
    const baseActions = [
      {
        icon: <Phone className="h-4 w-4" />,
        action: "Llamada telefónica",
        timing: lead.investmentLevel === "high" ? "Ahora" : "En 24h",
        priority: lead.investmentLevel === "high" ? "Crítico" : "Normal",
      },
      {
        icon: <MessageSquare className="h-4 w-4" />,
        action: "WhatsApp de seguimiento",
        timing: "Después de llamada",
        priority: "Normal",
      },
      {
        icon: <Mail className="h-4 w-4" />,
        action: "Email personalizado",
        timing: lead.investmentLevel === "high" ? "En 2h" : "En 48h",
        priority: lead.investmentLevel === "high" ? "Alto" : "Bajo",
      },
    ];

    return baseActions;
  };

  const suggestedActions = getSuggestedActions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Lista
        </Button>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          Vista Detallada del CRM
        </Badge>
      </div>

      {/* Main Lead Card */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-purple-700 text-white text-lg font-bold">
                  {lead.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{lead.name}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className={investmentAnalysis.color}>
                    {investmentAnalysis.priority}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-lg text-purple-700">
                      {Math.round(lead.priority)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Probabilidad de Conversión
              </div>
              <div className="text-3xl font-bold text-green-600">
                {investmentAnalysis.conversionRate}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-3" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-3" />
                  <a href={`tel:${lead.phone}`} className="hover:underline">
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-500 mr-3" />
                  <a
                    href={`https://wa.me/${lead.phone?.replace(
                      /[^\d]/g,
                      ""
                    )}?text=Hola ${
                      lead.name
                    }, te contacto desde el equipo de Full Send respecto a tu consulta sobre nuestro sistema.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm">
                    Creado: {formatDate(lead.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Análisis Inteligente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {investmentAnalysis.icon}
                  <div>
                    <div className="font-medium">
                      {investmentAnalysis.level}
                    </div>
                    <div className="text-sm text-gray-600">
                      {investmentAnalysis.description}
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <div className="text-sm">
                    <strong>Recomendación:</strong>{" "}
                    {investmentAnalysis.actionAdvice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Información del Negocio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {businessDetails.icon}
              <h4 className="font-medium">Tipo de Negocio</h4>
            </div>
            <Badge className="bg-blue-100 text-blue-800 mb-2">
              {lead.businessType}
            </Badge>
            <p className="text-sm text-gray-600">{businessDetails.insights}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Descripción del Negocio</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">
                {lead.businessDescription ||
                  "No se proporcionó descripción del negocio"}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Capacidad de Inversión</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 italic">"{lead.investmentText}"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CRM Suggested Actions */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Sparkles className="h-5 w-5" />
            Acciones Sugeridas por el CRM
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedActions.map((action, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  {action.icon}
                  <h5 className="font-medium text-green-900">
                    {action.action}
                  </h5>
                </div>
                <div className="text-sm space-y-1">
                  <div className="text-green-700">
                    <strong>Cuándo:</strong> {action.timing}
                  </div>
                  <div className="text-green-700">
                    <strong>Prioridad:</strong> {action.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Raw Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Datos Originales del Excel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(lead.rawData).map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="ml-2 text-gray-600">
                    {String(value).length > 50
                      ? `${String(value).substring(0, 50)}...`
                      : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CRM Features Showcase */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-900">
                ¿Te gusta lo que ves?
              </h3>
            </div>
            <p className="text-purple-800 max-w-2xl mx-auto">
              Este es solo una pequeña muestra de nuestro CRM completo. Con la
              versión completa obtienes seguimiento automático, integraciones
              con WhatsApp, reportes avanzados, gestión de ventas y mucho más.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Seguimiento Automático
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Integración WhatsApp
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Reportes Avanzados
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Gestión de Ventas
              </Badge>
            </div>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Quiero el CRM Completo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadDetailPreview;
