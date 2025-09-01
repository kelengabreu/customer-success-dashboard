import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Headphones, TrendingDown } from "lucide-react";
import { mockOnboarding, mockTickets, mockChurn, mockClientes } from "@/data/mock-data";

export const ReportsSection = () => {
  // Cálculos para Onboarding
  const tempoMedioAtivacao = mockOnboarding
    .filter(o => o.diasAtivacao)
    .reduce((sum, o) => sum + (o.diasAtivacao || 0), 0) / 
    mockOnboarding.filter(o => o.diasAtivacao).length;

  // Cálculos para Suporte
  const ticketsResolvidos = mockTickets.filter(t => t.status === 'Resolvido').length;
  const ticketsPrimeiroContato = mockTickets.filter(t => t.resolvidoPrimeiroContato).length;
  const taxaResolucaoPrimeiroContato = (ticketsPrimeiroContato / mockTickets.length) * 100;

  const ticketsPorCategoria = mockTickets.reduce((acc, ticket) => {
    acc[ticket.categoria] = (acc[ticket.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Cálculos para Churn
  const valorTotalPerdido = mockChurn.reduce((sum, c) => sum + c.valorPerdido, 0);
  const motivosChurn = mockChurn.reduce((acc, c) => {
    acc[c.motivo] = (acc[c.motivo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'default';
      case 'Em Andamento': return 'secondary';
      case 'Bloqueado': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta': return 'destructive';
      case 'Média': return 'default';
      case 'Baixa': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatórios Estratégicos</h2>
        <p className="text-gray-600">Análises detalhadas de onboarding, suporte e churn</p>
      </div>

      <Tabs defaultValue="onboarding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="onboarding" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Onboarding</span>
          </TabsTrigger>
          <TabsTrigger value="suporte" className="flex items-center space-x-2">
            <Headphones className="h-4 w-4" />
            <span>Suporte</span>
          </TabsTrigger>
          <TabsTrigger value="churn" className="flex items-center space-x-2">
            <TrendingDown className="h-4 w-4" />
            <span>Churn & Retenção</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Tempo Médio de Ativação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(tempoMedioAtivacao)} dias
                </div>
                <p className="text-xs text-gray-500 mt-1">Meta: 14 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Conclusão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((mockOnboarding.filter(o => o.status === 'Concluído').length / mockOnboarding.length) * 100)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {mockOnboarding.filter(o => o.status === 'Concluído').length} de {mockOnboarding.length} clientes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Clientes em Andamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {mockOnboarding.filter(o => o.status === 'Em Andamento').length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Requer acompanhamento</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status de Onboarding por Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOnboarding.map((onboarding) => (
                  <div key={onboarding.clienteId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{onboarding.cliente}</h4>
                        <p className="text-sm text-gray-600">
                          Iniciado em {new Date(onboarding.dataInicio).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(onboarding.status) as any}>
                        {onboarding.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{onboarding.progresso}%</span>
                      </div>
                      <Progress value={onboarding.progresso} className="h-2" />
                    </div>
                    
                    {onboarding.diasAtivacao && (
                      <p className="text-sm text-gray-600 mt-2">
                        Ativado em {onboarding.diasAtivacao} dias
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suporte" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total de Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{mockTickets.length}</div>
                <p className="text-xs text-gray-500 mt-1">Este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Resolução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((ticketsResolvidos / mockTickets.length) * 100)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">{ticketsResolvidos} resolvidos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Primeiro Contato
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(taxaResolucaoPrimeiroContato)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">Resolução imediata</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  SLA Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">2.5h</div>
                <p className="text-xs text-gray-500 mt-1">Tempo de resposta</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tickets por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(ticketsPorCategoria).map(([categoria, quantidade]) => (
                  <div key={categoria} className="flex items-center justify-between">
                    <span className="font-medium">{categoria}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{quantidade}</span>
                      <Progress 
                        value={(quantidade / mockTickets.length) * 100} 
                        className="w-20"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tickets Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTickets.slice(0, 5).map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium">#{ticket.id}</span>
                          <p className="text-sm text-gray-600">{ticket.categoria}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant={getPriorityColor(ticket.prioridade) as any} className="text-xs">
                            {ticket.prioridade}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(ticket.dataAbertura).toLocaleDateString('pt-BR')}
                        {ticket.resolvidoPrimeiroContato && (
                          <span className="ml-2 text-green-600">• 1º contato</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="churn" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Cancelamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{mockChurn.length}</div>
                <p className="text-xs text-gray-500 mt-1">Últimos 3 meses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Valor Perdido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  R$ {valorTotalPerdido.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">Receita mensal perdida</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Taxa de Churn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((mockChurn.length / (mockClientes.length + mockChurn.length)) * 100)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">Mensal</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Motivos de Cancelamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(motivosChurn).map(([motivo, quantidade]) => (
                  <div key={motivo} className="flex items-center justify-between">
                    <span className="font-medium">{motivo}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{quantidade}</span>
                      <Progress 
                        value={(quantidade / mockChurn.length) * 100} 
                        className="w-20"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Cancelamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockChurn.map((churn, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium">{churn.cliente}</span>
                          <p className="text-sm text-gray-600">
                            R$ {churn.valorPerdido.toLocaleString()}/mês
                          </p>
                        </div>
                        <Badge variant="outline">
                          {churn.motivo}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Cancelado em {new Date(churn.dataCancelamento).toLocaleDateString('pt-BR')}
                      </p>
                      {churn.acaoRetencao && (
                        <p className="text-xs text-blue-600 mt-1">
                          Ação: {churn.acaoRetencao}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};