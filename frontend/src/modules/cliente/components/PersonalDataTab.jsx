import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Check,
  X,
  Edit2,
} from 'lucide-react';


const PersonalDataTab = ({
  userProfile,
  editing,
  setEditing,
}) => {
  const [form, setForm] = useState(userProfile);

  const handleSave = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(userProfile);
    setEditing(false);
  };

  const fields = [
    {
      key: 'fullName',
      label: 'Nome Completo',
      icon: User,
      type: 'text',
    },
    {
      key: 'email',
      label: 'E-mail',
      icon: Mail,
      type: 'email',
    },
    {
      key: 'phone',
      label: 'Telefone',
      icon: Phone,
      type: 'tel',
      format: 'text',
    },
    {
      key: 'cpf',
      label: 'CPF',
      icon: Shield,
      type: 'text',
      format: 'text',
    },
    {
      key: 'birthDate',
      label: 'Data de Nascimento',
      icon: Calendar,
      type: 'date',
    },
  ];

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-[#56443F]">
          Dados Pessoais
        </h3>

        {!editing && (
          <button
            onClick={() => {
              setForm(userProfile);
              setEditing(true);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F] transition-colors"
          >
            <Edit2 size={13} />
            Editar
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4">

        {fields.map((field) => {
          const Icon = field.icon;
          const value = form[field.key] || '';

          return (
            <div
              key={field.key}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-[#8B645A]" />
              </div>

              <div className="flex-grow min-w-0">

                <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-0.5">
                  {field.label}
                </label>

                {editing ? (
                  <input
                    type={field.type}
                    value={value}
                    onChange={(e) => {
                      const raw = e.target.value;

                      const formatted = field.format
                        ? field.format(raw)
                        : raw;

                      setForm((prev) => ({
                        ...prev,
                        [field.key]: formatted,
                      }));
                    }}
                    className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B645A] transition-colors"
                  />
                ) : (
                  <p className="text-sm font-semibold text-[#56443F] truncate">
                    {field.key === 'birthDate' && value
                      ? new Date(value + 'T00:00:00').toLocaleDateString('pt-BR')
                      : value || '—'}
                  </p>
                )}

              </div>
            </div>
          );
        })}

        {editing && (
          <div className="flex gap-3 pt-2">

            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              Salvar
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white hover:bg-[#E4C7B7]/15 text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <X size={14} />
              Cancelar
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default PersonalDataTab;