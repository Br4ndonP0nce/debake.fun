// src/components/freebies/miniApp-excel/AdaptivePreviewComponents.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Users,
  Search,
  Building,
  Briefcase,
  TrendingUp,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Filter,
  ArrowUpDown,
  Sparkles,
  ArrowLeft,
  Target,
  Zap,
  BarChart3,
  AlertTriangle,
  Star,
  MessageSquare,
} from "lucide-react";
import {
  SmartProcessedRecord,
  ExcelAnalysis,
  ColumnMapping,
} from "./SmartExcelProcessor";

// Adaptive Stats Component
interface AdaptiveStatsProps {
  records: SmartProcessedRecord[];
  analysis: ExcelAnalysis;
}

export const AdaptiveStats: React.FC<AdaptiveStatsProps> = ({
  records,
  analysis,
}) => {
  const stats = React.useMemo(() => {
    const total = records.length;
    const highPriority = records.filter(
      (r) => r.priorityLevel === "high"
    ).length;
    const mediumPriority = records.filter(
      (r) => r.priorityLevel === "medium"
    ).length;
    const lowPriority = records.filter((r) => r.priorityLevel === "low").length;

    // Calculate potential revenue
    const potentialRevenue = records.reduce((sum, record) => {
      if (record.financialValue) return sum + record.financialValue;
      // Estimate based on priority if no financial data
      if (record.priorityLevel === "high") return sum + 1500;
      if (record.priorityLevel === "medium") return sum + 800;
      return sum + 300;
    }, 0);

    // Conversion potential
    const conversionPotential =
      total > 0
        ? Math.round(
            ((highPriority * 0.8 + mediumPriority * 0.4 + lowPriority * 0.1) /
              total) *
              100
          )
        : 0;

    // Category analysis
    const categories = records.reduce((acc, record) => {
      const cat = record.category || "Sin Categoría";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    // Status analysis
    const statuses = records.reduce((acc, record) => {
      const status = record.status || "Sin Estado";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topStatuses = Object.entries(statuses)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      total,
      highPriority,
      mediumPriority,
      lowPriority,
      potentialRevenue,
      conversionPotential,
      topCategories,
      topStatuses,
      avgPriority: Math.round(
        records.reduce((sum, r) => sum + r.priority, 0) / total
      ),
    };
  }, [records]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          🧠 Análisis Inteligente Automático
        </h2>
        <p className="text-gray-600">
          Tu {analysis.businessType} transformado en insights profesionales
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Total de Registros
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-500">Registros procesados</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-black">Alta Prioridad</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-red-600">
                    {stats.highPriority}
                  </p>
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    {Math.round((stats.highPriority / stats.total) * 100)}%
                  </Badge>
                </div>
                <p className="text-sm text-red-600">🔥 Máxima prioridad</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Zap className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Valor Potencial
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.potentialRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Estimado inteligente</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Potencial Conversión
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.conversionPotential}%
                </p>
                <p className="text-sm text-purple-600">Análisis automático</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Target className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Distribución por Prioridad
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Alta Prioridad</span>
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
                  <span className="text-sm font-medium">Media Prioridad</span>
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
                  <span className="text-sm font-medium">Baja Prioridad</span>
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

        {/* Category Analysis */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              {stats.topCategories.length > 0
                ? "Categorías Principales"
                : "Estados Principales"}
            </h3>
            <div className="space-y-3">
              {(stats.topCategories.length > 0
                ? stats.topCategories
                : stats.topStatuses
              ).map(([name, count], index) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      #{index + 1} {name}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {count} registro{count !== 1 ? "s" : ""}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Type Specific Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-purple-600" />
            Insights Específicos para {analysis.businessType}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                🎯 Recomendación Inmediata:
              </h4>
              <p className="text-sm text-purple-800">
                {stats.highPriority > 0
                  ? `Tienes ${stats.highPriority} registros de alta prioridad. Enfócate primero en estos para maximizar resultados.`
                  : `Considera estrategias de nutrición para elevar la prioridad de tus ${stats.mediumPriority} registros de prioridad media.`}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                💡 Oportunidad Detectada:
              </h4>
              <p className="text-sm text-purple-800">
                Con el análisis automático, tu tasa de conversión puede mejorar
                hasta un {stats.conversionPotential + 15}% enfocándote en los
                registros priorizados correctamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Adaptive Table Component
interface AdaptiveTableProps {
  records: SmartProcessedRecord[];
  analysis: ExcelAnalysis;
  onRecordSelect: (record: SmartProcessedRecord) => void;
}

type SortField =
  | "displayName"
  | "priority"
  | "createdAt"
  | "status"
  | "category";
type SortDirection = "asc" | "desc";

export const AdaptiveTable: React.FC<AdaptiveTableProps> = ({
  records,
  analysis,
  onRecordSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [sortField, setSortField] = useState<SortField>("priority");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get priority level details
  const getPriorityDetails = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return {
          label: "🔥 Alta",
          color: "bg-red-100 text-red-700 border-red-200",
          description: "Máxima prioridad",
        };
      case "medium":
        return {
          label: "🟡 Media",
          color: "bg-amber-100 text-amber-700 border-amber-200",
          description: "Prioridad media",
        };
      case "low":
        return {
          label: "❄️ Baja",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          description: "Prioridad baja",
        };
    }
  };

  // Sort records
  const sortRecords = (records: SmartProcessedRecord[]) => {
    return [...records].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Filter and search records
  const filteredRecords = React.useMemo(() => {
    let filtered = records;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.displayName.toLowerCase().includes(term) ||
          record.primaryContact.toLowerCase().includes(term) ||
          record.secondaryContact.toLowerCase().includes(term) ||
          record.status.toLowerCase().includes(term) ||
          record.category.toLowerCase().includes(term)
      );
    }

    // Apply priority level filter
    if (filterLevel !== "all") {
      filtered = filtered.filter(
        (record) => record.priorityLevel === filterLevel
      );
    }

    // Apply sorting
    return sortRecords(filtered);
  }, [records, searchTerm, filterLevel, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-MX", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field)
      return <ArrowUpDown className="h-3 w-3 text-gray-400" />;
    return (
      <ArrowUpDown
        className={`h-3 w-3 ${
          sortDirection === "desc" ? "rotate-180" : ""
        } text-purple-600`}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Registros Organizados Automáticamente
          </h2>
          <p className="text-gray-600">
            {analysis.businessType} priorizados por nuestro sistema inteligente
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          {filteredRecords.length} de {records.length} registros
        </Badge>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar en cualquier campo..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-black" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            className="px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="all">Todos los niveles</option>
            <option value="high">🔥 Alta Prioridad</option>
            <option value="medium">🟡 Media Prioridad</option>
            <option value="low">❄️ Baja Prioridad</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("displayName")}
                  >
                    <div className="flex items-center gap-1">
                      Registro Principal
                      {getSortIcon("displayName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center gap-1">
                      Prioridad IA
                      {getSortIcon("priority")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      Estado
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      Categoría
                      {getSortIcon("category")}
                    </div>
                  </TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Valor/Razón</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record, index) => {
                  const priorityData = getPriorityDetails(record.priorityLevel);

                  return (
                    <TableRow
                      key={record.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onRecordSelect(record)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                              {record.displayName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {record.displayName}
                            </div>
                            {record.primaryContact && (
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                {record.primaryContact.includes("@") ? (
                                  <Mail className="h-3 w-3" />
                                ) : (
                                  <Phone className="h-3 w-3" />
                                )}
                                {record.primaryContact}
                              </div>
                            )}
                            {record.secondaryContact && (
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                {record.secondaryContact.includes("@") ? (
                                  <Mail className="h-3 w-3" />
                                ) : (
                                  <Phone className="h-3 w-3" />
                                )}
                                {record.secondaryContact}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                            <span className="font-bold text-lg text-purple-700">
                              {Math.round(record.priority)}
                            </span>
                          </div>
                          {index < 3 && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              TOP {index + 1}
                            </Badge>
                          )}
                        </div>
                        <Badge className={`${priorityData.color} text-xs mt-1`}>
                          {priorityData.label}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">
                            {record.status || "Sin Estado"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-gray-500" />
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.category || "Sin Categoría"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm space-y-1">
                          {record.primaryContact && (
                            <div className="text-gray-700">
                              {record.primaryContact.length > 25
                                ? `${record.primaryContact.substring(0, 25)}...`
                                : record.primaryContact}
                            </div>
                          )}
                          {record.secondaryContact && (
                            <div className="text-gray-500 text-xs">
                              {record.secondaryContact.length > 25
                                ? `${record.secondaryContact.substring(
                                    0,
                                    25
                                  )}...`
                                : record.secondaryContact}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm space-y-1">
                          {record.financialValue ? (
                            <div className="font-medium text-green-600">
                              ${record.financialValue.toLocaleString()}
                            </div>
                          ) : null}
                          <div className="text-xs text-gray-500 bg-gray-50 p-1 rounded max-w-xs">
                            {record.priorityReason.length > 40
                              ? `${record.priorityReason.substring(0, 40)}...`
                              : record.priorityReason}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRecordSelect(record);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron registros
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterLevel !== "all"
                  ? "Intenta ajustar tus filtros de búsqueda."
                  : "Los registros aparecerán aquí una vez que subas tu Excel."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-900 mb-1">
                💡 Sistema de Priorización Inteligente
              </h4>
              <p className="text-sm text-purple-800">
                Nuestro algoritmo analiza automáticamente todos los campos de tu
                Excel para identificar registros de alta conversión. Los
                puntajes 80+ son oportunidades inmediatas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Adaptive Detail View Component
interface AdaptiveDetailViewProps {
  record: SmartProcessedRecord;
  analysis: ExcelAnalysis;
  onBack: () => void;
}

export const AdaptiveDetailView: React.FC<AdaptiveDetailViewProps> = ({
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
    .filter((col) => col.importance === "high" || col.importance === "medium")
    .sort((a, b) => (a.importance === "high" ? -1 : 1));

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
                (c) => c.originalName === key
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
