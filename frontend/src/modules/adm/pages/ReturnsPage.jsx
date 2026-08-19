import React, { useState } from "react";
import { Eye, Check, X } from "lucide-react";
import { returnsMock } from "../mocks/returnsMock";
import AdminLayout from "../components/AdminLayout";

const statusConfig = {
  requested: {
    label: "Solicitada",
    className: "bg-yellow-100 text-yellow-700",
  },
  approved: {
    label: "Aprovada",
    className: "bg-blue-100 text-blue-700",
  },
  rejected: {
    label: "Rejeitada",
    className: "bg-red-100 text-red-700",
  },
  processing: {
    label: "Processando",
    className: "bg-purple-100 text-purple-700",
  },
  completed: {
    label: "Concluída",
    className: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-gray-100 text-gray-600",
  },
};

const formatBRL = (value) => {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export default function ReturnsPage() {
  const [returns, setReturns] = useState(returnsMock);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notes, setNotes] = useState("");

  const filteredReturns = returns.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.return_code.toLowerCase().includes(searchText) ||
      item.customer_name.toLowerCase().includes(searchText) ||
      (item.order_number || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openDetails = (item) => {
    setSelectedReturn(item);
    setNotes(item.admin_notes || "");
  };

  const updateStatus = (id, status) => {
    setReturns((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              admin_notes: notes,
            }
          : item
      )
    );

    setSelectedReturn((current) =>
      current
        ? {
            ...current,
            status,
            admin_notes: notes,
          }
        : null
    );
  };

  const saveNotes = () => {
    if (!selectedReturn) return;

    setReturns((current) =>
      current.map((item) =>
        item.id === selectedReturn.id
          ? {
              ...item,
              admin_notes: notes,
            }
          : item
      )
    );

    setSelectedReturn(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* CABEÇALHO */}
        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Devoluções e Reembolsos
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            {returns.length} solicitações
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Buscar por código, cliente ou pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none"
          >
            <option value="all">Todos os status</option>

            {Object.entries(statusConfig).map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>

        </div>

        {/* TABELA */}
        <div className="bg-white rounded-xl border border-[#E4C7B7]/20 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Código
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cliente
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Pedido
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Reembolso
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Método
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

                {filteredReturns.map((item) => {

                  const config =
                    statusConfig[item.status] || statusConfig.requested;

                  return (
                    <tr
                      key={item.id}
                      onClick={() => openDetails(item)}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                    >

                      <td className="px-5 py-4">
                        <span className="text-sm font-mono font-semibold text-[#56443F]">
                          {item.return_code}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#56443F]">
                          {item.customer_name}
                        </p>

                        <p className="text-xs text-[#A28776]">
                          {item.customer_email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs text-[#A28776]">
                          {item.order_number || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-[#56443F]">
                          {formatBRL(item.refund_amount)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs capitalize text-[#56443F]">
                          {item.refund_method || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}
                        >
                          {config.label}
                        </span>
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1">

                          {item.status === "requested" && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus(item.id, "approved");
                                }}
                                className="p-1.5 hover:bg-green-50 rounded-lg text-green-600"
                                title="Aprovar"
                              >
                                <Check size={14} />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus(item.id, "rejected");
                                }}
                                className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"
                                title="Rejeitar"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(item);
                            }}
                            className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#56443F]"
                            title="Visualizar"
                          >
                            <Eye size={15} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

                {filteredReturns.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-sm text-[#A28776]"
                    >
                      Nenhuma devolução encontrada.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* MODAL */}
        {selectedReturn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4C7B7]/20">

                <div>
                  <h2 className="text-lg font-bold text-[#56443F]">
                    Devolução {selectedReturn.return_code}
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    Pedido {selectedReturn.order_number || "—"} •{" "}
                    {formatDate(selectedReturn.created_at)}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedReturn(null)}
                  className="p-2 hover:bg-[#FAF9F5] rounded-lg"
                >
                  <X size={18} />
                </button>

              </div>

              {/* BODY */}
              <div className="p-6 space-y-5">

                {/* CLIENTE / REEMBOLSO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                      Cliente
                    </p>

                    <p className="text-sm font-semibold text-[#56443F]">
                      {selectedReturn.customer_name}
                    </p>

                    <p className="text-xs text-[#A28776]">
                      {selectedReturn.customer_email}
                    </p>

                  </div>

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                      Reembolso
                    </p>

                    <p className="text-lg font-bold text-[#56443F]">
                      {formatBRL(selectedReturn.refund_amount)}
                    </p>

                    <p className="text-xs text-[#A28776] capitalize">
                      {selectedReturn.refund_method || "—"}
                    </p>

                  </div>

                </div>

                {/* MOTIVO */}
                {selectedReturn.reason && (
                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                      Motivo
                    </p>

                    <p className="text-sm text-[#56443F]">
                      {selectedReturn.reason}
                    </p>

                  </div>
                )}

                {/* ITENS */}
                {selectedReturn.items?.length > 0 && (
                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Itens Devolvidos
                    </p>

                    <div className="space-y-2">

                      {selectedReturn.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white border border-[#E4C7B7]/30 rounded-lg p-3"
                        >

                          <div>
                            <p className="text-sm font-semibold text-[#56443F]">
                              {item.productName}
                            </p>

                            <p className="text-xs text-[#A28776]">
                              Qtd: {item.quantity} • {item.reason}
                            </p>
                          </div>

                        </div>
                      ))}

                    </div>

                  </div>
                )}

                {/* STATUS */}
                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Status da Devolução
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {Object.entries(statusConfig).map(
                      ([value, config]) => (
                        <button
                          key={value}
                          onClick={() =>
                            updateStatus(selectedReturn.id, value)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedReturn.status === value
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

                {/* NOTAS */}
                <div>

                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Notas Internas
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Observações sobre o processamento da devolução..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A] resize-none"
                  />

                </div>

              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E4C7B7]/20">

                <button
                  onClick={() => setSelectedReturn(null)}
                  className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F] hover:bg-[#FAF9F5]"
                >
                  Fechar
                </button>

                <button
                  onClick={saveNotes}
                  className="px-4 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047]"
                >
                  Salvar Alterações
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}