export const customersMock = [
  {
    id: "1",
    full_name: "Jamily Batista",
    email: "jamily@email.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    status: "active",
    total_orders: 8,
    total_spent: 1249.90,
    created_at: "2026-01-15",
    notes: "Cliente frequente.",
    avatar_initials: "JB",

    orders: [
      {
        id: "o1",
        order_number: "#1001",
        created_at: "2026-08-10",
        total: 189.90,
        status: "delivered",
      },
      {
        id: "o2",
        order_number: "#0987",
        created_at: "2026-07-22",
        total: 249.90,
        status: "delivered",
      },
    ],
  },

  {
    id: "2",
    full_name: "Mariana Souza",
    email: "mariana@email.com",
    phone: "(11) 98888-8888",
    cpf: "234.567.890-11",
    status: "active",
    total_orders: 5,
    total_spent: 749.50,
    created_at: "2026-03-20",
    notes: "",
    avatar_initials: "MS",

    orders: [
      {
        id: "o3",
        order_number: "#1002",
        created_at: "2026-08-12",
        total: 159.90,
        status: "processing",
      },
    ],
  },

  {
    id: "3",
    full_name: "Ana Carolina Lima",
    email: "ana@email.com",
    phone: "(11) 97777-7777",
    cpf: "345.678.901-22",
    status: "blocked",
    total_orders: 3,
    total_spent: 420.00,
    created_at: "2026-02-10",
    notes: "Cadastro bloqueado.",
    avatar_initials: "AC",

    orders: [],
  },

  {
    id: "4",
    full_name: "Beatriz Oliveira",
    email: "beatriz@email.com",
    phone: "(11) 96666-6666",
    cpf: "456.789.012-33",
    status: "inactive",
    total_orders: 1,
    total_spent: 89.90,
    created_at: "2026-04-05",
    notes: "",
    avatar_initials: "BO",

    orders: [
      {
        id: "o4",
        order_number: "#0912",
        created_at: "2026-05-02",
        total: 89.90,
        status: "delivered",
      },
    ],
  },
];