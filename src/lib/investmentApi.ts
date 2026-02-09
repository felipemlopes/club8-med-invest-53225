import api from './api';

export interface Feature {
  name: string;
}

export interface Plan {
  id: number;
  name: string;
  cotas: string;
  annual_return: number;
  monthly_return: number;
  min_investment: number;
  carencia: string;
  liquidez: string;
  yearlyProfit: number;
  popular: boolean;
  benefits: Feature[];
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


export interface TimelineItem {
  id: number;
  type: 'aporte' | 'retorno' | 'indicacao';
  title: string;
  extra?: string | null;
  amount: number;
  date: string;
}

export type TimelineData = TimelineItem[];

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

export interface Profile {
  name: string;
  email: string;
  crm?: string;
  specialty?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

export interface Future {
  total_invested: number;
  monthly_return_rate: number;
  indications: number[];
}

export interface PerformanceMonth {
  label: string;
  isProjection: boolean;
  club8: number;
  cdb?: number;
  lca?: number;
  poupanca?: number;
  tesouroDireto?: number;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PerformanceResponse {
  initial_investment: number;
  months: PerformanceMonth[];
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

  async getTimeline(): Promise<TimelineItem[]> {
    const response = await api.get<{ data: any[] }>('/timeline');
    console.log(response)
    return (response.data ?? []).map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      extra: item.extra,
      amount: Number(item.amount),
      date: new Date(item.created_at).toLocaleDateString('pt-BR'),
    }));
  },

  async getFuture() {
    const response = await api.get<{ data: Future }>('/future');
    return response.data?.data || null;
  },

  async getGraph(): Promise<PerformanceResponse> {
    const response = await api.get<{ data: PerformanceResponse }>('/graph');
    return response.data.data;
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

  async getReferralsRegistred() {
    const response = await api.get<{ data: ReferralData }>('/referrals/registred');
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

  async updateProfile(data: Profile) {
    const response = await api.post<{ data: Profile }>('/profile', data);
    return response.data;
  },

  async getDocuments() {
    const response = await api.get<{ data: Document[] }>('/documents');
    return response.data?.data || [];
  },

  async sendContact(data: Contact) {
    const response = await api.post<{ data: Contact }>('/contact', data);
    return response.data;
  },
};

export default investmentApi;
