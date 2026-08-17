import { MapPin } from 'lucide-react';
import FormField from './FormField';

const AddressForm = ({ form, setForm }) => {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2 mb-2">
        <MapPin size={16} className="text-[#8B645A]" />

        <h2 className="font-serif text-lg font-semibold text-[#56443F]">
          Endereço
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <FormField
          label="CEP"
          value={form.cep}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, cep: v }))
          }
          placeholder="00000-000"
        />

        <FormField
          label="Número"
          value={form.number}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, number: v }))
          }
          placeholder="123"
        />

        <div className="col-span-2">
          <FormField
            label="Rua / Logradouro"
            value={form.street}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, street: v }))
            }
            placeholder="Av. Paulista"
          />
        </div>

        <div className="col-span-2">
          <FormField
            label="Complemento"
            value={form.complement}
            onChange={(v) =>
              setForm((prev) => ({ ...prev, complement: v }))
            }
            placeholder="Apto 42 (opcional)"
          />
        </div>

        <FormField
          label="Cidade"
          value={form.city}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, city: v }))
          }
          placeholder="São Paulo"
        />

        <FormField
          label="Estado"
          value={form.state}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              state: v.toUpperCase().slice(0, 2),
            }))
          }
          placeholder="SP"
        />

      </div>

    </div>
  );
};

export default AddressForm;