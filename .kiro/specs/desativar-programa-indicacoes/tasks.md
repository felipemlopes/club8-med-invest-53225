# Tasks: Desativar Programa de Indicações

> Convenção: envolver cada trecho comentado com a tag `INDICACOES-DISABLED` (ver design.md).

**Status: implementado em 2026-08-27.**

## Decisões (respondidas pelo usuário)

- **Q1** — HeroBanner: manter a frase original comentada e escrever uma nova. Nova frase: "Bonificações por renovação de contrato".
- **Q2** — Footer: comentar o link "Programa de Indicações".
- **Q3** — Painel de indicações na ficha do cliente (admin): ocultar completamente, deixando comentado.

## Backend (club8-api)

- [x] B1 — `routes/api.php`: comentadas `GET /referrals` (L81) e `GET /referrals/registred` (L82)
- [x] B2 — `routes/web.php`: comentada `Route::get('indicacoes', ...)` (L97)
- [x] B3 — `app/Repositories/Investment/InvestmentRepository.php`: comentado bloco de criação de `Referral` (L60-71)
- [x] B4 — `app/Http/Controllers/Api/Auth/AuthController.php`: comentado bloco `indication`/`referral_code` → `indicated_by` (L90-96)
- [x] B5 — `app/Http/Controllers/dashboard/CustomerController.php`: comentada carga de `$referrals` e removido do `compact()`
- [x] B6 — `resources/views/backend/customer/view.blade.php` e `view_new.blade.php`: comentado painel "Painel de Indicações"
- [x] B7 — Validado: `php -l` ok nos 5 arquivos alterados

## Frontend (club8-med-invest)

- [x] F1 — `src/App.tsx`: comentado import e `<ReferralTracker />`
- [x] F2 — `src/components/InvestorDashboard.tsx`: comentados imports (`ReferralSystem`, `BonusTracker`, `MyReferral`) e os 2 blocos JSX que os renderizavam
- [x] F3 — `src/components/RegisterSection.tsx`: comentada leitura/envio de `referral_code`
- [x] F4 — `src/pages/WaitingList.tsx`: comentada leitura de `referral_code` (variável não era usada em mais nenhum lugar do arquivo)
- [x] F5 — `src/components/Footer.tsx`: comentado `<li>` "Programa de Indicações"
- [x] F6b — `src/components/HeroBanner.tsx`: frase original comentada, nova frase "Bonificações por renovação de contrato" escrita no lugar
- [x] F6 — Validado: `npx tsc --noEmit` (13 erros pré-existentes, mesmos antes/depois da mudança, não relacionados) e `npx vite build` concluído sem erros

## Não alterado, intencionalmente (ver design.md)

Migrations, model `Referral`, seeders, factories, `ReferralObserver`, `AppServiceProvider` (registro do observer), `ProfitController` (leitura histórica), `ReferralController` (dashboard), `Repositories/Referral/*`, `sidebar.blade.php` (já estava comentado), `investmentApi.ts`, `ReferralTracker.tsx`/`ReferralSystem.tsx`/`MyReferral.tsx`/`BonusTracker.tsx` (viram código morto), `FutureProjectionsCards.tsx`, `InvestmentPlans.tsx`.

## Rollback

`grep -r "INDICACOES-DISABLED"` nos dois repositórios e remover os delimitadores de comentário.
