export const dashboardMock = {
  // Indicadores principais
  stats: {
    totalRevenue: 12480.50,
    revenueChange: 12.8,

    totalOrders: 86,
    ordersChange: 8.4,

    totalCustomers: 54,
    customersChange: 15.2,

    totalProducts: 3,
  },

  // Receita dos últimos 7 dias
  salesByDay: [
    {
      date: "2026-08-13",
      revenue: 1250.00,
    },
    {
      date: "2026-08-14",
      revenue: 980.50,
    },
    {
      date: "2026-08-15",
      revenue: 1740.00,
    },
    {
      date: "2026-08-16",
      revenue: 1320.00,
    },
    {
      date: "2026-08-17",
      revenue: 2150.00,
    },
    {
      date: "2026-08-18",
      revenue: 1890.00,
    },
    {
      date: "2026-08-19",
      revenue: 2350.00,
    },
  ],

  // Pedidos recentes
  recentOrders: [
    {
      id: 1,
      order_number: "PED-00086",
      customer_name: "Mariana Silva",
      total: 129.80,
      status: "confirmed",
    },
    {
      id: 2,
      order_number: "PED-00085",
      customer_name: "Ana Carolina",
      total: 179.70,
      status: "processing",
    },
    {
      id: 3,
      order_number: "PED-00084",
      customer_name: "Juliana Santos",
      total: 69.90,
      status: "shipped",
    },
    {
      id: 4,
      order_number: "PED-00083",
      customer_name: "Camila Oliveira",
      total: 119.80,
      status: "delivered",
    },
    {
      id: 5,
      order_number: "PED-00082",
      customer_name: "Beatriz Costa",
      total: 59.90,
      status: "pending",
    },
  ],

  // Quantidade de pedidos por status
  ordersByStatus: [
    {
      status: "pending",
      count: 8,
    },
    {
      status: "confirmed",
      count: 14,
    },
    {
      status: "processing",
      count: 11,
    },
    {
      status: "shipped",
      count: 17,
    },
    {
      status: "delivered",
      count: 31,
    },
    {
      status: "cancelled",
      count: 5,
    },
  ],

  // Produtos mais vendidos
  topProducts: [
    {
      name: "Vela Relaxar",
      sales: 42,
      revenue: 2515.80,
    },
    {
      name: "Vela Café",
      sales: 31,
      revenue: 1546.90,
    },
    {
      name: "Vela Natureza",
      sales: 18,
      revenue: 1258.20,
    },
  ],
};