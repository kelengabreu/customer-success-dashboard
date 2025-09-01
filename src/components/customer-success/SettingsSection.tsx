import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings, Database, Link, Bell, Mail } from "lucide-react";
import { useState } from "react";

export const SettingsSection = () => {
  const [apiConfigs, setApiConfigs] = useState({
    iuli: { url: 'https://api.iuli.com.br', key: '****', status: 'Conectado' },
    crm: { url: '', key: '', status: 'Desconectado' },
    erp: { url: '', key: '', status: 'Desconectado' },
    suporte: { url: '', key: '', status: 'Desconectado' }
  });

  const [notifications, setNotifications] = useState({
    alertasChurn: true,
    relatoriosSemanal: true,
    npsRespostas: true,
    ticketsCriticos: true
  });

  const handleApiTest = (api: string) => {
    console.log(`Testando conexão com ${api}...`);
    // Aqui seria implementada a lógica real de teste de API
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurações</h2>
        <p className="text-gray-600">Configuração de integrações e preferências do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Integrações de API</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(apiConfigs).map(([key, config]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium capitalize">{key === 'iuli' ? 'Sistema iuli' : key.toUpperCase()}</Label>
                  <Badge variant={config.status === 'Conectado' ? 'default' : 'secondary'}>
                    {config.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`${key}-url`} className="text-xs text-gray-600">URL da API</Label>
                  <Input
                    id={`${key}-url`}
                    value={config.url}
                    onChange={(e) => setApiConfigs(prev => ({
                      ...prev,
                      [key]: { ...prev[key as keyof typeof prev], url: e.target.value }
                    }))}
                    placeholder="https://api.exemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`${key}-key`} className="text-xs text-gray-600">Chave da API</Label>
                  <Input
                    id={`${key}-key`}
                    type="password"
                    value={config.key}
                    onChange={(e) => setApiConfigs(prev => ({
                      ...prev,
                      [key]: { ...prev[key as keyof typeof prev], key: e.target.value }
                    }))}
                    placeholder="Sua chave de API"
                  />
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleApiTest(key)}
                  className="w-full"
                >
                  Testar Conexão
                </Button>
                
                {key !== 'iuli' && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Alertas de Churn</Label>
                  <p className="text-xs text-gray-600">Notificar quando clientes estão em risco</p>
                </div>
                <Switch
                  checked={notifications.alertasChurn}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, alertasChurn: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Relatório Semanal</Label>
                  <p className="text-xs text-gray-600">Resumo semanal por email</p>
                </div>
                <Switch
                  checked={notifications.relatoriosSemanal}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, relatoriosSemanal: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Respostas NPS</Label>
                  <p className="text-xs text-gray-600">Notificar novas respostas de NPS</p>
                </div>
                <Switch
                  checked={notifications.npsRespostas}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, npsRespostas: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Tickets Críticos</Label>
                  <p className="text-xs text-gray-600">Alertas para tickets de alta prioridade</p>
                </div>
                <Switch
                  checked={notifications.ticketsCriticos}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, ticketsCriticos: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <span>Pesquisa NPS Embebida</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Use este link para incorporar a pesquisa NPS diretamente no seu sistema iuli:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              https://nps.customersucess.iuli.com.br/survey?client_id=&#123;CLIENT_ID&#125;
            </code>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Código de Incorporação (iframe)</Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-xs text-gray-800 whitespace-pre-wrap">
{`<iframe 
  src="https://nps.customersucess.iuli.com.br/survey?client_id={CLIENT_ID}" 
  width="100%" 
  height="400" 
  frameborder="0">
</iframe>`}
              </code>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Mail className="h-4 w-4 mr-2" />
            Enviar Link por Email
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Processamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Frequência de Atualização</Label>
              <select className="w-full p-2 border rounded-md text-sm">
                <option value="daily">Diária (Recomendado)</option>
                <option value="hourly">A cada hora</option>
                <option value="weekly">Semanal</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Limite de Risco de Churn (%)</Label>
              <Input type="number" defaultValue="40" min="0" max="100" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dias para Alerta de Inatividade</Label>
              <Input type="number" defaultValue="30" min="1" max="365" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dias para Inadimplência Crítica</Label>
              <Input type="number" defaultValue="30" min="1" max="365" />
            </div>
          </div>
          
          <Button className="w-full">
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};