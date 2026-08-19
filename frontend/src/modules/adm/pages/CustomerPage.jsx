import React, { useState } from "react";
import {
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  ShoppingBag,
  X,
} from "lucide-react";

import { customersMock } from "../mocks/customersMock";
import AdminLayout from "../components/AdminLayout";

const statusConfig = {
  active: {
    label: "Ativo",
    className: "bg-green-100 text-green-700",
  },
  blocked: {
    label: "Bloqueado",
    className: "bg-red-100 text-red-700",
  },
  inactive: {
    label: "Inativo",
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

export default function CustomerPage() {
  const [customers, setCustomers] = useState(customersMock);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [form, setForm] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* =========================
     FILTRO
  ========================= */

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      customer.full_name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      (customer.cpf || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================
     ABRIR CLIENTE
  ========================= */

  const openDetails = (customer) => {
    setSelectedCustomer(customer);

    setForm({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
      cpf: customer.cpf,
      notes: customer.notes || "",
    });
  };

  /* =========================
     FECHAR MODAL
  ========================= */

  const closeDetails = () => {
    setSelectedCustomer(null);
    setForm({});
  };

  /* =========================
     ALTERAR STATUS
  ========================= */

  const updateStatus = (id, status) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status,
            }
          : customer
      )
    );

    setSelectedCustomer((current) =>
      current
        ? {
            ...current,
            status,
          }
        : null
    );
  };

  /* =========================
     SALVAR CLIENTE
  ========================= */

  const saveCustomer = () => {
    if (!selectedCustomer) return;

    const updatedCustomer = {
      ...selectedCustomer,
      ...form,
    };

    setCustomers((current) =>
      current.map((customer) =>
        customer.id === selectedCustomer.id
          ? updatedCustomer
          : customer
      )
    );

    setSelectedCustomer(updatedCustomer);
  };

  /* =========================
     EXCLUIR CLIENTE
  ========================= */

  const deleteCustomer = () => {
    if (!selectedCustomer) return;

    setCustomers((current) =>
      current.filter(
        (customer) => customer.id !== selectedCustomer.id
      )
    );

    setShowDeleteModal(false);
    closeDetails();
  };

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* =========================
            CABEÇALHO
        ========================= */}

        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Clientes
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            {customers.length} clientes cadastrados
          </p>
        </div>

        {/* =========================
            FILTROS
        ========================= */}

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
          />

          <div className="flex gap-2 flex-wrap">

            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                statusFilter === "all"
                  ? "bg-[#56443F] text-white border-[#56443F]"
                  : "bg-white text-[#56443F] border-[#E4C7B7]/40"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                statusFilter === "active"
                  ? "bg-[#56443F] text-white border-[#56443F]"
                  : "bg-white text-[#56443F] border-[#E4C7B7]/40"
              }`}
            >
              Ativos
            </button>

            <button
              onClick={() => setStatusFilter("blocked")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                statusFilter === "blocked"
                  ? "bg-[#56443F] text-white border-[#56443F]"
                  : "bg-white text-[#56443F] border-[#E4C7B7]/40"
              }`}
            >
              Bloqueados
            </button>

            <button
              onClick={() => setStatusFilter("inactive")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                statusFilter === "inactive"
                  ? "bg-[#56443F] text-white border-[#56443F]"
                  : "bg-white text-[#56443F] border-[#E4C7B7]/40"
              }`}
            >
              Inativos
            </button>

          </div>

        </div>

        {/* =========================
            TABELA
        ========================= */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/20 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cliente
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Pedidos
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Total Gasto
                  </th>

                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cadastro
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

                {filteredCustomers.map((customer) => {

                  const config =
                    statusConfig[customer.status] ||
                    statusConfig.inactive;

                  return (
                    <tr
                      key={customer.id}
                      onClick={() => openDetails(customer)}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                    >

                      {/* CLIENTE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-[#E4C7B7]/30 flex items-center justify-center text-xs font-bold text-[#8B645A]">
                            {customer.avatar_initials}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-[#56443F]">
                              {customer.full_name}
                            </p>

                            <p className="text-xs text-[#A28776]">
                              {customer.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PEDIDOS */}

                      <td className="px-5 py-4">

                        <span className="text-sm font-semibold">
                          {customer.total_orders}
                        </span>

                      </td>

                      {/* TOTAL */}

                      <td className="px-5 py-4">

                        <span className="font-bold text-[#56443F]">
                          {formatBRL(customer.total_spent)}
                        </span>

                      </td>

                      {/* CADASTRO */}

                      <td className="px-5 py-4">

                        <span className="text-xs text-[#A28776]">
                          {formatDate(customer.created_at)}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}
                        >
                          {config.label}
                        </span>

                      </td>

                      {/* AÇÕES */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1">

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(customer);
                            }}
                            className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#56443F]"
                            title="Ver cliente"
                          >
                            <Eye size={14} />
                          </button>

                          {customer.status === "active" ? (

                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                updateStatus(
                                  customer.id,
                                  "blocked"
                                );
                              }}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"
                              title="Bloquear"
                            >
                              <Ban size={14} />
                            </button>

                          ) : (

                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                updateStatus(
                                  customer.id,
                                  "active"
                                );
                              }}
                              className="p-1.5 hover:bg-green-50 rounded-lg text-green-600"
                              title="Ativar"
                            >
                              <CheckCircle size={14} />
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>
                  );
                })}

                {filteredCustomers.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-10 text-sm text-[#A28776]"
                    >
                      Nenhum cliente encontrado.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =========================
            MODAL CLIENTE
        ========================= */}

        {selectedCustomer && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4C7B7]/20">

                <div>

                  <h2 className="text-lg font-bold text-[#56443F]">
                    Detalhes do Cliente
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    {selectedCustomer.email}
                  </p>

                </div>

                <button
                  onClick={closeDetails}
                  className="p-2 hover:bg-[#FAF9F5] rounded-lg"
                >
                  <X size={18} />
                </button>

              </div>

              {/* BODY */}

              <div className="p-6 space-y-5">

                {/* IDENTIFICAÇÃO */}

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-[#E4C7B7]/30 flex items-center justify-center text-lg font-bold text-[#8B645A]">
                    {selectedCustomer.avatar_initials}
                  </div>

                  <div>

                    <p className="text-base font-bold text-[#56443F]">
                      {selectedCustomer.full_name}
                    </p>

                    <span
                      className={`inline-flex px-2.5 py-1 mt-1 rounded-full text-xs font-semibold ${
                        statusConfig[selectedCustomer.status]?.className ||
                        statusConfig.inactive.className
                      }`}
                    >
                      {
                        statusConfig[selectedCustomer.status]?.label ||
                        "Inativo"
                      }
                    </span>

                  </div>

                </div>

                {/* RESUMO */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <div className="flex items-center gap-2 text-[#A28776] mb-1">

                      <ShoppingBag size={14} />

                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Pedidos
                      </span>

                    </div>

                    <p className="text-lg font-bold text-[#56443F]">
                      {selectedCustomer.total_orders}
                    </p>

                  </div>

                  <div className="bg-[#FAF9F5] rounded-lg p-4">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1">
                      Total Gasto
                    </p>

                    <p className="text-lg font-bold text-[#56443F]">
                      {formatBRL(selectedCustomer.total_spent)}
                    </p>

                  </div>

                </div>

                {/* DADOS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Nome
                    </label>

                    <input
                      value={form.full_name || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          full_name: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
                    />

                  </div>

                  <div>

                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Email
                    </label>

                    <input
                      value={form.email || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
                    />

                  </div>

                  <div>

                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      Telefone
                    </label>

                    <input
                      value={form.phone || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
                    />

                  </div>

                  <div>

                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                      CPF
                    </label>

                    <input
                      value={form.cpf || ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          cpf: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]"
                    />

                  </div>

                </div>

                {/* NOTAS */}

                <div>

                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Notas Internas
                  </label>

                  <textarea
                    value={form.notes || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Observações sobre o cliente..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A] resize-none"
                  />

                </div>

                {/* PEDIDOS */}

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-2">
                    Pedidos do Cliente
                  </p>

                  <div className="space-y-2 max-h-48 overflow-y-auto">

                    {selectedCustomer.orders?.map((order) => (

                      <div
                        key={order.id}
                        className="flex items-center justify-between bg-white border border-[#E4C7B7]/30 rounded-lg p-3"
                      >

                        <div>

                          <p className="text-sm font-semibold text-[#56443F]">
                            {order.order_number}
                          </p>

                          <p className="text-xs text-[#A28776]">
                            {formatDate(order.created_at)}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-sm font-bold">
                            {formatBRL(order.total)}
                          </p>

                          <span className="text-xs text-[#A28776]">
                            {order.status}
                          </span>

                        </div>

                      </div>

                    ))}

                    {(!selectedCustomer.orders ||
                      selectedCustomer.orders.length === 0) && (

                      <p className="text-xs text-[#A28776]">
                        Nenhum pedido.
                      </p>

                    )}

                  </div>

                </div>

                {/* AÇÕES */}

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E4C7B7]/20">

                  {selectedCustomer.status === "active" ? (

                    <button
                      onClick={() =>
                        updateStatus(
                          selectedCustomer.id,
                          "blocked"
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
                    >
                      <Ban size={14} />
                      Bloquear Cliente
                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        updateStatus(
                          selectedCustomer.id,
                          "active"
                        )
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-semibold hover:bg-green-100"
                    >
                      <CheckCircle size={14} />
                      Ativar Cliente
                    </button>

                  )}

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 text-sm font-semibold hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E4C7B7]/20">

                <button
                  onClick={closeDetails}
                  className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F] hover:bg-[#FAF9F5]"
                >
                  Fechar
                </button>

                <button
                  onClick={saveCustomer}
                  className="px-4 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047]"
                >
                  Salvar Alterações
                </button>

              </div>

            </div>

          </div>

        )}

        {/* =========================
            CONFIRMAÇÃO DE EXCLUSÃO
        ========================= */}

        {showDeleteModal && (

          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-xl w-full max-w-md p-6">

              <h2 className="text-lg font-bold text-[#56443F]">
                Excluir Cliente
              </h2>

              <p className="text-sm text-[#A28776] mt-2">
                Tem certeza que deseja excluir este cliente?
                Esta ação não pode ser desfeita.
              </p>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F]"
                >
                  Cancelar
                </button>

                <button
                  onClick={deleteCustomer}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
                >
                  Excluir
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}