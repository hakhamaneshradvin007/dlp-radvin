// API Service Layer
import axios from "axios";
import { Policy, Alert, User, ActivityLog, DashboardMetrics } from "../types";

// Base API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dlp_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("dlp_token");
      localStorage.removeItem("dlp_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Dashboard API
export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await apiClient.get("/dashboard/metrics");
    return response.data;
  },

  getRecentAlerts: async (limit: number = 5): Promise<Alert[]> => {
    const response = await apiClient.get(
      `/dashboard/recent-alerts?limit=${limit}`
    );
    return response.data;
  },

  getActivityTimeline: async (limit: number = 10): Promise<ActivityLog[]> => {
    const response = await apiClient.get(`/dashboard/activity?limit=${limit}`);
    return response.data;
  },
};

// Policies API
export const policiesApi = {
  getAll: async (filters?: {
    search?: string;
    type?: string;
    status?: string;
  }): Promise<Policy[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.type && filters.type !== "all")
      params.append("type", filters.type);
    if (filters?.status && filters.status !== "all")
      params.append("status", filters.status);

    const response = await apiClient.get(`/policies?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Policy> => {
    const response = await apiClient.get(`/policies/${id}`);
    return response.data;
  },

  create: async (
    policy: Omit<Policy, "id" | "createdAt" | "updatedAt">
  ): Promise<Policy> => {
    const response = await apiClient.post("/policies", policy);
    return response.data;
  },

  update: async (id: string, policy: Partial<Policy>): Promise<Policy> => {
    const response = await apiClient.put(`/policies/${id}`, policy);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/policies/${id}`);
  },
};

// Alerts API
export const alertsApi = {
  getAll: async (filters?: {
    search?: string;
    severity?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    alerts: Alert[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.severity && filters.severity !== "all")
      params.append("severity", filters.severity);
    if (filters?.status && filters.status !== "all")
      params.append("status", filters.status);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await apiClient.get(`/alerts?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Alert> => {
    const response = await apiClient.get(`/alerts/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: Alert["status"]): Promise<Alert> => {
    const response = await apiClient.patch(`/alerts/${id}/status`, { status });
    return response.data;
  },

  bulkUpdateStatus: async (
    ids: string[],
    status: Alert["status"]
  ): Promise<void> => {
    await apiClient.patch("/alerts/bulk-status", { ids, status });
  },
};

// Users API
export const usersApi = {
  getAll: async (filters?: {
    search?: string;
    role?: string;
    status?: string;
    department?: string;
  }): Promise<User[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.role && filters.role !== "all")
      params.append("role", filters.role);
    if (filters?.status && filters.status !== "all")
      params.append("status", filters.status);
    if (filters?.department) params.append("department", filters.department);

    const response = await apiClient.get(`/users?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  create: async (user: Omit<User, "id" | "lastActive">): Promise<User> => {
    const response = await apiClient.post("/users", user);
    return response.data;
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  toggleStatus: async (id: string): Promise<User> => {
    const response = await apiClient.patch(`/users/${id}/toggle-status`);
    return response.data;
  },
};

// Logs API
export const logsApi = {
  getAll: async (filters?: {
    search?: string;
    userId?: string;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    logs: ActivityLog[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.userId) params.append("userId", filters.userId);
    if (filters?.action) params.append("action", filters.action);
    if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
    if (filters?.dateTo) params.append("dateTo", filters.dateTo);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await apiClient.get(`/logs?${params.toString()}`);
    return response.data;
  },

  getUserLogs: async (
    userId: string,
    filters?: {
      search?: string;
      action?: string;
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{
    logs: ActivityLog[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.action) params.append("action", filters.action);
    if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
    if (filters?.dateTo) params.append("dateTo", filters.dateTo);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await apiClient.get(
      `/logs/user/${userId}?${params.toString()}`
    );
    return response.data;
  },
};

// Monitoring API
export const monitoringApi = {
  getLiveEvents: async (): Promise<any[]> => {
    const response = await apiClient.get("/monitoring/live-events");
    return response.data;
  },

  getStats: async (): Promise<any> => {
    const response = await apiClient.get("/monitoring/stats");
    return response.data;
  },

  subscribeToEvents: (callback: (event: any) => void) => {
    // WebSocket connection for real-time events
    const ws = new WebSocket(
      `${API_BASE_URL.replace("http", "ws")}/monitoring/events`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    return () => ws.close();
  },
};

// Reports API
export const reportsApi = {
  getReportData: async (period: string, type: string): Promise<any> => {
    const response = await apiClient.get(
      `/reports?period=${period}&type=${type}`
    );
    return response.data;
  },

  generateReport: async (config: {
    period: string;
    type: string;
    format: "pdf" | "excel" | "csv";
    filters?: any;
  }): Promise<{ downloadUrl: string }> => {
    const response = await apiClient.post("/reports/generate", config);
    return response.data;
  },

  getTopThreats: async (period: string): Promise<any[]> => {
    const response = await apiClient.get(
      `/reports/top-threats?period=${period}`
    );
    return response.data;
  },

  getWeeklyTrend: async (): Promise<any[]> => {
    const response = await apiClient.get("/reports/weekly-trend");
    return response.data;
  },
};

// Settings API
export const settingsApi = {
  getAll: async (): Promise<any> => {
    const response = await apiClient.get("/settings");
    return response.data;
  },

  update: async (settings: any): Promise<any> => {
    const response = await apiClient.put("/settings", settings);
    return response.data;
  },

  reset: async (): Promise<any> => {
    const response = await apiClient.post("/settings/reset");
    return response.data;
  },
};

// Auth API
export const authApi = {
  login: async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};

export default {
  dashboard: dashboardApi,
  policies: policiesApi,
  alerts: alertsApi,
  users: usersApi,
  logs: logsApi,
  monitoring: monitoringApi,
  reports: reportsApi,
  settings: settingsApi,
  auth: authApi,
};
