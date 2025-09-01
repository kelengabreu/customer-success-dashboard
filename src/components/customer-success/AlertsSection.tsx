import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, DollarSign, Clock, Users } from "lucide-react";
import { mockAlertas, mockClientes } from "@/data/mock-data";

export const AlertsSection = () => {
  // Clientes em risco de churn
  const clientesRiscoChurn = mockClientes.filter(cliente => {
    const diasSemLogin = Math.floor((new Date().getTime() - new Date(cliente.ultimoLogin).getTime()) / (1000 * 60 * 60 * 24));
    const taxaUso = (cliente.usuariosAtivos / cliente.usuariosHabilitados) * 100;
    
    return cliente.inadimplencia > 30 || taxaUso < 40 || diasSemLogin > 30;
  });

  // Clientes sem interação
  const clientesSemInteracao = mockClientes.filter(cliente => {
    const diasSemLogin = Math.floor((new Date().getTime() - new Date(cliente.ultimoLogin).getTime()) / (1000 * 60 * 60 * 24));
    return diasSemLogin > 30;
  });

  const impactoTotal = clientesRiscoChurn.reduce((sum, cliente) => sum + cliente.valorMensal, 0);
  const alertasAlta = mockAlertas.filter(a => a.severidade === 'Alta').length;

  const getSeverityColor = (severidade: string) => {
    switch (severidade) {
      case 'Alta': return 'destructive';
      case 'Média': return 'default';
      case 'Baixa': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRiskLevel = (cliente: any) => {
    const diasSemLogin = Math.floor((new Date().getTime() - new Date(cliente.ultimoLogin).getTime()) / (1000 * 60 * 60 * 24));
    const taxaUso = (cliente.usuariosAtivos / cliente.usuariosHabilitados) * 100;
    
    if (cliente.inadimplencia > 30 && taxaUso < 40) return 'Crítico';
    if (cliente.inadimplencia > 30 || taxaUso < 40 || diasSemLogin > 30) return 'Alto';
    return 'Médio';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alertas & Riscos</h2>
        <p className="text-gray-600">Monitoramento de clientes em risco de churn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes em Risco"
          value={clientesRiscoChurn.length}
          subtitle="Requer atenção imediata"
          icon={AlertTriangle}
          className="border-red-200 bg-red-50"
        />
        
        <MetricCard
          title="Impacto Financeiro"
          value={`R$ ${impactoTotal.toLocaleString()}`}
          subtitle="Receita em risco"
          icon={DollarSign}
          className="border-orange-200 bg-orange-50"
        />
        
        <MetricCard
          title="Sem Interação"
          value={clientesSemInteracao.length}
          subtitle=">30 dias sem login"
          icon={Clock}
        />
        
        <MetricCard
          title="Alertas Críticos"
          value={alertasAlta}
          subtitle="Severidade alta"
          icon={Users}
          className={alertasAlta > 0 ? "border-red-200 bg-red-50" : ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Alertas Ativos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAlertas.length > 0 ? (
              mockAlertas.map((alerta, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{alerta.cliente}</h4>
                      <p className="text-sm text-gray-600">{alerta.descricao}</p>
                    </div>
                    <Badge variant={getSeverityColor(alerta.severidade) as any}>
                      {alerta.severidade}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      Impacto: R$ {alerta.impacto.toLocaleString()}
                    </span>
                    <span className="text-gray-500">
                      {new Date(alerta.dataDeteccao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Criar Ação de Retenção
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhum alerta ativo</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking de Risco por Impacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientesRiscoChurn
                .sort((a, b) => b.valorMensal - a.valorMensal)
                .map((cliente, index) => {
                  const riskLevel = getRiskLevel(cliente);
                  const diasSemLogin = Math.floor((new Date().getTime() - new Date(cliente.ultimoLogin).getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={cliente.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{cliente.nome}</h4>
                          <p className="text-sm text-gray-600">{cliente.plano}</p>
                        </div>
                        <Badge variant={riskLevel === 'Crítico' ? 'destructive' : 'default'}>
                          {riskLevel}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>Valor: R$ {cliente.valorMensal.toLocaleString()}</div>
                        <div>Inadimplência: {cliente.inadimplencia} dias</div>
                        <div>Taxa uso: {Math.round((cliente.usuariosAtivos/cliente.usuariosHabilitados)*100)}%</div>
                        <div>Sem login: {diasSemLogin} dias</div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        Ação Imediata
                      </Button>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {clientesSemInteracao.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Clock className="h-5 w-5" />
              <span>Clientes Sem Interação Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Último Login</th>
                    <th className="text-left p-2">Dias Inativo</th>
                    <th className="text-left p-2">Valor Mensal</th>
                    <th className="text-left p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesSemInteracao.map((cliente) => {
                    const diasSemLogin = Math.floor((new Date().getTime() - new Date(cliente.ultimoLogin).getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={cliente.id} className="border-b border-yellow-100">
                        <td className="p-2 font-medium">{cliente.nome}</td>
                        <td className="p-2">
                          {new Date(cliente.ultimoLogin).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-2">
                          <Badge variant={diasSemLogin > 60 ? 'destructive' : 'default'}>
                            {diasSemLogin} dias
                          </Badge>
                        </td>
                        <td className="p-2">R$ {cliente.valorMensal.toLocaleString()}</td>
                        <td className="p-2">
                          <Button size="sm" variant="outline">
                            Reengajar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};