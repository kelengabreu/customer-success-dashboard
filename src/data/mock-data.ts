import { Cliente, MetricasUso, AlertaRisco, TicketSuporte, StatusOnboarding, DadosChurn } from '@/types/customer-success';

export const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'TechCorp Ltda',
    plano: 'Enterprise',
    segmento: 'Grande',
    dataContrato: '2023-01-15',
    status: 'Ativo',
    valorMensal: 2500,
    usuariosHabilitados: 50,
    usuariosAtivos: 45,
    ultimoLogin: '2024-01-15',
    nps: 9,
    inadimplencia: 0
  },
  {
    id: '2',
    nome: 'StartupXYZ',
    plano: 'Profissional',
    segmento: 'Pequeno',
    dataContrato: '2023-06-10',
    status: 'Ativo',
    valorMensal: 800,
    usuariosHabilitados: 15,
    usuariosAtivos: 8,
    ultimoLogin: '2024-01-10',
    nps: 7,
    inadimplencia: 15
  },
  {
    id: '3',
    nome: 'MediumBiz Inc',
    plano: 'Profissional',
    segmento: 'Médio',
    dataContrato: '2023-03-20',
    status: 'Ativo',
    valorMensal: 1200,
    usuariosHabilitados: 25,
    usuariosAtivos: 12,
    ultimoLogin: '2023-12-20',
    nps: 4,
    inadimplencia: 45
  },
  {
    id: '4',
    nome: 'SmallCo',
    plano: 'Básico',
    segmento: 'Pequeno',
    dataContrato: '2023-09-05',
    status: 'Ativo',
    valorMensal: 400,
    usuariosHabilitados: 8,
    usuariosAtivos: 7,
    ultimoLogin: '2024-01-14',
    nps: 8,
    inadimplencia: 0
  }
];

export const mockMetricasUso: MetricasUso[] = [
  { clienteId: '1', modulo: 'Dashboard', acessos: 150, tempoUso: 300, data: '2024-01-15' },
  { clienteId: '1', modulo: 'Relatórios', acessos: 80, tempoUso: 200, data: '2024-01-15' },
  { clienteId: '1', modulo: 'Configurações', acessos: 20, tempoUso: 50, data: '2024-01-15' },
  { clienteId: '2', modulo: 'Dashboard', acessos: 45, tempoUso: 90, data: '2024-01-10' },
  { clienteId: '2', modulo: 'Relatórios', acessos: 15, tempoUso: 30, data: '2024-01-10' },
  { clienteId: '3', modulo: 'Dashboard', acessos: 25, tempoUso: 40, data: '2023-12-20' },
  { clienteId: '4', modulo: 'Dashboard', acessos: 60, tempoUso: 120, data: '2024-01-14' },
];

export const mockAlertas: AlertaRisco[] = [
  {
    clienteId: '3',
    cliente: 'MediumBiz Inc',
    tipo: 'Churn',
    severidade: 'Alta',
    descricao: 'Cliente com inadimplência >30 dias e baixo uso',
    impacto: 1200,
    dataDeteccao: '2024-01-15'
  },
  {
    clienteId: '2',
    cliente: 'StartupXYZ',
    tipo: 'Baixo Uso',
    severidade: 'Média',
    descricao: 'Apenas 53% dos usuários ativos',
    impacto: 800,
    dataDeteccao: '2024-01-14'
  }
];

export const mockTickets: TicketSuporte[] = [
  {
    id: 'T001',
    clienteId: '1',
    categoria: 'Técnico',
    status: 'Resolvido',
    prioridade: 'Alta',
    dataAbertura: '2024-01-10',
    dataResolucao: '2024-01-11',
    resolvidoPrimeiroContato: false
  },
  {
    id: 'T002',
    clienteId: '2',
    categoria: 'Funcionalidade',
    status: 'Em Andamento',
    prioridade: 'Média',
    dataAbertura: '2024-01-12',
    resolvidoPrimeiroContato: false
  },
  {
    id: 'T003',
    clienteId: '4',
    categoria: 'Onboarding',
    status: 'Resolvido',
    prioridade: 'Baixa',
    dataAbertura: '2024-01-08',
    dataResolucao: '2024-01-08',
    resolvidoPrimeiroContato: true
  }
];

export const mockOnboarding: StatusOnboarding[] = [
  {
    clienteId: '1',
    cliente: 'TechCorp Ltda',
    status: 'Concluído',
    progresso: 100,
    diasAtivacao: 7,
    dataInicio: '2023-01-15'
  },
  {
    clienteId: '2',
    cliente: 'StartupXYZ',
    status: 'Concluído',
    progresso: 100,
    diasAtivacao: 14,
    dataInicio: '2023-06-10'
  },
  {
    clienteId: '3',
    cliente: 'MediumBiz Inc',
    status: 'Concluído',
    progresso: 100,
    diasAtivacao: 21,
    dataInicio: '2023-03-20'
  },
  {
    clienteId: '4',
    cliente: 'SmallCo',
    status: 'Em Andamento',
    progresso: 75,
    dataInicio: '2023-09-05'
  }
];

export const mockChurn: DadosChurn[] = [
  {
    clienteId: 'C001',
    cliente: 'ExCliente A',
    dataCancelamento: '2023-12-15',
    valorPerdido: 1500,
    motivo: 'Preço',
    acaoRetencao: 'Desconto oferecido - recusado'
  },
  {
    clienteId: 'C002',
    cliente: 'ExCliente B',
    dataCancelamento: '2023-11-20',
    valorPerdido: 600,
    motivo: 'Funcionalidade'
  }
];