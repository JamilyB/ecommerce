import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  FileText,
  QrCode,
} from "lucide-react";

export default function CheckoutForm({
  step,
  setStep,
  onFinish,
}) {
  const [paymentMethod, setPaymentMethod] = useState("pix");

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
  });

  return (
    <div className="bg-white rounded-xl p-6 md:p-8">

      {step === 1 && (
        <div className="space-y-6">

          <div>
            <h2 className="font-serif text-xl font-bold text-[#56443F]">
              Identificação & Entrega
            </h2>

            <p className="text-xs text-[#A28776] mt-1">
              Informe os dados para entrega do seu pedido.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              placeholder="Nome completo"
              value={shipping.name}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  name: e.target.value,
                })
              }
              className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
            />

            <input
              placeholder="E-mail"
              value={shipping.email}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  email: e.target.value,
                })
              }
              className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
            />

            <input
              placeholder="CPF"
              className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
            />

            <input
              placeholder="Telefone"
              className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
            />

          </div>

          <div className="border-t border-[#E4C7B7]/20 pt-5">

            <h3 className="font-serif text-lg font-bold text-[#56443F] mb-4">
              Endereço
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <input
                placeholder="CEP"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Rua / Logradouro"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Número"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Complemento"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Cidade"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Estado"
                className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
          >
            Ir para o pagamento
            <ArrowRight size={14} />
          </button>

        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">

          <div>
            <h2 className="font-serif text-xl font-bold text-[#56443F]">
              Meio de Pagamento
            </h2>

            <p className="text-xs text-[#A28776] mt-1">
              Escolha a forma de pagamento.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">

            <button
              onClick={() => setPaymentMethod("pix")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "pix"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <QrCode size={18} className="mx-auto mb-2" />
              Pix
            </button>

            <button
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "card"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <CreditCard size={18} className="mx-auto mb-2" />
              Cartão
            </button>

            <button
              onClick={() => setPaymentMethod("boleto")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "boleto"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <FileText size={18} className="mx-auto mb-2" />
              Boleto
            </button>

          </div>

          {paymentMethod === "pix" && (
            <div className="bg-[#FAF9F5] rounded-lg p-5 text-center">
              <QrCode
                size={80}
                className="mx-auto text-[#56443F] mb-4"
              />

              <p className="text-xs text-[#56443F]">
                Escaneie o QR Code para realizar o pagamento.
              </p>
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="space-y-4">

              <input
                placeholder="Nome no cartão"
                className="w-full border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <input
                placeholder="Número do cartão"
                className="w-full border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  placeholder="Validade"
                  className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                />

                <input
                  placeholder="CVV"
                  className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                />

              </div>

            </div>
          )}

          {paymentMethod === "boleto" && (
            <div className="bg-[#FAF9F5] rounded-lg p-5 text-center">
              <FileText
                size={40}
                className="mx-auto text-[#56443F] mb-3"
              />

              <p className="text-xs font-bold text-[#56443F]">
                O boleto será gerado após a confirmação.
              </p>
            </div>
          )}

          <button
            onClick={onFinish}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase"
          >
            Confirmar pedido
          </button>

        </div>
      )}
    </div>
  );
}