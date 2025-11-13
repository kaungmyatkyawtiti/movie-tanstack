"use client";

import {
  QueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from "@tanstack/react-query";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/utils/theme";

interface Props {
  readonly children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity,
      // refetchOnWindowFocus: true,
    },
  },
});

export default function Providers({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>

  )
}
