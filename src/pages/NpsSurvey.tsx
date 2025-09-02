import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export const NpsSurvey = () => {
  const [nota, setNota] = useState<number | null>(null);
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async () => {
    if (nota === null) return;

    try {
      const clienteId = new URLSearchParams(window.location.search).get('client_id');
      
      await fetch('/api/nps/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: clienteId,
          nota,
          comentario
        })
      });

      setEnviado(true);
    } catch (error) {
      console.error('Erro ao enviar NPS:', error);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold mb-2">Obrigado!</h2>
            <p className="text-gray-600">Sua avaliação foi enviada com sucesso.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Como você avalia nossa plataforma?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Em uma escala de 0 a 10, o quanto você recomendaria nosso sistema?
            </p>
            
            <div className="grid grid-cols-11 gap-1">
              {Array.from({ length: 11 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setNota(i)}
                  className={`
                    h-10 rounded text-sm font-medium transition-colors
                    ${nota === i 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {i}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Não recomendaria</span>
              <span>Recomendaria totalmente</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentários (opcional)
            </label>
            <Textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Conte-nos mais sobre sua experiência..."
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={nota === null}
            className="w-full"
          >
            Enviar Avaliação
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};