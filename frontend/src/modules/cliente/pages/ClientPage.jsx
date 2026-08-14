import { useState } from "react";
import { User, MapPin, CreditCard } from "lucide-react";

import PersonalData from "../components/PersonalData";
import Addresses from "../components/Addresses";
import Cards from "../components/Cards";

import { clientMock, addressesMock, cardsMock } from "../mocks/client";

import "../client.css";

const tabs = [
  {
    id: "personal",
    label: "Dados Pessoais",
    icon: User,
  },
  {
    id: "addresses",
    label: "Endereços",
    icon: MapPin,
  },
  {
    id: "cards",
    label: "Cartões",
    icon: CreditCard,
  },
];

function ClientPage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="client-page">

      <header className="client-header">
        <span className="client-subtitle">SUA CONTA</span>

        <h1>Perfil & Configurações</h1>

        <p>
          Gerencie seus dados, endereços e cartões.
        </p>
      </header>

      <section className="client-summary">

        <div className="client-avatar">
          {clientMock.fullName
            .split(" ")
            .slice(0, 2)
            .map((name) => name[0])
            .join("")}
        </div>

        <div>
          <strong>{clientMock.fullName}</strong>

          <span>{clientMock.email}</span>

          <small>CLIENTE</small>
        </div>

      </section>

      <nav className="client-tabs">

        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}

      </nav>

      <main className="client-content">

        {activeTab === "personal" && (
          <PersonalData client={clientMock} />
        )}

        {activeTab === "addresses" && (
          <Addresses addresses={addressesMock} />
        )}

        {activeTab === "cards" && (
          <Cards cards={cardsMock} />
        )}

      </main>

    </div>
  );
}

export default ClientPage;