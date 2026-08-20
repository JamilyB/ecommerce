export const customersMock = [
  {
    id: "1",
    code: "CLI-0001",

    full_name: "Jamily Batista",
    gender: "Feminino",
    birth_date: "2003-05-15",
    cpf: "123.456.789-00",
    phone: {
      type: "Celular",
      ddd: "11",
      number: "99999-9999",
    },
    email: "jamily@email.com",

    password: "Senha@123",
    password_confirmation: "Senha@123",

    status: "active",
    ranking: 5,
    avatar_initials: "JB",

    residential_address: {
      residence_type: "Casa",
      street_type: "Rua",
      street: "das Flores",
      number: "123",
      neighborhood: "Centro",
      cep: "09000-000",
      city: "Santo André",
      state: "SP",
      country: "Brasil",
      notes: "",
    },

    addresses: [
      {
        id: "a1",
        name: "Casa",
        type: "Entrega",
        residence_type: "Casa",
        street_type: "Rua",
        street: "das Flores",
        number: "123",
        neighborhood: "Centro",
        cep: "09000-000",
        city: "Santo André",
        state: "SP",
        country: "Brasil",
        notes: "",
      },
      {
        id: "a2",
        name: "Trabalho",
        type: "Cobrança",
        residence_type: "Comercial",
        street_type: "Avenida",
        street: "Industrial",
        number: "500",
        neighborhood: "Centro",
        cep: "09500-000",
        city: "São Caetano do Sul",
        state: "SP",
        country: "Brasil",
        notes: "Entregar na recepção.",
      },
    ],

    cards: [
      {
        id: "c1",
        number: "**** **** **** 1234",
        name: "JAMILY BATISTA",
        brand: "Visa",
        security_code: "***",
        preferred: true,
      },
      {
        id: "c2",
        number: "**** **** **** 5678",
        name: "JAMILY BATISTA",
        brand: "Mastercard",
        security_code: "***",
        preferred: false,
      },
    ],

    transactions: [
      {
        id: "t1",
        order_number: "#1001",
        date: "2026-08-10",
        total: 189.90,
        status: "Entregue",
      },
      {
        id: "t2",
        order_number: "#0987",
        date: "2026-07-22",
        total: 249.90,
        status: "Entregue",
      },
    ],
  },

  {
    id: "2",
    code: "CLI-0002",

    full_name: "Mariana Souza",
    gender: "Feminino",
    birth_date: "1998-08-20",
    cpf: "234.567.890-11",
    phone: {
      type: "Celular",
      ddd: "11",
      number: "98888-8888",
    },
    email: "mariana@email.com",

    password: "Senha@456",
    password_confirmation: "Senha@456",

    status: "active",
    ranking: 4,
    avatar_initials: "MS",

    residential_address: {
      residence_type: "Apartamento",
      street_type: "Avenida",
      street: "Brasil",
      number: "800",
      neighborhood: "Centro",
      cep: "09010-000",
      city: "Santo André",
      state: "SP",
      country: "Brasil",
      notes: "Apartamento 42.",
    },

    addresses: [
      {
        id: "a3",
        name: "Apartamento",
        type: "Entrega",
        residence_type: "Apartamento",
        street_type: "Avenida",
        street: "Brasil",
        number: "800",
        neighborhood: "Centro",
        cep: "09010-000",
        city: "Santo André",
        state: "SP",
        country: "Brasil",
        notes: "Apartamento 42.",
      },
    ],

    cards: [
      {
        id: "c3",
        number: "**** **** **** 9012",
        name: "MARIANA SOUZA",
        brand: "Mastercard",
        security_code: "***",
        preferred: true,
      },
    ],

    transactions: [
      {
        id: "t3",
        order_number: "#1002",
        date: "2026-08-12",
        total: 159.90,
        status: "Processando",
      },
    ],
  },

  {
    id: "3",
    code: "CLI-0003",

    full_name: "Ana Carolina Lima",
    gender: "Feminino",
    birth_date: "1995-03-12",
    cpf: "345.678.901-22",
    phone: {
      type: "Celular",
      ddd: "11",
      number: "97777-7777",
    },
    email: "ana@email.com",

    password: "Senha@789",
    password_confirmation: "Senha@789",

    status: "inactive",
    ranking: 3,
    avatar_initials: "AC",

    residential_address: {
      residence_type: "Casa",
      street_type: "Rua",
      street: "São Paulo",
      number: "45",
      neighborhood: "Jardim",
      cep: "09100-000",
      city: "Santo André",
      state: "SP",
      country: "Brasil",
      notes: "",
    },

    addresses: [],

    cards: [],

    transactions: [],
  },
];