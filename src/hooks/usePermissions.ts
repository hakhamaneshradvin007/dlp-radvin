import { useAuth } from "../contexts/AuthContext";

export type Permission =
  | "dashboard.view"
  | "policies.view"
  | "policies.create"
  | "policies.edit"
  | "policies.delete"
  | "monitoring.view"
  | "alerts.view"
  | "alerts.manage"
  | "reports.view"
  | "reports.generate"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "settings.view"
  | "settings.edit"
  | "logs.view.own"
  | "logs.view.all";

const rolePermissions: Record<string, Permission[]> = {
  admin: [
    "dashboard.view",
    "policies.view",
    "policies.create",
    "policies.edit",
    "policies.delete",
    "monitoring.view",
    "alerts.view",
    "alerts.manage",
    "reports.view",
    "reports.generate",
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "settings.view",
    "settings.edit",
    "logs.view.all",
  ],
  analyst: [
    "dashboard.view",
    "monitoring.view",
    "alerts.view",
    "alerts.manage",
    "reports.view",
    "reports.generate",
    "users.view",
    "logs.view.all",
  ],
  viewer: ["logs.view.own"],
};

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const canAccessRoute = (route: string): boolean => {
    const routePermissions: Record<string, Permission[]> = {
      "/": ["dashboard.view"],
      "/dashboard": ["dashboard.view"],
      "/policies": ["policies.view"],
      "/monitoring": ["monitoring.view"],
      "/alerts": ["alerts.view"],
      "/reports": ["reports.view"],
      "/users": ["users.view"],
      "/settings": ["settings.view"],
      "/logs": ["logs.view.own", "logs.view.all"],
    };

    const requiredPermissions = routePermissions[route] || [];
    return hasAnyPermission(requiredPermissions);
  };

  const getUserPermissions = (): Permission[] => {
    if (!user) return [];
    return rolePermissions[user.role] || [];
  };

  return {
    hasPermission,
    hasAnyPermission,
    canAccessRoute,
    getUserPermissions,
    userRole: user?.role,
  };
};
