// src/components/freebies/miniApp-excel/AdaptiveTable.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  TrendingUp,
  Phone,
  Mail,
  Filter,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface AdaptiveTableProps {
  records: any[];
  analysis: any;
  onRecordSelect: (record: any) => void;
}

type SortField =
  | "displayName"
  | "priority"
  | "createdAt"
  | "status"
  | "category";
type SortDirection = "asc" | "desc";

const AdaptiveTable: React.FC<AdaptiveTableProps> = ({
  records,
  analysis,
  onRecordSelect,
}) => {
  const { t } = useI18n();
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
          label: t("excel.table.highPriorityFilter"),
          color: "bg-red-100 text-red-700 border-red-200",
          description: t("common.maxPriority"),
        };
      case "medium":
        return {
          label: t("excel.table.mediumPriorityFilter"),
          color: "bg-amber-100 text-amber-700 border-amber-200",
          description: t("common.mediumPriority"),
        };
      case "low":
        return {
          label: t("excel.table.lowPriorityFilter"),
          color: "bg-blue-100 text-blue-700 border-blue-200",
          description: t("common.lowPriority"),
        };
    }
  };

  // Sort records
  const sortRecords = (records: any[]) => {
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
          <h2 className="text-2xl font-bold text-yellow-600 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            {t("excel.table.title")}
          </h2>
          <p className="text-yellow-600">
            {t("excel.table.subtitle").replace(
              "{businessType}",
              analysis.businessType
            )}
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          {filteredRecords.length} {t("common.of")} {records.length}{" "}
          {t("common.records")}
        </Badge>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={t("excel.table.searchPlaceholder")}
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
            className="px-3 py-2 border border-gray-300 text-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="all">{t("excel.table.allLevels")}</option>
            <option value="high">{t("excel.table.highPriorityFilter")}</option>
            <option value="medium">
              {t("excel.table.mediumPriorityFilter")}
            </option>
            <option value="low">{t("excel.table.lowPriorityFilter")}</option>
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
                      {t("excel.table.mainRecord")}
                      {getSortIcon("displayName")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center gap-1">
                      {t("excel.table.aiPriority")}
                      {getSortIcon("priority")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      {t("excel.table.status")}
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      {t("excel.table.category")}
                      {getSortIcon("category")}
                    </div>
                  </TableHead>
                  <TableHead>{t("excel.table.contact")}</TableHead>
                  <TableHead>{t("excel.table.valueReason")}</TableHead>
                  <TableHead>{t("excel.table.actions")}</TableHead>
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
                            {record.status || t("common.noStatus")}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-3 w-3 text-gray-500" />
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.category || t("common.noCategory")}
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
                {t("excel.table.noRecords")}
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterLevel !== "all"
                  ? t("excel.table.adjustFilters")
                  : t("excel.table.recordsAppear")}
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
                {t("excel.table.intelligentTip")}
              </h4>
              <p className="text-sm text-purple-800">
                {t("excel.table.algorithmDesc")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveTable;
