import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  FileText,
  QrCode,
  Plus,
  Check,
} from "lucide-react";

import {
  clientMock,
  addressesMock,
  cardsMock,
} from "../../cliente/mocks/clientMock";

export default function CheckoutForm({
  step,
  setStep,
  onFinish,
}) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  // =========================
  // ENDEREÇO
  // =========================

  const [selectedAddress, setSelectedAddress] = useState(
    addressesMock?.find((address) => address.isDefault)?.id ||
      addressesMock?.[0]?.id ||
      null
  );

  const [useNewAddress, setUseNewAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);

  const [newAddress, setNewAddress] = useState({
    residenceType: "",
    streetType: "",
    street: "",
    number: "",
    neighborhood: "",
    cep: "",
    city: "",
    state: "",
    country: "Brasil",
  });

  const updateAddress = (field, value) => {
    setNewAddress((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const selectExistingAddress = (id) => {
    setSelectedAddress(id);
    setUseNewAddress(false);
  };

  // =========================
  // CARTÃO
  // =========================

  const [selectedCard, setSelectedCard] = useState(
    cardsMock?.find((card) => card.isDefault)?.id ||
      cardsMock?.[0]?.id ||
      null
  );

  const [useNewCard, setUseNewCard] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const [newCard, setNewCard] = useState({
    holderName: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const updateCard = (field, value) => {
    setNewCard((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const selectExistingCard = (id) => {
    setSelectedCard(id);
    setUseNewCard(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-8">

      {/* =====================================================
          ETAPA 1 - ENTREGA
      ====================================================== */}

      {step === 1 && (
        <div className="space-y-6">

          <div>
            <h2 className="font-serif text-xl font-bold text-[#56443F]">
              Identificação & Entrega
            </h2>

            <p className="text-xs text-[#A28776] mt-1">
              Confira seus dados e escolha o endereço de entrega.
            </p>
          </div>

          {/* Dados do cliente */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                Nome
              </label>

              <input
                value={clientMock.fullName}
                readOnly
                className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                E-mail
              </label>

              <input
                value={clientMock.email}
                readOnly
                className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                CPF
              </label>

              <input
                value={clientMock.cpf}
                readOnly
                className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                Telefone
              </label>

              <input
                value={clientMock.phone}
                readOnly
                className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-[#FAF9F5]"
              />
            </div>

          </div>

          {/* =====================================================
              ENDEREÇOS
          ====================================================== */}

          <div className="border-t border-[#E4C7B7]/20 pt-5">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h3 className="font-serif text-lg font-bold text-[#56443F]">
                  Endereço de entrega
                </h3>

                <p className="text-[10px] text-[#A28776] mt-1">
                  Selecione um endereço cadastrado ou adicione um novo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUseNewAddress(!useNewAddress);
                  setSaveAddress(false);
                }}
                className="flex items-center gap-1 text-[10px] font-bold text-[#8B645A]"
              >
                <Plus size={13} />

                {useNewAddress
                  ? "Usar endereço cadastrado"
                  : "Novo endereço"}
              </button>

            </div>

            {/* ENDEREÇOS CADASTRADOS */}

            {!useNewAddress && (
              <div className="space-y-3">

                {addressesMock?.map((address) => (
                  <button
                    type="button"
                    key={address.id}
                    onClick={() =>
                      selectExistingAddress(address.id)
                    }
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedAddress === address.id
                        ? "border-[#8B645A] bg-[#E4C7B7]/10"
                        : "border-[#E4C7B7]/30"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedAddress === address.id
                              ? "border-[#8B645A]"
                              : "border-[#C9B5A9]"
                          }`}
                        >
                          {selectedAddress === address.id && (
                            <div className="w-2 h-2 rounded-full bg-[#8B645A]" />
                          )}
                        </div>

                        <span className="text-xs font-bold text-[#56443F]">
                          {address.label || "Endereço"}
                        </span>

                      </div>

                      {address.isDefault && (
                        <span className="text-[9px] font-bold text-[#8B645A]">
                          Principal
                        </span>
                      )}

                    </div>

                    <div className="ml-6 mt-2">

                      <p className="text-[10px] text-[#A28776]">
                        {address.recipientName}
                      </p>

                      <p className="text-[10px] text-[#A28776]">
                        {address.streetType
                          ? `${address.streetType} `
                          : ""}
                        {address.street}, {address.number}
                      </p>

                      <p className="text-[10px] text-[#A28776]">
                        {address.neighborhood &&
                          `${address.neighborhood} - `}
                        {address.city} - {address.state}
                      </p>

                      <p className="text-[10px] text-[#A28776]">
                        CEP {address.cep}
                      </p>

                    </div>

                  </button>
                ))}

              </div>
            )}

            {/* NOVO ENDEREÇO */}

            {useNewAddress && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Tipo de residência *
                    </label>
                    <select
                      value={newAddress.residenceType}
                      onChange={(e) =>
                        updateAddress(
                          "residenceType",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-white"
                    >
                      <option value="">
                        Selecione
                      </option>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">
                        Apartamento
                      </option>
                      <option value="Sobrado">
                        Sobrado
                      </option>
                      <option value="Comercial">
                        Comercial
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Tipo de logradouro *
                    </label>

                    <select
                      value={newAddress.streetType}
                      onChange={(e) =>
                        updateAddress(
                          "streetType",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs bg-white"
                    >
                      <option value="">
                        Selecione
                      </option>
                      <option value="Rua">Rua</option>
                      <option value="Avenida">
                        Avenida
                      </option>
                      <option value="Alameda">
                        Alameda
                      </option>
                      <option value="Travessa">
                        Travessa
                      </option>
                      <option value="Estrada">
                        Estrada
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Logradouro *
                    </label>

                    <input
                      value={newAddress.street}
                      onChange={(e) =>
                        updateAddress(
                          "street",
                          e.target.value
                        )
                      }
                      placeholder="Nome do logradouro"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Número *
                    </label>

                    <input
                      value={newAddress.number}
                      onChange={(e) =>
                        updateAddress(
                          "number",
                          e.target.value
                        )
                      }
                      placeholder="Número"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Bairro *
                    </label>

                    <input
                      value={newAddress.neighborhood}
                      onChange={(e) =>
                        updateAddress(
                          "neighborhood",
                          e.target.value
                        )
                      }
                      placeholder="Bairro"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      CEP *
                    </label>

                    <input
                      value={newAddress.cep}
                      onChange={(e) =>
                        updateAddress(
                          "cep",
                          e.target.value
                        )
                      }
                      placeholder="00000-000"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Cidade *
                    </label>

                    <input
                      value={newAddress.city}
                      onChange={(e) =>
                        updateAddress(
                          "city",
                          e.target.value
                        )
                      }
                      placeholder="Cidade"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      Estado *
                    </label>

                    <input
                      value={newAddress.state}
                      onChange={(e) =>
                        updateAddress(
                          "state",
                          e.target.value
                        )
                      }
                      placeholder="UF"
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                      País *
                    </label>

                    <input
                      value={newAddress.country}
                      onChange={(e) =>
                        updateAddress(
                          "country",
                          e.target.value
                        )
                      }
                      className="w-full mt-1 border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />
                  </div>

                </div>

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) =>
                      setSaveAddress(e.target.checked)
                    }
                    className="accent-[#8B645A]"
                  />

                  <span className="text-[10px] text-[#56443F]">
                    Salvar este endereço no meu perfil
                  </span>

                </label>

              </div>
            )}

          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
          >
            Ir para o pagamento
            <ArrowRight size={14} />
          </button>

        </div>
      )}

      {/* =====================================================
          ETAPA 2 - PAGAMENTO
      ====================================================== */}

      {step === 2 && (
        <div className="space-y-6">

          <div>
            <h2 className="font-serif text-xl font-bold text-[#56443F]">
              Meio de Pagamento
            </h2>

            <p className="text-xs text-[#A28776] mt-1">
              Escolha uma forma de pagamento.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "card"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <CreditCard
                size={18}
                className="mx-auto mb-2"
              />
              Cartão
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("pix")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "pix"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <QrCode
                size={18}
                className="mx-auto mb-2"
              />
              Pix
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("boleto")}
              className={`p-4 rounded-lg border text-xs font-bold ${
                paymentMethod === "boleto"
                  ? "border-[#8B645A] bg-[#E4C7B7]/10"
                  : "border-[#E4C7B7]/30"
              }`}
            >
              <FileText
                size={18}
                className="mx-auto mb-2"
              />
              Boleto
            </button>

          </div>

          {/* =====================================================
              CARTÃO
          ====================================================== */}

          {paymentMethod === "card" && (
            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#56443F]">
                    Cartão de crédito
                  </h3>

                  <p className="text-[10px] text-[#A28776] mt-1">
                    Selecione um cartão cadastrado ou adicione um novo.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUseNewCard(!useNewCard);
                    setSaveCard(false);
                  }}
                  className="flex items-center gap-1 text-[10px] font-bold text-[#8B645A]"
                >
                  <Plus size={13} />

                  {useNewCard
                    ? "Usar cartão cadastrado"
                    : "Novo cartão"}
                </button>

              </div>

              {/* CARTÕES CADASTRADOS */}

              {!useNewCard && (
                <div className="space-y-3">

                  {cardsMock?.map((card) => (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() =>
                        selectExistingCard(card.id)
                      }
                      className={`w-full text-left border rounded-lg p-4 ${
                        selectedCard === card.id
                          ? "border-[#8B645A] bg-[#E4C7B7]/10"
                          : "border-[#E4C7B7]/30"
                      }`}
                    >

                      <div className="flex justify-between">

                        <div className="flex items-center gap-2">

                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedCard === card.id
                                ? "border-[#8B645A]"
                                : "border-[#C9B5A9]"
                            }`}
                          >
                            {selectedCard === card.id && (
                              <div className="w-2 h-2 rounded-full bg-[#8B645A]" />
                            )}
                          </div>

                          <span className="text-xs font-bold text-[#56443F]">
                            {card.brand}
                          </span>

                        </div>

                        {card.isDefault && (
                          <span className="text-[9px] font-bold text-[#8B645A]">
                            Principal
                          </span>
                        )}

                      </div>

                      <div className="ml-6">

                        <p className="text-xs text-[#56443F] mt-2">
                          •••• •••• •••• {card.last4}
                        </p>

                        <div className="flex justify-between mt-2">

                          <span className="text-[10px] text-[#A28776]">
                            {card.holderName}
                          </span>

                          <span className="text-[10px] text-[#A28776]">
                            {card.expiry}
                          </span>

                        </div>

                      </div>

                    </button>
                  ))}

                </div>
              )}

              {/* NOVO CARTÃO */}

              {useNewCard && (
                <div className="space-y-4">

                  <input
                    placeholder="Nome no cartão"
                    value={newCard.holderName}
                    onChange={(e) =>
                      updateCard(
                        "holderName",
                        e.target.value
                      )
                    }
                    className="w-full border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                  />

                  <input
                    placeholder="Número do cartão"
                    value={newCard.number}
                    onChange={(e) =>
                      updateCard(
                        "number",
                        e.target.value
                      )
                    }
                    className="w-full border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                  />

                  <div className="grid grid-cols-2 gap-4">

                    <input
                      placeholder="Validade"
                      value={newCard.expiry}
                      onChange={(e) =>
                        updateCard(
                          "expiry",
                          e.target.value
                        )
                      }
                      className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />

                    <input
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) =>
                        updateCard(
                          "cvv",
                          e.target.value
                        )
                      }
                      className="border border-[#E4C7B7]/40 rounded-lg p-3 text-xs"
                    />

                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) =>
                        setSaveCard(e.target.checked)
                      }
                      className="accent-[#8B645A]"
                    />

                    <span className="text-[10px] text-[#56443F]">
                      Salvar este cartão no meu perfil
                    </span>

                  </label>

                </div>
              )}

            </div>
          )}

          {/* PIX */}

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

          {/* BOLETO */}

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

          {/* CONFIRMAR */}

          <button
            type="button"
            onClick={onFinish}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
          >
            <Check size={14} />
            Confirmar pedido
          </button>

        </div>
      )}

    </div>
  );
}