import { User, Mail, Phone, Calendar, Shield, Lock } from 'lucide-react';
import FormField from './FormField';

const PersonalDataForm = ({ form, setForm }) => {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2 mb-2">
        <User size={16} className="text-[#8B645A]" />

        <h2 className="font-serif text-lg font-semibold text-[#56443F]">
          Dados Pessoais
        </h2>
      </div>

      <FormField
        label="Nome Completo"
        value={form.fullName}
        onChange={(v) =>
          setForm((prev) => ({ ...prev, fullName: v }))
        }
        placeholder="Nome completo"
      />

      <FormField
        label="E-mail"
        value={form.email}
        onChange={(v) =>
          setForm((prev) => ({ ...prev, email: v }))
        }
        placeholder="seu@email.com"
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Telefone"
          value={form.phone}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, phone: v }))
          }
          placeholder="(11) 99999-9999"
        />

        <FormField
          label="CPF"
          value={form.cpf}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, cpf: v }))
          }
          placeholder="000.000.000-00"
        />
      </div>

      <FormField
        label="Data de Nascimento"
        value={form.birthDate}
        onChange={(v) =>
          setForm((prev) => ({ ...prev, birthDate: v }))
        }
        placeholder="DD/MM/AAAA"
      />

      <div className="pt-3 border-t border-[#E4C7B7]/30 space-y-3">

        <div className="flex items-center gap-2">
          <Lock size={15} className="text-[#8B645A]" />

          <h3 className="font-bold text-sm text-[#56443F]">
            Acesso
          </h3>
        </div>

        <FormField
          label="Senha"
          value={form.password}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, password: v }))
          }
          placeholder="••••••••"
        />

        <FormField
          label="Confirmar Senha"
          value={form.confirmPassword}
          onChange={(v) =>
            setForm((prev) => ({ ...prev, confirmPassword: v }))
          }
          placeholder="••••••••"
        />

      </div>

    </div>
  );
};

export default PersonalDataForm;