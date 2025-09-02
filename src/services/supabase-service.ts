import { supabase } from '@/lib/supabase';
import type { Cliente, MetricaUso, NpsResposta, TicketSuporte, StatusOnboarding } from '@/lib/supabase';

export class SupabaseService {
  // ==================== CLIENTES ====================
  
  async getClientes() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Cliente[];
  }

  async getClienteById(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Cliente;
  }

  async criarCliente(cliente: Omit<Cliente, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select()
      .single();
    
    if (error) throw error;
    return data as Cliente;
  }

  async atualizarCliente(id: string, updates: Partial<Cliente>) {
    const { data, error } = await supabase
      .from('clientes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Cliente;
  }

  // ==================== MÉTRICAS DE USO ====================
  
  async getMetricasUso(clienteId?: string, periodo?: string) {
    let query = supabase
      .from('metricas_uso')
      .select(`
        *,
        clientes (nome)
      `);

    if (clienteId) {
      query = query.eq('cliente_id', clienteId);
    }

    if (periodo) {
      const dataInicio = new Date();
      dataInicio.setDate(dataInicio.getDate() - parseInt(periodo));
      query = query.gte('data', dataInicio.toISOString().split('T')[0]);
    }

    const { data, error } = await query.order('data', { ascending: false });
    
    if (error) throw error;
    return data as MetricaUso[];
  }

  async registrarUso(metrica: Omit<MetricaUso, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('metricas_uso')
      .insert([metrica])
      .select()
      .single();
    
    if (error) throw error;
    return data as MetricaUso;
  }

  // ==================== NPS ====================
  
  async getNpsRespostas(clienteId?: string) {
    let query = supabase
      .from('nps_respostas')
      .select(`
        *,
        clientes (nome)
      `);

    if (clienteId) {
      query = query.eq('cliente_id', clienteId);
    }

    const { data, error } = await query.order('data_resposta', { ascending: false });
    
    if (error) throw error;
    return data as NpsResposta[];
  }

  async enviarNps(nps: Omit<NpsResposta, 'id' | 'data_resposta'>) {
    const { data, error } = await supabase
      .from('nps_respostas')
      .insert([{
        ...nps,
        data_resposta: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as NpsResposta;
  }

  // ==================== TICKETS DE SUPORTE ====================
  
  async getTickets(clienteId?: string) {
    let query = supabase
      .from('tickets_suporte')
      .select(`
        *,
        clientes (nome)
      `);

    if (clienteId) {
      query = query.eq('cliente_id', clienteId);
    }

    const { data, error } = await query.order('data_abertura', { ascending: false });
    
    if (error) throw error;
    return data as TicketSuporte[];
  }

  async criarTicket(ticket: Omit<TicketSuporte, 'id' | 'data_abertura'>) {
    const { data, error } = await supabase
      .from('tickets_suporte')
      .insert([{
        ...ticket,
        data_abertura: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as TicketSuporte;
  }

  async atualizarTicket(id: string, updates: Partial<TicketSuporte>) {
    const { data, error } = await supabase
      .from('tickets_suporte')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as TicketSuporte;
  }

  // ==================== ONBOARDING ====================
  
  async getStatusOnboarding(clienteId?: string) {
    let query = supabase
      .from('status_onboarding')
      .select(`
        *,
        clientes (nome)
      `);

    if (clienteId) {
      query = query.eq('cliente_id', clienteId);
    }

    const { data, error } = await query.order('data_inicio', { ascending: false });
    
    if (error) throw error;
    return data as StatusOnboarding[];
  }

  async atualizarOnboarding(clienteId: string, updates: Partial<StatusOnboarding>) {
    const { data, error } = await supabase
      .from('status_onboarding')
      .update(updates)
      .eq('cliente_id', clienteId)
      .select()
      .single();
    
    if (error) throw error;
    return data as StatusOnboarding;
  }

  // ==================== ANALYTICS ====================
  
  async getAnalyticsDashboard() {
    // Buscar dados agregados para o dashboard
    const [clientes, metricas, nps, tickets] = await Promise.all([
      this.getClientes(),
      this.getMetricasUso(),
      this.getNpsRespostas(),
      this.getTickets()
    ]);

    return {
      clientes,
      metricas,
      nps,
      tickets,
      // Cálculos agregados
      totalClientes: clientes.length,
      clientesAtivos: clientes.filter(c => c.status === 'Ativo').length,
      receitaMensal: clientes
        .filter(c => c.status === 'Ativo')
        .reduce((sum, c) => sum + c.valor_mensal, 0),
      npsScore: this.calcularNPS(nps)
    };
  }

  private calcularNPS(respostas: NpsResposta[]): number {
    if (respostas.length === 0) return 0;
    
    const promotores = respostas.filter(r => r.nota >= 9).length;
    const detratores = respostas.filter(r => r.nota <= 6).length;
    
    return Math.round(((promotores - detratores) / respostas.length) * 100);
  }
}

export const supabaseService = new SupabaseService();