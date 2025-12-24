import api from './api';

export interface Plan {
  id: number;
  name: string;
  monthly_rate: number;
  min_investment: number;
  liquidity: string;
  description: string;
}

export interface DashboardData {
  total_invested: number;
  current_balance: number;
  total_returns: number;
  monthly_return_rate: number;
  total_transferred: number;
  next_transfer_date: string;
  plan: {
    id: number;
    name: string;
    liquidity: string;
  } | null;
  entry_date: string;
  recent_returns: Array<{
    month: string;
    amount: number;
    rate: number;
  }>;
}

export interface Investment {
  id: number;
  plan_id: number;
  plan_name: string;
  amount: number;
  current_value: number;
  start_date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}

export interface InvestmentReturn {
  id: number;
  month: string;
  month_label: string;
  amount: number;
  rate: number;
  status: 'pending' | 'paid' | 'scheduled';
  paid_at: string | null;
}

export interface WalletBalance {
  balance: number;
  available_for_withdrawal: number;
  pending: number;
}

export interface WalletTransaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'return' | 'bonus' | 'investment';
  amount: number;
  description: string;
  balance_after: number;
  created_at: string;
}

export interface ReferralData {
  referral_code: string;
  total_bonus: number;
  total_referred: number;
  referred_users: Array<{
    id: number;
    name: string;
    invested_amount: number;
    bonus_earned: number;
    status: 'pending' | 'active' | 'inactive';
    joined_at: string;
  }>;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

export const investmentApi = {
  async getPlans() {
    const response = await api.get<{ data: Plan[] }>('/plans');
    return response.data?.data || [];
  },

  async getDashboard() {
    const response = await api.get<{ data: DashboardData }>('/dashboard');
    return response.data?.data || null;
  },

  async getInvestments() {
    const response = await api.get<{ data: Investment[] }>('/investments');
    return response.data?.data || [];
  },

  async createInvestment(planId: number, amount: number) {
    const response = await api.post<{ data: Investment; message: string }>('/investments', {
      plan_id: planId,
      amount,
    });
    return response;
  },

  async getReturns() {
    const response = await api.get<{ data: InvestmentReturn[]; meta: { total_returns: number; months_active: number } }>('/returns');
    return response.data || { data: [], meta: { total_returns: 0, months_active: 0 } };
  },

  async getWalletBalance() {
    const response = await api.get<{ data: WalletBalance }>('/wallet');
    return response.data?.data || { balance: 0, available_for_withdrawal: 0, pending: 0 };
  },

  async getWalletHistory() {
    const response = await api.get<{ data: WalletTransaction[] }>('/wallet/history');
    return response.data?.data || [];
  },

  async getReferrals() {
    const response = await api.get<{ data: ReferralData }>('/referrals');
    return response.data?.data || null;
  },

  async sendReferralInvite(name: string, email: string, phone?: string) {
    const response = await api.post('/referrals/invite', { name, email, phone });
    return response;
  },

  async getNotifications() {
    const response = await api.get<{ data: Notification[] }>('/notifications');
    return response.data?.data || [];
  },

  async markNotificationAsRead(notificationId: number) {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response;
  },
};

export default investmentApi;
