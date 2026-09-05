# Requirements Document

## Introduction

This spec audits and reconciles text/copy for the **public marketing site**, comparing `club8-med-invest-53225` (this project) against `Remix of club8-med-invest` (the reference). **Remix is the source of truth.** Every place `53225`'s text differs from Remix gets reverted to Remix's version, with two named exceptions (Requirement 5) where a literal revert would remove real functionality Remix's mock never needed.

This has nothing to do with the admin panel (`admin club8`) or `club8-api`'s backend code.

## Non-Goals

- No changes to `club8-api` or `admin club8`.
- No changes to `Remix of club8-med-invest` — it stays the untouched reference.
- No route/page structural changes (Requirement 6) — text only.
- No silent exceptions — anywhere `53225`'s current text is kept instead of Remix's, it must be named and reasoned (Requirement 5), never just skipped quietly.

## Method (for the record)

For every file present at the same relative path in both `src/` trees, extracted all JSX text-node content and quoted string literals containing letters, diffed the two sorted string sets per file, then read every hunk. See design.md for the full theme-by-theme catalog with exact Remix text to restore.

## Requirements

### Requirement 1: Verified Findings Catalog

**User Story:** As a reviewer, I want the real extracted differences, organized by theme, with Remix's exact text captured as the target.

#### Acceptance Criteria

1. THE catalog SHALL be built from actual text extracted from both codebases, not recalled from memory.
2. THE catalog SHALL cover every file that exists at the same path in both projects' `src/` trees.
3. THE catalog SHALL explicitly list files confirmed identical (no work needed there).
4. THE catalog SHALL capture Remix's literal text for every divergence, since that text is what `53225` gets reverted to.

### Requirement 2: Revert Terminology to Remix — "Título", Not "Cota"

**User Story:** As a stakeholder, I want the investment-unit term back to what Remix uses everywhere it was renamed.

#### Acceptance Criteria

1. THE site (`club8-med-invest-53225`) SHALL use "título(s)" (with correct masculine adjective agreement) instead of "cota(s)" in `Footer.tsx`, `QuotasAvailable.tsx`, `InvestmentPlans.tsx`, `InvestmentFlow.tsx`, and `InvestorDashboard.tsx`.
2. `InvestmentModel.tsx`'s existing "título de crédito" text (describing what a debenture is) SHALL NOT be touched — it's unrelated and already matches Remix.

### Requirement 3: Revert Marketing & Guarantees Copy to Remix

**User Story:** As a stakeholder, I want the hero, highlights, and guarantees pages to say what Remix says, not the rewritten `53225` versions.

#### Acceptance Criteria

1. `HeroBanner.tsx` and `HighlightSection.tsx` SHALL be reverted to Remix's headline, sub-claims, and card copy verbatim (see design.md Theme 3 for the exact strings).
2. `AuditBanner.tsx`, `SecurityGuarantees.tsx`, `pages/Guarantees.tsx`, and `pages/AboutUs.tsx` SHALL be reverted to Remix's "2 Mecanismos" guarantee framing (see design.md Theme 4 for the exact strings).
3. `53225`'s "Club8 vs. Outros Investimentos" comparison table and "Como funciona" bullet list on `pages/Guarantees.tsx` SHALL be removed — Remix has no equivalent section to revert them to.
4. `53225`'s footer nav labels and anchors SHALL be reverted to Remix's (`Títulos`/`Investir`/`Fila de Espera`, `#investir`/`#planos`/`#titulos`/`/aporte`) per design.md Theme 6.

### Requirement 4: Remove Referral/Bonus Copy Beyond Remix's Baseline

**User Story:** As a stakeholder, I want the site's referral/bonus marketing to shrink back to Remix's much lighter treatment, since the backend program stays disabled either way.

#### Acceptance Criteria

1. `HeroBanner.tsx` and `HighlightSection.tsx` SHALL drop the referral/bonus lines that have no Remix equivalent at all ("Ganhe ainda mais com nosso programa de recompensas", "Bonificações por renovação e indicações", "Bonificações exclusivas para membros", "Programa de recompensas").
2. `InvestmentPlans.tsx` SHALL drop the "Acesso ao programa de indicações" / "Programa de indicações premium" plan-benefit line.
3. `BonusTracker.tsx` and `ReferralSystem.tsx` SHALL be reverted to Remix's simpler copy (fixed "R$ 500" amounts, "Seu Número de Cliente" placeholder) in place of `53225`'s percentage-based/fuller version.
4. THE fix SHALL be recorded as text-only — it does not guarantee `53225`'s referral components stop calling any real (and possibly disabled) backend endpoint; that's a functional concern outside this spec's scope, flagged in design.md Theme 1.

### Requirement 5: Named Exceptions — Do Not Revert These

**User Story:** As a stakeholder, I want it explicit where "match Remix" is being deliberately NOT applied, and why, so nobody "fixes" it into a regression later.

#### Acceptance Criteria

1. `LoginSection.tsx`'s demo test-credentials panel (Remix: "Credenciais de Teste", `admin123`, `teste@club8.com.br / teste123`) SHALL NOT be restored to `53225` — it is prototype scaffolding, not real copy, and would expose fake admin credentials on a real login page.
2. `53225`'s password-creation/confirmation fields in `MembershipSection.tsx` / `EditPersonalDataDialog.tsx` SHALL NOT be removed to match Remix's password-less mock registration — doing so would be a real security regression, not a text fix.
3. `53225`'s Facebook/Instagram footer links have no Remix equivalent; THE spec SHALL flag them for an explicit keep/remove decision rather than silently deleting real, working social links.

### Requirement 6: Routes/Pages Stay Out of Scope

**User Story:** As a stakeholder, I want it clear that pages existing on only one side are not part of this text-parity effort.

#### Acceptance Criteria

1. `/cadastro`, `/contato` (only in `53225`) and `/admin`, `/embaixador`, `/notificacoes`, `/suporte` (only in Remix) SHALL NOT be added or removed by this spec.
2. `/admin` in particular SHALL NOT be recreated in `53225` — it's superseded by the separate `admin club8` project.
