import { useState } from "react";
import {
  MapPin,
  Home,
  Building2,
  Plus,
  Trash2,
  Check,
} from "lucide-react";

function Addresses({ addresses }) {
  const [addressList, setAddressList] = useState(addresses);

  function removeAddress(id) {
    setAddressList(
      addressList.filter((address) => address.id !== id)
    );
  }

  function setDefault(id) {
    setAddressList(
      addressList.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  }

  return (
    <section className="client-section">

      <div className="section-header">

        <h2>Meus Endereços</h2>

        <button className="text-button">
          <Plus size={14} />
          Adicionar
        </button>

      </div>

      {addressList.length === 0 ? (
        <div className="empty-state">
          <MapPin size={32} />
          <p>Nenhum endereço cadastrado.</p>
        </div>
      ) : (
        <div className="cards-list">

          {addressList.map((address) => (

            <div className="client-card address-card" key={address.id}>

              <div className="address-header">

                <div className="address-title">

                  <div className="field-icon">
                    {address.label.toLowerCase() === "casa" ? (
                      <Home size={16} />
                    ) : (
                      <Building2 size={16} />
                    )}
                  </div>

                  <div>
                    <strong>{address.label}</strong>
                    <span>{address.recipientName}</span>
                  </div>

                </div>

                <button
                  className="icon-button delete"
                  onClick={() => removeAddress(address.id)}
                >
                  <Trash2 size={15} />
                </button>

              </div>

              <p className="address-text">
                {address.street}, {address.number}
                {address.complement &&
                  `, ${address.complement}`}
                <br />
                {address.city} - {address.state}
                <br />
                CEP: {address.cep}
              </p>

              {address.isDefault ? (
                <span className="default-badge">
                  <Check size={10} />
                  Endereço padrão
                </span>
              ) : (
                <button
                  className="link-button"
                  onClick={() => setDefault(address.id)}
                >
                  Definir como padrão
                </button>
              )}

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default Addresses;