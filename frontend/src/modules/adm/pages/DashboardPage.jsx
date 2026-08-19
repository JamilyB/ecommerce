import React from "react";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Clock,
  Eye,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import { dashboardMock } from "../mocks/dashboardMock";
import { productsMock } from "../mocks/productsMock";

const fmtBRL = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

/* =========================================================
   CONFIGURAÇÃO DOS STATUS
========================================================= */

const orderStatusConfig = {
  pending: {
    label: "Pendente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  confirmed: {
    label: "Confirmado",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },

  processing: {
    label: "Processando",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },

  shipped: {
    label: "Enviado",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },

  delivered: {
    label: "Entregue",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  cancelled: {
    label: "Cancelado",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

/* =========================================================
   CARD DE INDICADOR
========================================================= */

function StatCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  const positive = change >= 0;

  return (
    <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold text-[#A28776] mb-1">
            {title}
          </p>

          <p className="text-2xl font-bold text-[#56443F]">
            {value}
          </p>

          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold mt-1.5 ${
                positive
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}

              <span>
                {Math.abs(change).toFixed(1)}% vs mês anterior
              </span>
            </div>
          )}

        </div>

        <div className="w-10 h-10 rounded-xl bg-[#8B645A]/10 flex items-center justify-center">
          <Icon size={19} className="text-[#8B645A]" />
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   GRÁFICO DE BARRAS
========================================================= */

function SalesChart({ data }) {
  const max = Math.max(
    ...data.map((item) => item.revenue),
    1
  );

  return (
    <div className="h-52 flex items-end gap-3">

      {data.map((item) => {
        const percentage =
          (item.revenue / max) * 100;

        const day = new Date(
          `${item.date}T12:00:00`
        ).toLocaleDateString("pt-BR", {
          weekday: "short",
        });

        return (
          <div
            key={item.date}
            className="flex-1 h-full flex flex-col justify-end items-center gap-2"
          >

            <div className="w-full flex-1 flex items-end">

              <div
                className="w-full bg-[#8B645A]/20 rounded-t-lg relative group"
                style={{ height: `${Math.max(percentage, 5)}%` }}
              >

                <div
                  className="absolute inset-x-0 bottom-0 bg-[#8B645A] rounded-t-lg transition-all"
                  style={{
                    height: "100%",
                  }}
                />

                <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#56443F] text-white text-[10px] font-semibold rounded-lg px-2 py-1 whitespace-nowrap z-10">
                  {fmtBRL(item.revenue)}
                </div>

              </div>

            </div>

            <span className="text-[10px] text-[#A28776] capitalize">
              {day.replace(".", "")}
            </span>

          </div>
        );
      })}

    </div>
  );
}

/* =========================================================
   BADGE DE STATUS
========================================================= */

function StatusBadge({ status }) {
  const config =
    orderStatusConfig[status] || {
      label: status,
      className:
        "bg-gray-50 text-gray-600 border-gray-200",
    };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function DashboardPage() {
  const stats = dashboardMock.stats;

  /*
   * Utilizamos o mesmo productsMock do estoque.
   * Dessa forma o Dashboard e o InventoryPage
   * trabalham com os mesmos produtos.
   */

  const lowStockProducts = productsMock.filter(
    (product) =>
      product.stock <= product.low_stock_threshold
  );

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-xl font-bold text-[#56443F]">
              Dashboard
            </h1>

            <p className="text-xs text-[#A28776] mt-1">
              Visão geral da loja JARMIN
            </p>

          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white border border-[#E4C7B7]/30 rounded-lg px-3 py-2">

            <Clock
              size={13}
              className="text-[#8B645A]"
            />

            <span className="text-xs text-[#A28776]">
              Atualizado agora
            </span>

          </div>

        </div>

        {/* =================================================
            INDICADORES
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <StatCard
            title="Receita Total"
            value={fmtBRL(stats.totalRevenue)}
            change={stats.revenueChange}
            icon={TrendingUp}
          />

          <StatCard
            title="Total de Pedidos"
            value={stats.totalOrders}
            change={stats.ordersChange}
            icon={ShoppingCart}
          />

          <StatCard
            title="Clientes"
            value={stats.totalCustomers}
            change={stats.customersChange}
            icon={Users}
          />

          <StatCard
            title="Produtos Ativos"
            value={stats.totalProducts}
            change={0}
            icon={Package}
          />

        </div>

        {/* =================================================
            GRÁFICO + STATUS
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* GRÁFICO */}

          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm">

            <div className="px-5 py-4 border-b border-[#E4C7B7]/20">

              <h2 className="text-sm font-bold text-[#56443F]">
                Receita dos Últimos 7 Dias
              </h2>

              <p className="text-xs text-[#A28776] mt-0.5">
                Acompanhamento diário das vendas
              </p>

            </div>

            <div className="p-5">

              <SalesChart
                data={dashboardMock.salesByDay}
              />

            </div>

          </div>

          {/* STATUS DOS PEDIDOS */}

          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm">

            <div className="px-5 py-4 border-b border-[#E4C7B7]/20">

              <h2 className="text-sm font-bold text-[#56443F]">
                Pedidos por Status
              </h2>

              <p className="text-xs text-[#A28776] mt-0.5">
                Distribuição dos pedidos
              </p>

            </div>

            <div className="p-5 space-y-3">

              {dashboardMock.ordersByStatus.map(
                (item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between"
                  >

                    <StatusBadge
                      status={item.status}
                    />

                    <span className="text-sm font-bold text-[#56443F]">
                      {item.count}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            PEDIDOS RECENTES + ESTOQUE
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* PEDIDOS RECENTES */}

          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

            <div className="px-5 py-4 border-b border-[#E4C7B7]/20 flex items-center justify-between">

              <div>

                <h2 className="text-sm font-bold text-[#56443F]">
                  Pedidos Recentes
                </h2>

                <p className="text-xs text-[#A28776] mt-0.5">
                  Últimos pedidos realizados
                </p>

              </div>

              <button
                className="text-xs font-semibold text-[#8B645A] hover:text-[#56443F] flex items-center gap-1"
              >
                Ver todos
                <Eye size={12} />
              </button>

            </div>

            <div className="divide-y divide-[#E4C7B7]/10">

              {dashboardMock.recentOrders.map(
                (order) => (
                  <div
                    key={order.id}
                    className="px-5 py-3.5 flex items-center justify-between"
                  >

                    <div>

                      <p className="text-sm font-semibold text-[#56443F]">
                        {order.order_number}
                      </p>

                      <p className="text-xs text-[#A28776]">
                        {order.customer_name}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-sm font-bold text-[#56443F]">
                        {fmtBRL(order.total)}
                      </p>

                      <StatusBadge
                        status={order.status}
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* ESTOQUE CRÍTICO */}

          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

            <div className="px-5 py-4 border-b border-[#E4C7B7]/20 flex items-center justify-between">

              <div>

                <h2 className="text-sm font-bold text-[#56443F]">
                  Estoque Crítico
                </h2>

                <p className="text-xs text-[#A28776] mt-0.5">
                  Produtos com estoque baixo
                </p>

              </div>

              <button
                className="text-xs font-semibold text-[#8B645A] hover:text-[#56443F] flex items-center gap-1"
              >
                Ver estoque
                <Eye size={12} />
              </button>

            </div>

            <div className="divide-y divide-[#E4C7B7]/10">

              {lowStockProducts.length > 0 ? (
                lowStockProducts.map(
                  (product) => (
                    <div
                      key={product.id}
                      className="px-5 py-3.5 flex items-center justify-between"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center overflow-hidden">

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package
                              size={17}
                              className="text-[#8B645A]"
                            />
                          )}

                        </div>

                        <div>

                          <p className="text-sm font-semibold text-[#56443F]">
                            {product.name}
                          </p>

                          <p className="text-xs text-[#A28776]">
                            {product.sku}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-1.5 text-red-600">

                        <AlertCircle size={14} />

                        <span className="text-sm font-bold">
                          {product.stock} un.
                        </span>

                      </div>

                    </div>
                  )
                )
              ) : (
                <p className="text-xs text-[#A28776] px-5 py-5">
                  Todos os produtos possuem estoque adequado.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            PRODUTOS MAIS VENDIDOS
        ================================================= */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-[#E4C7B7]/20">

            <h2 className="text-sm font-bold text-[#56443F]">
              Produtos Mais Vendidos
            </h2>

            <p className="text-xs text-[#A28776] mt-0.5">
              Desempenho dos produtos no período
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Produto
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Unidades Vendidas
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Receita
                  </th>

                </tr>

              </thead>

              <tbody>

                {dashboardMock.topProducts.map(
                  (product) => (
                    <tr
                      key={product.name}
                      className="border-b border-[#E4C7B7]/10"
                    >

                      <td className="px-5 py-3.5">

                        <p className="text-sm font-semibold text-[#56443F]">
                          {product.name}
                        </p>

                      </td>

                      <td className="px-5 py-3.5 text-sm text-[#56443F]">
                        {product.sales}
                      </td>

                      <td className="px-5 py-3.5 text-sm font-bold text-[#56443F]">
                        {fmtBRL(product.revenue)}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}