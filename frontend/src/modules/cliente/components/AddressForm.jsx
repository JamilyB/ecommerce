import { MapPin } from 'lucide-react';
import FormField from './FormField';
import { validateEnderecoForm } from '../../../shared/validation/validation.js';
import { maskCEP } from '../../../shared/validation/masks.js';

const AddressForm = ({ form, setForm, errors = {}, touched = {}, setTouched = () => {} }) => {
  const validationErrors = { ...validateEnderecoForm(form), ...errors };
  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="space-y-4">

      {/* CABEÇALHO */}
      <div className="flex items-center gap-2 mb-2">

        <MapPin
          size={16}
          className="text-[#8B645A]"
        />

        <h3 className="font-serif text-lg font-semibold text-[#56443F]">
          Dados do endereço
        </h3>

      </div>


      {/* APELIDO */}
      <FormField
        label="Nome do endereço"
        value={form.label}
        onChange={(v) =>
          setForm({
            ...form,
            label: v,
          })
        }
        placeholder="Ex.: Casa, Trabalho"
        error={validationErrors.label}
      />


      {/* TIPO DE RESIDÊNCIA */}
      <div>

        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Tipo de residência
        </label>

        <select
          value={form.residenceType}
          onChange={(e) => {
            markTouched('residenceType');
            setForm({
              ...form,
              residenceType: e.target.value,
            });
          }}
          className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] ${
            validationErrors.residenceType && touched.residenceType ? 'border-red-300' : 'border-[#E4C7B7]/40'
          }`}
        >
          <option value="">
            Selecione
          </option>

          <option value="casa">
            Casa
          </option>

          <option value="apartamento">
            Apartamento
          </option>

          <option value="condominio">
            Condomínio
          </option>

          <option value="outro">
            Outro
          </option>

        </select>

      </div>


      {/* TIPO LOGRADOURO + LOGRADOURO */}
      <div className="grid grid-cols-[140px_1fr] gap-3">

        <div>

          <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
            Tipo de logradouro
          </label>

          <select
            value={form.streetType}
            onChange={(e) => {
              markTouched('streetType');
              setForm({
                ...form,
                streetType: e.target.value,
              });
            }}
            className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] ${
              validationErrors.streetType && touched.streetType ? 'border-red-300' : 'border-[#E4C7B7]/40'
            }`}
          >
            <option value="">
              Tipo
            </option>

            <option value="rua">
              Rua
            </option>

            <option value="avenida">
              Avenida
            </option>

            <option value="alameda">
              Alameda
            </option>

            <option value="travessa">
              Travessa
            </option>

            <option value="rodovia">
              Rodovia
            </option>

            <option value="estrada">
              Estrada
            </option>

            <option value="praca">
              Praça
            </option>

          </select>

        </div>


        <FormField
          label="Logradouro"
          value={form.street}
          onChange={(v) => {
            markTouched('street');
            setForm({
              ...form,
              street: v,
            });
          }}
          placeholder="Nome da rua"
          error={validationErrors.street}
          showError={!!touched.street}
        />

      </div>


      {/* NÚMERO + BAIRRO */}
      <div className="grid grid-cols-2 gap-3">

        <FormField
          label="Número"
          value={form.number}
          onChange={(v) => {
            markTouched('number');
            setForm({
              ...form,
              number: v,
            });
          }}
          placeholder="123"
          error={validationErrors.number}
          showError={!!touched.number}
        />

        <FormField
          label="Bairro"
          value={form.neighborhood}
          onChange={(v) => {
            markTouched('neighborhood');
            setForm({
              ...form,
              neighborhood: v,
            });
          }}
          placeholder="Centro"
          error={validationErrors.neighborhood}
          showError={!!touched.neighborhood}
        />

      </div>


      {/* CEP */}
      <FormField
        label="CEP"
        value={form.cep}
        onChange={(v) => {
          markTouched('cep');
          setForm({
            ...form,
            cep: maskCEP(v),
          });
        }}
        placeholder="00000-000"
        error={validationErrors.cep}
        showError={!!touched.cep}
        inputMode="numeric"
      />


      {/* CIDADE + ESTADO */}
      <div className="grid grid-cols-2 gap-3">

        <FormField
          label="Cidade"
          value={form.city}
          onChange={(v) => {
            markTouched('city');
            setForm({
              ...form,
              city: v,
            });
          }}
          placeholder="São Paulo"
          error={validationErrors.city}
          showError={!!touched.city}
        />


        <div>

          <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
            Estado
          </label>

          <select
            value={form.state}
            onChange={(e) => {
              markTouched('state');
              setForm({
                ...form,
                state: e.target.value,
              });
            }}
            className={`w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] ${
              validationErrors.state && touched.state ? 'border-red-300' : 'border-[#E4C7B7]/40'
            }`}
          >
            <option value="">
              Selecione
            </option>

            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>

          </select>

        </div>

      </div>


      {/* PAÍS */}
      <div>

        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          País
        </label>

        <select
          value={form.country}
          onChange={(e) =>
            setForm({
              ...form,
              country: e.target.value,
            })
          }
          className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A]"
        >
          <option value="Brasil">
            Brasil
          </option>

          <option value="Argentina">
            Argentina
          </option>

          <option value="Chile">
            Chile
          </option>

          <option value="Paraguai">
            Paraguai
          </option>

          <option value="Uruguai">
            Uruguai
          </option>

        </select>

      </div>


      {/* OBSERVAÇÕES */}
      <div>

        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-1.5">
          Observações
        </label>

        <textarea
          value={form.observations}
          onChange={(e) =>
            setForm({
              ...form,
              observations: e.target.value,
            })
          }
          placeholder="Informações adicionais (opcional)"
          rows={3}
          className="w-full text-sm font-semibold text-[#56443F] bg-[#F1F0E2]/30 border border-[#E4C7B7]/40 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8B645A] transition-colors resize-none"
        />

      </div>


      {/* TIPO DO ENDEREÇO */}
      <div className="pt-3 border-t border-[#E4C7B7]/30">

        <label className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold block mb-2">
          Utilizar este endereço para
        </label>

        <div className="flex gap-5">

          <label className="flex items-center gap-2 text-sm font-semibold text-[#56443F] cursor-pointer">

            <input
              type="checkbox"
              checked={form.isShipping}
              onChange={(e) =>
                setForm({
                  ...form,
                  isShipping: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#8B645A]"
            />

            Entrega

          </label>


          <label className="flex items-center gap-2 text-sm font-semibold text-[#56443F] cursor-pointer">

            <input
              type="checkbox"
              checked={form.isBilling}
              onChange={(e) =>
                setForm({
                  ...form,
                  isBilling: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#8B645A]"
            />

            Cobrança

          </label>

        </div>

      </div>

    </div>
  );
};

export default AddressForm;