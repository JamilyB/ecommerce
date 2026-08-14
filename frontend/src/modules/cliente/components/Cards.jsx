import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  Check,
} from "lucide-react";

function Cards({ cards }) {
  const [cardList, setCardList] = useState(cards);

  function removeCard(id) {
    setCardList(
      cardList.filter((card) => card.id !== id)
    );
  }

  function setDefault(id) {
    setCardList(
      cardList.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  }

  return (
    <section className="client-section">

      <div className="section-header">

        <h2>Cartões Salvos</h2>

        <button className="text-button">
          <Plus size={14} />
          Adicionar
        </button>

      </div>

      {cardList.length === 0 ? (
        <div className="empty-state">

          <CreditCard size={32} />

          <p>Nenhum cartão cadastrado.</p>

        </div>
      ) : (
        <div className="cards-list">

          {cardList.map((card) => (

            <div className="client-card" key={card.id}>

              <div className="card-header">

                <div className="card-info">

                  <div className="card-icon">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <strong>{card.brand}</strong>

                    <span>
                      •••• {card.last4}
                    </span>
                  </div>

                </div>

                <div className="card-actions">

                  {!card.isDefault && (
                    <button
                      className="icon-button"
                      onClick={() => setDefault(card.id)}
                      title="Definir como padrão"
                    >
                      <Star size={15} />
                    </button>
                  )}

                  <button
                    className="icon-button delete"
                    onClick={() => removeCard(card.id)}
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              </div>

              <div className="card-details">

                <span>{card.holderName}</span>

                <span>
                  Validade: {card.expiry}
                </span>

              </div>

              {card.isDefault && (
                <span className="default-badge">
                  <Check size={10} />
                  Cartão padrão
                </span>
              )}

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default Cards;