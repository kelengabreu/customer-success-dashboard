export interface Cliente {
  id: string;
  nome: string;
  plano: 'Básico' | 'Profissional' | 'Enterprise';
  segmento: 'Pequeno' | 'Médio' | 'Grande';
  dataContrato: string;
  status: 'Ativo' | 'Inativo' | 'Cancelado';
  valorMensal: number;
  usuariosHabilitados: number;
  usuariosAtivos: number;
  ultimoLogin: string;
  nps?: number;
  inadimplencia: number; // dias
}

export interface MetricasUso {
  clienteId: string;
  modulo: string;
  acessos: number;
  tempoUso: number; // minutos
  data: string;
}

export interface AlertaRisco {
  clienteId: string;
  cliente: string;
  tipo: 'Churn' | 'Baixo Uso' | 'Inadimplência' | 'Sem Interação';
  severidade: 'Alta' | 'Média' | 'Baixa';
  descricao: string;
  impacto: number; // valor em R$
  dataDeteccao: string;
}

export interface TicketSuporte {
  id: string;
  clienteId: string;
  categoria: 'Técnico' | 'Financeiro' | 'Funcionalidade' | 'Onboarding';
  status: 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';
  prioridade: 'Alta' | 'Média' | 'Baixa';
  dataAbertura: string;
  dataResolucao?: string;
  resolvidoPrimeiroContato: boolean;
}

export interface StatusOnboarding {
  clienteId: string;
  cliente: string;
  status: 'Em Andamento' | 'Concluído' | 'Bloqueado';
  progresso: number; // 0-100
  diasAtivacao?: number;
  dataInicio: string;
}

export interface DadosChurn {
  clienteId: string;
  cliente: string;
  dataCancelamento: string;
  valorPerdido: number;
  motivo: 'Preço' | 'Funcionalidade' | 'Suporte' | 'Concorrência' | 'Outros';
  acaoRetencao?: string;
}