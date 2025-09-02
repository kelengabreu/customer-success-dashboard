import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

export const GoogleLoginButton = ({ onSuccess }: GoogleLoginButtonProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: 300,
          text: 'signin_with',
          shape: 'rectangular',
        });
      }
    };

    const handleCredentialResponse = async (response: any) => {
      try {
        await login(response.credential);
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Customer Success Dashboard",
        });
        onSuccess?.();
      } catch (error) {
        toast({
          title: "Erro no login",
          description: error instanceof Error ? error.message : "Erro desconhecido",
          variant: "destructive",
        });
      }
    };

    // Carregar o script do Google se não estiver carregado
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, [login, toast, onSuccess]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={googleButtonRef}></div>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Faça login com sua conta Google para acessar o dashboard
        </p>
        <p className="text-xs text-gray-500">
          Domínios autorizados: gmail.com, iuli.com.br, outlook.com, hotmail.com
        </p>
      </div>
    </div>
  );
};