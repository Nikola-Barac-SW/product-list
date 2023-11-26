import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Login = React.lazy(() => import("./pages/Login"));
const ProductList = React.lazy(() => import("./pages/ProductList"));
const Cart = React.lazy(() => import("./pages/Cart"));

const client = new QueryClient({
  defaultOptions: {}
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <React.Suspense fallback={<>Loading...</>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<ProtectedRoute />}>
                <Route path="products" element={<ProductList />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="*"
                  element={
                    <>
                      <h1>404</h1>
                    </>
                  }
                />
              </Route>
            </Routes>
          </React.Suspense>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
