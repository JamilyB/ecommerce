import { useState } from 'react';

import {
  CreditCard,
  Plus,
  Trash2,
  Check,
  Star,
  X,
  Edit2,
} from 'lucide-react';

import FormField from './FormField';

const CardsTab = ({
  savedCards,
  showForm,
  setShowForm,
}) => {

  const emptyForm = {
    cardNumber: '',
    holderName: '',
    brand: '',
    securityCode: '',
    isDefault: false,
  };

  const [cards, setCards] = useState(savedCards);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const startAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (card) => {
    setForm({
      ...emptyForm,
      ...card,
    });

    setEditingId(card.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    const newCard = {
      ...form,
      id: editingId || Date.now(),
      last4: form.cardNumber.slice(-4),
    };

    if (editingId) {
      setCards((prev) => {
        if (form.isDefault) {
          return prev.map((card) => ({
            ...card,
            isDefault:
              card.id === editingId,
          }));
        }

        return prev.map((card) =>
          card.id === editingId
            ? newCard
            : card
        );
      });
    } else {
      setCards((prev) => {
        if (form.isDefault) {
          return [
            ...prev.map((card) => ({
              ...card,
              isDefault: false,
            })),
            newCard,
          ];
        }

        return [...prev, newCard];
      });
    }

    handleCancel();
  };

  const handleDelete = (id) => {
    setCards((prev) =>
      prev.filter((card) => card.id !== id)
    );
  };

  const setDefaultCard = (id) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h3 className="font-serif text-lg font-semibold text-[#56443F]">
          Cartões Salvos
        </h3>

        {!showForm && (
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F]"
          >
            <Plus size={14} />
            Adicionar
          </button>
        )}

      </div>

      {/* CARTÕES */}

      {!showForm && (

        <div className="space-y-4">

          {cards.map((card) => (

            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 border border-[#E4C7B7]/30 space-y-3"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#56443F] to-[#8B645A] flex items-center justify-center">
                    <CreditCard
                      size={18}
                      className="text-[#F1F0E2]"
                    />
                  </div>

                  <div>

                    <p className="font-bold text-sm text-[#56443F]">
                      {card.brand}
                    </p>

                    <p className="text-xs text-[#A28776] font-semibold tracking-wider">
                      ••••{' '}
                      {card.last4 ||
                        card.cardNumber?.slice(-4)}
                    </p>

                  </div>

                </div>

                {/* AÇÕES */}

                <div className="flex gap-1.5">

                  {!card.isDefault && (
                    <button
                      onClick={() =>
                        setDefaultCard(card.id)
                      }
                      title="Definir como preferencial"
                      className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#A28776] hover:text-[#8B645A]"
                    >
                      <Star size={13} />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      startEdit(card)
                    }
                    title="Editar cartão"
                    className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#A28776] hover:text-[#8B645A]"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(card.id)
                    }
                    title="Excluir cartão"
                    className="p-1.5 hover:bg-red-50 rounded-lg text-[#A28776] hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>

                </div>

              </div>

              {/* NOME */}

              <div className="flex items-center justify-between text-xs">

                <span className="text-[#A28776] font-semibold">
                  {card.holderName}
                </span>

              </div>

              {/* PREFERENCIAL */}

              {card.isDefault && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Check size={9} />
                  Cartão Preferencial
                </span>
              )}

            </div>

          ))}

        </div>

      )}

      {/* FORMULÁRIO */}

      {showForm && (

        <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4">

          {/* HEADER DO FORMULÁRIO */}

          <div className="flex items-center justify-between">

            <h4 className="font-bold text-sm text-[#56443F]">
              {editingId
                ? 'Editar Cartão'
                : 'Novo Cartão'}
            </h4>

            <button
              onClick={handleCancel}
              className="text-[#A28776] hover:text-[#56443F]"
            >
              <X size={18} />
            </button>

          </div>

          {/* CAMPOS */}

          <div className="space-y-3">

            <FormField
              label="Número do Cartão"
              value={form.cardNumber}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  cardNumber: v,
                }))
              }
              placeholder="0000 0000 0000 0000"
            />

            <FormField
              label="Nome impresso no Cartão"
              value={form.holderName}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  holderName: v.toUpperCase(),
                }))
              }
              placeholder="NOME COMPLETO"
            />

            <FormField
              label="Bandeira do Cartão"
              value={form.brand}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  brand: v,
                }))
              }
              placeholder="Visa / Mastercard / Elo"
            />

            <FormField
              label="Código de Segurança"
              value={form.securityCode}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  securityCode: v
                    .replace(/\D/g, '')
                    .slice(0, 4),
                }))
              }
              placeholder="123"
            />

            {/* PREFERENCIAL */}

            <div className="pt-2">

              <label className="flex items-center gap-2 text-sm font-semibold text-[#56443F]">

                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isDefault:
                        e.target.checked,
                    }))
                  }
                  className="accent-[#56443F]"
                />

                Cartão preferencial

              </label>

            </div>

          </div>

          {/* BOTÕES */}

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <Check
                size={14}
                className="inline mr-1"
              />

              {editingId
                ? 'Atualizar'
                : 'Adicionar'}
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <X
                size={14}
                className="inline mr-1"
              />

              Cancelar
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default CardsTab;