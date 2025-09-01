import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Star, DollarSign } from "lucide-react";
import { mockClientes } from "@/data/mock-data";

export const OverviewSection = () => {
  const clientesAtivos = mockClientes.filter(c => c.status === 'Ativo').length;
  const totalClientes = mockClientes.length;
  const receitaMensal = mockClientes
    .filter(c => c.status === 'Ativo')
    .reduce((sum, c) => sum + c.valorMensal, 0);
  
  // Cálculo NPS
  const clientesComNPS = mockClientes.filter(c => c.nps !== undefined);
  const promotores = clientesComNPS.filter(c => c.nps! >= 9).length;
  const detratores = clientesComNPS.filter(c => c.nps! <= 6).length;
  const npsScore = clientesComNPS.length > 0 
    ? Math.round(((promotores - detratores) / clientesComNPS.length) * 100)
    : 0;

  const clientesPorPlano = mockClientes.reduce((acc, cliente) => {
    if (cliente.status === 'Ativo') {
      acc[cliente.plano] = (acc[cliente.plano] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const clientesPorSegmento = mockClientes.reduce((acc, cliente) => {
    if (cliente.status === 'Ativo') {
      acc[cliente.segmento] = (acc[cliente.segmento] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Visão Geral da Carteira</h2>
        <p className="text-gray-600">Indicadores principais da base de clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes Ativos"
          value={clientesAtivos}
          subtitle={`${Math.round((clientesAtivos/totalClientes)*100)}% da base total`}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        
        <MetricCard
          title="Receita Mensal"
          value={`R$ ${receitaMensal.toLocaleString()}`}
          subtitle="Receita recorrente"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricCard
          title="NPS Score"
          value={npsScore}
          subtitle={`${clientesComNPS.length} respostas`}
          icon={Star}
          trend={{ value: 5, isPositive: true }}
        />
        
        <MetricCard
          title="Taxa de Crescimento"
          value="+15%"
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
            {Object.entries(clientesPorPlano).map(([plano, quantidade]) => (
              <div key={plano} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={plano === 'Enterprise' ? 'default' : 'secondary'}>
                    {plano}
                  </Badge>
                  <span className="text-sm text-gray-600">{quantidade} clientes</span>
                </div>
                <Progress 
                  value={(quantidade / clientesAtivos) * 100} 
                  className="w-20"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Segmento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(clientesPorSegmento).map(([segmento, quantidade]) => (
              <div key={segmento} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {segmento}
                  </Badge>
                  <span className="text-sm text-gray-600">{quantidade} clientes</span>
                </div>
                <Progress 
                  value={(quantidade / clientesAtivos) * 100} 
                  className="w-20"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes Ativos - Detalhamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Cliente</th>
                  <th className="text-left p-2">Plano</th>
                  <th className="text-left p-2">Segmento</th>
                  <th className="text-left p-2">Usuários Ativos</th>
                  <th className="text-left p-2">NPS</th>
                  <th className="text-left p-2">Valor Mensal</th>
                </tr>
              </thead>
              <tbody>
                {mockClientes.filter(c => c.status === 'Ativo').map((cliente) => (
                  <tr key={cliente.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{cliente.nome}</td>
                    <td className="p-2">
                      <Badge variant={cliente.plano === 'Enterprise' ? 'default' : 'secondary'}>
                        {cliente.plano}
                      </Badge>
                    </td>
                    <td className="p-2">{cliente.segmento}</td>
                    <td className="p-2">
                      {cliente.usuariosAtivos}/{cliente.usuariosHabilitados}
                      <span className="text-gray-500 ml-1">
                        ({Math.round((cliente.usuariosAtivos/cliente.usuariosHabilitados)*100)}%)
                      </span>
                    </td>
                    <td className="p-2">
                      {cliente.nps ? (
                        <Badge variant={cliente.nps >= 9 ? 'default' : cliente.nps >= 7 ? 'secondary' : 'destructive'}>
                          {cliente.nps}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-2">R$ {cliente.valorMensal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};