import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  FileText, 
  Home,
  TrendingUp,
  Settings
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: Home },
  { id: 'engagement', label: 'Adoção & Engajamento', icon: TrendingUp },
  { id: 'alerts', label: 'Alertas & Riscos', icon: AlertTriangle },
  { id: 'reports', label: 'Relatórios', icon: FileText },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Customer Success</h1>
            <p className="text-sm text-gray-500">Sistema iuli</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors",
                activeSection === item.id 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                  : "text-gray-700"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-600">
            Integração com iuli.com.br
          </p>
          <p className="text-xs text-green-600 mt-1">
            ● API Conectada
          </p>
        </div>
      </div>
    </div>
  );
};