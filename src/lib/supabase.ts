import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para as tabelas
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  plano: 'Básico' | 'Profissional' | 'Enterprise';
  segmento: 'Pequeno' | 'Médio' | 'Grande';
  data_contrato: string;
  status: 'Ativo' | 'Inativo' | 'Cancelado';
  valor_mensal: number;
  usuarios_habilitados: number;
  usuarios_ativos: number;
  ultimo_login: string;
  inadimplencia: number;
  created_at: string;
}

export interface MetricaUso {
  id: string;
  cliente_id: string;
  modulo: string;
  acessos: number;
  tempo_uso: number;
  data: string;
  created_at: string;
}

export interface NpsResposta {
  id: string;
  cliente_id: string;
  nota: number;
  comentario?: string;
  data_resposta: string;
}

export interface TicketSuporte {
  id: string;
  cliente_id: string;
  categoria: 'Técnico' | 'Financeiro' | 'Funcionalidade' | 'Onboarding';
  status: 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';
  prioridade: 'Alta' | 'Média' | 'Baixa';
  data_abertura: string;
  data_resolucao?: string;
  resolvido_primeiro_contato: boolean;
  titulo: string;
  descricao: string;
}

export interface StatusOnboarding {
  id: string;
  cliente_id: string;
  status: 'Em Andamento' | 'Concluído' | 'Bloqueado';
  progresso: number;
  dias_ativacao?: number;
  data_inicio: string;
  data_conclusao?: string;
}