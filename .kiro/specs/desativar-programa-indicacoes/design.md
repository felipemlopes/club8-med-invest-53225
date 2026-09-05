# Design: Desativar Programa de Indicações

## Estratégia geral

Em vez de deletar código ou introduzir um feature flag (não solicitado), cada ponto de código ativo será envolto por um comentário com uma tag padronizada e pesquisável:

```
INDICACOES-DISABLED — ver .kiro/specs/desativar-programa-indicacoes
```

Sintaxe por linguagem:
- JSX/TSX (elemento): `{/* INDICACOES-DISABLED ... */}`
- TS/JS (linha/import): `// INDICACOES-DISABLED ...`
- PHP (bloco): `/* INDICACOES-DISABLED ... */`
- Blade: `{{-- INDICACOES-DISABLED ... --}}`

Isso permite localizar (e reverter) 100% dos pontos tocados com uma única busca por `INDICACOES-DISABLED`, nos dois repositórios.

## Princípio de escopo mínimo

Só é alterado o código que **ativamente cria, expõe ou aciona** a funcionalidade (rotas, montagem de componentes de UI, escrita em banco). Código passivo que se torna automaticamente inerte (ex.: `ReferralObserver`, que só dispara se um `Referral` for criado) **não é tocado** — reduz diff e risco. Dados/estrutura de banco (migrations, model, seeders, factories) **não são tocados**.

## Ordem de aplicação (evita quebrar o build a meio caminho)

1. Backend: comentar rotas (`api.php`, `web.php`) — bloqueia acesso externo primeiro.
2. Backend: comentar escrita de dados (criação de `Referral` em `InvestmentRepository`; `indicated_by` em `AuthController`).
3. Backend: comentar painel administrativo (`CustomerController` + views) — controller e view ajustados juntos, para não deixar variável `$referrals` órfã no Blade.
4. Frontend: comentar montagem de componentes em `App.tsx` e `InvestorDashboard.tsx` — isso torna `ReferralSystem`, `MyReferral`, `BonusTracker`, `ReferralTracker` código morto automaticamente, sem precisar editar o interior desses arquivos.
5. Frontend: comentar leitura/envio de `referral_code` em `RegisterSection.tsx` e `WaitingList.tsx`.
6. Frontend: comentar item de navegação em `Footer.tsx` (pendente Q2).
7. Validação (ver seção Testes).

## Mapeamento de arquivos afetados

### Backend — club8-api

| ID | Arquivo | Ação | Requisito |
|----|---------|------|-----------|
| B1 | `routes/api.php` (L81-82) | Comentar `GET /referrals` e `GET /referrals/registred` | R6 |
| B2 | `routes/web.php` (L97) | Comentar rota `indicacoes` (L98 já está comentada) | R5 |
| B3 | `app/Repositories/Investment/InvestmentRepository.php` (L60-71) | Comentar bloco `if($user->indicated_by){ ... $referral->save(); }` inteiro | R3 |
| B4 | `app/Http/Controllers/Api/Auth/AuthController.php` (L90-96) | Comentar `if($request->indication){...}elseif($request->referral_code){...}` | R4 |
| B5 | `app/Http/Controllers/dashboard/CustomerController.php` (L56-59, L63-68) | Comentar carga de `$referrals` e remover a chave `'referrals'` do `compact()` | R5 / Q3 |
| B6 | `resources/views/backend/customer/view.blade.php` e `view_new.blade.php` (~L307-384) | Comentar bloco "Painel de Indicações" | R5 / Q3 |
| — | `resources/views/backend/includes/sidebar.blade.php` (L92-110) | **Nenhuma ação** — já está comentado | R5 |
| — | `app/Observers/ReferralObserver.php`, `AppServiceProvider.php` (L64) | **Nenhuma ação** — observer fica inerte automaticamente após B3 (nunca mais dispara) | — |
| — | `app/Http/Controllers/Api/ProfitController.php` (L23-32) | **Nenhuma ação** — leitura histórica de bônus já pagos, não cria indicações novas | — |
| — | `ReferralController` (dashboard), `Repositories/Referral/*`, `Models/Referral.php`, migrations, seeders, factories | **Nenhuma ação** — ficam órfãos/inertes, preservados para reativação | R7 |

### Frontend — club8-med-invest

| ID | Arquivo | Ação | Requisito |
|----|---------|------|-----------|
| F1 | `src/App.tsx` (L20 import, L32 uso) | Comentar `import {ReferralTracker}` e `<ReferralTracker />` | R1 |
| F2 | `src/components/InvestorDashboard.tsx` (L16, L18, L22 imports; L340-343, L345-347 JSX) | Comentar imports de `ReferralSystem`, `BonusTracker`, `MyReferral` e os 2 blocos de grid que os renderizam | R2 |
| F3 | `src/components/RegisterSection.tsx` (L144, L158) | Comentar leitura de `localStorage.getItem("referral_code")` e a chave `referral_code` no payload de registro | R1 |
| F4 | `src/pages/WaitingList.tsx` (L36) | Comentar leitura de `localStorage.getItem("referral_code")` | R1 |
| F5 | `src/components/Footer.tsx` (L57-59) | Comentar `<li>` do link "Programa de Indicações" | R5 / Q2 |
| — | `ReferralTracker.tsx`, `ReferralSystem.tsx`, `MyReferral.tsx`, `BonusTracker.tsx` | **Nenhuma ação interna** — tornam-se código morto ao remover a montagem (F1/F2) | R2 |
| — | `src/lib/investmentApi.ts` (`getReferrals`, `getReferralsRegistred`, `sendReferralInvite`, `ReferralData`) | **Nenhuma ação** — funções deixam de ser chamadas; TS não acusa erro em export não usado | — |
| — | `FutureProjectionsCards.tsx` | **Nenhuma ação** — continua consumindo `future.indications` (histórico), inalterado no backend | — |
| — | `HeroBanner.tsx`, `InvestmentPlans.tsx` | **Nenhuma ação** — texto de marketing / já comentado (ver Q1) | — |

## Testes / Validação

- **Backend**: `php artisan route:list` sem nenhuma linha contendo "referral"; `php -l` nos 4 arquivos alterados; criar um investimento de teste para um usuário com `indicated_by` preenchido e confirmar que NENHUM `Referral` novo é criado; registrar um novo usuário com `?ref=` e confirmar que `indicated_by` fica `null`.
- **Frontend**: `npm run build` sem erro de import não resolvido; abrir `/dashboard` logado e confirmar ausência visual dos 3 widgets de indicação; abrir `/cadastro?ref=teste123` e confirmar via DevTools que `localStorage` não recebe `referral_code`.
- **Admin**: abrir `dashboard/clientes/{id}/visualizar` e confirmar ausência do painel; acessar `dashboard/indicacoes` diretamente pela URL e confirmar 404.

## Rollback

Buscar `INDICACOES-DISABLED` em ambos os repositórios e remover os delimitadores de comentário — nenhuma lógica precisa ser reescrita.
