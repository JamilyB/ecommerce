import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";

import { cartMock } from "../mocks/cartMock";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutPage() {
  const [cart] = useState(cartMock);
  const [step, setStep] = useState(1);
  const [orderFinished, setOrderFinished] = useState(false);

  if (orderFinished) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">

        <div className="w-16 h-16 bg-[#E4C7B7]/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check
            size={30}
            className="text-[#8B645A]"
          />
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#56443F]">
          Pedido confirmado!
        </h1>

        <p className="text-sm text-[#A28776] mt-3">
          Obrigada pela sua compra. Seu pedido foi recebido
          com sucesso.
        </p>

        <button
          onClick={() => {
            setOrderFinished(false);
            setStep(1);
          }}
          className="mt-8 bg-[#56443F] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase"
        >
          Voltar para a loja
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">

      {/* Topo */}
      <div className="flex items-center justify-between border-b border-[#E4C7B7]/20 pb-6 mb-8">

        <button
          onClick={() => {
            if (step === 2) {
              setStep(1);
            }
          }}
          className="flex items-center gap-2 text-xs font-bold text-[#8B645A]"
        >
          <ChevronLeft size={16} />
          Voltar
        </button>

        <div className="flex items-center gap-3 text-[10px] font-bold">

          <span
            className={`px-3 py-1.5 rounded-full ${
              step === 1
                ? "bg-[#56443F] text-white"
                : "bg-[#E4C7B7]/20 text-[#56443F]"
            }`}
          >
            1. Entrega
          </span>

          <span
            className={`px-3 py-1.5 rounded-full ${
              step === 2
                ? "bg-[#56443F] text-white"
                : "bg-[#E4C7B7]/20 text-[#56443F]"
            }`}
          >
            2. Pagamento
          </span>

        </div>

      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-7">
          <CheckoutForm
            step={step}
            setStep={setStep}
            onFinish={() => setOrderFinished(true)}
          />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <OrderSummary cart={cart} />
        </div>

      </div>

    </div>
  );
}