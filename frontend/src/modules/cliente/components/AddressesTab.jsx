import { useState } from 'react';

import {
  MapPin,
  Plus,
  Trash2,
  Check,
  Home,
  Building2,
  Edit2,
  X,
} from 'lucide-react';

import FormField from './FormField';

const AddressesTab = ({
  savedAddresses,
  showForm,
  setShowForm,
  editingId,
  setEditingId,
}) => {

  const emptyForm = {
    label: '',
    recipientName: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  };

  const [form, setForm] = useState(emptyForm);

  const startAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (address) => {
    setForm(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <h3 className="font-serif text-lg font-semibold text-[#56443F]">
          Meus Endereços
        </h3>

        {!showForm && (
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F] transition-colors"
          >
            <Plus size={14} />
            Adicionar
          </button>
        )}

      </div>

      {!showForm && (
        <div className="space-y-4">

          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-2xl p-5 border border-[#E4C7B7]/30 space-y-3"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center">
                    {addr.label.toLowerCase().includes('casa') ? (
                      <Home size={14} className="text-[#8B645A]" />
                    ) : (
                      <Building2 size={14} className="text-[#8B645A]" />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-sm text-[#56443F]">
                      {addr.label}
                    </p>

                    <p className="text-[10px] text-[#A28776] font-semibold">
                      {addr.recipientName}
                    </p>
                  </div>

                </div>

                <div className="flex gap-1.5">

                  <button
                    onClick={() => startEdit(addr)}
                    className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#A28776] hover:text-[#8B645A] transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    className="p-1.5 hover:bg-red-50 rounded-lg text-[#A28776] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>

                </div>

              </div>

              <p className="text-xs text-[#56443F] font-semibold leading-relaxed">
                {addr.street}, {addr.number}
                {addr.complement ? `, ${addr.complement}` : ''}
                <br />
                {addr.city} - {addr.state} • CEP: {addr.cep}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">

                {addr.isDefaultShipping && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Check size={9} />
                    Entrega Padrão
                  </span>
                )}

                {addr.isDefaultBilling && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                    <Check size={9} />
                    Cobrança Padrão
                  </span>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4">

          <div className="flex items-center justify-between">

            <h4 className="font-bold text-sm text-[#56443F]">
              {editingId ? 'Editar Endereço' : 'Novo Endereço'}
            </h4>

            <button
              onClick={handleCancel}
              className="text-[#A28776] hover:text-[#56443F] transition-colors"
            >
              <X size={18} />
            </button>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <FormField
              label="Apelido"
              value={form.label}
              onChange={(v) =>
                setForm((prev) => ({ ...prev, label: v }))
              }
              placeholder="Casa"
            />

            <FormField
              label="Destinatário"
              value={form.recipientName}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  recipientName: v,
                }))
              }
              placeholder="Nome completo"
            />

            <FormField
              label="CEP"
              value={form.cep}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  cep: formatCep(v),
                }))
              }
              placeholder="00000-000"
            />

            <FormField
              label="Número"
              value={form.number}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  number: v,
                }))
              }
              placeholder="123"
            />

            <div className="col-span-2">
              <FormField
                label="Rua / Logradouro"
                value={form.street}
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    street: v,
                  }))
                }
                placeholder="Av. Paulista"
              />
            </div>

            <div className="col-span-2">
              <FormField
                label="Complemento"
                value={form.complement}
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    complement: v,
                  }))
                }
                placeholder="Apto 42"
              />
            </div>

            <FormField
              label="Cidade"
              value={form.city}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  city: v,
                }))
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

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Check size={14} className="inline mr-1" />
              {editingId ? 'Atualizar' : 'Adicionar'}
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

export default AddressesTab;