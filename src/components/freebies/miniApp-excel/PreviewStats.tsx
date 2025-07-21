// src/components/freebie/PreviewStats.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { ProcessedLead } from "./ExcelUploader";

interface PreviewStatsProps {
  leads: ProcessedLead[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple" | "amber";
  badge?: {
    text: string;
    color: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  badge,
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      red: "text-red-600 bg-red-100",
      purple: "text-purple-600 bg-purple-100",
      amber: "text-amber-600 bg-amber-100",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {badge && <Badge className={badge.color}>{badge.text}</Badge>}
            </div>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${getColorClasses(color)}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PreviewStats: React.FC<PreviewStatsProps> = ({ leads }) => {
  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = leads.length;
    const highPriority = leads.filter(
      (l) => l.investmentLevel === "high"
    ).length;
    const mediumPriority = leads.filter(
      (l) => l.investmentLevel === "medium"
    ).length;
    const lowPriority = leads.filter((l) => l.investmentLevel === "low").length;

    // Potential revenue calculation based on investment level
    const potentialRevenue = leads.reduce((sum, lead) => {
      if (lead.investmentLevel === "high") return sum + 1300;
      if (lead.investmentLevel === "medium") return sum + 800;
      return sum + 300; // low priority still has some potential
    }, 0);

    // Conversion potential percentage
    const conversionPotential =
      total > 0
        ? Math.round(
            ((highPriority * 0.8 + mediumPriority * 0.4 + lowPriority * 0.1) /
              total) *
              100
          )
        : 0;

    // Average priority score
    const avgPriority =
      total > 0
        ? Math.round(
            leads.reduce((sum, lead) => sum + lead.priority, 0) / total
          )
        : 0;

    return {
      total,
      highPriority,
      mediumPriority,
      lowPriority,
      potentialRevenue,
      conversionPotential,
      avgPriority,
    };
  }, [leads]);

  // Business type analysis
  const businessTypes = React.useMemo(() => {
    const types = leads.reduce((acc, lead) => {
      acc[lead.businessType] = (acc[lead.businessType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(types)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3); // Top 3 business types
  }, [leads]);

  if (leads.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Análisis Inteligente de tus Leads
        </h2>
        <p className="text-gray-600">
          Así es como nuestro CRM organiza y prioriza automáticamente tu
          información
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Leads"
          value={stats.total}
          subtitle="Leads importados"
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />

        <StatCard
          title="Alta Prioridad"
          value={stats.highPriority}
          subtitle="🔥 Listos para comprar"
          icon={<Zap className="h-6 w-6" />}
          color="red"
          badge={{
            text: `${Math.round((stats.highPriority / stats.total) * 100)}%`,
            color: "bg-red-100 text-red-800",
          }}
        />

        <StatCard
          title="Ingresos Potenciales"
          value={`$${stats.potentialRevenue.toLocaleString()}`}
          subtitle="Basado en niveles de inversión"
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />

        <StatCard
          title="Potencial de Conversión"
          value={`${stats.conversionPotential}%`}
          subtitle="Probabilidad estimada"
          icon={<Target className="h-6 w-6" />}
          color="purple"
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investment Level Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Distribución por Nivel de Inversión
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    Alta Prioridad (Cuentan con $200)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-600">
                    {stats.highPriority}
                  </span>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    {Math.round((stats.highPriority / stats.total) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    Media Prioridad (Pueden conseguir $200)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-amber-600">
                    {stats.mediumPriority}
                  </span>
                  <Badge className="bg-amber-100 text-amber-800 text-xs">
                    {Math.round((stats.mediumPriority / stats.total) * 100)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    Baja Prioridad (No cuentan con $200)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">
                    {stats.lowPriority}
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {Math.round((stats.lowPriority / stats.total) * 100)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Types */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Tipos de Negocio Principales
            </h3>
            <div className="space-y-3">
              {businessTypes.map(([type, count], index) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      #{index + 1} {type}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {count} lead{count !== 1 ? "s" : ""}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-purple-600" />
            Insights Automáticos del CRM
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                🎯 Prioriza estos leads:
              </h4>
              <p className="text-sm text-purple-800">
                Tienes {stats.highPriority} leads de alta prioridad que ya
                cuentan con presupuesto. Contacta primero a estos para maximizar
                conversiones.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                💰 Potencial de ingresos:
              </h4>
              <p className="text-sm text-purple-800">
                Con una estrategia enfocada, podrías generar hasta $
                {stats.potentialRevenue.toLocaleString()} con estos leads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewStats;
