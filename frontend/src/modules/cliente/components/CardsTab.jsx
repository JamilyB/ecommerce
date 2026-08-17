import { useState } from 'react';

import {
  CreditCard,
  Plus,
  Trash2,
  Check,
  Star,
  X,
} from 'lucide-react';

import FormField from './FormField';

const CardsTab = ({
  savedCards,
  showForm,
  setShowForm,
}) => {

  const [form, setForm] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
  });

  const handleCancel = () => {
    setForm({
      cardNumber: '',
      holderName: '',
      expiry: '',
    });

    setShowForm(false);
  };

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <h3 className="font-serif text-lg font-semibold text-[#56443F]">
          Cartões Salvos
        </h3>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F] transition-colors"
          >
            <Plus size={14} />
            Adicionar
          </button>
        )}

      </div>

      {!showForm && (
        <div className="space-y-4">

          {savedCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-5 border border-[#E4C7B7]/30 space-y-3"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#56443F] to-[#8B645A] flex items-center justify-center">
                    <CreditCard size={18} className="text-[#F1F0E2]" />
                  </div>

                  <div>
                    <p className="font-bold text-sm text-[#56443F]">
                      {card.brand}
                    </p>

                    <p className="text-xs text-[#A28776] font-semibold tracking-wider">
                      •••• {card.last4}
                    </p>
                  </div>

                </div>

                <div className="flex gap-1.5">

                  {!card.isDefault && (
                    <button
                      className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#A28776] hover:text-[#8B645A] transition-colors"
                    >
                      <Star size={13} />
                    </button>
                  )}

                  <button
                    className="p-1.5 hover:bg-red-50 rounded-lg text-[#A28776] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>

                </div>

              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A28776] font-semibold">
                  {card.holderName}
                </span>

                <span className="text-[#A28776] font-semibold">
                  Val: {card.expiry}
                </span>
              </div>

              {card.isDefault && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Check size={9} />
                  Cartão Padrão
                </span>
              )}

            </div>
          ))}

        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4">

          <div className="flex items-center justify-between">

            <h4 className="font-bold text-sm text-[#56443F]">
              Novo Cartão
            </h4>

            <button
              onClick={handleCancel}
              className="text-[#A28776] hover:text-[#56443F] transition-colors"
            >
              <X size={18} />
            </button>

          </div>

          <div className="space-y-3">

            <FormField
              label="Número do Cartão"
              value={form.cardNumber}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  cardNumber: formatCardNumber(v),
                }))
              }
              placeholder="0000 0000 0000 0000"
            />

            <FormField
              label="Nome no Cartão"
              value={form.holderName}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  holderName: v,
                }))
              }
              placeholder="NOME COMPLETO"
            />

            <FormField
              label="Validade"
              value={form.expiry}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  expiry: formatCardExpiry(v),
                }))
              }
              placeholder="12/28"
            />

          </div>

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Check size={14} className="inline mr-1" />
              Adicionar
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white hover:bg-[#E4C7B7]/15 text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <X size={14} className="inline mr-1" />
              Cancelar
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default CardsTab;