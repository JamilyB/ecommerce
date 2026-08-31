export const ordersMock = [
  {
    id: 1,
    order_number: "PED-2026-001",
    customer_name: "Jamily Batista",
    customer_email: "jamily@email.com",
    created_at: "2026-08-19T09:30:00",
    total: 189.90,
    subtotal: 169.90,
    shipping_cost: 20.00,
    discount: 0,
    payment_method: "Pix",
    payment_status: "paid",
    status: "shipped",

    shipping_address: {
      street: "Rua das Flores, 120",
      city: "São Paulo",
      state: "SP",
      cep: "09900-000",
    },

    items: [
      {
        id: 1,
        product_name: "Vela Relaxar",
        product_image: "",
        volume: "180g",
        quantity: 1,
        unit_price: 89.90,
      },
      {
        id: 2,
        product_name: "Vela Café",
        product_image: "",
        volume: "220g",
        quantity: 1,
        unit_price: 80.00,
      },
    ],
  },

  {
    id: 2,
    order_number: "PED-2026-002",
    customer_name: "Mariana Souza",
    customer_email: "mariana@email.com",
    created_at: "2026-08-18T15:20:00",
    total: 249.80,
    subtotal: 229.80,
    shipping_cost: 20.00,
    discount: 0,
    payment_method: "Cartão de Crédito",
    payment_status: "paid",
    status: "shipped",

    shipping_address: {
      street: "Av. Paulista, 850",
      city: "São Paulo",
      state: "SP",
      cep: "01310-100",
    },

    items: [
      {
        id: 3,
        product_name: "Vela Gourmet",
        product_image: "",
        volume: "250g",
        quantity: 2,
        unit_price: 114.90,
      },
    ],
  },

  {
    id: 3,
    order_number: "PED-2026-003",
    customer_name: "Camila Oliveira",
    customer_email: "camila@email.com",
    created_at: "2026-08-17T11:45:00",
    total: 129.90,
    subtotal: 109.90,
    shipping_cost: 20.00,
    discount: 0,
    payment_method: "Pix",
    payment_status: "paid",
    status: "delivered",

    shipping_address: {
      street: "Rua das Palmeiras, 45",
      city: "Santo André",
      state: "SP",
      cep: "09000-000",
    },

    items: [
      {
        id: 4,
        product_name: "Vela Natureza",
        product_image: "",
        volume: "180g",
        quantity: 1,
        unit_price: 109.90,
      },
    ],
  },

];