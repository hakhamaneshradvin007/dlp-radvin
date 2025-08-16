export interface Policy {
  id: string;
  name: string;
  description: string;
  type:
    | "data_classification"
    | "endpoint_protection"
    | "network_monitoring"
    | "email_security";
  status: "active" | "inactive" | "pending";
  severity: "low" | "medium" | "high" | "critical";
  rules: Rule[];
  createdAt: string;
  updatedAt: string;
}

export interface Rule {
  id: string;
  condition: string;
  action: "block" | "alert" | "quarantine" | "log";
  enabled: boolean;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved";
  timestamp: string;
  source: string;
  policyId?: string;
}

export interface DashboardMetrics {
  totalPolicies: number;
  activePolicies: number;
  totalAlerts: number;
  criticalAlerts: number;
  blockedAttempts: number;
  dataScanned: string;
  riskScore: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  department: string;
  lastActive: string;
  status: "active" | "inactive";
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  details: string;
}
