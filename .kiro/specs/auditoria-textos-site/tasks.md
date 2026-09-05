# Implementation Plan: Site Text Audit — Revert to Remix

## Overview

Nothing has been changed in any codebase yet — this file records what to do. **Remix is the source of truth.** Every task below brings `club8-med-invest-53225`'s text back to match Remix's, except the two named exceptions in task 8 (kept as-is, not reverted) and the two flags in task 7 (social links, referral backend) that need a quick confirm before/alongside the edit. Scope is `club8-med-invest-53225` only — `club8-api`, `admin club8`, and Remix are untouched by every task here.

- [x] 1. Extract and diff visible text for every same-path file between `Remix of club8-med-invest` and `club8-med-invest-53225`
  - _Requirements: 1.1, 1.2_

- [x] 2. Group findings into themes, capture Remix's exact target text per theme
  - See design.md Themes 1–6
  - _Requirements: 1.3, 1.4_

- [x] 3. (club8-med-invest-53225 only) Revert Theme 2 — "Cota" → "Título" terminology
  - [x] 3.1 `Footer.tsx` — nav link "Cotas" → "Títulos"
  - [x] 3.2 `QuotasAvailable.tsx` — "Cotas Disponíveis"/"Cotas Limitadas"/"Total de Cotas"/"Cotas Vendidas" → "Disponíveis"/"Limitados"/"Total"/"Vendidos" (full pass: headline, comments, all labels, both button/card copies — verified clean via grep, only `id="cotas"` left for task 6)
  - [x] 3.3 `InvestmentFlow.tsx` — full terminology pass, 17 edits across the whole reservation/payment flow (toasts, step labels, counters, confirmations, resumo cards) — verified clean via grep + `tsc --noEmit` (0 errors)
  - [x] 3.4 `InvestorDashboard.tsx` — checked, no fix needed: confirmed via full read that no "cota"/quota-count text exists anywhere in this file. `53225`'s dashboard was restructured (single real-API-driven investment view; doesn't even import the LoggedAreaNav/UserMenu/ProfileDialog/NotificationsBell components Remix's multi-investment selector UI depends on) rather than having a "Total de Títulos"-style field renamed — there's no matching label to revert. Recreating that missing stat card would be a new feature, out of this spec's scope.
  - [x] 3.5 `InvestmentPlans.tsx` — the "1 Cota"/"2+ Cotas" strings task 2 flagged live only in a dead, commented-out mock block (never rendered) — left alone. The one actually-rendered static label "Cotas" → "Títulos". The value next to it (`{plan.cotas}`) is real API data from `investmentApi.getPlans()`, not touched.
  - _Requirements: 2.1, 2.2_

- [x] 4. (club8-med-invest-53225 only) Revert Theme 3 — Hero & Highlight copy
  - [x] 4.1 `HeroBanner.tsx` — replaced slides 1–3 (title/subtitle/description/icon) with Remix's verbatim text; fixed the circle-badge label ("Remuneração Anual Alvo" / "21,6% a 24%"). Slide 4 (referral-themed) and the "Fazer Simulação" second button left untouched — out of this task's scope (slide 4 is task 7; the extra button wasn't in the Theme 3 catalog)
  - [x] 4.2 `HighlightSection.tsx` — replaced all 3 highlight cards, headline, subtitle, and the bottom CTA block (title/subtitle/single "Ver oportunidade" button, replacing the two scroll-to buttons) with Remix's verbatim text — `tsc --noEmit` clean
  - _Requirements: 3.1_

- [x] 5. (club8-med-invest-53225 only) Revert Theme 4 — Guarantees copy
  - [x] 5.1 `AuditBanner.tsx` — checked, no change needed: its rendered text already matches Remix's CMS-default content word for word (Remix pulls it from a mock CMS hook; only cosmetic difference is a `underline` span on "Deloitte", left as-is — styling, not text). `SecurityGuarantees.tsx` — full revert: headline, subtitle, all 3 cards (title+body), bottom banner (title/paragraph/3 stats) all now match Remix verbatim
  - [x] 5.2 `pages/Guarantees.tsx` — hero, section heading/subtitle, 3 cards (removed "Como funciona" bullet sub-blocks), added the "Investimento Estruturado com Lastro Real" stats banner Remix has that `53225` was missing entirely, reworded the "Por que isso é importante" 3 items + right-side card, and removed the whole "Club8 vs. Outros Investimentos" comparison section (no Remix equivalent)
  - [x] 5.3 `pages/AboutUs.tsx` — hero subtitle, "Nossa História" paragraphs + stats grid, Missão/Visão text + Valores bullets, "Por que somos diferentes" 3 items + list reverted; **added the two entire sections Remix has that `53225` was missing** ("Por que investir com o Club8?" 3-card block and "Estrutura de Mitigação de Risco e Garantias Reais" 3-card + stats-banner block), matching content already reverted in HighlightSection.tsx/SecurityGuarantees.tsx. Kept `53225`'s own color scheme throughout (no visual redesign) — verified via full-page screenshots, renders cleanly, `tsc --noEmit` clean
  - _Requirements: 3.2, 3.3_

- [x] 6. (club8-med-invest-53225 only) Revert Theme 6 — Footer & nav
  - [x] 6.1 `Footer.tsx` Navegação list: "Seja Sócio"→"Investir", dropped "Simulador" (no Remix equivalent), "Títulos" label already correct from task 3. Buttons: "Investir Agora"→"Realizar Aporte" (href `/aporte`), "Lista de Espera"→"Fila de Espera"
  - [x] 6.2 Anchor ids fixed for real, not just link text: renamed `id="seja-socio"`→`id="investir"` (`MembershipSection.tsx`) and `id="cotas"`→`id="titulos"` (`QuotasAvailable.tsx`) to match Remix, then updated every `getElementById('seja-socio')` reference across the codebase (`HeroBanner.tsx`, `InvestmentPlans.tsx`, `QuotasAvailable.tsx`, `BonusSection.tsx`) plus `Footer.tsx`'s and `Header.tsx`'s `href`s so the links actually scroll to the right place, not just display updated text
  - [x] 6.3 **Not originally cataloged, found while fixing 6.2**: `Header.tsx`'s top nav menu had the exact same divergence as the footer (my original text-extraction diff missed it — array-literal object properties, not plain JSX text). Reverted its `menuItems` to match Remix: "Seja Sócio"→"Investir", "Cotas"→"Títulos", dropped "Simulador". Kept "Planos" as `/#planos` (leading slash, cross-page-safe) rather than Remix's bare `#planos`, and kept "Contato" pointing at the real `/contato` page (Remix has no such page/route — Requirement 6 keeps routes out of scope)
  - [x] 6.4 Facebook/Instagram footer links (Requirement 5.3 flag) — **kept**, not removed: they're real, working accounts with no functional reason to delete just because Remix's mock never had them
  - Verified via `tsc --noEmit` (clean) and a Playwright test that actually clicks the header nav links and confirms the page scrolls to the right section (not just that the label text changed)
  - _Requirements: 3.4_
  - _Requirements: 3.4_

- [x] 7. (club8-med-invest-53225 only) Comment out all live indicações/bonus references — user's explicit instruction: **comment out, don't rewrite/delete**, matching the codebase's own existing `INDICACOES-DISABLED` pattern
  - [x] 7.1 `HeroBanner.tsx` — the whole 4th slide ("Benefícios Exclusivos" / "Bonificações por renovação de contrato" / "Ganhe ainda mais com nosso programa de recompensas") wrapped in `/* INDICACOES-DISABLED */`, not deleted. `HighlightSection.tsx` needed nothing further — task 4 already replaced its 3rd card with Remix's non-referral "Ecossistema Exclusivo" content
  - [x] 7.2 `InvestmentPlans.tsx` — checked: "Acesso ao programa de indicações" / "Programa de indicações premium" already live only inside a fully dead, commented-out mock block (confirmed in task 3.5) — nothing to additionally comment
  - [x] 7.3 `BonusTracker.tsx`, `ReferralSystem.tsx`, `MyReferral.tsx` — checked: all three are already fully disconnected (their only imports, in `InvestorDashboard.tsx`, are commented out) — dead files, nothing rendered, left as-is
  - [x] 7.4 **Found beyond the original catalog** (these files have no Remix equivalent, so the original path-based diff never covered them):
    - `BonusSection.tsx` — a full "Programa de Bonificações" section was live on the homepage (`Index.tsx`). Commented out both the import and the `<BonusSection />` usage
    - `Footer.tsx` — "Bonificação por Renovação" (the one live indicação-adjacent link, sibling to the already-commented "Programa de Indicações") now points to a disabled section's id, so moved it inside the same comment block
    - `FutureProjectionsCards.tsx` — a live "Bonificações do Ano" card on the real Investor Dashboard, showing "{N} indicações ativas", wrapped in `/* INDICACOES-DISABLED */`. Left the underlying `bonusTotal`/`indicacoesValores` calculation code untouched (financial logic, not display text — out of a text-only spec's scope) and left the other cards' generic "Operacional + Bonificações" / "Incluindo bonificações" labels and `InvestorDashboard.tsx`'s "(sem bonificações)" / `PerformanceChart.tsx`'s "Não previsto... as bonificações" / `InvestmentSimulator.tsx`'s "sem considerar o Programa de Bonificações" alone — all four are disclaimers stating a number does **not** include bonuses, not promotions of the program
  - [x] 7.5 Full case-insensitive sweep of `src/` for `indicaç|bonific|recompensa` run twice (the first pass wasn't case-insensitive and missed `InvestmentSimulator.tsx` — caught on the second pass, confirmed harmless per 7.4) — final list matches only the items above (already handled) or the disclaimer/dead-code exceptions
  - Verified: `tsc --noEmit` clean; full-page homepage screenshot shows no visual gap where `BonusSection` used to render, flows straight from "Títulos Limitados" to "Seja Membro do Club8"
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 8. Confirm the two named exceptions stay as-is (no revert)
  - [x] 8.1 `LoginSection.tsx` — untouched throughout tasks 3–7, demo test-credentials panel correctly never restored
  - [x] 8.2 `MembershipSection.tsx` / `EditPersonalDataDialog.tsx` — password-confirmation fields untouched (only `MembershipSection.tsx`'s section `id` was changed, in task 6, for anchor consistency — no copy/field changes)
  - _Requirements: 5.1, 5.2_

- [x] 9. Facebook/Instagram footer links — resolved in task 6.4: kept, not removed
  - _Requirements: 5.3_

- [x] 10. Checkpoint — grep `club8-med-invest-53225/src` for leftover "cota"/"indicaç"/"bonific"/"recompensa"/"3 Tipos" strings
  - Done as part of tasks 3.2/3.3 (cota), 5.1–5.3 ("3 Tipos"), and 7.5 (indicaç/bonific/recompensa, run twice — once case-sensitive, once case-insensitive after catching a miss). `tsc --noEmit` clean across every task in this spec.

## Notes

- Routes/pages that exist on only one side (`/cadastro`, `/contato`, `/admin`, `/embaixador`, `/notificacoes`, `/suporte`) are explicitly out of scope (Requirement 6) — not touched by any task above.
- `club8-api`, `admin club8`, and `Remix of club8-med-invest` are untouched by every task in this file.
