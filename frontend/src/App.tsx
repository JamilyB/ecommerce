
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProfilePage } from "./modules/cliente/pages/ProfilePage";
import RegisterPage from "./modules/cliente/pages/RegisterPage";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import CatalogPage from "./modules/produtos/pages/CatalogPage";
import CheckoutPage from "./modules/vendas/pages/CheckoutPage";
import ProductsPage from "./modules/adm/pages/ProductsPage";
import InventoryPage from "./modules/adm/pages/InventoryPage";
import DeliveriesPage from "./modules/adm/pages/DeliveriesPage";
import DashboardPage from "./modules/adm/pages/DashboardPage";
import OrdersPageADM from "./modules/adm/pages/OrdersPage";
import ReturnsPageADM from "./modules/adm/pages/ReturnsPage"
import CustomerPage from "./modules/adm/pages/CustomerPage"
import OrdersPage from "./modules/vendas/pages/OrdersPage"
import ReturnsPage from "./modules/vendas/pages/ReturnsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<CustomerPage />} />
        <Route path="/produtos" element={<ProductsPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/comprar" element={<CheckoutPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/devolucoes" element={<ReturnsPage />} />
        <Route path="/inventario" element={<InventoryPage />} />
        <Route path="/entregas" element={<DeliveriesPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
