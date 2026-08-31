export const validationConfig = {
  cliente: {
    requiredFields: false,
    strongPassword: false,
    confirmPassword: false,
    emailFormat: false,
    cpfFormat: false,
  },
  endereco: {
    requiredFields: false,
  },
  cartao: {
    requiredFields: false,
    cardNumberFormat: false,
    cvvFormat: false,
  },
  produto: {
    requiredFields: false,
    priceBelowMarginRequiresManager: false,
  },
  estoque: {
    requiredFields: false,
    quantityNotZero: false,
    costRequired: false,
  },
  checkout: {
    stockAvailability: false,
    singlePromoCoupon: false,
    minCardValue: false,
    paymentValidation: true,
  },
  dashboard: {
    dateOrder: true,
    periodRange: true,
  },
};
