import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { BarChart3, Shield, Users, TrendingUp } from "lucide-react";

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-10 w-10 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Success</h1>
                <p className="text-sm text-gray-500">Sistema iuli</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Acesso Seguro ao Dashboard
          </h2>
          <p className="text-gray-600">
            Faça login para acessar as métricas e relatórios do Customer Success
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Login Seguro</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <GoogleLoginButton />
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <Users className="h-6 w-6 text-blue-600 mx-auto" />
            <p className="text-xs text-gray-600">Gestão de Clientes</p>
          </div>
          <div className="space-y-2">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto" />
            <p className="text-xs text-gray-600">Métricas de Sucesso</p>
          </div>
          <div className="space-y-2">
            <BarChart3 className="h-6 w-6 text-purple-600 mx-auto" />
            <p className="text-xs text-gray-600">Relatórios Avançados</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Sistema integrado com iuli.com.br
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Protegido por autenticação Google OAuth 2.0
          </p>
        </div>
      </div>
    </div>
  );
};