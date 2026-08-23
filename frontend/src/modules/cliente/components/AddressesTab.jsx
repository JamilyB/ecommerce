import { useState } from 'react';

import {
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
    type: {
      shipping: true,
      billing: true,
    },
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  };

  const [addresses, setAddresses] = useState(savedAddresses);
  const [form, setForm] = useState(emptyForm);

  const startAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (address) => {
    setForm({
      ...emptyForm,
      ...address,
      addressTypes: address.addressTypes || [],
    });

    setEditingId(address.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const toggleAddressType = (type) => {
    setForm((prev) => ({
      ...prev,
      addressTypes: prev.addressTypes.includes(type)
        ? prev.addressTypes.filter((item) => item !== type)
        : [...prev.addressTypes, type],
    }));
  };

  const handleSave = () => {
    const newAddress = {
      ...form,
      id: editingId || Date.now(),
    };

    if (editingId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? newAddress
            : address
        )
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        newAddress,
      ]);
    }

    handleCancel();
  };

  const handleDelete = (id) => {
    setAddresses((prev) =>
      prev.filter((address) => address.id !== id)
    );
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
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F]"
          >
            <Plus size={14} />
            Adicionar
          </button>
        )}

      </div>

      {!showForm && (

        <div className="space-y-4">

          {addresses.map((addr) => (

            <div
              key={addr.id}
              className="bg-white rounded-2xl p-5 border border-[#E4C7B7]/30 space-y-3"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center">

                    {addr.residenceType?.toLowerCase().includes('casa') ? (
                      <Home size={14} className="text-[#8B645A]" />
                    ) : (
                      <Building2 size={14} className="text-[#8B645A]" />
                    )}

                  </div>

                  <div>

                    <p className="font-bold text-sm text-[#56443F]">
                      {addr.label || 'Endereço'}
                    </p>

                    <p className="text-[10px] text-[#A28776] font-semibold">
                      {addr.residenceType}
                    </p>

                  </div>

                </div>

                <div className="flex gap-1.5">

                  <button
                    onClick={() => startEdit(addr)}
                    className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#A28776] hover:text-[#8B645A]"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-[#A28776] hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>

                </div>

              </div>

              <p className="text-xs text-[#56443F] font-semibold leading-relaxed">

                {addr.streetType} {addr.street}, {addr.number}

                {addr.complement
                  ? `, ${addr.complement}`
                  : ''}

                <br />

                {addr.neighborhood}
                {' • '}
                {addr.city} - {addr.state}

                <br />

                CEP: {addr.cep} • {addr.country}

              </p>

              <div className="flex flex-wrap gap-2">

                {addr.addressTypes?.includes('Entrega') && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Check size={9} />
                    Entrega
                  </span>
                )}

                {addr.addressTypes?.includes('Cobrança') && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                    <Check size={9} />
                    Cobrança
                  </span>
                )}

              </div>

              {addr.notes && (
                <p className="text-[10px] text-[#A28776]">
                  Obs.: {addr.notes}
                </p>
              )}

            </div>

          ))}

        </div>

      )}

      {showForm && (

        <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4">

          <div className="flex items-center justify-between">

            <h4 className="font-bold text-sm text-[#56443F]">
              {editingId
                ? 'Editar Endereço'
                : 'Novo Endereço'}
            </h4>

            <button
              onClick={handleCancel}
              className="text-[#A28776] hover:text-[#56443F]"
            >
              <X size={18} />
            </button>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <FormField
              label="Nome do endereço"
              value={form.label}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  label: v,
                }))
              }
              placeholder="Casa dos meus pais"
            />

            <FormField
              label="Tipo de residência"
              value={form.residenceType}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  residenceType: v,
                }))
              }
              placeholder="Casa / Apartamento"
            />

            {/* TIPO DO ENDEREÇO */}

            <div className="col-span-2">
            <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-2">
              Tipo de endereço
            </label>

            <div className="flex gap-4">

              <label className="flex items-center gap-2 text-sm font-semibold text-[#56443F]">
                <input
                  type="checkbox"
                  checked={form.type?.shipping ?? true}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      type: {
                        ...prev.type,
                        shipping: e.target.checked,
                      },
                    }))
                  }
                  className="accent-[#56443F]"
                />
                Entrega
              </label>

              <label className="flex items-center gap-2 text-sm font-semibold text-[#56443F]">
                <input
                  type="checkbox"
                  checked={form.type?.billing ?? true}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      type: {
                        ...prev.type,
                        billing: e.target.checked,
                      },
                    }))
                  }
                  className="accent-[#56443F]"
                />
                Cobrança
              </label>

            </div>
          </div>

            <FormField
              label="Tipo de logradouro"
              value={form.streetType}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  streetType: v,
                }))
              }
              placeholder="Rua / Avenida"
            />

            <FormField
              label="Logradouro"
              value={form.street}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  street: v,
                }))
              }
              placeholder="Paulista"
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

            <FormField
              label="Bairro"
              value={form.neighborhood}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  neighborhood: v,
                }))
              }
              placeholder="Bela Vista"
            />

            <FormField
              label="CEP"
              value={form.cep}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  cep: v,
                }))
              }
              placeholder="00000-000"
            />

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

            <FormField
              label="País"
              value={form.country}
              onChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  country: v,
                }))
              }
              placeholder="Brasil"
            />

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

            <div className="col-span-2">

              <FormField
                label="Observações"
                value={form.notes}
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    notes: v,
                  }))
                }
                placeholder="Informações adicionais"
              />

            </div>

          </div>

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <Check size={14} className="inline mr-1" />
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase tracking-wider"
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