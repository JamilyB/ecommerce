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


      {/* Nome */}
      <FormField
        label="Nome Completo"
        value={form.fullName}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            fullName: v,
          }))
        }
        placeholder="Nome completo"
      />

      {/* E-mail */}
      <FormField
        label="E-mail"
        value={form.email}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            email: v,
          }))
        }
        placeholder="seu@email.com"
      />

      {/* Telefone */}
      <div>
        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Telefone
        </label>

        <div className="grid grid-cols-[120px_70px_1fr] gap-3">

          {/* Tipo */}
          <select
            value={form.phoneType}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phoneType: e.target.value,
              }))
            }
            className="text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A]"
          >
            <option value="">Tipo</option>
            <option value="celular">Celular</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>

          {/* DDD */}
          <FormField
            label=""
            value={form.phoneDDD}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                phoneDDD: v,
              }))
            }
            placeholder="DDD"
          />

          {/* Número */}
          <FormField
            label=""
            value={form.phoneNumber}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                phoneNumber: v,
              }))
            }
            placeholder="99999-9999"
          />

        </div>
      </div>

      {/* CPF */}
      <FormField
        label="CPF"
        value={form.cpf}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            cpf: v,
          }))
        }
        placeholder="000.000.000-00"
      />

      {/* Data de nascimento */}
      <FormField
        label="Data de Nascimento"
        type="date"
        value={form.birthDate}
        onChange={(v) =>
          setForm((prev) => ({
            ...prev,
            birthDate: v,
          }))
        }
      />

      {/* Gênero */}
      <div>
        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Gênero
        </label>

        <select
          value={form.gender}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              gender: e.target.value,
            }))
          }
          className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors"
        >
          <option value="">Selecione</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="nao-informar">Prefiro não informar</option>
        </select>
      </div>

      {/* Acesso */}
      <div className="pt-3 border-t border-[#E4C7B7]/30 space-y-3">

        <div className="flex items-center gap-2">
          <Lock size={15} className="text-[#8B645A]" />

          <h3 className="font-bold text-sm text-[#56443F]">
            Acesso
          </h3>
        </div>

        <FormField
          label="Senha"
          type="password"
          value={form.password}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              password: v,
            }))
          }
          placeholder="••••••••"
        />

        <FormField
          label="Confirmar Senha"
          type="password"
          value={form.confirmPassword}
          onChange={(v) =>
            setForm((prev) => ({
              ...prev,
              confirmPassword: v,
            }))
          }
          placeholder="••••••••"
        />

      </div>

    </div>
  );
};

export default PersonalDataForm;