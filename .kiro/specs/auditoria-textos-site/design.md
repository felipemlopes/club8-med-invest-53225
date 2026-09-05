# Design Document: Site Text Audit — Findings by Theme

## Method

`diff` between the text extracted from each same-path file in `Remix of club8-med-invest/src` and `club8-med-invest-53225/src` (JSX text nodes + string literals with letters, Tailwind classes and import noise stripped). 87 files share a path; ~30 carry visible copy. Below are the actual results, organized by theme.

**Resolution rule (per user direction): Remix is the source of truth.** Every theme below is now "make `53225`'s text match Remix's" — the opposite of this document's earlier draft, which had treated `53225` as authoritative. Two themes carry an explicit exception flagged below (not silently applied) because a literal word-for-word match would remove real functionality Remix's mock version never needed.

## Confirmed Identical / No Copy Divergence

No action needed on these:

- `pages/LGPD.tsx`, `pages/Login.tsx`, `pages/NotFound.tsx`, `pages/PrivacyPolicy.tsx`, `pages/TermsOfUse.tsx` — byte-identical files
- `hooks/useAuth.tsx` — code differs (real API vs mock), zero visible-text divergence
- `components/InvestmentModel.tsx` — zero visible-text divergence
- All 50 `components/ui/*` shadcn primitives — identical

## Theme 1: Referral/Bonus Program Copy

`club8-med-invest-53225` markets a referral/bonus program more heavily than Remix does:

| File | Remix text | `53225` text |
|---|---|---|
| `HeroBanner.tsx` | *(no referral/bonus line in the hero at all)* | "Ganhe ainda mais com nosso programa de recompensas", "Bonificações por renovação e indicações" |
| `HighlightSection.tsx` | *(no referral/bonus card)* | "Bonificações exclusivas para membros", "Programa de recompensas" |
| `InvestmentPlans.tsx` | *(pulls from a data file — no literal referral benefit line found)* | "Acesso ao programa de indicações", "Programa de indicações premium" listed as a plan benefit |
| `BonusTracker.tsx` | "R$ 500 por indicação", "R$ 500 por renovação" (fixed amounts), "Potencial a receber", "Detalhamento:" | "1% do valor investido" (percentage-based), "Indicações Ativas", real fetch + "Erro ao carregar bonificações." |
| `ReferralSystem.tsx` | "Seu Número de Cliente" (simple placeholder) | "Seu Código de Indicação", "Suas Indicações", "Total em Bônus", copy-code/share-link buttons |

**Resolution: revert to Remix's text.** Remove `53225`'s hero/highlight referral lines and the `InvestmentPlans.tsx` benefit line entirely (Remix doesn't have them). Rewrite `BonusTracker.tsx` and `ReferralSystem.tsx` back to Remix's simpler copy and fixed-amount logic.

**⚠️ Flag that survives even after matching Remix:** Remix is a fully mocked prototype — none of its components, including these, ever called a real backend. `club8-api`'s referral/commission system is disabled end-to-end (`.kiro/specs/desativar-programa-indicacoes`). If `53225`'s `BonusTracker.tsx`/`ReferralSystem.tsx` currently call real API endpoints, matching Remix's *text* does not by itself stop those components from hitting disabled routes and erroring — that's a functional issue, not a copy issue, and stays out of this text-only spec. Flagging it so it isn't mistaken for "fixed."

## Theme 2: "Título" (Remix) vs "Cota" (`53225`)

| File | Remix | `53225` (current) |
|---|---|---|
| `Footer.tsx` | "Títulos" (nav link) | "Cotas" |
| `QuotasAvailable.tsx` | "Disponíveis"/"Limitados"/"Total"/"Vendidos" | "Cotas Disponíveis"/"Cotas Limitadas"/"Total de Cotas"/"Cotas Vendidas" |
| `InvestmentFlow.tsx` | "Quantidade de títulos:", "Já reservados", "garante a seu título", "Títulos esgotados nesta rodada", "limitados" | "Quantidade de cotas:", "Já reservadas", "garante a sua cota", "Cotas esgotadas nesta rodada", "limitadas" |
| `InvestorDashboard.tsx` | "Total de Títulos:", "Títulos:" | *(restructured — locate and revert manually)* |
| `InvestmentPlans.tsx` | (data-driven, no literal) | "1 Cota", "2+ Cotas" → revert to whatever Remix's data file uses |

**Resolution: revert to Remix's "título(s)" terminology** in every file above, including the masculine adjective agreement ("limitados" not "limitadas", etc.). `InvestmentModel.tsx`'s "título de crédito" (describing what a debenture *is*) is unrelated and already identical in both — do not touch it.

## Theme 3: Hero & Highlight Marketing Copy

| | Remix (target) | `53225` (current — to be replaced) |
|---|---|---|
| Hero headline | "Transparência e Lastro Imobiliário" | "Club8 - Exclusivo para Médicos" |
| Hero sub-claims | "Performance Superior em Crédito Privado", "Investimentos estruturados com garantias reais", "Remuneração alvo de 21,6% a 24% a.a.", "Debêntures estruturadas com foco em alta performance", "Uma alternativa estratégica aos investimentos tradicionais.", "Exclusividade e Inteligência Financeira para Médicos", "A solidez patrimonial que sua profissão exige.", "Estrutura com garantias tangíveis." | "Rentabilidade Acima do Mercado", "Segurança e Transparência", "De 21,6% a 24% ao ano ou mais", "Ganhe ainda mais com nosso programa de recompensas" (removed per Theme 1), "Investimentos de alta performance para profissionais da saúde", "Investimentos seguros com total transparência", "Seu dinheiro protegido com a segurança que você merece", "Supere os investimentos tradicionais com nossos planos exclusivos", "Uma plataforma premium com rentabilidade superior ao mercado" |
| Highlight cards | "Ecossistema Exclusivo", "Performance em Crédito Privado", "Rigor em Garantias Reais", "Estratégia de rendimento superior aos índices de referência tradicionais", "Operações com lastro imobiliário e garantias tangíveis", "Para médicos que cuidam da saúde de todos", "Remuneração alvo de 21,6% a 24% ao ano", "Transparência total através de relatórios e escrituras registradas", "Um clube exclusivo para transformar dedicação em crescimento patrimonial contínuo", "Ver oportunidade" | "Benefícios Únicos", "Máxima Segurança", "Rentabilidade Superior", "Bonificações exclusivas para membros" (removed per Theme 1), "De 21,6% a 24% ao ano ou mais", "Investimentos protegidos", "Muito acima da poupança e CDB", "Programa de recompensas" (removed per Theme 1), "Total transparência e controle" |

**Resolution: revert `HeroBanner.tsx` and `HighlightSection.tsx` to Remix's headline, sub-claims, and card copy verbatim.**

## Theme 4: Guarantees Copy

- Remix (target): **"2 Mecanismos"** — "Garantia Hipotecária" + "Garantia Real e Fiduciária", backed by "Patrimônio de Lastro do Grupo" / "Solidez Patrimonial". `AboutUs.tsx` additionally uses "Ecossistema Exclusivo", "Estrutura de Mitigação de Risco", "Performance em Crédito Privado", "Rigor em Garantias Reais", "Alienação Fiduciária", bullets "• Exclusividade médica" / "• Rigor em garantias reais", and "✓ Títulos estruturados em crédito privado".
- `53225` (current — to be replaced): "3 Tipos" — "Hipotecárias"/"Reais"/a third type, "Patrimônio Sólido", plus an entire "Club8 vs. Outros Investimentos" comparison table and "Como funciona" bullet list that Remix doesn't have at all.

**Resolution: revert `AuditBanner.tsx`, `SecurityGuarantees.tsx`, `pages/Guarantees.tsx`, `pages/AboutUs.tsx` to Remix's "2 Mecanismos" copy, and remove the comparison table and "Como funciona" section entirely** (Remix has no equivalent to revert them to — they simply don't exist on the Remix side, so the correct match is deletion, not a rewrite).

## Theme 5: Auth / Registration — Exception, Not Reverted

**Flagging instead of silently applying "match Remix" here** — a literal revert would be a real regression, not a text fix:

- `LoginSection.tsx`: Remix ships a visible demo test-credentials panel ("Credenciais de Teste", `admin123`, `teste@club8.com.br / teste123`) — that's Lovable-prototype scaffolding, not real copy. Restoring it to `53225` would put fake admin credentials on a real, user-facing login page.
- `MembershipSection.tsx` / `EditPersonalDataDialog.tsx`: `53225`'s password-creation/confirmation fields ("Criar Senha *", "Confirme sua senha", show/hide toggles) don't exist in Remix because Remix's registration is fully mocked and never needed real password handling. Removing them to "match Remix" would break real account security.

**Recommendation: exclude this theme from the revert.** `53225` stays as-is here. Flagged for the user's awareness rather than silently deviating from the "Remix is source of truth" rule applied everywhere else — say the word if you want it reverted anyway.

## Theme 6: Footer & Navigation

| | Remix (target) | `53225` (current — to be replaced) |
|---|---|---|
| Anchors | `#investir`, `#planos`, `#titulos`, `/aporte` | `/#bonificacoes`, `/#cotas`, `/#planos`, `/#seja-socio`, `/#simulador` |
| Nav labels | "Fila de Espera", "Investir", "Títulos" | "Lista de Espera", "Seja Sócio", "Simulador", "Cotas" |
| Social links | none | Facebook, Instagram (real URLs) |

**Resolution: revert nav labels and anchors to Remix's.** The Facebook/Instagram links are a genuine addition with no Remix equivalent to revert to — **flagging, not silently deleting real working social links**: confirm whether these should be removed (strict Remix match) or kept (they're real accounts, arguably out of "text" scope). Everything else in this theme reverts cleanly.

## Theme 7: Pages/Routes That Only Exist On One Side — Out of Scope

Structural, not copy — no action from a text-only spec:

- Only in `53225`: `/cadastro` (`Register.tsx`), `/contato` (`Contact.tsx`)
- Only in Remix: `/admin` (superseded by the separate `admin club8` project — do not recreate), `/embaixador` (ties to the disabled referral program), `/notificacoes`, `/suporte`

Not touched by this spec. If full route parity is wanted, that's a separate, structural spec — flagging so it isn't assumed to be covered here.

## Appendix: Full File Diff-Line Counts (raw code diff, for reference)

| File | Diff lines (code, not just text) |
|---|---|
| `components/MembershipSection.tsx` | 938 |
| `components/InvestorDashboard.tsx` | 680 |
| `pages/InvestmentFlow.tsx` | 644 |
| `pages/AboutUs.tsx` | 386 |
| `pages/Guarantees.tsx` | 332 |
| `hooks/useAuth.tsx` | 310 (all code/logic, zero text) |
| `components/EditPersonalDataDialog.tsx` | 304 |
| `components/InvestmentPlans.tsx` | 268 |
| `components/ReferralSystem.tsx` | 235 |
| `pages/WaitingList.tsx` / `components/QuotasAvailable.tsx` | 200 |
| `components/BonusTracker.tsx` | 191 |
| `components/LoginSection.tsx` | 155 |
| `components/SecurityGuarantees.tsx` | 153 |
| `components/FutureProjectionsCards.tsx` | 138 |
| `components/Footer.tsx` / `HeroBanner.tsx` | 118 |
| `components/HighlightSection.tsx` | 107 |
| `App.tsx` | 85 |
| `pages/Index.tsx` | 80 |
| `components/Header.tsx` | 78 |
| `components/DocumentsSection.tsx` | 51 |
| `pages/Dashboard.tsx` | 41 |
| `components/AuditBanner.tsx` | 29 |
| `index.css` | 22 |
| `components/InvestmentModel.tsx` | 11 (no text impact) |
| `App.css` | 9 |

Diff lines include expected code-level divergence (real `@tanstack/react-query` calls, real auth, real form validation) on top of the copy differences reverted above — not all of it is a text change, but every text change needed is captured in Themes 1–6.
