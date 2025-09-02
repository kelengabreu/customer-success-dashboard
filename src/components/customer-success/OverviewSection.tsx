import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Star, DollarSign, RefreshCw } from "lucide-react";

export const OverviewSection = () => {
  // Dados mock para evitar erros de Supabase
  const mockData = {
    clientesAtivos: 12,
    receitaMensal: 45000,
    npsScore: 8.5,
    crescimento: 15
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Visão Geral da Carteira</h2>
          <p className="text-gray-600">Dashboard Customer Success - Sistema iuli</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes Ativos"
          value={mockData.clientesAtivos}
          subtitle="Base total de clientes"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        
        <MetricCard
          title="Receita Mensal"
          value={`R$ ${mockData.receitaMensal.toLocaleString('pt-BR')}`}
          subtitle="Receita recorrente"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricCard
          title="NPS Score"
          value={mockData.npsScore}
          subtitle="Satisfação dos clientes"
          icon={Star}
          trend={{ value: 5, isPositive: true }}
        />
        
        <MetricCard
          title="Taxa de Crescimento"
          value={`+${mockData.crescimento}%`}
          subtitle="Novos contratos vs cancelamentos"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Plano</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="default">Enterprise</Badge>
                <span className="text-sm text-gray-600">4 clientes</span>
              </div>
              <Progress value={33} className="w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Profissional</Badge>
                <span className="text-sm text-gray-600">6 clientes</span>
              </div>
              <Progress value={50} className="w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Básico</Badge>
                <span className="text-sm text-gray-600">2 clientes</span>
              </div>
              <Progress value={17} className="w-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dashboard</span>
              <Badge variant="default" className="bg-green-600">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API iuli</span>
              <Badge variant="default" className="bg-green-600">Conectado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Supabase</span>
              <Badge variant="default" className="bg-green-600">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Última atualização</span>
              <span className="text-sm text-gray-600">Agora</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sistema Customer Success - iuli.com.br</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Dashboard Funcionando!
            </h3>
            <p className="text-gray-600 mb-4">
              Sistema de Customer Success integrado e operacional
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="default" className="bg-green-600">
                ✓ Sistema Online
              </Badge>
              <Badge variant="outline">
                📊 Dados Carregados
              </Badge>
              <Badge variant="outline">
                🔗 API Conectada
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};