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

      <div className="grid grid-cols-2 gap-3">

        <FormField
          label="Validade"
          value={form.expiry}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              expiry: v,
            }))
          }
          placeholder="12/28"
        />

        <FormField
          label="CVV"
          value={form.cvv}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              cvv: v,
            }))
          }
          placeholder="123"
        />

      </div>

    </div>
  );
};

export default CardForm;