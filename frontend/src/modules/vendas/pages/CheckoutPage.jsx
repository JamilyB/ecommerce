import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";

import { cartMock } from "../mocks/cartMock";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { validateCoupons } from "../../../shared/validation/validation.js";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderFinished, setOrderFinished] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PENDENTE");

  const handleFinish = (paymentData = {}) => {
    const couponErrors = validateCoupons(paymentData.selectedCoupons || []);
    const operatorAccepted =
      paymentData.operatorAccepted !== undefined
        ? paymentData.operatorAccepted
        : true;

    if (Object.keys(couponErrors).length > 0 || !operatorAccepted) {
      setPaymentStatus("REPROVADA");
      setOrderFinished(true);
      return;
    }

    setPaymentStatus("APROVADA");
    setOrderFinished(true);
  };

  if (orderFinished) {
  const subtotal = cartMock.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 180 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">

      <div className="text-center">

        <div className="w-16 h-16 bg-[#E4C7B7]/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={30} className="text-[#8B645A]" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-[#56443F]">
          {paymentStatus === "APROVADA"
            ? "Pedido confirmado!"
            : "Pagamento não aprovado"}
        </h1>

        <p className="text-sm text-[#A28776] mt-3">
          {paymentStatus === "APROVADA"
            ? "Obrigada pela sua compra. Seu pedido foi recebido com sucesso."
            : "O pedido foi reprovado pela validação da operadora ou por cupom inválido."}
        </p>

      </div>

      {/* Resumo */}
      <div className="bg-white rounded-xl p-6 mt-8">

        <h2 className="font-serif text-lg font-bold text-[#56443F] border-b border-[#E4C7B7]/20 pb-3">
          Resumo do pedido
        </h2>

        <div className="space-y-4 mt-5">

          {cartMock.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between gap-4"
            >
              <div>
                <p className="text-xs font-bold text-[#56443F]">
                  {item.product.name}
                </p>

                <p className="text-[10px] text-[#A28776]">
                  Quantidade: {item.quantity}
                </p>
              </div>

              <span className="text-xs font-bold text-[#56443F]">
                R$ {(item.product.price * item.quantity)
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
          ))}

        </div>

        <div className="border-t border-[#E4C7B7]/20 mt-5 pt-4 space-y-2 text-xs">

          <div className="flex justify-between text-[#A28776]">
            <span>Subtotal</span>
            <span>
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <div className="flex justify-between text-[#A28776]">
            <span>Frete</span>
            <span>
              {shipping === 0
                ? "Grátis"
                : `R$ ${shipping.toFixed(2).replace(".", ",")}`}
            </span>
          </div>

          <div className="border-t border-[#E4C7B7]/20 pt-3 flex justify-between">
            <span className="font-serif font-bold text-[#56443F]">
              Total
            </span>

            <span className="font-serif text-xl font-bold text-[#8B645A]">
              R$ {total.toFixed(2).replace(".", ",")}
            </span>
          </div>

        </div>

      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/catalogo")}
          className="mt-8 bg-[#56443F] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase"
        >
          Voltar para a loja
        </button>
      </div>

    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">

      {/* Topo */}
      <div className="flex items-center justify-between border-b border-[#E4C7B7]/20 pb-6 mb-8">

        <button
          onClick={() => step === 2 && setStep(1)}
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
            onFinish={handleFinish}
          />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
          <OrderSummary cart={cartMock} />
        </div>

      </div>

    </div>
  );
}