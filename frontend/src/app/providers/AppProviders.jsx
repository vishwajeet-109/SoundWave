import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { queryClient } from "@/shared/lib/react-query";
import AuthBootstrap from "../AuthBootstrap";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap>

        {children}

      </AuthBootstrap>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </QueryClientProvider>
  );
}