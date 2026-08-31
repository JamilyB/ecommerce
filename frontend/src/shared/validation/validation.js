import { validationConfig } from './validationConfig.js';

const isEnabled = (domain, rule) =>
  validationConfig?.[domain]?.[rule] !== false;

const hasValue = (value) =>
  value !== undefined && value !== null && String(value).trim() !== '';

const cleanDigits = (value) => String(value ?? '').replace(/\D/g, '');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

const getProductAlias = (data, keys) => {
  for (const key of keys) {
    if (hasValue(data?.[key])) {
      return data[key];
    }
  }

  return '';
};

export function validateClienteForm(data = {}) {
  const errors = {};

  if (!isEnabled('cliente', 'requiredFields')) {
    return errors;
  }

  const requiredFields = [
    'gender',
    'fullName',
    'email',
    'phoneType',
    'phoneDDD',
    'phoneNumber',
    'cpf',
    'birthDate',
  ];

  requiredFields.forEach((field) => {
    if (!hasValue(data[field])) {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  if (isEnabled('cliente', 'emailFormat') && hasValue(data.email)) {
    if (!emailRegex.test(String(data.email).trim())) {
      errors.email = 'Informe um e-mail válido.';
    }
  }

  if (isEnabled('cliente', 'cpfFormat') && hasValue(data.cpf)) {
    const cpfDigits = cleanDigits(data.cpf);

    if (cpfDigits.length !== 11) {
      errors.cpf = 'Informe um CPF válido com 11 dígitos.';
    }
  }

  if (isEnabled('cliente', 'strongPassword') && hasValue(data.password)) {
    if (!strongPasswordRegex.test(String(data.password))) {
      errors.password = 'A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula e caractere especial.';
    }
  }

  if (isEnabled('cliente', 'confirmPassword') && hasValue(data.confirmPassword)) {
    if (String(data.password ?? '') !== String(data.confirmPassword ?? '')) {
      errors.confirmPassword = 'As senhas não conferem.';
    }
  }

  return errors;
}

export function validateEnderecoForm(data = {}) {
  const errors = {};

  if (!isEnabled('endereco', 'requiredFields')) {
    return errors;
  }

  const requiredFields = [
    'residenceType',
    'streetType',
    'street',
    'number',
    'neighborhood',
    'cep',
    'city',
    'state',
    'country',
  ];

  requiredFields.forEach((field) => {
    if (!hasValue(data[field])) {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  return errors;
}

export function validateCartaoForm(data = {}) {
  const errors = {};

  if (!isEnabled('cartao', 'requiredFields')) {
    return errors;
  }

  const requiredFields = ['cardNumber', 'holderName', 'brand', 'cvv'];

  requiredFields.forEach((field) => {
    if (!hasValue(data[field])) {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  if (isEnabled('cartao', 'cardNumberFormat') && hasValue(data.cardNumber)) {
    const digits = cleanDigits(data.cardNumber);

    if (digits.length !== 16) {
      errors.cardNumber = 'O número do cartão deve ter 16 dígitos.';
    }
  }

  if (isEnabled('cartao', 'cvvFormat') && hasValue(data.cvv)) {
    if (!/^\d{3,4}$/.test(String(data.cvv).trim())) {
      errors.cvv = 'O CVV deve ter 3 ou 4 dígitos.';
    }
  }

  return errors;
}

export function validateProdutoForm(data = {}) {
  const errors = {};

  if (!isEnabled('produto', 'requiredFields')) {
    return errors;
  }

  const normalized = {
    title: getProductAlias(data, ['title', 'name']),
    author: getProductAlias(data, ['author', 'subtitle']),
    category: getProductAlias(data, ['category', 'collection', 'aroma']),
    year: getProductAlias(data, ['year']),
    publisher: getProductAlias(data, ['publisher']),
    edition: getProductAlias(data, ['edition']),
    isbn: getProductAlias(data, ['isbn', 'sku']),
    pages: getProductAlias(data, ['pages']),
    synopsis: getProductAlias(data, ['synopsis', 'description']),
    height: getProductAlias(data, ['height']),
    width: getProductAlias(data, ['width']),
    weight: getProductAlias(data, ['weight']),
    depth: getProductAlias(data, ['depth']),
    pricing_group: getProductAlias(data, ['pricing_group']),
    barcode: getProductAlias(data, ['barcode', 'code']),
  };

  const requiredFields = [
    'title',
    'author',
    'category',
    'year',
    'publisher',
    'edition',
    'isbn',
    'pages',
    'synopsis',
    'height',
    'width',
    'weight',
    'depth',
    'pricing_group',
    'barcode',
  ];

  requiredFields.forEach((field) => {
    if (!hasValue(normalized[field])) {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  return errors;
}

export function validatePriceChange(newPrice, minimumPrice, hasManagerAuth) {
  const errors = {};

  if (!isEnabled('produto', 'priceBelowMarginRequiresManager')) {
    return errors;
  }

  const numericPrice = Number(newPrice);
  const numericMinimum = Number(minimumPrice);

  if (numericPrice < numericMinimum && !hasManagerAuth) {
    errors.price = 'Preço abaixo da margem mínima. Autorização do gerente é necessária.';
  }

  return errors;
}

export function validateEstoqueEntry(data = {}) {
  const errors = {};

  if (!isEnabled('estoque', 'requiredFields')) {
    return errors;
  }

  const requiredFields = ['supplier', 'entryDate'];

  requiredFields.forEach((field) => {
    if (!hasValue(data[field])) {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  if (isEnabled('estoque', 'quantityNotZero') && hasValue(data.quantity)) {
    if (Number(data.quantity) <= 0) {
      errors.quantity = 'A quantidade deve ser maior que zero.';
    }
  }

  if (isEnabled('estoque', 'costRequired') && hasValue(data.costValue)) {
    if (Number(data.costValue) <= 0) {
      errors.costValue = 'O custo deve ser maior que zero.';
    }
  }

  return errors;
}

export function validateCartItem(quantity, availableStock) {
  const errors = {};

  if (!isEnabled('checkout', 'stockAvailability')) {
    return errors;
  }

  const requestedQuantity = Number(quantity);
  const stock = Number(availableStock);

  if (requestedQuantity > stock) {
    errors.quantity = 'Quantidade acima do estoque disponível.';
  }

  return errors;
}

export function validateCoupons(coupons = []) {
  const errors = {};

  if (!isEnabled('checkout', 'singlePromoCoupon')) {
    return errors;
  }

  const promotionalCoupons = (coupons || []).filter(
    ({ type }) => String(type || '').toLowerCase() === 'promocional'
  );

  if (promotionalCoupons.length > 1) {
    errors.coupons = 'Só é permitido um cupom promocional por pedido.';
  }

  return errors;
}

export function validateCardSplit(cardPayments = {}, couponsTotal = 0, orderTotal = 0) {
  const errors = {};

  if (!isEnabled('checkout', 'minCardValue')) {
    return errors;
  }

  const remainingAfterCoupons = Number(orderTotal) - Number(couponsTotal || 0);

  if (remainingAfterCoupons < 10) {
    return errors;
  }

  Object.entries(cardPayments).forEach(([cardId, value]) => {
    if (Number(value) > 0 && Number(value) < 10) {
      errors[cardId] = 'Cada cartão deve ter no mínimo R$ 10,00.';
    }
  });

  return errors;
}

export function validateCheckoutForm(data = {}) {
  const errors = {};

  if (!data.useNewAddress && !data.selectedAddress) {
    errors.selectedAddress = 'Selecione um endereço de entrega.';
  }

  if (data.useNewAddress) {
    const addressErrors = validateEnderecoForm(data.newAddress || {});
    Object.assign(errors, addressErrors);
  }

  if (data.paymentMethods?.card) {
    const hasSelectedCard = Number(data.selectedCards?.length || 0) > 0;

    if (!hasSelectedCard) {
      errors.cardSelection = 'Selecione ao menos um cartão para o pagamento.';
    }

    const cardTotal = Object.values(data.cardAmounts || {}).reduce((sum, value) => sum + Number(value || 0), 0);
    const pixTotal = Number(data.paymentAmounts?.pix || 0);
    const boletoTotal = Number(data.paymentAmounts?.boleto || 0);
    const hasPaymentValue = cardTotal > 0 || pixTotal > 0 || boletoTotal > 0;

    if (!hasPaymentValue) {
      errors.paymentTotal = 'Informe o valor do pagamento.';
    }
  }

  const totalPaid = Object.values(data.cardAmounts || {}).reduce((sum, value) => sum + Number(value || 0), 0) + Number(data.paymentAmounts?.pix || 0) + Number(data.paymentAmounts?.boleto || 0);

  if (data.paymentMethods?.card && totalPaid <= 0) {
    errors.paymentTotal = 'Informe o valor do pagamento.';
  }

  if (data.paymentMethods?.pix && Number(data.paymentAmounts?.pix || 0) <= 0) {
    errors.pix = 'Defina um valor maior que zero para o Pix.';
  }

  if (data.paymentMethods?.boleto && Number(data.paymentAmounts?.boleto || 0) <= 0) {
    errors.boleto = 'Defina um valor maior que zero para o boleto.';
  }

  return errors;
}

export function validateDateRange(startDate, endDate) {
  const errors = {};

  if (!startDate || !endDate) {
    return errors;
  }

  if (isEnabled('dashboard', 'dateOrder')) {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return errors;
    }

    if (end < start) {
      errors.dateOrder = 'A data final não pode ser anterior à data inicial.';
    }
  }

  if (isEnabled('dashboard', 'periodRange')) {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    const monthDiff =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    if (monthDiff < 1 || monthDiff > 24) {
      errors.periodRange = 'O período deve ter entre 1 e 24 meses.';
    }
  }

  return errors;
}

export default {
  validateClienteForm,
  validateEnderecoForm,
  validateCartaoForm,
  validateProdutoForm,
  validatePriceChange,
  validateEstoqueEntry,
  validateCartItem,
  validateCoupons,
  validateCardSplit,
  validateCheckoutForm,
  validateDateRange,
};
