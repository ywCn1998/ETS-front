import { QueryClient } from '@tanstack/react-query';

export const QueryStaleTime = 1000 * 60 * 5; // 5min

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: QueryStaleTime,
    },
  },
});


export default queryClient;