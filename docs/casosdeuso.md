# Casos de uso

## Casos de uso pensando na perspectiva do administrador da solução (geralmente alguém da equipe da IXCsoft ou um papel “superadmin”) que gerencia toda a plataforma multi-tenant.

### Caso de Uso 1: Criação e Gestão de Distribuidores (Tenants)  
**Cenário:** O administrador precisa adicionar um novo distribuidor (cliente da IXCsoft) ou atualizar dados de um distribuidor já existente.  
**Ação do Administrador:**  
1. Acessa o painel administrativo da IXC AI Hub.  
2. Cria um novo registro de distribuidor, inserindo nome, informações de contato e, se necessário, configurações padrão de planos e LLMs.  
3. Pode editar dados de distribuidores existentes (atualizar nome, contato, status).  
**Resultado:**  
O administrador controla quem são os “inquilinos” da plataforma, garantindo que cada novo cliente tenha acesso isolado e configurável.

### Caso de Uso 2: Gestão Global de Modelos de LLM  
**Cenário:** O administrador avalia novos fornecedores de LLM, precisa adicionar GPT-4 globalmente ou remover um modelo obsoleto.  
**Ação do Administrador:**  
1. Acessa a seção de modelos de IA.  
2. Cria um novo registro de LLM_Modelo global, definindo nome, fornecedor, tipo de acesso.  
3. Opcionalmente, disponibiliza essa LLM para certos distribuidores ou deixa livre para todos.  
4. Atualiza ou remove LLMs antigas se necessário.  
**Resultado:**  
O administrador garante que toda a plataforma tenha acesso aos melhores modelos de IA, controlando globalmente a oferta, ao mesmo tempo possibilitando customizações por tenant.

### Caso de Uso 3: Monitoramento e Auditoria do Sistema  
**Cenário:** O administrador da IXCsoft precisa entender como o sistema está sendo utilizado no geral, identificar gargalos e possíveis abusos.  
**Ação do Administrador:**  
1. Acessa um painel global de métricas e estatísticas, visualizando uso agregado por todos os distribuidores.  
2. Examina relatórios de quantas requisições estão sendo feitas, quais LLMs são mais populares, qual distribuidor gera mais tráfego.  
3. Identifica picos de uso, possíveis problemas de desempenho ou eventuais abusos (como um distribuidor consumindo recursos excessivamente).  
4. Toma decisões embasadas, como ajustar limites globais, contatar um distribuidor para renegociar planos ou implementar novas regras de segurança.  
**Resultado:**  
O administrador mantém a saúde e o equilíbrio da plataforma, garantindo boa performance para todos os distribuidores e seus usuários finais.

### Caso de Uso 4: Configuração de Políticas de Segurança e Compliance  
**Cenário:** A IXCsoft precisa garantir que a plataforma atenda requisitos legais (LGPD, GDPR) e mantenha padrões de segurança.  
**Ação do Administrador:**  
1. Define políticas globais de segurança (ex.: avisos ao usuário para não inserir dados sensíveis, encriptação de dados em repouso).  
2. Atualiza termos de uso globais, integrando-os à interface que todos os distribuidores e usuários finais veem.  
3. Monitora logs de auditoria (quem acessou o quê, quando) para garantir conformidade.  
**Resultado:**  
O administrador assegura que a plataforma opere conforme leis e padrões de segurança, protegendo a reputação da IXCsoft e o bem-estar dos distribuidores e usuários.

### Caso de Uso 5: Suporte e Suporte Técnico Avançado  
**Cenário:** O administrador atua como suporte de alto nível, ajudando distribuidores a solucionar problemas complexos.  
**Ação do Administrador:**  
1. Recebe um chamado de um distribuidor reportando lentidão ou falha de integração com um determinado modelo LLM.  
2. Acessa ferramentas internas para verificar logs, requisições recentes, histórico de falhas.  
3. Ajusta configurações, reprocessa chamadas, contata fornecedores de LLM se necessário.  
4. Documenta a solução e orienta o distribuidor sobre melhores práticas.  
**Resultado:**  
O administrador resolve problemas críticos e mantém a satisfação dos distribuidores, garantindo a estabilidade do ecossistema da IXC AI Hub.

## Casos de uso pensados sob a perspectiva dos distribuidores (os clientes da IXCsoft que disponibilizam a solução de IA para seus próprios usuários). Vou incluir tanto os cenários já mencionados anteriormente quanto outros que possam surgir após o MVP:

### Caso de Uso 1: Criação e Configuração de Planos de Uso  
**Cenário:** O distribuidor deseja oferecer diferentes níveis de acesso à IA para seus usuários finais (por exemplo, um plano básico gratuito e um plano avançado pago).  
**Ação do Distribuidor:**  
1. Acessa o painel administrativo fornecido pela IXCsoft para configurar a IA.  
2. Cria um “Plano_de_Uso” com limites de requisições/mês e escolhe quais modelos de LLM estão disponíveis para cada plano.  
3. Ajusta preços e condições (por exemplo, plano básico com 10 requisições/mês, plano avançado com 100 requisições/mês e acesso ao GPT-4).  
4. Salva as configurações, tornando-as automaticamente disponíveis aos usuários.  
**Resultado:**  
O distribuidor personaliza a oferta de serviços, monetizando o uso da IA e adaptando a experiência ao perfil de seus clientes.

### Caso de Uso 2: Onboarding de Novos Usuários Finais  
**Cenário:** O distribuidor recebe novos clientes finais em seu próprio produto (por exemplo, um sistema de CRM ou ERP) e quer oferecer o módulo de IA imediatamente.  
**Ação do Distribuidor:**  
1. O distribuidor, ao cadastrar um novo cliente final em seu sistema, automaticamente cria ou vincula um registro de usuário ao IXC AI Hub.  
2. Atribui um plano padrão (por exemplo, o plano básico) ao novo usuário.  
3. Envia um e-mail de boas-vindas com um link para o tutorial da ferramenta de IA.  
**Resultado:**  
O distribuidor integra a experiência de IA ao seu próprio produto, melhorando o valor agregado e facilitando a adoção pelos usuários finais.

### Caso de Uso 3: Ajuste de Limites ou Planos Existentes  
**Cenário:** Alguns usuários finais do distribuidor excedem rotineiramente o limite de requisições e solicitam mais acesso.  
**Ação do Distribuidor:**  
1. Acessa o painel de gerenciamento para revisar o histórico de uso do usuário final.  
2. Vê que o usuário frequentemente atinge o limite do plano básico.  
3. Oferece ao usuário a possibilidade de upgrade para um plano com mais requisições ou acesso a modelos mais avançados.  
4. Ajusta a assinatura do usuário final através do painel da IXC AI Hub.  
**Resultado:**  
O distribuidor aumenta a satisfação do usuário, possivelmente gerando receita adicional ao oferecer planos mais ricos.

### Caso de Uso 4: Monitoramento e Métricas de Uso Interno  
**Cenário:** O distribuidor quer entender o engajamento dos seus usuários finais com a ferramenta de IA para tomar decisões estratégicas.  
**Ação do Distribuidor:**  
1. Acessa um dashboard interno (fornecido pela IXC AI Hub) com métricas filtradas pelo seu `distribuidor_id`.  
2. Analisa quantos usuários utilizaram a IA, quantas requisições foram feitas e quais modelos de LLM são mais populares.  
3. Observa que a maioria dos usuários prefere GPT-4 e faz mais uso durante dias úteis.  
4. Baseado nessas informações, o distribuidor ajusta planos, negocia custos com a IXCsoft ou promove tutoriais focados no melhor uso da IA.  
**Resultado:**  
O distribuidor obtém insights para otimizar sua estratégia de produto, melhorando a experiência do cliente final e a eficiência operacional.

### Caso de Uso 5: Suporte e Solução de Problemas  
**Cenário:** Um usuário final do distribuidor reclama que a IA não está respondendo conforme o esperado ou está lenta.  
**Ação do Distribuidor:**  
1. Verifica no painel as últimas interações desse usuário, identificando se houve lentidão ou falhas nas requisições.  
2. Se necessário, abre um chamado com a IXCsoft, fornecendo detalhes do problema.  
3. Recebe orientações da IXCsoft ou ajusta temporariamente o plano do usuário (por exemplo, permitindo uso de outro modelo LLM mais rápido).  
4. Informa o usuário final sobre a solução ou sobre o que foi ajustado.  
**Resultado:**  
O distribuidor atua rapidamente para solucionar problemas, mantendo a satisfação do usuário final e garantindo qualidade do serviço.

### Caso de Uso 6: Diferenciação de Mercado  
**Cenário:** O distribuidor quer se destacar no mercado oferecendo funcionalidades de IA personalizadas aos seus clientes.  
**Ação do Distribuidor:**  
1. Configura um plano personalizado com uma LLM customizada (por exemplo, um modelo interno treinado com dados específicos do setor do cliente).  
2. Disponibiliza esse plano somente para um grupo seleto de clientes finais que pagam mais.  
3. Observa o aumento da percepção de valor e a diferenciação frente à concorrência.  
**Resultado:**  
O distribuidor melhora a proposta de valor do seu próprio produto/serviço, graças à flexibilidade oferecida pela integração com a plataforma da IXCsoft.

## Casos de uso típicos do ponto de vista do usuário final, aquele que irá efetivamente interagir com a ferramenta de IA disponibilizada pelo distribuidor:

### Caso de Uso 1: Criação de Conteúdo  
**Cenário:** O usuário precisa redigir um e-mail formal para um cliente, mas não sabe por onde começar.  
**Ação do Usuário:**  
1. Acessa a interface do IXC AI Hub dentro do ambiente fornecido pelo distribuidor.  
2. Seleciona uma LLM, por exemplo, GPT-4.  
3. Digita uma solicitação: “Preciso de um e-mail formal para apresentar uma proposta de parceria.”  
4. Clica em “Enviar” e aguarda a resposta.  
**Resultado:**  
A ferramenta retorna um texto sugerido, bem estruturado e pronto para ser adaptado ou copiado, economizando tempo e aumentando a qualidade da comunicação.

### Caso de Uso 2: Obtenção de Resumos  
**Cenário:** O usuário recebeu um documento longo (relatório, proposta comercial ou artigo) e deseja entender rapidamente o conteúdo.  
**Ação do Usuário:**  
1. No campo de texto, o usuário cola um trecho do documento ou resume o contexto.  
2. Solicita: “Por favor, resuma este texto em um parágrafo curto.”  
3. A IA produz um resumo objetivo, permitindo ao usuário entender o essencial sem ler tudo.  
**Resultado:**  
O usuário poupa tempo e esforço, absorvendo informação de forma mais ágil.

### Caso de Uso 3: Geração de Ideias Criativas  
**Cenário:** O usuário quer criar posts para redes sociais, mas está sem inspiração.  
**Ação do Usuário:**  
1. Digita: “Preciso de 5 ideias de postagens sobre tendências em telecom, com um tom descontraído.”  
2. A IA retorna 5 sugestões de posts, incluindo temas, chamadas de ação e possíveis formatos de mídia.  
**Resultado:**  
O usuário obtém rapidamente ideias criativas, melhorando a qualidade do seu trabalho e ampliando opções de conteúdo.

### Caso de Uso 4: Tradução Rápida  
**Cenário:** O usuário final precisa entender rapidamente um texto curto em outro idioma.  
**Ação do Usuário:**  
1. Cola o texto original em inglês.  
2. Solicita: “Traduza isso para o português, mantendo um tom profissional.”  
3. Recebe a tradução pronta.  
**Resultado:**  
O usuário compreende o conteúdo sem precisar de um tradutor externo, agilizando sua rotina.

### Caso de Uso 5: Ajustar Tom e Estilo de Um Texto  
**Cenário:** O usuário já possui um texto, mas deseja torná-lo mais informal ou mais conciso.  
**Ação do Usuário:**  
1. Cola o texto na caixa.  
2. Pede: “Reescreva este texto em um tom mais descontraído e com menos parágrafos.”  
3. A IA retorna o texto ajustado.  
**Resultado:**  
O usuário adapta rapidamente o conteúdo, adequando-o ao público-alvo sem esforço manual.
