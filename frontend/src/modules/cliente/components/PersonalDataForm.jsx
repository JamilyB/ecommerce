import { User, Mail, Phone, Calendar, Shield, Lock } from 'lucide-react';
import FormField from './FormField';
import { maskCPF, maskPhone } from '../../../shared/validation/masks.js';

const PersonalDataForm = ({ form, setForm, errors = {}, touched = {}, setTouched = () => {} }) => {
  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

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
        onChange={(v) => {
          markTouched('fullName');
          setForm((prev) => ({
            ...prev,
            fullName: v,
          }));
        }}
        placeholder="Nome completo"
        error={errors.fullName}
        showError={!!touched.fullName}
      />

      {/* E-mail */}
      <FormField
        label="E-mail"
        value={form.email}
        onChange={(v) => {
          markTouched('email');
          setForm((prev) => ({
            ...prev,
            email: v,
          }));
        }}
        placeholder="seu@email.com"
        error={errors.email}
        showError={!!touched.email}
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
            onChange={(e) => {
              markTouched('phoneType');
              setForm((prev) => ({
                ...prev,
                phoneType: e.target.value,
              }));
            }}
            className={`text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] ${
              errors.phoneType && touched.phoneType ? 'border-red-300' : 'border-[#E4C7B7]/40'
            }`}
          >
            <option value="">Tipo</option>
            <option value="celular">Celular</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
          {touched.phoneType && errors.phoneType && (
            <p className="text-[11px] text-red-500 mt-1">{errors.phoneType}</p>
          )}

          {/* DDD */}
          <FormField
            label=""
            value={form.phoneDDD}
            onChange={(v) => {
              markTouched('phoneDDD');
              setForm((prev) => ({
                ...prev,
                phoneDDD: v.replace(/\D/g, '').slice(0, 2),
              }));
            }}
            placeholder="DDD"
            error={errors.phoneDDD}
            showError={!!touched.phoneDDD}
            inputMode="numeric"
          />

          {/* Número */}
          <FormField
            label=""
            value={form.phoneNumber}
            onChange={(v) => {
              markTouched('phoneNumber');
              setForm((prev) => ({
                ...prev,
                phoneNumber: maskPhone(v),
              }));
            }}
            placeholder="99999-9999"
            error={errors.phoneNumber}
            showError={!!touched.phoneNumber}
            inputMode="numeric"
          />

        </div>
      </div>

      {/* CPF */}
      <FormField
        label="CPF"
        value={form.cpf}
        onChange={(v) => {
          markTouched('cpf');
          setForm((prev) => ({
            ...prev,
            cpf: maskCPF(v),
          }));
        }}
        placeholder="000.000.000-00"
        error={errors.cpf}
        showError={!!touched.cpf}
        inputMode="numeric"
      />

      {/* Data de nascimento */}
      <FormField
        label="Data de Nascimento"
        type="date"
        value={form.birthDate}
        onChange={(v) => {
          markTouched('birthDate');
          setForm((prev) => ({
            ...prev,
            birthDate: v,
          }));
        }}
        error={errors.birthDate}
        showError={!!touched.birthDate}
      />

      {/* Gênero */}
      <div>
        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Gênero
        </label>

        <select
          value={form.gender}
          onChange={(e) => {
            markTouched('gender');
            setForm((prev) => ({
              ...prev,
              gender: e.target.value,
            }));
          }}
          className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors ${
            errors.gender && touched.gender ? 'border-red-300' : 'border-[#E4C7B7]/40'
          }`}
        >
          <option value="">Selecione</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="nao-informar">Prefiro não informar</option>
        </select>
        {touched.gender && errors.gender && (
          <p className="text-[11px] text-red-500 mt-1">{errors.gender}</p>
        )}
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
          onChange={(v) => {
            markTouched('password');
            setForm((prev) => ({
              ...prev,
              password: v,
            }));
          }}
          placeholder="••••••••"
          error={errors.password}
          showError={!!touched.password}
        />

        <FormField
          label="Confirmar Senha"
          type="password"
          value={form.confirmPassword}
          onChange={(v) => {
            markTouched('confirmPassword');
            setForm((prev) => ({
              ...prev,
              confirmPassword: v,
            }));
          }}
          placeholder="••••••••"
          error={errors.confirmPassword}
          showError={!!touched.confirmPassword}
        />

      </div>

    </div>
  );
};

export default PersonalDataForm;