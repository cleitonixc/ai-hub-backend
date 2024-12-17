# Modelagem detalhada da base de dados considerando o cenário multi-tenant e utilizando uma arquitetura híbrida com **PostgreSQL** (para dados relacionais e críticos de negócio) e **MongoDB** (para armazenamento flexível de documentos, histórico de interações, textos extensos e outras informações não-estruturadas).

## Visão Geral da Arquitetura de Dados

- **PostgreSQL (Dados Relacionais):**  
  - Tabelas para controlar Distribuidores (tenants), Usuários, Planos de Uso, Assinaturas de Planos, Modelos LLM, Configurações específicas e Metadados.
  - Garantia de integridade referencial, chaves estrangeiras, índices e desempenho em consultas estruturadas.
  - Ideal para operações transacionais (cadastro de usuários, associações de planos, controle de limites).

- **MongoDB (Dados Não-estruturados e Interações):**  
  - Coleções para armazenar as interações (perguntas e respostas da IA) em formato de documentos, facilitando armazenamento de textos longos, histórico, logs e metadados dinâmicos.
  - Flexibilidade para adicionar campos conforme a necessidade (ex.: diferentes tipos de metadados, prompts, parâmetros específicos da LLM).
  - Consulta textuais, indexação de texto, fácil escalabilidade horizontal.

## PostgreSQL: Tabelas e Estrutura

### 1. Distribuidor  
Representa o tenant (cliente da IXCsoft).

**Tabela:** `distribuidor`  
**Colunas:**  
- `distribuidor_id (PK, SERIAL ou UUID)`  
- `nome_distribuidor (VARCHAR)`  
- `contato (VARCHAR opcional)`  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

### 2. Usuario  
Usuários finais pertencem a um único distribuidor.

**Tabela:** `usuario`  
**Colunas:**  
- `usuario_id (PK, SERIAL ou UUID)`  
- `distribuidor_id (FK → distribuidor.distribuidor_id)`  
- `nome_usuario (VARCHAR)`  
- `email (VARCHAR opcional)`  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

**Índices:**  
- Index em `(distribuidor_id, usuario_id)` para agilizar buscas por tenant.

### 3. Plano_de_Uso  
Define limites e características de uso. Pode ser global (distribuidor_id nulo) ou específico de um distribuidor.

**Tabela:** `plano_de_uso`  
**Colunas:**  
- `plano_id (PK, SERIAL ou UUID)`  
- `distribuidor_id (FK, NULLABLE)` se nulo, plano global  
- `nome_plano (VARCHAR)`  
- `limite_requisicoes_mes (INT)`  
- `descricao_plano (TEXT opcional)`  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

### 4. Assinatura_Plano  
Liga um usuário a um plano específico. Guarda quantas requisições já foram utilizadas no mês.

**Tabela:** `assinatura_plano`  
**Colunas:**  
- `assinatura_id (PK, SERIAL ou UUID)`  
- `usuario_id (FK → usuario.usuario_id)`  
- `plano_id (FK → plano_de_uso.plano_id)`  
- `distribuidor_id (FK → distribuidor.distribuidor_id)`  
- `data_inicio (TIMESTAMP)`  
- `data_fim (TIMESTAMP opcional)`  
- `requisicoes_utilizadas_mes (INT)`  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

### 5. LLM_Modelo  
Lista os modelos de IA disponíveis. Pode ser global ou específico de um distribuidor.

**Tabela:** `llm_modelo`  
**Colunas:**  
- `llm_id (PK, SERIAL ou UUID)`  
- `distribuidor_id (FK, NULLABLE)` se nulo, é global  
- `nome_modelo (VARCHAR)`  
- `descricao_modelo (TEXT opcional)`  
- `fornecedor (VARCHAR)` (ex: "OpenAI")  
- `tipo_acesso (VARCHAR)` (ex: "cloud" ou "on-premise")  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

### 6. Configuracao_LLM (Opcional)  
Armazena credenciais e parâmetros específicos (como chaves de API) por distribuidor e modelo.

**Tabela:** `configuracao_llm`  
**Colunas:**  
- `config_llm_id (PK, SERIAL ou UUID)`  
- `distribuidor_id (FK → distribuidor.distribuidor_id)`  
- `llm_id (FK → llm_modelo.llm_id)`  
- `chave_api (VARCHAR ou TEXT)`  
- `limite_tokens (INT opcional)`  
- `parametros_extras (JSONB opcional)`  
- `criado_em (TIMESTAMP, DEFAULT NOW())`  
- `atualizado_em (TIMESTAMP, DEFAULT NOW())`

**Observação:** O uso de `JSONB` no PostgreSQL permite armazenar configurações extras de forma flexível, embora a maioria dos dados permaneça estruturada.

---

## MongoDB: Coleções e Estrutura

No MongoDB, armazenaremos principalmente as **Interações**, já que são dados potencialmente volumosos, não-estruturados e variáveis. Também podemos armazenar logs ou históricos complementares caso necessário.

### Coleção: `interacoes`

**Estrutura de Documento (Exemplo):**  
```json
{
  "interacao_id": "<UUID ou ObjectId>",
  "distribuidor_id": "<referência ao distribuidor>",
  "usuario_id": "<referência ao usuário>",
  "assinatura_id": "<referência à assinatura no Postgres>",
  "llm_id": "<referência ao modelo>",
  "timestamp": "<Data/hora da interação>",
  "conteudo_pergunta": "Texto completo da pergunta",
  "conteudo_resposta": "Texto completo da resposta da IA",
  "metadados": {
    "tokens_utilizados": 123,
    "tempo_resposta_ms": 250,
    "parametros_prompt": {
       "temperatura": 0.7,
       "max_tokens": 1000
    }
  }
}
```

**Considerações:**

- Cada documento representa uma interação única (uma requisição/resposta).  
- `distribuidor_id`, `usuario_id`, `assinatura_id`, `llm_id` armazenados como strings (UUIDs) ou IDs correspondentes do PostgreSQL.  
- O MongoDB não tem FK nativa, mas referenciamos o `distribuidor_id` e o `usuario_id` para filtrar dados logicamente.  
- Podem ser criados **índices** em campos como `distribuidor_id`, `usuario_id` e `timestamp` para consultas eficientes:
  - Índice em `{distribuidor_id: 1, usuario_id: 1, timestamp: -1}` permite obter interações recentes de um usuário específico de um determinado tenant.
  - Índices textuais em `conteudo_pergunta` ou `conteudo_resposta` podem ajudar em buscas por palavras-chave.

### Possíveis Outras Coleções no MongoDB

- **`logs_sistema` (opcional):** Armazena logs de eventos, erros ou monitoramento.  
- **`historico_ajustes` (opcional):** Registra mudanças de planos, upgrades, downgrades feitas pelo distribuidor ou administrador.

---

## Fluxo de Dados Entre PostgreSQL e MongoDB

1. Quando um usuário final faz uma requisição:
   - O backend autentica o usuário (dados no PostgreSQL).
   - Verifica o plano e o limite de uso (dados no PostgreSQL).
   - Envia a solicitação ao LLM (configurações e modelo no PostgreSQL, chaves e parâmetros em `configuracao_llm`).
   - Ao receber a resposta, salva a interação (pergunta/resposta) no MongoDB, incluindo o `distribuidor_id`, `usuario_id`, `assinatura_id` e `llm_id`.

2. Consultas para relatórios ou análise:
   - Dados básicos (quantos usuários, quais planos, quais modelos disponíveis) vêm do PostgreSQL.  
   - Histórico de interações e análise de uso detalhada (quantidade de requisições, conteúdo das perguntas e respostas) vem do MongoDB.

3. O administrador, distribuidor ou usuário final pode solicitar estatísticas:
   - O backend realiza consultas no PostgreSQL para obter os dados de planos, limites e configurações.  
   - Para detalhes do uso (quantas interações, conteúdo médio), o backend consulta o MongoDB, agregando dados conforme necessário.

---

## Benefícios da Abordagem Híbrida

- **PostgreSQL:**  
  - Garantia de integridade dos dados de identidade, planos e configurações.  
  - Consultas SQL estruturadas para relatórios de alto nível.  
  - Consistência no controle de acesso e limites por tenant.

- **MongoDB:**  
  - Armazenamento flexível de interações, que podem variar de tamanho e estrutura.  
  - Facilidade em lidar com grandes volumes de dados textuais (perguntas, respostas).  
  - Indexação flexível, possibilitando buscas textuais e análise ad-hoc de histórico.