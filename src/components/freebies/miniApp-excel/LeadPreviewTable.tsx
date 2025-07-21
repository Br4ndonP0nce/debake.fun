// src/components/freebie/LeadPreviewTable.tsx
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
} from "lucide-react";
import { ProcessedLead } from "./ExcelUploader";

interface LeadPreviewTableProps {
  leads: ProcessedLead[];
  onLeadSelect: (lead: ProcessedLead) => void;
}

type SortField = "name" | "priority" | "createdAt" | "businessType";
type SortDirection = "asc" | "desc";

const LeadPreviewTable: React.FC<LeadPreviewTableProps> = ({
  leads,
  onLeadSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [sortField, setSortField] = useState<SortField>("priority");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get business type icon
  const getBusinessTypeIcon = (businessType: string) => {
    if (
      businessType.includes("Agencia") ||
      businessType.includes("Consultoría")
    ) {
      return <Briefcase className="h-3 w-3" />;
    }
    if (
      businessType.includes("E-commerce") ||
      businessType.includes("Retail")
    ) {
      return <Building className="h-3 w-3" />;
    }
    return <Building className="h-3 w-3" />;
  };

  // Get investment level details
  const getInvestmentLevel = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return {
          label: "🔥 Alto",
          color: "bg-red-100 text-red-700 border-red-200",
          description: "Cuenta con $200",
        };
      case "medium":
        return {
          label: "🟡 Medio",
          color: "bg-amber-100 text-amber-700 border-amber-200",
          description: "Puede conseguir $200",
        };
      case "low":
        return {
          label: "❄️ Bajo",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          description: "No cuenta con $200",
        };
    }
  };

  // Sort leads
  const sortLeads = (leads: ProcessedLead[]) => {
    return [...leads].sort((a, b) => {
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

  // Filter and search leads
  const filteredLeads = React.useMemo(() => {
    let filtered = leads;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.phone.toLowerCase().includes(term) ||
          lead.businessType.toLowerCase().includes(term)
      );
    }

    // Apply investment level filter
    if (filterLevel !== "all") {
      filtered = filtered.filter(
        (lead) => lead.investmentLevel === filterLevel
      );
    }

    // Apply sorting
    return sortLeads(filtered);
  }, [leads, searchTerm, filterLevel, sortField, sortDirection]);

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
      {/* Header with AI Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Tus Leads Organizados
          </h2>
          <p className="text-gray-600">
            Automaticamente priorizados por nuestro sistema inteligente
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          {filteredLeads.length} de {leads.length} leads
        </Badge>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por nombre, email, teléfono..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="all">Todos los niveles</option>
            <option value="high">🔥 Alta Prioridad</option>
            <option value="medium">🟡 Media Prioridad</option>
            <option value="low">❄️ Baja Prioridad</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Contacto
                      {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center gap-1">
                      Prioridad
                      {getSortIcon("priority")}
                    </div>
                  </TableHead>
                  <TableHead>Inversión ($200)</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("businessType")}
                  >
                    <div className="flex items-center gap-1">
                      Tipo de Negocio
                      {getSortIcon("businessType")}
                    </div>
                  </TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-1">
                      Fecha
                      {getSortIcon("createdAt")}
                    </div>
                  </TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead, index) => {
                  const investmentData = getInvestmentLevel(
                    lead.investmentLevel
                  );

                  return (
                    <TableRow
                      key={lead.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onLeadSelect(lead)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                              {lead.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {lead.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                            <span className="font-bold text-lg text-purple-700">
                              {Math.round(lead.priority)}
                            </span>
                          </div>
                          {index < 3 && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              TOP {index + 1}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-2">
                          <Badge className={`${investmentData.color} text-xs`}>
                            {investmentData.label}
                          </Badge>
                          <div className="text-xs text-gray-600">
                            {investmentData.description}
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded max-w-xs">
                            "
                            {lead.investmentText.length > 50
                              ? `${lead.investmentText.substring(0, 50)}...`
                              : lead.investmentText}
                            "
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getBusinessTypeIcon(lead.businessType)}
                          <div className="text-sm">
                            <div className="font-medium">
                              {lead.businessType}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm max-w-xs">
                          <div className="text-gray-700 line-clamp-2">
                            {lead.businessDescription.length > 80
                              ? `${lead.businessDescription.substring(
                                  0,
                                  80
                                )}...`
                              : lead.businessDescription || "Sin descripción"}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(lead.createdAt)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onLeadSelect(lead);
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
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron leads
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterLevel !== "all"
                  ? "Intenta ajustar tus filtros de búsqueda."
                  : "Los leads aparecerán aquí una vez que subas tu Excel."}
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
                💡 Tip del CRM Profesional
              </h4>
              <p className="text-sm text-purple-800">
                Los leads están automáticamente ordenados por prioridad. Los
                puntajes altos (90+) indican que ya cuentan con presupuesto y
                están listos para comprar. ¡Contacta estos primero!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadPreviewTable;
