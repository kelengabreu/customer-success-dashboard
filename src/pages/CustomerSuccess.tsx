import { useState } from "react";
import { Sidebar } from "@/components/customer-success/Sidebar";
import { OverviewSection } from "@/components/customer-success/OverviewSection";
import { EngagementSection } from "@/components/customer-success/EngagementSection";
import { AlertsSection } from "@/components/customer-success/AlertsSection";
import { ReportsSection } from "@/components/customer-success/ReportsSection";
import { SettingsSection } from "@/components/customer-success/SettingsSection";

const CustomerSuccess = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "engagement":
        return <EngagementSection />;
      case "alerts":
        return <AlertsSection />;
      case "reports":
        return <ReportsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default CustomerSuccess;