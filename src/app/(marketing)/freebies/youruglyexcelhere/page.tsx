// src/app/freebie/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExcelUploader, {
  ProcessedLead,
} from "@/components/freebies/miniApp-excel/ExcelUploader";
import PreviewStats from "@/components/freebies/miniApp-excel/PreviewStats";
import LeadPreviewTable from "@/components/freebies/miniApp-excel/LeadPreviewTable";
import LeadDetailPreview from "@/components/freebies/miniApp-excel/LeadDetailPreview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Upload,
  BarChart3,
  Users,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Star,
  Zap,
  Terminal,
  Code2,
  Cpu,
  Database,
  FileSpreadsheet,
} from "lucide-react";

type ViewState = "upload" | "overview" | "table" | "detail";

const CRMFreebiePage: React.FC = () => {
  const [leads, setLeads] = useState<ProcessedLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<ProcessedLead | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>("upload");
  const [error, setError] = useState<string | null>(null);

  const handleDataProcessed = (processedLeads: ProcessedLead[]) => {
    setLeads(processedLeads);
    setCurrentView("overview");
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleLeadSelect = (lead: ProcessedLead) => {
    setSelectedLead(lead);
    setCurrentView("detail");
  };

  const handleReset = () => {
    setLeads([]);
    setSelectedLead(null);
    setCurrentView("upload");
    setError(null);
  };

  const NavigationTabs = () => {
    if (leads.length === 0) return null;

    const tabs = [
      {
        id: "overview",
        label: "Neural Analysis",
        icon: BarChart3,
        count: null,
      },
      {
        id: "table",
        label: "Lead Matrix",
        icon: Users,
        count: leads.length,
      },
    ];

    return (
      <motion.div
        className="flex items-center justify-between mb-8 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-2 bg-[#0f0f0f]/90 backdrop-blur-md p-2 rounded-xl border border-green-500/20 ">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as ViewState)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === tab.id
                    ? "bg-green-500/20 text-green-300 border border-green-500/40"
                    : "text-gray-400 hover:text-green-300 hover:bg-green-500/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count && (
                  <Badge className="ml-1 bg-green-500/20 text-green-300 border-green-500/30">
                    {tab.count}
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 mt-20">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-green-500/30 text-green-300 hover:bg-green-500/10 hover:border-green-400/50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Load Another Excel
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold"
            >
              <Zap className="h-4 w-4 mr-2" />
              Get Full CRM
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const Header = () => (
    <motion.div
      className="text-center space-y-6 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-10 w-10 text-green-400" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-emerald-400 bg-clip-text text-transparent">
          Excel → CRM Magic
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Watch your{" "}
        <span className="text-green-400 font-semibold">ugly spreadsheet</span>{" "}
        transform into
        <span className="text-white font-semibold">
          {" "}
          professional lead intelligence
        </span>
      </p>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-6 py-3 text-base">
          🔒 Zero Storage - Pure Browser Magic
        </Badge>
      </motion.div>
    </motion.div>
  );

  const ProcessingSteps = () => {
    if (currentView === "upload") return null;

    const steps = [
      {
        id: "upload",
        label: "Data Ingested",
        icon: CheckCircle,
        status: "completed",
        description: `${leads.length} leads processed`,
      },
      {
        id: "analysis",
        label: "AI Analysis",
        icon: CheckCircle,
        status: leads.length > 0 ? "completed" : "pending",
        description: "Neural prioritization complete",
      },
      {
        id: "organization",
        label: "Matrix Organized",
        icon: CheckCircle,
        status:
          currentView === "overview" ||
          currentView === "table" ||
          currentView === "detail"
            ? "completed"
            : "pending",
        description: "Professional structure applied",
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className={`p-3 rounded-full ${
                          step.status === "completed"
                            ? "bg-green-500 text-black"
                            : "bg-gray-600 text-gray-400"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={
                          step.status === "completed"
                            ? { scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <div className="font-semibold text-green-200 text-lg">
                          {step.label}
                        </div>
                        <div className="text-sm text-green-400">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: index * 0.3, duration: 0.5 }}
                        className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-green-400 mx-4"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Circuit Board Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(34, 197, 94, 0.08) 19px, rgba(34, 197, 94, 0.08) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.08) 39px, rgba(34, 197, 94, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(34, 197, 94, 0.08) 19px, rgba(34, 197, 94, 0.08) 20px, transparent 20px, transparent 39px, rgba(34, 197, 94, 0.08) 39px, rgba(34, 197, 94, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(16, 185, 129, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(16, 185, 129, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Code2 className="h-8 w-8 text-green-400/30" />
      </motion.div>
      <motion.div
        className="absolute top-32 right-16"
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Terminal className="h-6 w-6 text-emerald-400/40" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20"
        animate={{ rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      >
        <Cpu className="h-10 w-10 text-green-300/20" />
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">System Error:</span>
                    {error}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Steps */}
        <ProcessingSteps />

        {/* Navigation */}
        <NavigationTabs />

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {currentView === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <ExcelUploader
                onDataProcessed={handleDataProcessed}
                onError={handleError}
              />

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: BarChart3,
                    title: "Neural Analysis",
                    description:
                      "AI-powered lead prioritization based on conversion probability",
                    color: "text-green-400",
                  },
                  {
                    icon: Database,
                    title: "Professional Structure",
                    description:
                      "Transform chaos into enterprise-grade lead organization",
                    color: "text-blue-400",
                  },
                  {
                    icon: Eye,
                    title: "Deep Insights",
                    description:
                      "X-ray vision into each lead with actionable intelligence",
                    color: "text-purple-400",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="text-center p-8 bg-white/5 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
                      <motion.div
                        className={`h-16 w-16 mx-auto mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="h-full w-full" />
                      </motion.div>
                      <h3 className="font-bold text-white mb-3 text-xl group-hover:text-green-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <PreviewStats leads={leads} />
            </motion.div>
          )}

          {currentView === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto"
            >
              <LeadPreviewTable leads={leads} onLeadSelect={handleLeadSelect} />
            </motion.div>
          )}

          {currentView === "detail" && selectedLead && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <LeadDetailPreview
                lead={selectedLead}
                onBack={() => setCurrentView("table")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <AnimatePresence>
        {leads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative z-10 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm border-t border-green-500/20 py-20 mt-20"
          >
            <div className="container mx-auto px-4 text-center space-y-8">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="h-10 w-10 text-yellow-400 fill-current" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                  Mind = Blown?
                </h2>
              </motion.div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                This is just{" "}
                <span className="text-green-400 font-bold">10%</span> of our
                CRM's power. Imagine having this{" "}
                <span className="text-white font-bold">
                  intelligent automation
                </span>{" "}
                running your business 24/7.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                {[
                  "🤖 Full Automation",
                  "📱 WhatsApp Integration",
                  "🔄 Auto Follow-ups",
                  "📊 Advanced Analytics",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-6 py-3 text-lg font-medium">
                      {feature}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 text-lg"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Get Personal Demo
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500/50 text-green-300 hover:bg-green-500/10 px-8 py-4 text-lg"
                  >
                    See Full CRM Pricing
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0a0a0a] border-t border-green-500/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
              debake.fun
            </span>
          </motion.div>
          <p className="text-gray-400 mb-6 text-lg">
            Where spreadsheet chaos becomes lead intelligence
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            {["Terms", "Privacy", "Contact"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="text-gray-500 hover:text-green-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CRMFreebiePage;
