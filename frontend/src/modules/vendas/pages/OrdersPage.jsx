import { useState } from "react";
import {
  Package,
  X,
  Check,
} from "lucide-react";

import { ordersMock } from "../../adm/mocks/ordersMock";

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersMock);

  const [confirmation, setConfirmation] = useState({
    open: false,
    type: null,
    orderId: null,
  });

  const getStatus = (status) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmado",
          className:
            "bg-emerald-50 text-emerald-700 border border-emerald-200",
        };

      case "processing":
        return {
          label: "Em preparação",
          className:
            "bg-amber-50 text-amber-700 border border-amber-200",
        };

      case "shipped":
        return {
          label: "Despachado",
          className:
            "bg-blue-50 text-blue-700 border border-blue-200",
        };

      case "delivered":
        return {
          label: "Entregue",
          className:
            "bg-emerald-50 text-emerald-700 border border-emerald-200",
        };

      case "cancelled":
        return {
          label: "Cancelado",
          className:
            "bg-red-50 text-red-700 border border-red-200",
        };

      case "pending":
        return {
          label: "Pendente",
          className:
            "bg-gray-50 text-gray-600 border border-gray-200",
        };

      default:
        return {
          label: status,
          icon: <Package size={10} />,
          className:
            "bg-gray-50 text-gray-600 border border-gray-200",
        };
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const openConfirmation = (type, orderId) => {
    setConfirmation({
      open: true,
      type,
      orderId,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      open: false,
      type: null,
      orderId: null,
    });
  };

  const confirmAction = () => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== confirmation.orderId) {
          return order;
        }

        return {
          ...order,
          status:
            confirmation.type === "cancel"
              ? "cancelled"
              : "delivered",
        };
      })
    );

    closeConfirmation();
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-6 py-16 text-left space-y-12">

      {/* Cabeçalho */}
      <div className="text-center space-y-3">

        <h2 className="font-serif text-3xl font-semibold text-[#56443F]">
          Histórico de Pedidos
        </h2>

        <p className="text-xs text-[#A28776] font-semibold">
          Acompanhe seus pedidos.
        </p>

      </div>

      {/* Pedidos */}
      <div className="space-y-6 max-w-xl mx-auto">

        {orders.map((order) => {
          const status = getStatus(order.status);

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 border border-[#E4C7B7]/30 space-y-4"
            >

              {/* Cabeçalho do pedido */}
              <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[#E4C7B7]/20 pb-3">

                <div className="space-y-1">

                  <span className="text-[9px] bg-[#E4C7B7]/30 text-[#8B645A] px-2 py-0.5 rounded-sm font-bold uppercase">
                    {order.order_number}
                  </span>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#A28776] font-semibold">

                    <span>
                      Realizado em {formatDate(order.created_at)}
                    </span>

                  </div>

                </div>

                {/* Status */}
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${status.className}`}
                >
                  {status.icon}
                  {status.label}
                </span>

              </div>

              {/* Produtos */}
              <div className="space-y-3">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-3 items-center text-xs text-[#56443F]"
                  >

                    <div className="w-10 h-12 bg-[#F1F0E2]/30 border rounded-md p-0.5 flex-shrink-0">
                      {/* Imagem do produto */}
                    </div>

                    <div className="flex-grow">

                      <p className="font-bold">
                        {item.product_name}
                      </p>

                      <span className="text-[10px] text-[#A28776]">
                        Qtd: {item.quantity}
                      </span>

                    </div>

                    <span className="font-bold text-[#8B645A]">
                      R${" "}
                      {(item.unit_price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>

                  </div>

                ))}

              </div>

              {/* Total e ações */}
              <div className="border-t border-[#E4C7B7]/20 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">

                <div className="text-left text-xs">

                  <span className="text-[#A28776] font-semibold">
                    Valor Total:
                  </span>{" "}

                  <span className="font-bold text-[#56443F]">
                    R$ {order.total.toFixed(2).replace(".", ",")}
                  </span>

                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">

                  {/* CANCELAR PEDIDO */}

                  {order.status !== "delivered" &&
                    order.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() =>
                          openConfirmation(
                            "cancel",
                            order.id
                          )
                        }
                        className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors"
                      >
                        Cancelar Pedido
                      </button>
                    )}

                  {/* CONFIRMAR RECEBIMENTO */}

                  {order.status === "shipped" && (
                    <button
                      type="button"
                      onClick={() =>
                        openConfirmation(
                          "receive",
                          order.id
                        )
                      }
                      className="w-full sm:w-auto px-4 py-2 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Confirmar Recebimento
                    </button>
                  )}

                  {/* DEVOLUÇÃO */}

                  {order.status === "delivered" && (
                    <button
                      type="button"
                      className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-[#E4C7B7]/15 text-[#8B645A] border border-[#E4C7B7] rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Solicitar Devolução
                    </button>
                  )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          MODAL DE CONFIRMAÇÃO
      ====================================================== */}

      {confirmation.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">

            {/* Fechar */}

            <div className="flex justify-end">

              <button
                type="button"
                onClick={closeConfirmation}
                className="text-[#A28776] hover:text-[#56443F]"
              >
                <X size={18} />
              </button>

            </div>

            {/* Conteúdo */}

            <div className="text-center space-y-3">

              <div className="w-12 h-12 mx-auto rounded-full bg-[#E4C7B7]/20 flex items-center justify-center">

                {confirmation.type === "cancel" ? (
                  <X
                    size={20}
                    className="text-red-500"
                  />
                ) : (
                  <Check
                    size={20}
                    className="text-[#8B645A]"
                  />
                )}

              </div>

              <h3 className="font-serif text-xl font-semibold text-[#56443F]">

                {confirmation.type === "cancel"
                  ? "Cancelar pedido?"
                  : "Confirmar recebimento?"}

              </h3>

              <p className="text-xs text-[#A28776]">

                {confirmation.type === "cancel"
                  ? "Tem certeza que deseja cancelar este pedido? Essa ação não poderá ser desfeita."
                  : "Confirma que você recebeu este pedido? O pedido será marcado como entregue."}

              </p>

            </div>

            {/* Ações */}

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={closeConfirmation}
                className="flex-1 py-3 border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase text-[#8B645A] hover:bg-[#E4C7B7]/10"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={confirmAction}
                className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase text-white ${
                  confirmation.type === "cancel"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#56443F] hover:bg-[#8B645A]"
                }`}
              >
                Confirmar
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
