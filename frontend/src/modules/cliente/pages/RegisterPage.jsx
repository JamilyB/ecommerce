import { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';

import PersonalDataForm from '../components/PersonalDataForm';
import AddressForm from '../components/AddressForm';
import CardForm from '../components/CardForm';

const RegisterPage = () => {
  const [personalData, setPersonalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  });

  const [card, setCard] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: '',
  });

  const [addCard, setAddCard] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      personalData,
      address,
      card: addCard ? card : null,
    });
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
          Cadastre seus dados para começar a comprar na SURU.
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
            />
          </div>


          {/* ENDEREÇO */}
          <div className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30">
            <AddressForm
              form={address}
              setForm={setAddress}
            />
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

                <p className="text-[10px] text-[#A28776] font-semibold">
                  Opcional
                </p>
              </div>

            </div>

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={addCard}
                onChange={(e) => setAddCard(e.target.checked)}
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
              />
            </div>
          )}

        </div>


        {/* BOTÃO */}
        <div className="max-w-md mx-auto pt-2">

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Check size={15} />
            Criar minha conta
          </button>

          <p className="text-[10px] text-[#A28776] font-semibold text-center mt-3">
            Ao criar sua conta, você concorda com os termos de uso da SURU.
          </p>

        </div>

      </form>

    </div>
  );
};

export default RegisterPage;