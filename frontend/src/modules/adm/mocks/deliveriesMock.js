export const deliveriesMock = [
  {
    id: 1,

    order_number: "PED-001",
    customer_name: "Jamily Batista",

    tracking_code: "BR123456789BR",
    carrier: "Correios",

    status: "delivered",

    shipping_method: "standard",

    estimated_delivery: "2026-08-18",
    shipped_at: "2026-08-15",
    delivered_at: "2026-08-18",

    notes: "Entrega realizada normalmente.",
  },

  {
    id: 2,

    order_number: "PED-002",
    customer_name: "Ana Carolina",

    tracking_code: "JD987654321BR",
    carrier: "Jadlog",

    status: "in_transit",

    shipping_method: "express",

    estimated_delivery: "2026-08-22",
    shipped_at: "2026-08-18",
    delivered_at: null,

    notes: "Objeto em trânsito.",
  },

  {
    id: 3,

    order_number: "PED-003",
    customer_name: "Mariana Souza",

    tracking_code: "TE456789123BR",
    carrier: "Total Express",

    status: "out_for_delivery",

    shipping_method: "standard",

    estimated_delivery: "2026-08-19",
    shipped_at: "2026-08-16",
    delivered_at: null,

    notes: "Saiu para entrega.",
  },

  {
    id: 4,

    order_number: "PED-004",
    customer_name: "Beatriz Oliveira",

    tracking_code: null,
    carrier: null,

    status: "pending",

    shipping_method: "standard",

    estimated_delivery: "2026-08-24",
    shipped_at: null,
    delivered_at: null,

    notes: "Aguardando envio.",
  },

  {
    id: 5,

    order_number: "PED-005",
    customer_name: "Camila Santos",

    tracking_code: "AZ789123456BR",
    carrier: "Azul Cargo",

    status: "returned",

    shipping_method: "express",

    estimated_delivery: "2026-08-17",
    shipped_at: "2026-08-13",
    delivered_at: null,

    notes: "Entrega retornada ao remetente.",
  },
];