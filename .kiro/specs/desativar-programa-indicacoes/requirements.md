# Requirements: Desativar Programa de Indicações

## Introdução

O Club8 possui uma funcionalidade completa de "Programa de Indicações" (referral program): um investidor indica novos clientes via link/código e recebe bônus de 1% sobre o valor investido pelo indicado. Está implementada no frontend (dashboard do investidor, site institucional) e no backend (API, painel administrativo, banco de dados).

Objetivo: **desativar** essa funcionalidade — comentando o código responsável, sem apagar nada — de forma que:

- Nenhuma nova indicação seja criada, nenhum novo bônus seja calculado, e nenhuma UI relacionada seja exibida a partir da mudança.
- Todo o código, dados históricos e estrutura de banco permaneçam intactos e reversíveis (bastando descomentar para reativar).
- A mudança seja fácil de auditar e reverter — todos os pontos tocados usam um marcador de comentário padronizado e pesquisável (`INDICACOES-DISABLED`).

## Fora de escopo

- Apagar tabelas, migrations, models, seeders, factories relacionados a `Referral` — nada disso é removido.
- Apagar dados já existentes de indicações (histórico de bônus pagos permanece no banco e pode continuar sendo consultado para fins de auditoria/contabilidade).
- Renomear o plano "Programa de Indicações" cadastrado via seeder (dado de banco, não código ativo).
- Reescrever textos de marketing que citam "indicações" em frase corrida — tratado como decisão aberta (Q1).

## User Stories & Critérios de Aceite (formato EARS)

### R1 — Captura de indicação em visitantes/leads
- QUANDO qualquer página do site for carregada com o parâmetro `?ref=` na URL, O SISTEMA NÃO DEVE gravar `referral_code` no `localStorage`.
- QUANDO um usuário se cadastra (Registro ou Fila de Espera), O SISTEMA NÃO DEVE enviar `referral_code`/`indication` para a API.

### R2 — UI de indicações no dashboard do investidor
- QUANDO o investidor acessa `/dashboard`, O SISTEMA NÃO DEVE renderizar os widgets "Sistema de Indicações" (`ReferralSystem`), "Suas Indicações" (`MyReferral`) nem "Placar de Bonificações" por indicação (`BonusTracker`).
- QUANDO o dashboard renderiza a timeline de eventos, O SISTEMA DEVE continuar exibindo corretamente entradas históricas do tipo `indicacao` já existentes (não deve quebrar o histórico).

### R3 — Criação de bônus ao investir
- QUANDO um investimento é criado (`InvestmentRepository::create`), O SISTEMA NÃO DEVE criar um novo registro `Referral`, mesmo que `user->indicated_by` já esteja preenchido de um cadastro antigo.

### R4 — Vínculo de indicação no cadastro
- QUANDO um usuário se registra via `AuthController::register` enviando `indication` ou `referral_code`, O SISTEMA NÃO DEVE gravar `indicated_by`/`indicated_at` no usuário.

### R5 — Acesso administrativo
- QUANDO um admin acessa o painel, O SISTEMA NÃO DEVE expor a rota `dashboard/indicacoes` (deve responder 404).
- QUANDO um admin acessa `dashboard/clientes/{id}/visualizar`, O SISTEMA NÃO DEVE exibir o "Painel de Indicações".
- O item de menu lateral "Indicações" **já está comentado** em `sidebar.blade.php` — sem ação necessária, apenas validar.

### R6 — Endpoints de API
- QUANDO `GET /api/v1/referrals` ou `GET /api/v1/referrals/registred` forem chamados, O SISTEMA DEVE retornar 404 (rota comentada), e NÃO um erro 500.

### R7 — Reversibilidade
- QUANDO for necessário reativar a funcionalidade no futuro, O SISTEMA DEVE permitir isso apenas descomentando os blocos marcados com a tag `INDICACOES-DISABLED`, sem necessidade de reescrever lógica de negócio.
- TODO bloco desativado DEVE usar a tag de marcação padronizada, pesquisável via grep/rtk.

## Perguntas em aberto (decidir antes de implementar)

- **Q1**: `HeroBanner.tsx` tem a frase corrida "Bonificações por renovação e indicações" em um slide. Como não é possível "comentar" apenas uma palavra dentro de uma frase, e a bonificação por renovação continua ativa: manter o texto como está (recomendado) ou reescrever a frase removendo a menção a indicações?
- **Q2**: `Footer.tsx` tem um link "Programa de Indicações" apontando para `/#bonificacoes`. Comentamos esse item da lista (recomendado, é um bloco isolado e fácil de reverter) ou deixamos como está?
- **Q3**: O "Painel de Indicações" na tela de detalhe do cliente no admin (`CustomerController::show` + view) — ocultar completamente (recomendado, consistente com o menu já oculto) ou manter visível somente para consulta histórica (read-only)?
