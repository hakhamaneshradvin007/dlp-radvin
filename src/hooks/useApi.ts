import { useState, useEffect, useCallback } from "react";

// Generic hook for API calls with loading and error states
export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err: any) {
      setError(err.message || "خطا در دریافت اطلاعات");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Hook for API calls with manual trigger
export function useApiMutation<T, P = any>(apiCall: (params: P) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (params: P) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall(params);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err.message || "خطا در انجام عملیات");
        console.error("API Mutation Error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
}

// Hook for paginated API calls
export function usePaginatedApi<T>(
  apiCall: (
    page: number,
    limit: number,
    filters?: any
  ) => Promise<{
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  }>,
  initialFilters: any = {},
  limit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(initialFilters);

  const fetchData = useCallback(
    async (currentPage: number, currentFilters: any) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall(currentPage, limit, currentFilters);
        setData(result.data);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err: any) {
        setError(err.message || "خطا در دریافت اطلاعات");
        console.error("Paginated API Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [apiCall, limit]
  );

  useEffect(() => {
    fetchData(page, filters);
  }, [fetchData, page, filters]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const updateFilters = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const refetch = useCallback(() => {
    fetchData(page, filters);
  }, [fetchData, page, filters]);

  return {
    data,
    loading,
    error,
    page,
    totalPages,
    total,
    filters,
    goToPage,
    updateFilters,
    refetch,
  };
}

export default {
  useApi,
  useApiMutation,
  usePaginatedApi,
};
