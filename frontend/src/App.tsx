import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProfilePage } from "./modules/cliente/pages/ProfilePage";
import RegisterPage from "./modules/cliente/pages/RegisterPage";

import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";

import CatalogPage from "./modules/produtos/pages/CatalogPage";

import CheckoutPage from "./modules/vendas/pages/CheckoutPage";
import OrdersPage from "./modules/vendas/pages/OrdersPage";
import ReturnsPage from "./modules/vendas/pages/ReturnsPage";

import ProductsPage from "./modules/adm/pages/ProductsPage";
import DashboardPage from "./modules/adm/pages/DashboardPage";
import OrdersPageADM from "./modules/adm/pages/OrdersPage";
import ReturnsPageADM from "./modules/adm/pages/ReturnsPage";
import CustomerPage from "./modules/adm/pages/CustomerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/catalogo" element={
            <>
              <Header />
              <CatalogPage />
              <Footer />
            </>
          }
        />
        <Route path="/comprar" element={
            <>
              <Header />
              <CheckoutPage />
              <Footer />
            </>
          }
        />

        <Route path="/pedidos" element={
            <>
              <Header />
              <OrdersPage />
              <Footer />
            </>
          }
        />

        <Route path="/devolucoes" element={
            <>
              <Header />
              <ReturnsPage />
              <Footer />
            </>
          }
        />

        <Route path="/perfil" element={
            <>
              <Header />
              <ProfilePage />
              <Footer />
            </>
          }
        />
        <Route path="/cadastrar" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/clientes" element={<CustomerPage />} />
        <Route path="/vendas" element={<OrdersPageADM />} />
        <Route path="/adm/devolucoes" element={<ReturnsPageADM />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
