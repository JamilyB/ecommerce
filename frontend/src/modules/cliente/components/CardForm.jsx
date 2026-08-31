import { CreditCard } from 'lucide-react';
import FormField from './FormField';
import { validateCartaoForm } from '../../../shared/validation/validation.js';
import { maskCardNumber, maskCVV, maskExpiry } from '../../../shared/validation/masks.js';

const CardForm = ({ form, setForm, errors = {}, touched = {}, setTouched = () => {} }) => {
  const validationErrors = { ...validateCartaoForm(form), ...errors };
  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="space-y-4">

      <FormField
        label="Número do Cartão"
        value={form.cardNumber}
        onChange={(v) => {
          markTouched('cardNumber');
          setForm((prev) => ({
            ...prev,
            cardNumber: maskCardNumber(v),
          }));
        }}
        placeholder="0000 0000 0000 0000"
        error={validationErrors.cardNumber}
        showError={!!touched.cardNumber}
        inputMode="numeric"
      />

      <FormField
        label="Nome impresso no cartão"
        value={form.holderName}
        onChange={(v) => {
          markTouched('holderName');
          setForm((prev) => ({
            ...prev,
            holderName: v,
          }));
        }}
        placeholder="NOME COMPLETO"
        error={validationErrors.holderName}
        showError={!!touched.holderName}
      />

      <div>
        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Bandeira
        </label>

        <select
          value={form.brand}
          onChange={(e) => {
            markTouched('brand');
            setForm((prev) => ({
              ...prev,
              brand: e.target.value,
            }));
          }}
          className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors ${
            validationErrors.brand && touched.brand ? 'border-red-300' : 'border-[#E4C7B7]/40'
          }`}
        >
          <option value="">Selecione a bandeira</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Elo">Elo</option>
          <option value="American Express">American Express</option>
        </select>
        {validationErrors.brand && (
          <p className="text-[11px] text-red-500 mt-1">{validationErrors.brand}</p>
        )}
      </div>

      <FormField
        label="Código de segurança (CVV)"
        value={form.cvv}
        onChange={(v) => {
          markTouched('cvv');
          setForm((prev) => ({
            ...prev,
            cvv: maskCVV(v),
          }));
        }}
        placeholder="123"
        error={validationErrors.cvv}
        showError={!!touched.cvv}
        inputMode="numeric"
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
