import { useState, useEffect } from 'react';
import { supabaseService } from '@/services/supabase-service';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseData = () => {
  const [data, setData] = useState({
    clientes: [],
    metricas: [],
    nps: [],
    tickets: [],
    onboarding: [],
    analytics: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [clientes, metricas, nps, tickets, onboarding] = await Promise.all([
        supabaseService.getClientes(),
        supabaseService.getMetricasUso(),
        supabaseService.getNpsRespostas(),
        supabaseService.getTickets(),
        supabaseService.getStatusOnboarding()
      ]);

      const analytics = await supabaseService.getAnalyticsDashboard();

      setData({
        clientes,
        metricas,
        nps,
        tickets,
        onboarding,
        analytics
      });

      console.log('Dados carregados do Supabase:', {
        clientes: clientes.length,
        metricas: metricas.length,
        nps: nps.length,
        tickets: tickets.length
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados';
      setError(errorMessage);
      console.error('Erro ao carregar dados do Supabase:', err);
      
      toast({
        title: "Erro ao carregar dados",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadData();
  };

  // Funções para operações específicas
  const criarCliente = async (clienteData: any) => {
    try {
      const novoCliente = await supabaseService.criarCliente(clienteData);
      await refreshData();
      
      toast({
        title: "Cliente criado",
        description: `${novoCliente.nome} foi adicionado com sucesso`,
      });
      
      return novoCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cliente';
      toast({
        title: "Erro ao criar cliente",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const enviarNps = async (clienteId: string, nota: number, comentario?: string) => {
    try {
      const resposta = await supabaseService.enviarNps({
        cliente_id: clienteId,
        nota,
        comentario
      });
      
      await refreshData();
      
      toast({
        title: "NPS enviado",
        description: "Obrigado pelo seu feedback!",
      });
      
      return resposta;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar NPS';
      toast({
        title: "Erro ao enviar NPS",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const criarTicket = async (ticketData: any) => {
    try {
      const novoTicket = await supabaseService.criarTicket(ticketData);
      await refreshData();
      
      toast({
        title: "Ticket criado",
        description: `Ticket #${novoTicket.id.slice(0, 8)} foi criado`,
      });
      
      return novoTicket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar ticket';
      toast({
        title: "Erro ao criar ticket",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    refreshData,
    criarCliente,
    enviarNps,
    criarTicket
  };
};