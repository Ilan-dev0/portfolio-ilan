# Plano de Implementação: Sistema de Rastreamento de Usuários

## 1. Resumo dos Requisitos

*   **Página de Cibersegurança:** Manter como página separada (`/cyber`, `/cybersecurity`) com layout e estilo atuais. Nenhuma ação de codificação necessária na estrutura.
*   **Sistema de Rastreamento:** Implementar a coleta dos seguintes dados do usuário:
    *   Endereço IP
    *   Localização geográfica aproximada (derivada do IP)
    *   Tipo de dispositivo (desktop, mobile)
    *   Navegador
    *   Páginas visitadas dentro do portfólio
    *   Tempo gasto em cada página
    *   **Objetivo:** Demonstrar tecnicamente a coleta e o processamento dessas informações para fins de portfólio em cibersegurança.

## 2. Plano Detalhado

```mermaid
graph TD
    subgraph Frontend (React App)
        A[Visita do Usuário] --> B(Carregamento da Página);
        B --> C{Componente de Rastreamento Global};
        C --> D[Detectar Navegador/Dispositivo];
        C --> E[Detectar Mudança de Rota (useLocation)];
        C --> F[Registrar Início de Visita à Página (Timestamp)];
        E --> G[Registrar Fim de Visita à Página Anterior (Timestamp)];
        G --> H[Calcular Tempo na Página];
        F --> I[Coletar Dados (Navegador, Dispositivo, Rota Atual)];
        H --> I;
        I --> J(Enviar Dados para Backend);
        J -- POST /api/track --> K((Backend));
        L[Evento 'beforeunload'/'visibilitychange'] --> M[Registrar Fim da Última Visita];
        M --> H;
    end

    subgraph Backend (Node.js/Express + MySQL)
        K --> N[Endpoint POST /api/track];
        N --> O{Receber Dados do Frontend};
        O --> P[Extrair IP do Requisitante];
        P --> Q[Chamar API de Geolocalização Externa];
        Q --> R[Obter Dados Geo (Cidade, País, etc.)];
        O --> S[Receber (Dispositivo, Navegador, Rota, Tempo)];
        P & R & S --> T[Formatar Dados Completos];
        T --> U[Salvar no Banco de Dados MySQL];
        U --> V((DB));

        W[Endpoint GET /api/tracking-data] --> X[Buscar Dados de Rastreamento do DB];
        X --> Y((DB));
        X --> Z[Enviar Dados para Admin Dashboard];
    end

    subgraph Admin Dashboard (React)
        AA[Carregar Dashboard] --> BB[Chamar GET /api/tracking-data];
        BB --> Z;
        Z --> CC[Receber Dados de Rastreamento];
        CC --> DD[Exibir Dados em Tabela/Gráfico];
    end

    subgraph Banco de Dados (MySQL)
        V --> EE[Tabela 'user_tracking'];
        EE -- Colunas --> FF(id, ip_address, country, city, region, device_type, browser_name, visited_page, time_spent_seconds, timestamp);
        Y --> EE;
    end
```

## 3. Passos de Implementação

1.  **Backend - Configuração:**
    *   Verificar `src/server/index.js` e `src/config/database.js`.
    *   Criar tabela `user_tracking` no MySQL com colunas: `id`, `ip_address`, `country`, `city`, `region`, `device_type`, `browser_name`, `visited_page`, `time_spent_seconds`, `timestamp`.
2.  **Backend - API de Geolocalização:**
    *   Escolher e configurar serviço (ex: ip-api.com, ipstack). Obter chave de API se necessário.
3.  **Backend - Endpoint de Coleta (`POST /api/track`):**
    *   Receber dados, obter IP, chamar API Geo, inserir no DB.
4.  **Frontend - Lógica de Rastreamento:**
    *   Criar componente/hook global.
    *   Usar `navigator.userAgent`.
    *   Usar `useEffect`, `useLocation`.
    *   Calcular tempo gasto.
    *   Enviar dados para `/api/track` (via `fetch`/`axios`) na mudança de rota e `beforeunload`/`visibilitychange`.
5.  **Backend - Endpoint de Exibição (`GET /api/tracking-data`):**
    *   Consultar DB e retornar dados. Proteger se necessário.
6.  **Frontend - Admin Dashboard (`src/components/AdminDashboard.jsx`):**
    *   Chamar `/api/tracking-data`.
    *   Exibir dados.
7.  **Considerações Éticas:**
    *   Adicionar aviso sobre coleta de dados para demonstração.

## 4. Próximos Passos

*   Implementar as funcionalidades descritas acima no modo "Code".