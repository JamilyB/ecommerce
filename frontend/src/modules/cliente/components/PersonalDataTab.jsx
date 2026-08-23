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
  Lock,
} from 'lucide-react';

const PersonalDataTab = ({
  userProfile,
  editing,
  setEditing,
}) => {
  const [form, setForm] = useState(userProfile);

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] =
    useState('');

  const [passwordError, setPasswordError] = useState('');

  const handleSave = () => {
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(userProfile);
    setEditing(false);
  };

  const handlePasswordCancel = () => {
    setPassword('');
    setPasswordConfirmation('');
    setPasswordError('');
    setChangingPassword(false);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePhone = (field, value) => {
    setForm((prev) => ({
      ...prev,
      phone: {
        ...(prev.phone || {}),
        [field]: value,
      },
    }));
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return 'A senha deve possuir pelo menos 8 caracteres.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'A senha deve possuir pelo menos uma letra maiúscula.';
    }

    if (!/[a-z]/.test(password)) {
      return 'A senha deve possuir pelo menos uma letra minúscula.';
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'A senha deve possuir pelo menos um caractere especial.';
    }

    if (password !== passwordConfirmation) {
      return 'As senhas não são iguais.';
    }

    return '';
  };

  const handlePasswordSave = () => {
    const error = validatePassword();

    if (error) {
      setPasswordError(error);
      return;
    }

    setPassword('');
    setPasswordConfirmation('');
    setPasswordError('');
    setChangingPassword(false);
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
      key: 'cpf',
      label: 'CPF',
      icon: Shield,
      type: 'text',
    },
    {
      key: 'gender',
      label: 'Gênero',
      icon: User,
      type: 'text',
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

      {/* DADOS PESSOAIS */}

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
                <Icon
                  size={15}
                  className="text-[#8B645A]"
                />
              </div>

              <div className="flex-grow min-w-0">

                <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-0.5">
                  {field.label}
                </label>

                {editing ? (
                  <input
                    type={field.type}
                    value={value}
                    onChange={(e) =>
                      updateField(
                        field.key,
                        e.target.value
                      )
                    }
                    className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B645A]"
                  />
                ) : (
                  <p className="text-sm font-semibold text-[#56443F] truncate">
                    {field.key === 'birthDate' && value
                      ? new Date(
                          value + 'T00:00:00'
                        ).toLocaleDateString('pt-BR')
                      : value || '—'}
                  </p>
                )}

              </div>

            </div>
          );
        })}

        {/* TELEFONE */}

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center flex-shrink-0">
            <Phone
              size={15}
              className="text-[#8B645A]"
            />
          </div>

          <div className="flex-grow">

            <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-2">
              Telefone
            </label>

            {editing ? (

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                <input
                  placeholder="Tipo"
                  value={form.phone?.type || ''}
                  onChange={(e) =>
                    updatePhone('type', e.target.value)
                  }
                  className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B645A]"
                />

                <input
                  placeholder="DDD"
                  value={form.phone?.ddd || ''}
                  onChange={(e) =>
                    updatePhone('ddd', e.target.value)
                  }
                  className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B645A]"
                />

                <input
                  placeholder="Número"
                  value={form.phone?.number || ''}
                  onChange={(e) =>
                    updatePhone('number', e.target.value)
                  }
                  className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B645A]"
                />

              </div>

            ) : (

              <p className="text-sm font-semibold text-[#56443F]">
                {form.phone?.type || '—'}{' '}
                {form.phone?.ddd
                  ? `(${form.phone.ddd})`
                  : ''}{' '}
                {form.phone?.number || ''}
              </p>

            )}

          </div>

        </div>

        {/* BOTÕES */}

        {editing && (

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              Salvar
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2.5 bg-white text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <X size={14} />
              Cancelar
            </button>

          </div>

        )}

      </div>

      {/* ALTERAR SENHA */}

      <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center">
              <Lock size={15} className="text-[#8B645A]" />
            </div>

            <h3 className="text-sm font-bold text-[#56443F]">
              Senha
            </h3>

          </div>

          {!changingPassword && (
            <button
              onClick={() => setChangingPassword(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#8B645A] hover:text-[#56443F]"
            >
              <Edit2 size={13} />
              Alterar senha
            </button>
          )}

        </div>

        {changingPassword && (

          <div className="mt-5 space-y-4">

            <div>

              <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
                Nova senha
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="w-full text-sm text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A]"
              />

            </div>

            <div>

              <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
                Confirmar nova senha
              </label>

              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                  setPasswordError('');
                }}
                className="w-full text-sm text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A]"
              />

            </div>

            <p className="text-[11px] text-[#A28776]">
              Mínimo de 8 caracteres, contendo letras
              maiúsculas, minúsculas e caractere especial.
            </p>

            {passwordError && (
              <p className="text-xs text-red-600 font-semibold">
                {passwordError}
              </p>
            )}

            <div className="flex gap-3 pt-1">

              <button
                onClick={handlePasswordCancel}
                className="px-4 py-2 bg-white border border-[#E4C7B7] text-[#56443F] rounded-lg text-xs font-bold"
              >
                Cancelar
              </button>

              <button
                onClick={handlePasswordSave}
                className="px-4 py-2 bg-[#56443F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Check size={14} />
                Alterar senha
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default PersonalDataTab;