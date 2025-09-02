-- ==================== CLIENTES ====================
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  plano VARCHAR CHECK (plano IN ('Básico', 'Profissional', 'Enterprise')) NOT NULL,
  segmento VARCHAR CHECK (segmento IN ('Pequeno', 'Médio', 'Grande')) NOT NULL,
  data_contrato DATE NOT NULL,
  status VARCHAR CHECK (status IN ('Ativo', 'Inativo', 'Cancelado')) DEFAULT 'Ativo',
  valor_mensal DECIMAL(10,2) NOT NULL DEFAULT 0,
  usuarios_habilitados INTEGER DEFAULT 0,
  usuarios_ativos INTEGER DEFAULT 0,
  ultimo_login TIMESTAMP,
  inadimplencia INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== MÉTRICAS DE USO ====================
CREATE TABLE IF NOT EXISTS metricas_uso (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  modulo VARCHAR NOT NULL,
  acessos INTEGER DEFAULT 0,
  tempo_uso INTEGER DEFAULT 0, -- em minutos
  data DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== NPS RESPOSTAS ====================
CREATE TABLE IF NOT EXISTS nps_respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  nota INTEGER CHECK (nota >= 0 AND nota <= 10) NOT NULL,
  comentario TEXT,
  data_resposta TIMESTAMP DEFAULT NOW()
);

-- ==================== TICKETS DE SUPORTE ====================
CREATE TABLE IF NOT EXISTS tickets_suporte (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  titulo VARCHAR NOT NULL,
  descricao TEXT,
  categoria VARCHAR CHECK (categoria IN ('Técnico', 'Financeiro', 'Funcionalidade', 'Onboarding')) NOT NULL,
  status VARCHAR CHECK (status IN ('Aberto', 'Em Andamento', 'Resolvido', 'Fechado')) DEFAULT 'Aberto',
  prioridade VARCHAR CHECK (prioridade IN ('Alta', 'Média', 'Baixa')) DEFAULT 'Média',
  data_abertura TIMESTAMP DEFAULT NOW(),
  data_resolucao TIMESTAMP,
  resolvido_primeiro_contato BOOLEAN DEFAULT FALSE
);

-- ==================== STATUS ONBOARDING ====================
CREATE TABLE IF NOT EXISTS status_onboarding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE UNIQUE,
  status VARCHAR CHECK (status IN ('Em Andamento', 'Concluído', 'Bloqueado')) DEFAULT 'Em Andamento',
  progresso INTEGER CHECK (progresso >= 0 AND progresso <= 100) DEFAULT 0,
  dias_ativacao INTEGER,
  data_inicio DATE NOT NULL,
  data_conclusao DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== LOGS DE ATIVIDADE ====================
CREATE TABLE IF NOT EXISTS logs_atividade (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  usuario_email VARCHAR,
  acao VARCHAR NOT NULL,
  detalhes JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- ==================== ÍNDICES PARA PERFORMANCE ====================
CREATE INDEX IF NOT EXISTS idx_clientes_status ON clientes(status);
CREATE INDEX IF NOT EXISTS idx_clientes_plano ON clientes(plano);
CREATE INDEX IF NOT EXISTS idx_metricas_uso_cliente_data ON metricas_uso(cliente_id, data);
CREATE INDEX IF NOT EXISTS idx_nps_cliente ON nps_respostas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_tickets_cliente_status ON tickets_suporte(cliente_id, status);
CREATE INDEX IF NOT EXISTS idx_onboarding_cliente ON status_onboarding(cliente_id);

-- ==================== RLS (ROW LEVEL SECURITY) ====================
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_uso ENABLE ROW LEVEL SECURITY;
ALTER TABLE nps_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets_suporte ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs_atividade ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajuste conforme necessário)
CREATE POLICY "Permitir leitura para usuários autenticados" ON clientes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir leitura para usuários autenticados" ON metricas_uso
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir leitura para usuários autenticados" ON nps_respostas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir leitura para usuários autenticados" ON tickets_suporte
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir leitura para usuários autenticados" ON status_onboarding
  FOR SELECT USING (auth.role() = 'authenticated');

-- ==================== FUNÇÕES ÚTEIS ====================

-- Função para calcular NPS
CREATE OR REPLACE FUNCTION calcular_nps(cliente_uuid UUID DEFAULT NULL)
RETURNS INTEGER AS $$
DECLARE
  promotores INTEGER;
  detratores INTEGER;
  total INTEGER;
BEGIN
  IF cliente_uuid IS NULL THEN
    SELECT COUNT(*) INTO promotores FROM nps_respostas WHERE nota >= 9;
    SELECT COUNT(*) INTO detratores FROM nps_respostas WHERE nota <= 6;
    SELECT COUNT(*) INTO total FROM nps_respostas;
  ELSE
    SELECT COUNT(*) INTO promotores FROM nps_respostas WHERE cliente_id = cliente_uuid AND nota >= 9;
    SELECT COUNT(*) INTO detratores FROM nps_respostas WHERE cliente_id = cliente_uuid AND nota <= 6;
    SELECT COUNT(*) INTO total FROM nps_respostas WHERE cliente_id = cliente_uuid;
  END IF;
  
  IF total = 0 THEN
    RETURN 0;
  END IF;
  
  RETURN ROUND(((promotores - detratores)::DECIMAL / total) * 100);
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar último login
CREATE OR REPLACE FUNCTION atualizar_ultimo_login(cliente_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE clientes 
  SET ultimo_login = NOW() 
  WHERE id = cliente_uuid;
END;
$$ LANGUAGE plpgsql;

-- ==================== DADOS DE EXEMPLO ====================
-- Inserir alguns dados de exemplo para testar
INSERT INTO clientes (nome, email, plano, segmento, data_contrato, valor_mensal, usuarios_habilitados, usuarios_ativos, ultimo_login, inadimplencia) VALUES
('TechCorp Ltda', 'contato@techcorp.com', 'Enterprise', 'Grande', '2023-01-15', 2500.00, 50, 45, '2024-01-15 10:30:00', 0),
('StartupXYZ', 'admin@startupxyz.com', 'Profissional', 'Pequeno', '2023-06-10', 800.00, 15, 8, '2024-01-10 14:20:00', 15),
('MediumBiz Inc', 'suporte@mediumbiz.com', 'Profissional', 'Médio', '2023-03-20', 1200.00, 25, 12, '2023-12-20 09:15:00', 45),
('SmallCo', 'info@smallco.com', 'Básico', 'Pequeno', '2023-09-05', 400.00, 8, 7, '2024-01-14 16:45:00', 0);

-- Inserir dados de onboarding
INSERT INTO status_onboarding (cliente_id, status, progresso, dias_ativacao, data_inicio, data_conclusao)
SELECT 
  id,
  CASE 
    WHEN nome = 'SmallCo' THEN 'Em Andamento'
    ELSE 'Concluído'
  END,
  CASE 
    WHEN nome = 'SmallCo' THEN 75
    ELSE 100
  END,
  CASE 
    WHEN nome = 'TechCorp Ltda' THEN 7
    WHEN nome = 'StartupXYZ' THEN 14
    WHEN nome = 'MediumBiz Inc' THEN 21
    ELSE NULL
  END,
  data_contrato,
  CASE 
    WHEN nome != 'SmallCo' THEN data_contrato + INTERVAL '14 days'
    ELSE NULL
  END
FROM clientes;