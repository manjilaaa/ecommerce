import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
      <CartProvider>
            <App />
      </CartProvider>
      </WishlistProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
