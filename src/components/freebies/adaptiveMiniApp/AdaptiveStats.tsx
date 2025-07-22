// src/components/freebies/miniApp-excel/AdaptiveStats.tsx
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
  Building,
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface AdaptiveStatsProps {
  records: any[];
  analysis: any;
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

const AdaptiveStats: React.FC<AdaptiveStatsProps> = ({ records, analysis }) => {
  const { t } = useI18n();

  // Calculate statistics
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
      const cat = record.category || t("common.noCategory");
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categories)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3);

    // Status analysis
    const statuses = records.reduce((acc, record) => {
      const status = record.status || t("common.noStatus");
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topStatuses = Object.entries(statuses)
      .sort(([, a], [, b]) => (b as number) - (a as number))
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
  }, [records, t]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("excel.stats.title")}
        </h2>
        <p className="text-gray-600">
          {t("excel.stats.subtitle").replace(
            "{businessType}",
            analysis.businessType
          )}
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("excel.stats.totalRecords")}
          value={stats.total}
          subtitle={t("excel.stats.recordsProcessed")}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />

        <StatCard
          title={t("excel.stats.highPriority")}
          value={stats.highPriority}
          subtitle={t("excel.stats.readyToBuy")}
          icon={<Zap className="h-6 w-6" />}
          color="red"
          badge={{
            text: `${Math.round((stats.highPriority / stats.total) * 100)}%`,
            color: "bg-red-100 text-red-800",
          }}
        />

        <StatCard
          title={t("excel.stats.potentialValue")}
          value={`${stats.potentialRevenue.toLocaleString()}`}
          subtitle={t("excel.stats.basedOnInvestment")}
          icon={<DollarSign className="h-6 w-6" />}
          color="green"
        />

        <StatCard
          title={t("excel.stats.conversionPotential")}
          value={`${stats.conversionPotential}%`}
          subtitle={t("excel.stats.estimatedProbability")}
          icon={<Target className="h-6 w-6" />}
          color="purple"
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              {t("excel.stats.priorityBreakdown")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {t("excel.table.highPriorityFilter")}
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
                    {t("excel.table.mediumPriorityFilter")}
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
                    {t("excel.table.lowPriorityFilter")}
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

        {/* Category Analysis */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              {stats.topCategories.length > 0
                ? t("common.mainCategories")
                : t("common.mainStatuses")}
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
                    {count as number} {t("common.record")}
                    {(count as number) !== 1 ? "s" : ""}
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
            {t("excel.stats.specificInsights").replace(
              "{businessType}",
              analysis.businessType
            )}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                {t("excel.stats.immediateRecommendation")}
              </h4>
              <p className="text-sm text-purple-800">
                {stats.highPriority > 0
                  ? t("excel.stats.highPriorityDesc").replace(
                      "{count}",
                      stats.highPriority.toString()
                    )
                  : t("excel.stats.mediumPriorityDesc").replace(
                      "{count}",
                      stats.mediumPriority.toString()
                    )}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-900">
                {t("excel.stats.opportunityDetected")}
              </h4>
              <p className="text-sm text-purple-800">
                {t("excel.stats.conversionImprovement").replace(
                  "{rate}",
                  (stats.conversionPotential + 15).toString()
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveStats; // src/components/freebies/miniApp-excel/AdaptiveStats.tsx
