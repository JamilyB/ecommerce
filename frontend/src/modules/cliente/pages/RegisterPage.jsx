import { useState } from 'react';
import { Plus, Trash2, CreditCard, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  validateClienteForm,
  validateEnderecoForm,
  validateCartaoForm,
} from '../../../shared/validation/validation.js';
import PersonalDataForm from '../components/PersonalDataForm';
import AddressForm from '../components/AddressForm';
import CardForm from '../components/CardForm';

const createEmptyAddress = () => ({
  id: Date.now(),
  label: '',
  residenceType: '',
  streetType: '',
  street: '',
  number: '',
  neighborhood: '',
  cep: '',
  city: '',
  state: '',
  country: 'Brasil',
  observations: '',
  isShipping: true,
  isBilling: true,
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({
    gender: '',
    fullName: '',
    email: '',
    phoneType: '',
    phoneDDD: '',
    phoneNumber: '',
    cpf: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [addresses, setAddresses] = useState([createEmptyAddress()]);

  const [card, setCard] = useState({
    cardNumber: '',
    holderName: '',
    brand: '',
    cvv: '',
    isPreferred: false,
  });

  const [addCard, setAddCard] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({
    personal: {},
    addresses: [],
    card: {},
  });
  const [touched, setTouched] = useState({
    personal: {},
    addresses: [],
    card: {},
  });

  const addAddress = () => {
    if (addresses.length >= 2) return;
    setAddresses((prev) => [...prev, createEmptyAddress()]);
  };

  const removeAddress = (id) => {
    if (addresses.length === 1) return;
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const updateAddress = (id, updatedAddress) => {
    setAddresses((prev) =>
      prev.map((address) => (address.id === id ? updatedAddress : address))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const personalErrors = validateClienteForm(personalData);
    const addressErrors = addresses.map((address) => validateEnderecoForm(address));
    const cardErrors = addCard ? validateCartaoForm(card) : {};

    setTouched({
      personal: Object.keys(personalData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      addresses: addresses.map(() => ({
        label: true,
        residenceType: true,
        streetType: true,
        street: true,
        number: true,
        neighborhood: true,
        cep: true,
        city: true,
        state: true,
        country: true,
      })),
      card: Object.keys(card).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    });

    const hasErrors =
      Object.keys(personalErrors).length > 0 ||
      addressErrors.some((errors) => Object.keys(errors).length > 0) ||
      Object.keys(cardErrors).length > 0;

    setFormErrors({
      personal: personalErrors,
      addresses: addressErrors,
      card: cardErrors,
    });

    if (hasErrors) {
      return;
    }

    setShowSuccessMessage(true);

    window.setTimeout(() => {
      navigate('/catalogo');
    }, 1200);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="text-center space-y-3 mb-10">

        <span className="text-xs font-bold tracking-widest text-[#8B645A] uppercase">
          Seja bem-vindo
        </span>

        <h1 className="font-serif text-3xl font-semibold text-[#56443F]">
          Criar sua conta
        </h1>

        <p className="text-xs text-[#A28776] font-semibold">
          Cadastre seus dados para começar a comprar na JARMIN VELAS.
        </p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* DADOS + ENDEREÇO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* DADOS PESSOAIS */}
          <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30">

            <PersonalDataForm
              form={personalData}
              setForm={setPersonalData}
              errors={formErrors.personal}
              touched={touched.personal}
              setTouched={(updater) =>
                setTouched((prev) => ({
                  ...prev,
                  personal:
                    typeof updater === "function"
                      ? updater(prev.personal || {})
                      : updater,
                }))
              }
            />

          </div>


          {/* ENDEREÇOS */}
          <div className="space-y-4">

            {addresses.map((address, index) => (

              <div
                key={address.id}
                className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30"
              >

                {/* Cabeçalho do endereço */}
                <div className="flex items-center justify-between mb-5">

                  <h2 className="font-serif text-lg font-semibold text-[#56443F]">
                    Endereço {index + 1}
                  </h2>

                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(address.id)}
                      className="flex items-center gap-1 text-xs font-bold text-[#A28776] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                      Remover
                    </button>
                  )}

                </div>

                <AddressForm
                  form={address}
                  setForm={(updatedAddress) =>
                    updateAddress(
                      address.id,
                      updatedAddress
                    )
                  }
                  errors={formErrors.addresses[index] || {}}
                  touched={touched.addresses[index] || {}}
                  setTouched={(updater) =>
                    setTouched((prev) => {
                      const nextAddresses = [...(prev.addresses || [])];
                      nextAddresses[index] = typeof updater === 'function' ? updater(nextAddresses[index] || {}) : updater;
                      return { ...prev, addresses: nextAddresses };
                    })
                  }
                />

              </div>

            ))}

            {/* Adicionar segundo endereço */}
            {addresses.length < 2 && (
              <button
                type="button"
                onClick={addAddress}
                className="w-full py-3 border border-dashed border-[#E4C7B7] rounded-2xl text-xs font-bold uppercase tracking-wider text-[#8B645A] hover:bg-[#E4C7B7]/10 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} />
                Adicionar outro endereço
              </button>
            )}

          </div>

        </div>


        {/* CARTÃO */}
        <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <CreditCard
                size={16}
                className="text-[#8B645A]"
              />

              <div>

                <h2 className="font-serif text-lg font-semibold text-[#56443F]">
                  Cartão
                </h2>

              </div>

            </div>

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={addCard}
                onChange={(e) =>
                  setAddCard(e.target.checked)
                }
                className="w-4 h-4 accent-[#8B645A]"
              />

              <span className="text-xs font-semibold text-[#56443F]">
                Adicionar cartão
              </span>

            </label>

          </div>

          {addCard && (
            <div className="mt-5 pt-5 border-t border-[#E4C7B7]/30">

              <CardForm
                form={card}
                setForm={setCard}
                errors={formErrors.card}
                touched={touched.card}
                setTouched={(updater) =>
                  setTouched((prev) => ({
                    ...prev,
                    card:
                      typeof updater === "function"
                        ? updater(prev.card || {})
                        : updater,
                  }))
                }
              />

            </div>
          )}

        </div>


        {/* BOTÃO */}
        <div className="max-w-md mx-auto pt-2">

          {showSuccessMessage ? (
            <div className="rounded-xl border border-[#A7D7C5] bg-[#EAF8F1] px-4 py-3 text-sm font-medium text-[#2E6B52] text-center">
              Conta criada com sucesso! Redirecionando para o catálogo...
            </div>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Check size={15} />
              Criar minha conta
            </button>
          )}

          <p className="text-[10px] text-[#A28776] font-semibold text-center mt-3">
            Ao criar sua conta, você concorda com os termos de uso da JARMIN VELAS.
          </p>

        </div>

      </form>

    </div>
  );
};

export default RegisterPage;
