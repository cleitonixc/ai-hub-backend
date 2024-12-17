## Visão Geral da Arquitetura

A arquitetura pode ser dividida em três camadas principais:

1. **Camada de Apresentação (Frontend/UI)**  
2. **Camada de Aplicação (Backend/API)**  
3. **Camada de Dados e Serviços Externos**

Abaixo segue uma descrição detalhada de cada camada, seguida de um fluxograma conceitual.

### 1. Camada de Apresentação (Frontend/UI)
- **Cliente Web (Navegador do Usuário):**  
  Os usuários finais acessam o IXC AI Hub através de um portal web já existente da IXCsoft.
  
- **SPA (Single Page Application) com Framework de UI:**  
  Por exemplo, uma aplicação React ou Vue.js que roda no navegador do usuário.  
  Essa aplicação:
  - Oferece a interface estilo chat.  
  - Mostra um campo de texto para consultas, dropdown para seleção de LLM e botão “Enviar”.  
  - Apresenta o resultado retornado pelo backend.  
  - Exibe um contador de requisições e informações sobre planos de uso.  
  - Incorpora um tutorial ou FAQ básico.

### 2. Camada de Aplicação (Backend/API)
- **Gateway / Load Balancer (Opcional no MVP):**  
  Em cenários de maior escala, um balanceador de carga poderia distribuir o tráfego entre várias instâncias do backend. No MVP, pode ser opcional, mas é bom ter em mente.

- **Servidor de API (ex: Node.js com Express ou NestJS):**  
  Este servidor fornece endpoints RESTful ou GraphQL para o frontend consumir. Ele é responsável por:  
  - Receber requisições do frontend (texto do usuário, seleção de LLM, etc.).  
  - Autenticar o usuário (utilizando dados de login já existentes da IXCsoft, via tokens ou cookies).  
  - Encaminhar as requisições para a LLM selecionada (via API de terceiros ou modelo local).  
  - Aplicar a lógica de negócio:  
    - Verificar limites de requisições do plano do usuário.  
    - Registrar a interação no banco de dados.
  - Retornar as respostas da IA e dados de uso para o frontend.

- **Módulo de Integração com LLMs (Service Layer):**  
  Uma camada intermediária que abstrai a comunicação com múltiplas LLMs (por exemplo: GPT-4 via API da OpenAI, Llama 2 em um servidor separado).  
  Essa camada:  
  - Aceita uma requisição padronizada.  
  - Seleciona a LLM certa (conforme o parâmetro enviado).  
  - Lida com timeouts, erros de rede, formatação do prompt.  
  - Retorna a resposta pronta para a camada principal.

### 3. Camada de Dados e Serviços Externos
- **Banco de Dados (ex.: PostgreSQL):**  
  Armazena:  
  - Dados de usuários (limites de requisições, plano de uso).  
  - Registros de interações (perguntas e respostas).  
  - Estatísticas gerais para métricas e relatórios.  
  A comunicação é feita através do backend.

- **APIs de LLM Externas (ex.: OpenAI GPT-4):**  
  Onde as chamadas são feitas para obter as respostas de IA.  
  Também podem existir LLMs self-hosted em servidores internos da IXCsoft.

- **Serviços de Autenticação IXCsoft:**  
  Se o IXCsoft já possui um sistema de login, o backend reutiliza essas credenciais ou integra via API interna, garantindo uma experiência única de login.

### Segurança e Fluxo de Dados
- **Autenticação e Autorização:**  
  O frontend envia o token de autenticação (obtido do login no ecossistema IXCsoft) para o backend. O backend valida o token antes de processar a requisição.

- **Comunicação Segura (HTTPS):**  
  Todos os dados trafegam criptografados, evitando interceptação de informações sensíveis.

### Fluxo Conceitual

**Passo a Passo (Exemplo):**  
1. O usuário acessa o IXC AI Hub via navegador e loga no portal IXCsoft (se não estiver logado).  
2. A interface (Frontend) mostra uma caixa de chat. O usuário digita uma pergunta e seleciona, por exemplo, GPT-4.  
3. Ao clicar em “Enviar”, o frontend faz uma requisição HTTP segura (HTTPS) para o backend (API).  
4. O backend valida o token de usuário e verifica se o usuário ainda está dentro do limite diário de requisições.  
5. O backend chama o Módulo de Integração com LLMs, que se comunica com a API da OpenAI (ou outro provedor) passando o prompt do usuário.  
6. A OpenAI retorna a resposta gerada.  
7. O backend registra a interação no banco de dados (pergunta, resposta, modelo utilizado, horário, etc.).  
8. O backend retorna a resposta ao frontend.  
9. O frontend exibe a resposta no chat.  
10. Métricas de uso são atualizadas continuamente no backend e podem ser visualizadas pela equipe da IXCsoft internamente.

### Visualização Simplificada (em Texto):

```
[Usuário/Navegador] --(HTTPS)--> [Frontend React/Vue SPA] --(HTTPS)--> [API Backend Node.js] 
     |                             |                                 
     v                             v                                
   [Página Web IXC AI Hub]      [Autenticação c/ IXCsoft]            
                                     |                                  
                                     v                                  
                               [Banco de Dados (PostgreSQL)]    
                                     |
                                     v
                              [Módulo Integrador de LLMs]
                                     |
                              [APIs LLM (GPT-4, Llama 2)]
```

---

**Resumo:**  
A arquitetura proposta mantém camadas bem definidas: o frontend lida com a experiência do usuário; o backend gerencia a lógica de negócios, segurança e integração; o banco de dados guarda as informações; e as APIs de LLM entregam o “poder de IA”. Essa separação torna o sistema mais fácil de manter, evoluir e escalar conforme a demanda e as necessidades cresçam.