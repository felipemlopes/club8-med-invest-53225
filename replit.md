# Club8 Med Invest

## Overview

Club8 is an exclusive investment platform designed specifically for medical professionals (physicians) in Brazil. The platform offers premium investment plans with competitive returns (1.8% - 2.0% monthly), featuring a membership-based model with Gold and Platinum tiers. Key features include investment simulation tools, referral bonuses, a waiting list system for limited quotas, and a comprehensive investor dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack React Query for server state, React Context for auth state
- **Styling**: Tailwind CSS with custom theming (Club8 brand colors: turquoise primary, dark backgrounds)
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Charts**: Recharts for performance visualization in dashboard

### Component Structure
- **Pages**: Located in `src/pages/` - handle route-level views (Index, Dashboard, Login, Register, etc.)
- **Components**: Located in `src/components/` - reusable UI components
- **UI Primitives**: Located in `src/components/ui/` - Shadcn/UI base components

### Authentication Flow
- Token-based authentication using Bearer tokens
- Auth context provider wrapping the application (`src/hooks/useAuth.tsx`)
- Tokens stored in localStorage (`club8_token`)
- Protected routes redirect to login when unauthenticated

### API Layer
- Custom API client in `src/lib/api.ts` handling HTTP requests
- Investment-specific API calls in `src/lib/investmentApi.ts`
- Base URL configurable via `VITE_API_URL` environment variable
- Default backend endpoint: `http://localhost:8000/api/v1`

### Key Design Patterns
- **Feature-based organization**: Components grouped by feature (BonusSection, InvestorDashboard, etc.)
- **Custom hooks**: Auth logic abstracted into `useAuth` hook
- **Type interfaces**: TypeScript interfaces for API responses (DashboardData, ReferralData, etc.)

## External Dependencies

### Backend API
- Laravel backend expected at configurable URL (default: `http://localhost:8000`)
- RESTful API with `/api/v1` prefix
- Sanctum-based authentication (CSRF cookie + Bearer tokens)

### Key Endpoints Expected
- `POST /api/v1/auth/login` - User authentication
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/me` - Current user info
- `GET /api/v1/dashboard` - Investor dashboard data
- `GET /api/v1/referrals` - Referral program data
- `GET /api/v1/investments` - User investments
- `GET /api/v1/plans` - Available investment plans

### Third-Party Libraries
- **@tanstack/react-query**: Server state management and caching
- **recharts**: Dashboard performance charts
- **date-fns**: Date formatting utilities
- **lucide-react**: Icon library
- **embla-carousel-react**: Hero banner carousel
- **react-day-picker**: Date selection components

### Environment Variables
- `VITE_API_URL`: Backend API base URL (required for production)