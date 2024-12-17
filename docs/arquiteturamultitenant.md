# Cenário multi-tenant (multi-inquilino), no qual múltiplos distribuidores (empresas/clientes da IXCsoft) compartilham a mesma infraestrutura, mas com isolamento de dados e configurações.

## Considerações de Multi-Tenancy

- **Isolamento de Dados:** Cada distribuidor (tenant) deve ter acesso apenas aos próprios usuários, assinaturas e interações.  
- **Configurações Personalizadas:** Planos de uso, limites e modelos de LLMs disponíveis podem variar de um distribuidor para outro.
- **Segurança e Autenticação Multi-Tenant:** O token de acesso do usuário deve conter a informação do tenant (distribuidor) para garantir que o backend filtre dados corretamente.
- **Escalabilidade:** A solução deve suportar facilmente a adição de novos distribuidores, mantendo a mesma estrutura sem exigir novas instâncias separadas do sistema.

## Camadas da Arquitetura Multi-Tenant

1. **Camada de Apresentação (Frontend/UI)**  
   - A interface continua sendo um SPA (ex.: React), porém:  
     - O usuário acessa o portal IXC AI Hub do seu distribuidor.  
     - A autenticação garante que o frontend conheça o `tenant_id` (distribuidor) atual, podendo apresentar a marca do distribuidor, planos ativos e recursos personalizados.
   
   - O frontend envia sempre o `tenant_id` (diretamente ou embutido no token) em cada requisição ao backend, garantindo que o backend possa aplicar filtros.

2. **Camada de Aplicação (Backend/API)**  
   - **Autenticação e Autorização Multi-Tenant:**  
     - O token de acesso inclui o `tenant_id`.  
     - Ao receber a requisição, o backend valida o token e extrai `tenant_id`, `usuario_id`, etc.
   
   - **Lógica de Negócio Multi-Tenant:**  
     - Os endpoints filtram dados sempre por `tenant_id`. Por exemplo, ao consultar interações, o backend executa queries com `WHERE distribuidor_id = :tenant_id`.
     - A definição de planos, limites e LLMs disponíveis pode ser diferente por tenant. Ao buscar planos ou modelos disponíveis, o backend consulta tabelas mapeando essas relações por `distribuidor_id`.

   - **Módulo de Integração com LLMs:**  
     - Pode usar configurações específicas por tenant (por exemplo, chaves de API diferentes ou preferências de modelos).  
     - Ao receber a requisição, o módulo acessa a configuração apropriada (armazenada no BD) para o `tenant_id` e seleciona a LLM desejada.
   
   - **Escalabilidade:**  
     - O backend pode rodar em múltiplas instâncias por trás de um load balancer, atendendo vários distribuidores ao mesmo tempo.  
     - O `tenant_id` garante segmentação lógica sem precisar separar fisicamente a infraestrutura.

3. **Camada de Dados e Serviços Externos**
   - **Banco de Dados (Multi-Tenant):**  
     - Uma única instância (ou cluster) do banco de dados, com tabelas que incluem colunas `distribuidor_id` para separar dados. Por exemplo:  
       - `Usuario` possui `distribuidor_id`.  
       - `Assinatura_Plano` e `Interacao` também contêm `distribuidor_id`.
     - Índices em `distribuidor_id` para eficiência nas queries filtradas por tenant.
   
   - **Planos e Configurações Específicas por Tenant:**  
     - Tabelas como `Plano_de_Uso` e `LLM_Modelo` podem ter um campo `distribuidor_id` indicando se aquele plano ou modelo é específico daquele tenant.  
     - Para planos globais ou modelos padrão, `distribuidor_id` pode ser nulo, indicando disponibilidade global. Cada tenant pode sobrepor isso criando suas próprias definições.

   - **Serviços de Autenticação IXCsoft:**  
     - O processo de login retorna um token que inclui `tenant_id`.  
     - O backend valida esse token e aplica os filtros correspondentes.

   - **APIs de LLM Externas:**  
     - Podem ser compartilhadas entre todos os tenants, porém as chaves e limites podem variar.  
     - O backend consulta uma tabela `Configuracao_LLM` filtrada por `distribuidor_id` para definir qual chave usar e quais limites aplicar.

### Fluxo Conceitual (Multi-Tenant)

1. **Usuário final (Tenant Específico)** acessa o portal do distribuidor na IXC AI Hub.  
2. Faz login, obtendo um token que inclui `tenant_id` (distribuidor) e `usuario_id`.  
3. O frontend envia requisições ao backend sempre com o token. O backend extrai `tenant_id` e `usuario_id`.  
4. Ao solicitar uma interação (ex.: perguntar algo à IA), o backend:  
   - Verifica se o usuário pertence ao `tenant_id` do token.  
   - Verifica se o usuário ainda não excedeu seu limite de requisições daquele plano atrelado ao tenant.  
   - Identifica a LLM disponível para aquele tenant.  
   - Envia a requisição à LLM externa utilizando as credenciais/configurações do tenant.  
   - Armazena a interação no BD com `distribuidor_id = tenant_id`.  
   - Retorna a resposta ao frontend.

5. Distribuidores diferentes compartilham a mesma aplicação e banco, mas só visualizam e gerenciam seus próprios dados, mantendo isolamento lógico.

### Diagrama Simplificado (Texto)

```
              +-----------------------+
              |       Load Balancer   |
              +----------+------------+
                         |
                 +-------+-------+
                 |   Backend     |   
                 | (Multi-Tenant)|   
                 +-------+-------+
                         |
         +---------------+----------------+
         |                                |
         v                                v
    [Banco de Dados]             [APIs LLM Externas]
  (Tabelas com distribuidor_id)       (Chaves e config)
         ^                                ^
         |                                |
[Portal IXC AI Hub - Frontend] <-- token com tenant_id 
         |
       Usuário
(associado a 1 tenant)
```

### Benefícios da Arquitetura Multi-Tenant
- **Escalabilidade e Manutenção Simplificada:** Uma única base de código e infraestrutura atende múltiplos distribuidores.  
- **Isolamento Lógico:** Garantido pelo uso do `tenant_id` no token, queries filtradas e colunas `distribuidor_id` no BD.  
- **Customização por Tenant:** Cada distribuidor pode ter planos, limites e LLMs diferentes, ajustando-se às necessidades de cada cliente final.  
- **Economia de Custos:** Ao compartilhar recursos entre distribuidores, a IXCsoft evita a necessidade de manter ambientes completamente separados.