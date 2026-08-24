import { CreditCard } from 'lucide-react';
import FormField from './FormField';

const CardForm = ({ form, setForm }) => {
  return (
    <div className="space-y-4">

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
        label="Nome impresso no cartão"
        value={form.holderName}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            holderName: v,
          }))
        }
        placeholder="NOME COMPLETO"
      />

      <div>
        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Bandeira
        </label>

        <select
          value={form.brand}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              brand: e.target.value,
            }))
          }
          className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors"
        >
          <option value="">Selecione a bandeira</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Elo">Elo</option>
          <option value="American Express">American Express</option>
        </select>
      </div>

      <FormField
        label="Código de segurança (CVV)"
        value={form.cvv}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            cvv: v,
          }))
        }
        placeholder="123"
      />

      <div className="pt-3 border-t border-[#E4C7B7]/30">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            name="preferredCard"
            checked={form.isPreferred}
            onChange={() =>
              setForm((prev) => ({
                ...prev,
                isPreferred: true,
              }))
            }
            className="w-4 h-4 accent-[#8B645A]"
          />

          <div>
            <p className="text-xs font-bold text-[#56443F]">
              Cartão preferencial
            </p>

            <p className="text-[10px] text-[#A28776] font-semibold">
              Usar este cartão como principal
            </p>
          </div>

        </label>

      </div>

    </div>
  );
};

export default CardForm;
