import { api } from './axios-instance';

export interface DashboardStats {
  totalUsers: number;
  totalLoans: number;
  pendingLoans: number;
  approvedLoans: number;
  totalLoanAmount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

export const adminService = {
  getStats: async () => {
    const response = await api.get<DashboardStats>('/admin/stats');
    return response.data;
  },

  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get<PaginatedResponse<any>>('/admin/users', {
      params: { page, limit },
    });
    return response.data;
  },

  getLoans: async (page = 1, limit = 10) => {
    const response = await api.get<PaginatedResponse<any>>('/admin/loans', {
      params: { page, limit },
    });
    return response.data;
  },

  getActivityLogs: async (page = 1, limit = 20) => {
    const response = await api.get<PaginatedResponse<any>>('/admin/activity-logs', {
      params: { page, limit },
    });
    return response.data;
  },

  updateLoanStatus: async (loanId: string, status: string) => {
    const response = await api.patch(`/admin/loans/${loanId}/status`, { status });
    return response.data;
  },
};
