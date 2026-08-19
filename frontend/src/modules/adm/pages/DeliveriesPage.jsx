import { useState } from "react";
import {
  Truck,
  PackageCheck,
  Clock,
  AlertCircle,
  Eye,
  X,
  MapPin,
} from "lucide-react";

import { deliveriesMock } from "../mocks/deliveriesMock";
import AdminLayout from "../components/AdminLayout";

const statusConfig = {
  pending: {
    label: "Pendente",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  in_transit: {
    label: "Em trânsito",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },

  out_for_delivery: {
    label: "Saiu para entrega",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },

  delivered: {
    label: "Entregue",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  returned: {
    label: "Retornado",
    className: "bg-red-50 text-red-700 border-red-200",
  },

  failed: {
    label: "Falhou",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(deliveriesMock);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const totalDeliveries = deliveries.length;

  const pendingDeliveries = deliveries.filter(
    (delivery) => delivery.status === "pending"
  ).length;

  const inTransitDeliveries = deliveries.filter(
    (delivery) =>
      delivery.status === "in_transit" ||
      delivery.status === "out_for_delivery"
  ).length;

  const deliveredDeliveries = deliveries.filter(
    (delivery) => delivery.status === "delivered"
  ).length;

  function getStatus(status) {
    return (
      statusConfig[status] || {
        label: status,
        className: "bg-gray-50 text-gray-700 border-gray-200",
      }
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* CABEÇALHO */}
        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Entregas
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            Acompanhe as entregas dos pedidos
          </p>
        </div>

        {/* INDICADORES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* TOTAL */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#8B645A]/10 flex items-center justify-center">
                <Truck
                  size={18}
                  className="text-[#8B645A]"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Total de Entregas
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {totalDeliveries}
                </p>
              </div>

            </div>
          </div>

          {/* PENDENTES */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock
                  size={18}
                  className="text-amber-600"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Pendentes
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {pendingDeliveries}
                </p>
              </div>

            </div>
          </div>

          {/* EM TRANSPORTE */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Truck
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Em Transporte
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {inTransitDeliveries}
                </p>
              </div>

            </div>
          </div>

          {/* ENTREGUES */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <PackageCheck
                  size={18}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Entregues
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {deliveredDeliveries}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* TABELA */}
        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Pedido
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cliente
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Rastreio
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Transportadora
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Previsão
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Status
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Ações
                  </th>

                </tr>
              </thead>

              <tbody>

                {deliveries.map((delivery) => {

                  const status = getStatus(delivery.status);

                  return (
                    <tr
                      key={delivery.id}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5]"
                    >

                      {/* PEDIDO */}
                      <td className="px-5 py-4">

                        <p className="text-sm font-semibold text-[#56443F]">
                          {delivery.order_number}
                        </p>

                      </td>

                      {/* CLIENTE */}
                      <td className="px-5 py-4">

                        <p className="text-sm text-[#56443F]">
                          {delivery.customer_name}
                        </p>

                      </td>

                      {/* RASTREIO */}
                      <td className="px-5 py-4">

                        <span className="text-xs font-mono text-[#56443F]">
                          {delivery.tracking_code || "—"}
                        </span>

                      </td>

                      {/* TRANSPORTADORA */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-[#56443F]">
                          {delivery.carrier || "—"}
                        </span>

                      </td>

                      {/* PREVISÃO */}
                      <td className="px-5 py-4">

                        <span className="text-xs text-[#A28776]">
                          {formatDate(
                            delivery.estimated_delivery
                          )}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.className}`}
                        >
                          {status.label}
                        </span>

                      </td>

                      {/* AÇÕES */}
                      <td className="px-5 py-4">

                        <button
                          onClick={() =>
                            setSelectedDelivery(delivery)
                          }
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20 text-[#56443F]"
                          title="Ver detalhes"
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

          {deliveries.length === 0 && (
            <div className="py-12 text-center text-sm text-[#A28776]">
              Nenhuma entrega encontrada.
            </div>
          )}

        </div>

        {/* MODAL DE DETALHES */}
        {selectedDelivery && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* FUNDO */}
            <div
              className="absolute inset-0 bg-[#56443F]/40 backdrop-blur-sm"
              onClick={() => setSelectedDelivery(null)}
            />

            {/* MODAL */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">

              {/* CABEÇALHO */}
              <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>
                  <h2 className="font-bold text-[#56443F]">
                    Detalhes da Entrega
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    {selectedDelivery.order_number}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDelivery(null)}
                  className="p-2 rounded-lg hover:bg-[#E4C7B7]/20"
                >
                  <X size={18} />
                </button>

              </div>

              {/* CONTEÚDO */}
              <div className="p-6 space-y-5">

                {/* STATUS */}
                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold text-[#A28776]">
                    Status
                  </span>

                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      getStatus(selectedDelivery.status)
                        .className
                    }`}
                  >
                    {
                      getStatus(selectedDelivery.status)
                        .label
                    }
                  </span>

                </div>

                {/* CLIENTE */}
                <div className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-lg bg-[#E4C7B7]/20 flex items-center justify-center">
                    <MapPin
                      size={16}
                      className="text-[#8B645A]"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Cliente
                    </p>

                    <p className="text-sm font-semibold text-[#56443F]">
                      {selectedDelivery.customer_name}
                    </p>
                  </div>

                </div>

                {/* INFORMAÇÕES */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Código de rastreio
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {selectedDelivery.tracking_code ||
                        "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Transportadora
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {selectedDelivery.carrier || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Método de envio
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {selectedDelivery.shipping_method ===
                      "express"
                        ? "Expresso"
                        : "Padrão"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Previsão
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {formatDate(
                        selectedDelivery.estimated_delivery
                      )}
                    </p>
                  </div>

                </div>

                {/* DATAS */}
                <div className="border-t pt-4 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Enviado em
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {formatDate(
                        selectedDelivery.shipped_at
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#A28776]">
                      Entregue em
                    </p>

                    <p className="text-sm font-semibold text-[#56443F] mt-1">
                      {formatDate(
                        selectedDelivery.delivered_at
                      )}
                    </p>
                  </div>

                </div>

                {/* OBSERVAÇÕES */}
                {selectedDelivery.notes && (

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-xs font-semibold text-[#56443F] mb-1">
                      Observações
                    </p>

                    <p className="text-sm text-[#A28776]">
                      {selectedDelivery.notes}
                    </p>

                  </div>

                )}

              </div>

              {/* RODAPÉ */}
              <div className="flex justify-end px-6 py-4 border-t bg-[#FAF9F5]">

                <button
                  onClick={() => setSelectedDelivery(null)}
                  className="px-4 py-2.5 rounded-lg bg-[#56443F] text-white text-sm font-semibold hover:bg-[#8B645A]"
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