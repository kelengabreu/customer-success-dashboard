import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Star, DollarSign, RefreshCw } from "lucide-react";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export const OverviewSection = () => {
  const { data, loading, error, refreshData } = useSupabaseData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando dados do Supabase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar dados: {error}</p>
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  const { clientes, analytics } = data;
  const clientesAtivos = clientes.filter((c: any) => c.status === 'Ativo');
  const totalClientes = clientes.length;
  
  // Cálculo NPS
  const clientesComNPS = data.nps || [];
  const promotores = clientesComNPS.filter((r: any) => r.nota >= 9).length;
  const detratores = clientesComNPS.filter((r: any) => r.nota <= 6).length;
  const npsScore = clientesComNPS.length > 0 
    ? Math.round(((promotores - detratores) / clientesComNPS.length) * 100)
    : 0;

  const receitaMensal = clientesAtivos.reduce((sum: number, c: any) => sum + (c.valor_mensal || 0), 0);

  const clientesPorPlano = clientesAtivos.reduce((acc: any, cliente: any) => {
    acc[cliente.plano] = (acc[cliente.plano] || 0) + 1;
    return acc;
  }, {});

  const clientesPorSegmento = clientesAtivos.reduce((acc: any, cliente: any) => {
    acc[cliente.segmento] = (acc[cliente.segmento] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Visão Geral da Carteira</h2>
          <p className="text-gray-600">Dados em tempo real do Supabase</p>
        </div>
        <Button onClick={refreshData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Clientes Ativos"
          value={clientesAtivos.length}
          subtitle={`${Math.round((clientesAtivos.length/totalClientes)*100)}% da base total`}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        
        <MetricCard
          title="Receita Mensal"
          value={`R$ ${receitaMensal.toLocaleString('pt-BR')}`}
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
            {Object.entries(clientesPorPlano).map(([plano, quantidade]: [string, any]) => (
              <div key={plano} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={plano === 'Enterprise' ? 'default' : 'secondary'}>
                    {plano}
                  </Badge>
                  <span className="text-sm text-gray-600">{quantidade} clientes</span>
                </div>
                <Progress 
                  value={(quantidade / clientesAtivos.length) * 100} 
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
            {Object.entries(clientesPorSegmento).map(([segmento, quantidade]: [string, any]) => (
              <div key={segmento}  className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {segmento}
                  </Badge>
                  <span className="text-sm text-gray-600">{quantidade} clientes</span>
                </div>
                <Progress 
                  value={(quantidade / clientesAtivos.length) * 100} 
                  className="w-20"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes Ativos - Dados Reais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Cliente</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Plano</th>
                  <th className="text-left p-2">Segmento</th>
                  <th className="text-left p-2">Usuários Ativos</th>
                  <th className="text-left p-2">Valor Mensal</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {clientesAtivos.map((cliente: any) => (
                  <tr key={cliente.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{cliente.nome}</td>
                    <td className="p-2 text-gray-600">{cliente.email}</td>
                    <td className="p-2">
                      <Badge variant={cliente.plano === 'Enterprise' ? 'default' : 'secondary'}>
                        {cliente.plano}
                      </Badge>
                    </td>
                    <td className="p-2">{cliente.segmento}</td>
                    <td className="p-2">
                      {cliente.usuarios_ativos}/{cliente.usuarios_habilitados}
                      <span className="text-gray-500 ml-1">
                        ({Math.round((cliente.usuarios_ativos/cliente.usuarios_habilitados)*100)}%)
                      </span>
                    </td>
                    <td className="p-2">R$ {cliente.valor_mensal?.toLocaleString('pt-BR')}</td>
                    <td className="p-2">
                      <Badge variant={cliente.status === 'Ativo' ? 'default' : 'secondary'}>
                        {cliente.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {clientesAtivos.length === 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="text-center p-8">
            <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-yellow-700 mb-4">
              Execute o script SQL no Supabase para inserir dados de exemplo
            </p>
            <Button onClick={refreshData} variant="outline">
              Verificar Novamente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};