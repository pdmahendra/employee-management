import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/authContext.tsx"; // Import AuthProvider
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
