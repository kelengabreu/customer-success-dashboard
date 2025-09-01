import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Users, Zap, AlertCircle } from "lucide-react";
import { mockClientes, mockMetricasUso } from "@/data/mock-data";
import { useState } from "react";

export const EngagementSection = () => {
  const [filtroPlano, setFiltroPlano] = useState<string>("todos");

  const clientesFiltrados = filtroPlano === "todos" 
    ? mockClientes.filter(c => c.status === 'Ativo')
    : mockClientes.filter(c => c.status === 'Ativo' && c.plano === filtroPlano);

  // Cálculo da taxa de login média
  const taxaLoginMedia = clientesFiltrados.length > 0
    ? Math.round(clientesFiltrados.reduce((sum, c) => sum + (c.usuariosAtivos/c.usuariosHabilitados), 0) / clientesFiltrados.length * 100)
    : 0;

  // Funcionalidades mais utilizadas
  const funcionalidadesMaisUsadas = mockMetricasUso.reduce((acc, metrica) => {
    acc[metrica.modulo] = (acc[metrica.modulo] || 0) + metrica.acessos;
    return acc;
  }, {} as Record<string, number>);

  const rankingFuncionalidades = Object.entries(funcionalidadesMaisUsadas)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Clientes com baixo uso
  const clientesBaixoUso = clientesFiltrados.filter(cliente => {
    const taxaUsuarios = (cliente.usuariosAtivos / cliente.usuariosHabilitados) * 100;
    return taxaUsuarios < 30;
  });

  const totalUsuariosAtivos = clientesFiltrados.reduce((sum, c) => sum + c.usuariosAtivos, 0);
  const totalUsuariosHabilitados = clientesFiltrados.reduce((sum, c) => sum + c.usuariosHabilitados, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Adoção & Engajamento</h2>
          <p className="text-gray-600">Análise de uso e engajamento da plataforma</p>
        </div>
        
        <Select value={filtroPlano} onValueChange={setFiltroPlano}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por plano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os planos</SelectItem>
            <SelectItem value="Básico">Básico</SelectItem>
            <SelectItem value="Profissional">Profissional</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Taxa de Login Média"
          value={`${taxaLoginMedia}%`}
          subtitle={`${totalUsuariosAtivos}/${totalUsuariosHabilitados} usuários ativos`}
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
        />
        
        <MetricCard
          title="Clientes Ativos"
          value={clientesFiltrados.length}
          subtitle="Base filtrada"
          icon={Users}
        />
        
        <MetricCard
          title="Funcionalidades Ativas"
          value={rankingFuncionalidades.length}
          subtitle="Módulos em uso"
          icon={Zap}
        />
        
        <MetricCard
          title="Clientes Baixo Uso"
          value={clientesBaixoUso.length}
          subtitle="<30% usuários ativos"
          icon={AlertCircle}
          className={clientesBaixoUso.length > 0 ? "border-orange-200 bg-orange-50" : ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades Mais Utilizadas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rankingFuncionalidades.map(([modulo, acessos], index) => (
              <div key={modulo} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{modulo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{acessos} acessos</span>
                  <Progress 
                    value={(acessos / Math.max(...Object.values(funcionalidadesMaisUsadas))) * 100} 
                    className="w-16"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Adoção por Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {clientesFiltrados.map((cliente) => {
              const taxaAdocao = (cliente.usuariosAtivos / cliente.usuariosHabilitados) * 100;
              return (
                <div key={cliente.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{cliente.nome}</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(taxaAdocao)}%
                    </span>
                  </div>
                  <Progress value={taxaAdocao} className="h-2" />
                  <div className="text-xs text-gray-500">
                    {cliente.usuariosAtivos}/{cliente.usuariosHabilitados} usuários
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {clientesBaixoUso.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span>Clientes com Baixo Uso - Atenção Necessária</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="text-left p-2">Cliente</th>
                    <th className="text-left p-2">Plano</th>
                    <th className="text-left p-2">Taxa de Uso</th>
                    <th className="text-left p-2">Usuários Ativos</th>
                    <th className="text-left p-2">Último Login</th>
                    <th className="text-left p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesBaixoUso.map((cliente) => {
                    const taxaUso = (cliente.usuariosAtivos / cliente.usuariosHabilitados) * 100;
                    return (
                      <tr key={cliente.id} className="border-b border-orange-100">
                        <td className="p-2 font-medium">{cliente.nome}</td>
                        <td className="p-2">
                          <Badge variant="outline">{cliente.plano}</Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="destructive">
                            {Math.round(taxaUso)}%
                          </Badge>
                        </td>
                        <td className="p-2">
                          {cliente.usuariosAtivos}/{cliente.usuariosHabilitados}
                        </td>
                        <td className="p-2 text-gray-600">
                          {new Date(cliente.ultimoLogin).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-2">
                          <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                            Contatar CS
                          </Badge>
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