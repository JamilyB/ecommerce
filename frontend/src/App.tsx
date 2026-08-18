import { ProfilePage } from "./modules/cliente/pages/ProfilePage";
import RegisterPage from "./modules/cliente/pages/RegisterPage";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import CatalogPage from "./modules/produtos/pages/CatalogPage";
import CheckoutPage from "./modules/vendas/pages/CheckoutPage";

function App() {
  return (
    <div className="min-h-screen bg-[#F1F0E2] text-[#56443F] flex flex-col">
      <Header />

      <main className="flex-1">
        <CheckoutPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
