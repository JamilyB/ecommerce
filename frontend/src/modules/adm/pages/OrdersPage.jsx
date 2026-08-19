import React, { useState } from "react";
import {
  Eye,
  X,
  Search,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import { ordersMock } from "../mocks/ordersMock";

const fmtBRL = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const fmtDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusConfig = {
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
    className: "bg-blue-50 text-blue-700 border-blue-200",
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

const paymentConfig = {
  pending: {
    label: "Pendente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  paid: {
    label: "Pago",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  refunded: {
    label: "Reembolsado",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },

  failed: {
    label: "Falhou",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      order.order_number.toLowerCase().includes(searchText) ||
      order.customer_name.toLowerCase().includes(searchText) ||
      order.customer_email.toLowerCase().includes(searchText);

    const statusMatch =
      statusFilter === "all" ||
      order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const updateStatus = (status) => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            status,
          }
        : order
    );

    setOrders(updatedOrders);

    setSelectedOrder({
      ...selectedOrder,
      status,
    });
  };

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* CABEÇALHO */}

        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Pedidos
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            {orders.length} pedidos
          </p>
        </div>


        {/* FILTROS */}

        <div className="flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A28776]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por número, cliente ou email..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm outline-none focus:border-[#8B645A]"
            />

          </div>


          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm outline-none"
          >

            <option value="all">
              Todos os status
            </option>

            <option value="pending">
              Pendente
            </option>

            <option value="confirmed">
              Confirmado
            </option>

            <option value="processing">
              Processando
            </option>

            <option value="shipped">
              Enviado
            </option>

            <option value="delivered">
              Entregue
            </option>

            <option value="cancelled">
              Cancelado
            </option>

          </select>

        </div>


        {/* TABELA */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Pedido
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cliente
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Data
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Total
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Pagamento
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Ações
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredOrders.map((order) => {

                  const status =
                    statusConfig[order.status];

                  const payment =
                    paymentConfig[order.payment_status];

                  return (

                    <tr
                      key={order.id}
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5] cursor-pointer"
                    >

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold text-[#56443F]">
                          {order.order_number}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <p className="text-sm font-semibold text-[#56443F]">
                          {order.customer_name}
                        </p>

                        <p className="text-xs text-[#A28776]">
                          {order.customer_email}
                        </p>

                      </td>


                      <td className="px-5 py-4">

                        <span className="text-xs text-[#A28776]">
                          {fmtDate(order.created_at)}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <span className="text-sm font-bold text-[#56443F]">
                          {fmtBRL(order.total)}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${payment.className}`}
                        >
                          {payment.label}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.className}`}
                        >
                          {status.label}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20 text-[#56443F]"
                        >

                          <Eye size={15} />

                        </button>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>


          {filteredOrders.length === 0 && (

            <div className="py-12 text-center text-sm text-[#A28776]">
              Nenhum pedido encontrado.
            </div>

          )}

        </div>


        {/* MODAL */}

        {selectedOrder && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
              className="absolute inset-0 bg-[#56443F]/40 backdrop-blur-sm"
              onClick={() =>
                setSelectedOrder(null)
              }
            />


            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

              {/* HEADER MODAL */}

              <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>

                  <h2 className="font-bold text-[#56443F]">
                    Pedido {selectedOrder.order_number}
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    {fmtDate(selectedOrder.created_at)}
                  </p>

                </div>


                <button
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                  className="p-2 rounded-lg hover:bg-[#E4C7B7]/20"
                >

                  <X size={18} />

                </button>

              </div>


              {/* CONTEÚDO */}

              <div className="p-6 space-y-5">


                {/* CLIENTE + PAGAMENTO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Cliente
                    </p>

                    <p className="text-sm font-semibold text-[#56443F]">
                      {selectedOrder.customer_name}
                    </p>

                    <p className="text-xs text-[#A28776]">
                      {selectedOrder.customer_email}
                    </p>

                  </div>


                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Pagamento
                    </p>

                    <p className="text-sm font-semibold text-[#56443F]">
                      {selectedOrder.payment_method}
                    </p>

                    <span
                      className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        paymentConfig[
                          selectedOrder.payment_status
                        ].className
                      }`}
                    >
                      {
                        paymentConfig[
                          selectedOrder.payment_status
                        ].label
                      }
                    </span>

                  </div>

                </div>


                {/* ENDEREÇO */}

                <div className="bg-[#FAF9F5] rounded-lg p-4">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Endereço de Entrega
                  </p>

                  <p className="text-sm text-[#56443F]">
                    {selectedOrder.shipping_address.street}
                  </p>

                  <p className="text-xs text-[#A28776]">
                    {selectedOrder.shipping_address.city}
                    {" - "}
                    {selectedOrder.shipping_address.state}
                    {" • CEP: "}
                    {selectedOrder.shipping_address.cep}
                  </p>

                </div>


                {/* ITENS */}

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Itens do Pedido
                  </p>


                  <div className="space-y-2">

                    {selectedOrder.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center gap-3 bg-white border border-[#E4C7B7]/30 rounded-lg p-3"
                      >

                        {item.product_image ? (

                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />

                        ) : (

                          <div className="w-10 h-10 rounded-lg bg-[#E4C7B7]/20" />

                        )}


                        <div className="flex-1">

                          <p className="text-sm font-semibold text-[#56443F]">
                            {item.product_name}
                          </p>

                          <p className="text-xs text-[#A28776]">
                            {item.volume}
                            {" • "}
                            Qtd: {item.quantity}
                          </p>

                        </div>


                        <span className="text-sm font-bold">
                          {fmtBRL(
                            item.unit_price *
                            item.quantity
                          )}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>


                {/* RESUMO */}

                <div className="bg-[#FAF9F5] rounded-lg p-4 space-y-1.5">

                  <div className="flex justify-between text-xs text-[#A28776]">
                    <span>Subtotal</span>
                    <span>
                      {fmtBRL(selectedOrder.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#A28776]">
                    <span>Frete</span>
                    <span>
                      {fmtBRL(selectedOrder.shipping_cost)}
                    </span>
                  </div>

                  {selectedOrder.discount > 0 && (

                    <div className="flex justify-between text-xs text-emerald-600">

                      <span>Desconto</span>

                      <span>
                        -{fmtBRL(selectedOrder.discount)}
                      </span>

                    </div>

                  )}

                  <div className="flex justify-between text-sm font-bold text-[#56443F] pt-2 border-t border-[#E4C7B7]/20">

                    <span>Total</span>

                    <span>
                      {fmtBRL(selectedOrder.total)}
                    </span>

                  </div>

                </div>


                {/* STATUS */}

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Atualizar Status
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {Object.entries(statusConfig).map(
                      ([value, config]) => (

                        <button
                          key={value}
                          onClick={() =>
                            updateStatus(value)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedOrder.status === value
                              ? "bg-[#56443F] text-white border-[#56443F]"
                              : "bg-white text-[#56443F] border-[#E4C7B7]/40 hover:bg-[#E4C7B7]/20"
                          }`}
                        >
                          {config.label}
                        </button>

                      )
                    )}

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="flex justify-end px-6 py-4 border-t bg-[#FAF9F5]">

                <button
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E4C7B7]/30"
                >
                  Fechar
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}