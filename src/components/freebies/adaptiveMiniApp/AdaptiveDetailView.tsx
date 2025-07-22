// src/components/freebies/miniApp-excel/AdaptiveDetailView.tsx
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
  Zap,
  BarChart3,
  Star,
} from "lucide-react";

interface AdaptiveDetailViewProps {
  record: any;
  analysis: any;
  onBack: () => void;
}

const AdaptiveDetailView: React.FC<AdaptiveDetailViewProps> = ({
  record,
  analysis,
  onBack,
}) => {
  const getPriorityAnalysis = () => {
    switch (record.priorityLevel) {
      case "high":
        return {
          level: "🔥 Alta Prioridad",
          description: "Este registro tiene máxima prioridad de conversión",
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <Zap className="h-4 w-4 text-red-600" />,
          actionAdvice:
            "CONTACTAR INMEDIATAMENTE. Altísima probabilidad de conversión.",
          conversionRate: "80%+",
        };
      case "medium":
        return {
          level: "🟡 Prioridad Media",
          description: "Registro con potencial de conversión moderado",
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <Target className="h-4 w-4 text-amber-600" />,
          actionAdvice: "Seguimiento en 1-2 días. Requires nurturing strategy.",
          conversionRate: "45-60%",
        };
      case "low":
        return {
          level: "❄️ Prioridad Baja",
          description: "Registro de baja prioridad para conversión inmediata",
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <BarChart3 className="h-4 w-4 text-blue-600" />,
          actionAdvice: "Seguimiento educativo de largo plazo. Focus en valor.",
          conversionRate: "15-30%",
        };
      default:
        return {
          level: "⚪ Sin Prioridad",
          description: "Registro sin análisis de prioridad disponible",
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <BarChart3 className="h-4 w-4 text-gray-600" />,
          actionAdvice: "Revisar manualmente para determinar estrategia.",
          conversionRate: "N/A",
        };
    }
  };

  const priorityAnalysis = getPriorityAnalysis();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate suggested actions based on priority and available data
  const getSuggestedActions = () => {
    const actions = [];

    if (record.primaryContact.includes("@")) {
      actions.push({
        icon: <Mail className="h-4 w-4" />,
        action: "Email personalizado",
        timing: record.priorityLevel === "high" ? "En 1 hora" : "En 24h",
        priority: record.priorityLevel === "high" ? "Crítico" : "Normal",
      });
    }

    if (record.secondaryContact && record.secondaryContact.includes("+")) {
      actions.push({
        icon: <Phone className="h-4 w-4" />,
        action: "Llamada telefónica",
        timing: record.priorityLevel === "high" ? "Ahora mismo" : "En 2-4h",
        priority: record.priorityLevel === "high" ? "Crítico" : "Normal",
      });

      actions.push({
        icon: <MessageSquare className="h-4 w-4" />,
        action: "WhatsApp follow-up",
        timing: "Después de contacto inicial",
        priority: "Normal",
      });
    }

    return actions;
  };

  const suggestedActions = getSuggestedActions();

  // Get important columns to display
  const importantColumns = analysis.columns
    .filter(
      (col: any) => col.importance === "high" || col.importance === "medium"
    )
    .sort((a: any, b: any) => (a.importance === "high" ? -1 : 1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Lista
        </Button>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          Vista Detallada Inteligente
        </Badge>
      </div>

      {/* Main Record Card */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-purple-700 text-white text-lg font-bold">
                  {record.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{record.displayName}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className={priorityAnalysis.color}>
                    {priorityAnalysis.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-lg text-purple-700">
                      {Math.round(record.priority)}
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
                {priorityAnalysis.conversionRate}
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
                {record.primaryContact && (
                  <div className="flex items-center">
                    {record.primaryContact.includes("@") ? (
                      <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    ) : (
                      <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    )}
                    <span className="text-blue-600">
                      {record.primaryContact}
                    </span>
                  </div>
                )}
                {record.secondaryContact && (
                  <div className="flex items-center">
                    {record.secondaryContact.includes("@") ? (
                      <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    ) : (
                      <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    )}
                    <span>{record.secondaryContact}</span>
                  </div>
                )}
                {record.secondaryContact &&
                  record.secondaryContact.includes("+") && (
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-green-500 mr-3" />
                      <a
                        href={`https://wa.me/${record.secondaryContact.replace(
                          /[^\d]/g,
                          ""
                        )}?text=Hola ${
                          record.displayName
                        }, te contacto respecto a tu consulta.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        Contactar por WhatsApp
                      </a>
                    </div>
                  )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm">
                    Registrado: {formatDate(record.createdAt)}
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
                  {priorityAnalysis.icon}
                  <div>
                    <div className="font-medium">{priorityAnalysis.level}</div>
                    <div className="text-sm text-gray-600">
                      {priorityAnalysis.description}
                    </div>
                  </div>
                </div>
                {record.financialValue && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium text-green-700">
                        Valor: ${record.financialValue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <div className="text-sm">
                    <strong>Recomendación IA:</strong>{" "}
                    {priorityAnalysis.actionAdvice}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="text-sm">
                    <strong>Razón del Puntaje:</strong> {record.priorityReason}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information - Dynamic based on analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Información del Registro ({analysis.businessType})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Estado y Categoría
              </h4>
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {record.status}
                </Badge>
                <Badge className="bg-green-100 text-green-800 ml-2">
                  {record.category}
                </Badge>
              </div>
            </div>
            {record.financialValue && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor Financiero
                </h4>
                <div className="text-2xl font-bold text-green-600">
                  ${record.financialValue.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CRM Suggested Actions */}
      {suggestedActions.length > 0 && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Sparkles className="h-5 w-5" />
              Acciones Sugeridas por IA
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
      )}

      {/* All Data Fields - Dynamic based on Excel structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Todos los Datos del Registro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(record.rawData).map(([key, value]) => {
              const column = analysis.columns.find(
                (c: any) => c.originalName === key
              );
              const displayValue =
                value === null ||
                value === undefined ||
                value === "" ||
                value === "-"
                  ? "Sin datos"
                  : String(value);

              return (
                <div key={key} className="border-b border-gray-100 pb-2">
                  <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    {column?.displayName || key}
                    {column?.importance === "high" && (
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        Crítico
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {displayValue.length > 100
                      ? `${displayValue.substring(0, 100)}...`
                      : displayValue}
                  </div>
                </div>
              );
            })}
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
                ¿Impresionado con el análisis automático?
              </h3>
            </div>
            <p className="text-purple-800 max-w-2xl mx-auto">
              Este es solo una pequeña muestra de lo que nuestro CRM completo
              puede hacer. Imagina este nivel de inteligencia aplicado a{" "}
              <strong>todo tu negocio</strong>, 24/7, con automatización
              completa.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Automatización Total
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Análisis Predictivo
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Integración WhatsApp
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                ✅ Reportes Avanzados
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

export default AdaptiveDetailView;
