import React, { useState } from "react";
import { Eye, Check, X } from "lucide-react";

import { returnsMock } from "../mocks/returnsMock";
import AdminLayout from "../components/AdminLayout";

const statusConfig = {
  requested: {
    label: "Em troca",
    className: "bg-yellow-100 text-yellow-700",
  },

  approved: {
    label: "Troca Autorizada",
    className: "bg-blue-100 text-blue-700",
  },

  received: {
    label: "Recebida",
    className: "bg-green-100 text-green-700",
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

  const [showReceiptModal, setShowReceiptModal] =
    useState(false);

  const [returnToStock, setReturnToStock] =
    useState("");

  const filteredReturns = returns.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.return_code.toLowerCase().includes(searchText) ||
      item.customer_name.toLowerCase().includes(searchText) ||
      (item.order_number || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /*
   * O ADM pode selecionar:
   * - Em troca
   * - Troca Autorizada
   *
   * "Recebida" não é selecionada manualmente.
   * Ela acontece somente após a confirmação de recebimento.
   */
  const updateStatus = (newStatus) => {
    if (!selectedReturn) return;

    const updatedReturn = {
      ...selectedReturn,
      status: newStatus,
    };

    setReturns((current) =>
      current.map((item) =>
        item.id === selectedReturn.id
          ? updatedReturn
          : item
      )
    );

    setSelectedReturn(updatedReturn);
  };

  /*
   * Abre o modal para confirmar o recebimento.
   */
  const openReceiptModal = () => {
    setReturnToStock("");
    setShowReceiptModal(true);
  };

  /*
   * Confirma o recebimento dos itens.
   *
   * Depois disso:
   * - status = Recebida
   * - registra se retorna ao estoque
   * - gera cupom de troca
   */
  const confirmReceipt = () => {
    if (!selectedReturn || !returnToStock) return;

    const couponCode = `TROCA-${String(
      selectedReturn.id
    ).padStart(4, "0")}`;

    const updatedReturn = {
      ...selectedReturn,
      status: "received",
      return_to_stock: returnToStock,
      exchange_coupon: couponCode,
    };

    setReturns((current) =>
      current.map((item) =>
        item.id === selectedReturn.id
          ? updatedReturn
          : item
      )
    );

    setSelectedReturn(updatedReturn);

    setShowReceiptModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* CABEÇALHO */}

        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Trocas
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none"
          >
            <option value="all">
              Todos os status
            </option>

            <option value="requested">
              Em troca
            </option>

            <option value="approved">
              Troca Autorizada
            </option>

            <option value="received">
              Recebida
            </option>
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
                    Valor
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
                    statusConfig[item.status] ||
                    statusConfig.requested;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5]"
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
                          {formatBRL(
                            item.refund_amount
                          )}
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

                        <button
                          onClick={() =>
                            setSelectedReturn(item)
                          }
                          className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#56443F]"
                          title="Visualizar troca"
                        >
                          <Eye size={15} />
                        </button>

                      </td>

                    </tr>
                  );
                })}


                {filteredReturns.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-sm text-[#A28776]"
                    >
                      Nenhuma troca encontrada.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* MODAL DA TROCA */}

        {selectedReturn && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
              className="absolute inset-0 bg-[#56443F]/40 backdrop-blur-sm"
              onClick={() =>
                setSelectedReturn(null)
              }
            />


            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4C7B7]/20">

                <div>

                  <h2 className="text-lg font-bold text-[#56443F]">
                    Troca{" "}
                    {selectedReturn.return_code}
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    Pedido{" "}
                    {selectedReturn.order_number ||
                      "—"}{" "}
                    •{" "}
                    {formatDate(
                      selectedReturn.created_at
                    )}
                  </p>

                </div>


                <button
                  onClick={() =>
                    setSelectedReturn(null)
                  }
                  className="p-2 hover:bg-[#FAF9F5] rounded-lg"
                >
                  <X size={18} />
                </button>

              </div>


              {/* BODY */}

              <div className="p-6 space-y-5">

                {/* CLIENTE */}

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


                {/* MOTIVO */}

                {selectedReturn.reason && (

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                      Motivo da troca
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
                      Itens da troca
                    </p>

                    <div className="space-y-2">

                      {selectedReturn.items.map(
                        (item, index) => (

                          <div
                            key={index}
                            className="flex items-center justify-between bg-white border border-[#E4C7B7]/30 rounded-lg p-3"
                          >

                            <div>

                              <p className="text-sm font-semibold text-[#56443F]">
                                {item.productName}
                              </p>

                              <p className="text-xs text-[#A28776]">
                                Qtd:{" "}
                                {item.quantity}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* STATUS DA TROCA */}

                <div>

                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Status da troca
                  </label>

                  <select
                    value={selectedReturn.status}
                    onChange={(e) =>
                      updateStatus(
                        e.target.value
                      )
                    }
                    disabled={
                      selectedReturn.status ===
                      "received"
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A] disabled:bg-[#FAF9F5] disabled:text-[#A28776]"
                  >

                    {/* 
                      O ADM escolhe apenas entre:
                      Em troca
                      Troca Autorizada

                      "Recebida" NÃO fica no select.
                    */}

                    <option value="requested">
                      Em troca
                    </option>

                    <option value="approved">
                      Troca Autorizada
                    </option>

                  </select>

                </div>


                {/* CONFIRMAR RECEBIMENTO */}

                {selectedReturn.status ===
                  "approved" && (

                  <button
                    onClick={openReceiptModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047]"
                  >

                    <Check size={16} />

                    Confirmar recebimento

                  </button>

                )}


                {/* INFORMAÇÕES APÓS RECEBIMENTO */}

                {selectedReturn.status ===
                  "received" && (

                  <div className="space-y-3">

                    <div className="bg-[#F0FDF4] border border-green-200 rounded-lg p-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-1">
                        Recebimento confirmado
                      </p>

                      <p className="text-sm text-green-800">
                        Os itens da troca foram
                        registrados como recebidos.
                      </p>

                    </div>


                    <div className="bg-[#FAF9F5] rounded-lg p-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                        Retornar ao estoque
                      </p>

                      <p className="text-sm font-semibold text-[#56443F]">
                        {selectedReturn.return_to_stock ===
                        "yes"
                          ? "Sim"
                          : "Não"}
                      </p>

                    </div>


                    {/* CUPOM */}

                    <div className="bg-[#FAF9F5] rounded-lg p-4">

                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                        Cupom de troca
                      </p>

                      <p className="text-lg font-bold text-[#56443F] tracking-wide">
                        {
                          selectedReturn.exchange_coupon
                        }
                      </p>

                    </div>

                  </div>

                )}

              </div>


              {/* FOOTER */}

              <div className="flex justify-end px-6 py-4 border-t border-[#E4C7B7]/20 bg-[#FAF9F5]">

                <button
                  onClick={() =>
                    setSelectedReturn(null)
                  }
                  className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F] hover:bg-white"
                >
                  Fechar
                </button>

              </div>

            </div>

          </div>

        )}


        {/* MODAL DE RECEBIMENTO */}

        {showReceiptModal &&
          selectedReturn && (

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

            <div
              className="absolute inset-0 bg-[#56443F]/50 backdrop-blur-sm"
              onClick={() =>
                setShowReceiptModal(false)
              }
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4C7B7]/20">

                <div>

                  <h2 className="text-lg font-bold text-[#56443F]">
                    Confirmar recebimento
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    Troca{" "}
                    {selectedReturn.return_code}
                  </p>

                </div>


                <button
                  onClick={() =>
                    setShowReceiptModal(false)
                  }
                  className="p-2 hover:bg-[#FAF9F5] rounded-lg"
                >
                  <X size={18} />
                </button>

              </div>


              {/* BODY */}

              <div className="p-6 space-y-5">

                <div>

                  <p className="text-sm font-semibold text-[#56443F]">
                    Os itens da troca chegaram?
                  </p>

                  <p className="text-xs text-[#A28776] mt-1">
                    Confirme o recebimento dos
                    itens antes de gerar o cupom.
                  </p>

                </div>


                {/* RETORNO AO ESTOQUE */}

                <div>

                  <p className="text-sm font-semibold text-[#56443F] mb-3">
                    Os itens devem retornar ao
                    estoque?
                  </p>

                  <div className="flex gap-3">

                    <label
                      className={`flex-1 cursor-pointer border rounded-lg p-3 text-center text-sm font-semibold transition ${
                        returnToStock === "yes"
                          ? "border-[#8B645A] bg-[#FAF9F5] text-[#56443F]"
                          : "border-[#E4C7B7]/40 text-[#A28776]"
                      }`}
                    >

                      <input
                        type="radio"
                        name="returnToStock"
                        value="yes"
                        checked={
                          returnToStock === "yes"
                        }
                        onChange={(e) =>
                          setReturnToStock(
                            e.target.value
                          )
                        }
                        className="sr-only"
                      />

                      Sim

                    </label>


                    <label
                      className={`flex-1 cursor-pointer border rounded-lg p-3 text-center text-sm font-semibold transition ${
                        returnToStock === "no"
                          ? "border-[#8B645A] bg-[#FAF9F5] text-[#56443F]"
                          : "border-[#E4C7B7]/40 text-[#A28776]"
                      }`}
                    >

                      <input
                        type="radio"
                        name="returnToStock"
                        value="no"
                        checked={
                          returnToStock === "no"
                        }
                        onChange={(e) =>
                          setReturnToStock(
                            e.target.value
                          )
                        }
                        className="sr-only"
                      />

                      Não

                    </label>

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E4C7B7]/20 bg-[#FAF9F5]">

                <button
                  onClick={() =>
                    setShowReceiptModal(false)
                  }
                  className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F] hover:bg-white"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmReceipt}
                  disabled={!returnToStock}
                  className="px-4 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar recebimento
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
}