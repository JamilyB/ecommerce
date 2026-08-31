import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  FileText,
  QrCode,
  Plus,
  Check,
  X,
  Tag,
} from "lucide-react";

import {
  clientMock,
  addressesMock,
  cardsMock,
} from "../../cliente/mocks/clientMock";
import { cartMock } from "../mocks/cartMock";
import {
  validateCartItem,
  validateCoupons,
  validateCardSplit,
  validateCheckoutForm,
} from "../../../shared/validation/validation.js";
import { maskCEP } from "../../../shared/validation/masks.js";

const couponsMock = [
  {
    id: 1,
    code: "BEMVINDO10",
    description: "10% de desconto na primeira compra",
    discount: 10,
    type: "percentage",
  },
  {
    id: 2,
    code: "JASMIN15",
    description: "R$ 15,00 de desconto",
    discount: 15,
    type: "fixed",
  },
  {
    id: 3,
    code: "VELA20",
    description: "20% de desconto em produtos selecionados",
    discount: 20,
    type: "percentage",
  },
];

export default function CheckoutForm({
  step,
  setStep,
  onFinish,
}) {
  // =====================================================
  // ENDEREÇO
  // =====================================================

  const [selectedAddress, setSelectedAddress] = useState(
    addressesMock?.find((address) => address.isDefault)?.id ||
      addressesMock?.[0]?.id ||
      null
  );

  const [useNewAddress, setUseNewAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [checkoutTouched, setCheckoutTouched] = useState({
    address: false,
    payment: false,
  });
  const [checkoutError, setCheckoutError] = useState("");

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
    setCheckoutTouched((current) => ({ ...current, address: true }));
    setNewAddress((previous) => ({
      ...previous,
      [field]: field === "cep" ? maskCEP(value) : value,
    }));
  };

  const selectExistingAddress = (id) => {
    setSelectedAddress(id);
    setUseNewAddress(false);
  };

  // =====================================================
  // CUPONS
  // =====================================================

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Agora podemos ter vários cupons.
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const toggleCoupon = (coupon) => {
    setSelectedCoupons((current) => {
      const alreadySelected = current.some(
        (item) => item.id === coupon.id
      );

      if (alreadySelected) {
        setCouponError("");
        return current.filter((item) => item.id !== coupon.id);
      }

      const next = [...current, coupon];
      const validation = validateCoupons(next);

      if (validation.coupons) {
        setCouponError(validation.coupons);
        return current;
      }

      setCouponError("");
      return next;
    });
  };

  const removeCoupon = (couponId) => {
    setSelectedCoupons((current) =>
      current.filter((coupon) => coupon.id !== couponId)
    );
  };

  // =====================================================
  // PAGAMENTO
  // =====================================================

  /*
   * Cada forma de pagamento pode existir simultaneamente.
   *
   * Exemplo:
   *
   * Cartão 1 -> R$ 50
   * Cartão 2 -> R$ 40
   * Pix      -> R$ 30
   * Boleto   -> R$ 20
   */

  const [paymentMethods, setPaymentMethods] = useState({
    card: true,
    pix: false,
    boleto: false,
  });

  const [paymentAmounts, setPaymentAmounts] = useState({
    pix: "",
    boleto: "",
  });

  const togglePaymentMethod = (method) => {
    setCheckoutTouched((current) => ({ ...current, payment: true }));
    setPaymentMethods((current) => ({
      ...current,
      [method]: !current[method],
    }));
  };

  const updatePaymentAmount = (method, value) => {
    setCheckoutTouched((current) => ({ ...current, payment: true }));
    setPaymentAmounts((current) => ({
      ...current,
      [method]: value,
    }));
  };

  // =====================================================
  // CARTÕES CADASTRADOS
  // =====================================================

  const [selectedCards, setSelectedCards] = useState(
    cardsMock?.[0]?.id ? [cardsMock[0].id] : []
  );

  const [cardAmounts, setCardAmounts] = useState(
    cardsMock?.reduce((acc, card) => {
      acc[card.id] = "";
      return acc;
    }, {}) || {}
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
    setCheckoutTouched((current) => ({ ...current, payment: true }));
    setNewCard((previous) => ({
      ...previous,
      [field]: field === "number" ? value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim() : field === "expiry" ? value.replace(/\D/g, '').slice(0,4).replace(/(\d{2})(?=\d)/g, '$1/') : field === "cvv" ? value.replace(/\D/g, '').slice(0,4) : value,
    }));
  };

  const selectExistingCard = (id) => {
    setSelectedCards((current) => {
      const alreadySelected = current.includes(id);

      if (alreadySelected) {
        setCardAmounts((amounts) => {
          const updated = { ...amounts };
          delete updated[id];
          return updated;
        });

        return current.filter((cardId) => cardId !== id);
      }

      return [...current, id];
    });

    setPaymentMethods((current) => ({
      ...current,
      card: true,
    }));

    setUseNewCard(false);
  };

  const updateCardAmount = (cardId, value) => {
    const nextAmounts = {
      ...cardAmounts,
      [cardId]: value,
    };

    setCardAmounts(nextAmounts);
    setCardSplitError(
      validateCardSplit(
        nextAmounts,
        selectedCoupons.reduce((total, coupon) => total + Number(coupon.discount || 0), 0),
        orderTotal
      )
    );
  };


  const addNewCard = () => {
    if (
      !newCard.holderName ||
      !newCard.number ||
      !newCard.expiry ||
      !newCard.cvv
    ) {
      return;
    }

    const generatedId = `new-card-${Date.now()}`;

    const createdCard = {
      id: generatedId,
      brand: "Novo cartão",
      last4: newCard.number.slice(-4),
      holderName: newCard.holderName,
      expiry: newCard.expiry,
      isDefault: false,
    };

    setSelectedCards((current) => [
      ...current,
      createdCard.id,
    ]);

    setCardAmounts((current) => ({
      ...current,
      [createdCard.id]: "",
    }));

    /*
     * Guardamos o cartão criado apenas no estado.
     * Isso permite que ele seja usado imediatamente
     * no pagamento combinado.
     */
    setTemporaryCards((current) => [
      ...current,
      createdCard,
    ]);

    setPaymentMethods((current) => ({
      ...current,
      card: true,
    }));

    setUseNewCard(false);

    if (!saveCard) {
      // No protótipo, o cartão continua disponível
      // durante este checkout.
    }

    setNewCard({
      holderName: "",
      number: "",
      expiry: "",
      cvv: "",
    });

    setSaveCard(false);
  };

  const [temporaryCards, setTemporaryCards] = useState([]);
  const [cardSplitError, setCardSplitError] = useState({});

  const allCards = [
    ...(cardsMock || []),
    ...temporaryCards,
  ];

  const orderTotal = cartMock.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // =====================================================
  // MODAL DE CUPONS
  // =====================================================

  const closeCouponModal = () => {
    setCouponModalOpen(false);
  };

  // =====================================================
  // RENDER
  // =====================================================

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

          {/* DADOS DO CLIENTE */}

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
              ENDEREÇO
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
                      <option value="">Selecione</option>
                      <option value="Casa">Casa</option>
                      <option value="Apartamento">
                        Apartamento
                      </option>
                      <option value="Sobrado">Sobrado</option>
                      <option value="Comercial">Comercial</option>
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
                      <option value="">Selecione</option>
                      <option value="Rua">Rua</option>
                      <option value="Avenida">Avenida</option>
                      <option value="Alameda">Alameda</option>
                      <option value="Travessa">Travessa</option>
                      <option value="Estrada">Estrada</option>
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
            onClick={() => {
              const validationError = validateCheckoutForm({
                useNewAddress,
                selectedAddress,
                newAddress,
              });

              setCheckoutTouched((current) => ({ ...current, address: true }));

              if (Object.keys(validationError).length > 0) {
                setCheckoutError(validationError.selectedAddress || validationError.street || validationError.cep || 'Preencha o endereço de entrega.');
                return;
              }

              setCheckoutError("");
              setStep(2);
            }}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
          >
            Ir para o pagamento
            <ArrowRight size={14} />
          </button>

          {checkoutTouched.address && checkoutError && (
            <p className="text-[11px] text-red-500 mt-2">{checkoutError}</p>
          )}

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
              Combine cupons e formas de pagamento.
            </p>
          </div>

          {/* =====================================================
              CUPONS
          ====================================================== */}

          <div className="border border-[#E4C7B7]/30 rounded-lg p-4">

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-2">

                <Tag
                  size={16}
                  className="text-[#8B645A]"
                />

                <div>
                  <p className="text-xs font-bold text-[#56443F]">
                    Cupons
                  </p>

                  <p className="text-[10px] text-[#A28776]">
                    {selectedCoupons.length > 0
                      ? `${selectedCoupons.length} cupom(ns) aplicado(s)`
                      : "Consulte seus cupons disponíveis"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setCouponModalOpen(true)}
                className="text-[10px] font-bold text-[#8B645A]"
              >
                Consultar cupons
              </button>

            </div>

            {couponError && (
              <p className="text-[11px] text-red-500 mt-2">{couponError}</p>
            )}

            {selectedCoupons.length > 0 && (
              <div className="mt-3 space-y-2">

                {selectedCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between bg-[#E4C7B7]/10 rounded-lg px-3 py-2"
                  >

                    <div>
                      <span className="text-[10px] font-bold text-[#56443F]">
                        {coupon.code}
                      </span>

                      <p className="text-[9px] text-[#A28776]">
                        {coupon.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeCoupon(coupon.id)
                      }
                      className="text-[10px] text-[#8B645A] font-bold"
                    >
                      Remover
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* =====================================================
              FORMAS DE PAGAMENTO
          ====================================================== */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <div>
                <h3 className="font-serif text-lg font-bold text-[#56443F]">
                  Formas de pagamento
                </h3>

                <p className="text-[10px] text-[#A28776] mt-1">
                  Você pode combinar diferentes formas de pagamento.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-3 gap-3">

              {/* CARTÃO */}

              <button
                type="button"
                onClick={() =>
                  togglePaymentMethod("card")
                }
                className={`p-4 rounded-lg border text-xs font-bold ${
                  paymentMethods.card
                    ? "border-[#8B645A] bg-[#E4C7B7]/10"
                    : "border-[#E4C7B7]/30"
                }`}
              >
                <CreditCard
                  size={18}
                  className="mx-auto mb-2"
                />

                Cartão

                {paymentMethods.card && (
                  <Check
                    size={13}
                    className="mx-auto mt-2 text-[#8B645A]"
                  />
                )}
              </button>

              {/* PIX */}

              <button
                type="button"
                onClick={() =>
                  togglePaymentMethod("pix")
                }
                className={`p-4 rounded-lg border text-xs font-bold ${
                  paymentMethods.pix
                    ? "border-[#8B645A] bg-[#E4C7B7]/10"
                    : "border-[#E4C7B7]/30"
                }`}
              >
                <QrCode
                  size={18}
                  className="mx-auto mb-2"
                />

                Pix

                {paymentMethods.pix && (
                  <Check
                    size={13}
                    className="mx-auto mt-2 text-[#8B645A]"
                  />
                )}
              </button>

              {/* BOLETO */}

              <button
                type="button"
                onClick={() =>
                  togglePaymentMethod("boleto")
                }
                className={`p-4 rounded-lg border text-xs font-bold ${
                  paymentMethods.boleto
                    ? "border-[#8B645A] bg-[#E4C7B7]/10"
                    : "border-[#E4C7B7]/30"
                }`}
              >
                <FileText
                  size={18}
                  className="mx-auto mb-2"
                />

                Boleto

                {paymentMethods.boleto && (
                  <Check
                    size={13}
                    className="mx-auto mt-2 text-[#8B645A]"
                  />
                )}
              </button>

            </div>

          </div>

          {/* =====================================================
              CARTÕES
          ====================================================== */}

          {paymentMethods.card && (
            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#56443F]">
                    Cartões de crédito
                  </h3>

                  <p className="text-[10px] text-[#A28776] mt-1">
                    Selecione um ou mais cartões e defina o valor de cada um.
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
                    ? "Cancelar"
                    : "Novo cartão"}
                </button>

              </div>

              {/* CARTÕES CADASTRADOS */}

              {!useNewCard && (
                <div className="space-y-3">

                  {allCards.map((card) => {

                    const selected =
                      selectedCards.includes(card.id);

                    return (
                      <div
                        key={card.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          selected
                            ? "border-[#8B645A] bg-[#E4C7B7]/10"
                            : "border-[#E4C7B7]/30"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            selectExistingCard(card.id)
                          }
                          className="w-full text-left"
                        >

                          <div className="flex justify-between">

                            <div className="flex items-center gap-2">

                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  selected
                                    ? "border-[#8B645A]"
                                    : "border-[#C9B5A9]"
                                }`}
                              >
                                {selected && (
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

                        {/* VALOR DO CARTÃO */}

                        {selected && (
                          <div className="ml-6 mt-4">

                            <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                              Quanto pagar neste cartão?
                            </label>

                            <div className="flex items-center mt-1">

                              <span className="bg-[#FAF9F5] border border-r-0 border-[#E4C7B7]/40 rounded-l-lg px-3 py-3 text-xs text-[#A28776]">
                                R$
                              </span>

                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                  cardAmounts[card.id] || ""
                                }
                                onChange={(e) =>
                                  updateCardAmount(
                                    card.id,
                                    e.target.value
                                  )
                                }
                                placeholder="0,00"
                                className="w-full border border-[#E4C7B7]/40 rounded-r-lg p-3 text-xs"
                              />

                            </div>

                            {cardSplitError[card.id] && (
                              <p className="text-[11px] text-red-500 mt-2">
                                {cardSplitError[card.id]}
                              </p>
                            )}

                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              )}

              {/* NOVO CARTÃO */}

              {useNewCard && (
                <div className="border border-[#E4C7B7]/30 rounded-lg p-4 space-y-4">

                  <div>
                    <h4 className="text-xs font-bold text-[#56443F]">
                      Adicionar novo cartão
                    </h4>

                    <p className="text-[10px] text-[#A28776] mt-1">
                      Cadastre o cartão e use-o neste pagamento.
                    </p>
                  </div>

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

                  <button
                    type="button"
                    onClick={addNewCard}
                    className="w-full bg-[#8B645A] hover:bg-[#56443F] text-white py-3 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
                  >
                    <Plus size={14} />
                    Adicionar cartão
                  </button>

                </div>
              )}

            </div>
          )}

          {/* =====================================================
              PIX
          ====================================================== */}

          {paymentMethods.pix && (
            <div className="border border-[#E4C7B7]/30 rounded-lg p-5">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                  <QrCode
                    size={18}
                    className="text-[#8B645A]"
                  />

                  <div>
                    <h3 className="text-xs font-bold text-[#56443F]">
                      Pagamento via Pix
                    </h3>

                    <p className="text-[10px] text-[#A28776]">
                      Defina quanto será pago via Pix.
                    </p>
                  </div>

                </div>

              </div>

              <div className="flex items-center">

                <span className="bg-[#FAF9F5] border border-r-0 border-[#E4C7B7]/40 rounded-l-lg px-3 py-3 text-xs text-[#A28776]">
                  R$
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paymentAmounts.pix}
                  onChange={(e) =>
                    updatePaymentAmount(
                      "pix",
                      e.target.value
                    )
                  }
                  placeholder="0,00"
                  className="w-full border border-[#E4C7B7]/40 rounded-r-lg p-3 text-xs"
                />

              </div>

              <div className="bg-[#FAF9F5] rounded-lg p-5 text-center mt-4">

                <QrCode
                  size={70}
                  className="mx-auto text-[#56443F] mb-3"
                />

                <p className="text-[10px] text-[#56443F]">
                  O QR Code será disponibilizado após a confirmação.
                </p>

              </div>

            </div>
          )}

          {/* =====================================================
              BOLETO
          ====================================================== */}

          {paymentMethods.boleto && (
            <div className="border border-[#E4C7B7]/30 rounded-lg p-5">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                  <FileText
                    size={18}
                    className="text-[#8B645A]"
                  />

                  <div>
                    <h3 className="text-xs font-bold text-[#56443F]">
                      Pagamento via boleto
                    </h3>

                    <p className="text-[10px] text-[#A28776]">
                      Defina quanto será pago via boleto.
                    </p>
                  </div>

                </div>

              </div>

              <div className="flex items-center">

                <span className="bg-[#FAF9F5] border border-r-0 border-[#E4C7B7]/40 rounded-l-lg px-3 py-3 text-xs text-[#A28776]">
                  R$
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paymentAmounts.boleto}
                  onChange={(e) =>
                    updatePaymentAmount(
                      "boleto",
                      e.target.value
                    )
                  }
                  placeholder="0,00"
                  className="w-full border border-[#E4C7B7]/40 rounded-r-lg p-3 text-xs"
                />

              </div>

              <div className="bg-[#FAF9F5] rounded-lg p-5 text-center mt-4">

                <FileText
                  size={40}
                  className="mx-auto text-[#56443F] mb-3"
                />

                <p className="text-[10px] font-bold text-[#56443F]">
                  O boleto será gerado após a confirmação.
                </p>

              </div>

            </div>
          )}

          {/* =====================================================
              CONFIRMAR
          ====================================================== */}

          <button
            type="button"
            onClick={() => {
              const couponValidation = validateCoupons(selectedCoupons);
              const splitValidation = validateCardSplit(
                cardAmounts,
                selectedCoupons.reduce(
                  (total, coupon) => total + Number(coupon.discount || 0),
                  0
                ),
                orderTotal
              );

              const paymentValidation = validateCheckoutForm({
                useNewAddress,
                selectedAddress,
                newAddress,
                paymentMethods,
                cardAmounts,
                selectedCards,
                paymentAmounts,
              });

              if (couponValidation.coupons) {
                setCouponError(couponValidation.coupons);
                return;
              }

              if (Object.keys(splitValidation).length > 0) {
                setCardSplitError(splitValidation);
                return;
              }

              if (Object.keys(paymentValidation).length > 0) {
                setCheckoutTouched((current) => ({ ...current, payment: true }));
                setCheckoutError(paymentValidation.paymentTotal || paymentValidation.cardSelection || paymentValidation.selectedAddress || 'Preencha os dados de pagamento.');
                return;
              }

              setCheckoutError("");

              onFinish({
                selectedCoupons,
                cardAmounts,
                paymentMethods,
                selectedCards,
                operatorAccepted: paymentMethods.card && selectedCards.length > 0,
              });
            }}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-2"
          >
            <Check size={14} />
            Confirmar pedido
          </button>

          {checkoutTouched.payment && checkoutError && (
            <p className="text-[11px] text-red-500 mt-2">{checkoutError}</p>
          )}

        </div>
      )}

      {/* =====================================================
          MODAL DE CUPONS
      ====================================================== */}

      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeCouponModal}
          />

          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="font-serif text-lg font-bold text-[#56443F]">
                  Meus cupons
                </h3>

                <p className="text-[10px] text-[#A28776] mt-1">
                  Você pode selecionar mais de um cupom.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCouponModal}
                className="p-2 rounded-lg hover:bg-[#E4C7B7]/20"
              >
                <X size={18} />
              </button>

            </div>

            <div className="space-y-3">

              {couponsMock.map((coupon) => {

                const selected =
                  selectedCoupons.some(
                    (item) => item.id === coupon.id
                  );

                return (
                  <button
                    type="button"
                    key={coupon.id}
                    onClick={() =>
                      toggleCoupon(coupon)
                    }
                    className={`w-full text-left border rounded-lg p-4 transition-colors ${
                      selected
                        ? "border-[#8B645A] bg-[#E4C7B7]/10"
                        : "border-[#E4C7B7]/30 hover:bg-[#FAF9F5]"
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center shrink-0">

                        <Tag
                          size={16}
                          className="text-[#8B645A]"
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex items-center justify-between">

                          <span className="text-xs font-bold text-[#56443F]">
                            {coupon.code}
                          </span>

                          {selected && (
                            <Check
                              size={15}
                              className="text-[#8B645A]"
                            />
                          )}

                        </div>

                        <p className="text-[10px] text-[#A28776] mt-1">
                          {coupon.description}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

            <button
              type="button"
              onClick={closeCouponModal}
              className="w-full mt-5 bg-[#56443F] text-white py-3 rounded-lg text-xs font-bold uppercase"
            >
              Concluir
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

