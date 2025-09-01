import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Customer Success
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Plataforma integrada para gestão do sucesso do cliente - iuli.com.br
          </p>
          
          <Button 
            onClick={() => navigate('/customer-success')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Acessar Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visão Geral</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Indicadores da carteira de clientes, NPS e receita recorrente
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Taxa de login, funcionalidades mais usadas e adoção
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Clientes em risco de churn e alertas de baixo uso
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relatórios</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Onboarding, suporte, churn e análises estratégicas
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Funcionalidades Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📊 Dashboard Completo</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Visão geral da carteira de clientes</li>
                  <li>• Cálculo automático de NPS</li>
                  <li>• Métricas de engajamento e adoção</li>
                  <li>• Alertas de risco de churn</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔗 Integração com iuli</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API pronta para conexão</li>
                  <li>• Sincronização automática de dados</li>
                  <li>• Pesquisa NPS embebida</li>
                  <li>• Relatórios estratégicos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Sistema desenvolvido para integração com a plataforma iuli.com.br
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/customer-success')}>
              Ver Demonstração
            </Button>
            <Button variant="outline">
              Documentação da API
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;