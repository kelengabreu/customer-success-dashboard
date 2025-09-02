const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.iuli.com.br';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('cs_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Clientes
  async getClientes() {
    return this.request('/api/customers');
  }

  async getClienteById(id: string) {
    return this.request(`/api/customers/${id}`);
  }

  // Métricas de Uso
  async getMetricasUso(clienteId?: string, periodo?: string) {
    const params = new URLSearchParams();
    if (clienteId) params.append('cliente_id', clienteId);
    if (periodo) params.append('periodo', periodo);
    
    return this.request(`/api/usage-metrics?${params}`);
  }

  // NPS
  async getNpsRespostas() {
    return this.request('/api/nps/responses');
  }

  async enviarNps(clienteId: string, nota: number, comentario?: string) {
    return this.request('/api/nps/submit', {
      method: 'POST',
      body: JSON.stringify({ cliente_id: clienteId, nota, comentario }),
    });
  }

  // Tickets de Suporte
  async getTickets() {
    return this.request('/api/support/tickets');
  }

  // Logs de Login
  async getLogsLogin(periodo?: string) {
    const params = periodo ? `?periodo=${periodo}` : '';
    return this.request(`/api/auth/login-logs${params}`);
  }

  // Status Financeiro
  async getStatusFinanceiro() {
    return this.request('/api/billing/status');
  }
}

export const apiService = new ApiService();