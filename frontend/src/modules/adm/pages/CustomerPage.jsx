import { useState } from "react";
import {
  Eye,
  CheckCircle,
  X,
  Plus,
  Star,
  MapPin,
  CreditCard,
  Lock,
  ShoppingBag,
  Trash2,
  Pencil,
} from "lucide-react";

import { customersMock } from "../mocks/customersMock";
import AdminLayout from "../components/AdminLayout";

const statusConfig = {
  active: {
    label: "Ativo",
    className: "bg-green-100 text-green-700",
  },
  inactive: {
    label: "Inativo",
    className: "bg-gray-100 text-gray-600",
  },
};

const formatBRL = (value) =>
  Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const formatDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
};

/* =========================================================
   ENDEREÇO VAZIO
   Regra do RegisterPage:
   - começa com 1 endereço
   - máximo de 2
========================================================= */

const createEmptyAddress = () => ({
  id: `a-${Date.now()}-${Math.random()}`,
  name: "",
  type: "",
  residence_type: "",
  street_type: "",
  street: "",
  number: "",
  neighborhood: "",
  cep: "",
  city: "",
  state: "",
  country: "Brasil",
  notes: "",
});

/* =========================================================
   CARTÃO VAZIO
   Só será usado quando o usuário clicar em
   "Adicionar cartão".
========================================================= */

const createEmptyCard = () => ({
  id: `c-${Date.now()}-${Math.random()}`,
  number: "",
  name: "",
  brand: "",
  security_code: "",
  preferred: false,
});

/* =========================================================
   CLIENTE VAZIO
========================================================= */

const createEmptyCustomer = (customers) => ({
  code: `CLI-${String(customers.length + 1).padStart(4, "0")}`,
  gender: "",
  full_name: "",
  birth_date: "",
  cpf: "",
  phone: {
    type: "",
    ddd: "",
    number: "",
  },
  email: "",
  password: "",
  password_confirmation: "",
  status: "active",
  ranking: "",
  avatar_initials: "",

  // IMPORTANTE:
  // Novo cliente começa com 1 endereço vazio
  addresses: [createEmptyAddress()],

  // IMPORTANTE:
  // Novo cliente começa SEM cartão
  cards: [],

  transactions: [],
});

/* =========================================================
   CAMPOS
========================================================= */

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm text-[#56443F] outline-none focus:border-[#8B645A]";

const labelClass =
  "block text-xs font-semibold text-[#56443F] mb-1.5";

export default function CustomerPage() {
  const [customers, setCustomers] = useState(customersMock);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState("dados");

  /* =========================================================
     CONTROLE DO CARTÃO NO NOVO CLIENTE
  ========================================================= */

  const [addCard, setAddCard] = useState(false);

  /* =========================================================
     CONTROLE DE EDIÇÃO DE ENDEREÇO/CARTÃO
  ========================================================= */

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);

  /* =========================================================
     FILTROS
  ========================================================= */

  const [filters, setFilters] = useState({
    code: "",
    gender: "",
    name: "",
    birth_date: "",
    cpf: "",
    phone: "",
    email: "",
    status: "all",
  });

  const filteredCustomers = customers.filter((customer) => {
    const phone = `${customer.phone?.ddd || ""}${
      customer.phone?.number || ""
    }`;

    return (
      customer.code
        ?.toLowerCase()
        .includes(filters.code.toLowerCase()) &&

      customer.gender
        ?.toLowerCase()
        .includes(filters.gender.toLowerCase()) &&

      customer.full_name
        ?.toLowerCase()
        .includes(filters.name.toLowerCase()) &&

      // FILTRO É DATA DE NASCIMENTO
      customer.birth_date?.includes(filters.birth_date) &&

      customer.cpf
        ?.toLowerCase()
        .includes(filters.cpf.toLowerCase()) &&

      phone
        .toLowerCase()
        .includes(filters.phone.toLowerCase()) &&

      customer.email
        ?.toLowerCase()
        .includes(filters.email.toLowerCase()) &&

      (filters.status === "all" ||
        customer.status === filters.status)
    );
  });

  const updateFilter = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =========================================================
     ABRIR CLIENTE
  ========================================================= */

  const openDetails = (customer) => {
    setSelectedCustomer(customer);

    setForm({
      ...customer,
      phone: {
        ...(customer.phone || {}),
      },
      addresses: [...(customer.addresses || [])],
      cards: [...(customer.cards || [])],
    });

    setShowForm(false);
    setAddCard(false);
    setActiveSection("dados");

    setEditingAddressId(null);
    setEditingCardId(null);
  };

  /* =========================================================
     NOVO CLIENTE
  ========================================================= */

  const openNewCustomer = () => {
    const newCustomer = createEmptyCustomer(customers);

    setSelectedCustomer(null);
    setForm(newCustomer);

    // NÃO começa com cartão
    setAddCard(false);

    setShowForm(true);
    setActiveSection("dados");

    setEditingAddressId(newCustomer.addresses[0].id);
    setEditingCardId(null);
  };

  /* =========================================================
     FECHAR
  ========================================================= */

  const closeDetails = () => {
    setSelectedCustomer(null);
    setForm(null);
    setShowForm(false);

    setAddCard(false);
    setEditingAddressId(null);
    setEditingCardId(null);
  };

  /* =========================================================
     CAMPOS DO CLIENTE
  ========================================================= */

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updatePhone = (field, value) => {
    setForm((current) => ({
      ...current,
      phone: {
        ...current.phone,
        [field]: value,
      },
    }));
  };

  /* =========================================================
     ENDEREÇOS
  ========================================================= */

  const updateAddress = (id, field, value) => {
    setForm((current) => ({
      ...current,
      addresses: current.addresses.map((address) =>
        address.id === id
          ? {
              ...address,
              [field]: value,
            }
          : address
      ),
    }));
  };

  const addAddress = () => {
    if ((form.addresses || []).length >= 2) {
      alert("O cliente pode ter no máximo 2 endereços.");
      return;
    }

    const newAddress = createEmptyAddress();

    setForm((current) => ({
      ...current,
      addresses: [
        ...(current.addresses || []),
        newAddress,
      ],
    }));

    setEditingAddressId(newAddress.id);
  };

  const deleteAddress = (id) => {
    if ((form.addresses || []).length <= 1) {
      alert("O cliente precisa ter pelo menos 1 endereço.");
      return;
    }

    setForm((current) => ({
      ...current,
      addresses: current.addresses.filter(
        (address) => address.id !== id
      ),
    }));

    setEditingAddressId(null);
  };

  /* =========================================================
     CARTÕES
  ========================================================= */

  const addNewCard = () => {
    const newCard = createEmptyCard();

    setForm((current) => ({
      ...current,
      cards: [
        ...(current.cards || []),
        newCard,
      ],
    }));

    setEditingCardId(newCard.id);

    // Para novo cliente, passa a mostrar o cartão
    setAddCard(true);
  };

  const updateCard = (id, field, value) => {
    setForm((current) => ({
      ...current,
      cards: current.cards.map((card) =>
        card.id === id
          ? {
              ...card,
              [field]: value,
            }
          : field === "preferred" && value
          ? {
              ...card,
              preferred: false,
            }
          : card
      ),
    }));
  };

  const deleteCard = (id) => {
    setForm((current) => ({
      ...current,
      cards: current.cards.filter(
        (card) => card.id !== id
      ),
    }));

    setEditingCardId(null);

    if (showForm) {
      setAddCard(false);
    }
  };

  const handleAddCardCheckbox = (checked) => {
    setAddCard(checked);

    if (!checked) {
      // Ao desmarcar, não fica cartão vazio escondido.
      if (showForm) {
        setForm((current) => ({
          ...current,
          cards: [],
        }));
      }
    } else {
      // Só cria o cartão quando marcar.
      if (showForm && (!form.cards || form.cards.length === 0)) {
        addNewCard();
      }
    }
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const toggleStatus = () => {
    if (!selectedCustomer) return;

    const newStatus =
      selectedCustomer.status === "active"
        ? "inactive"
        : "active";

    const updated = {
      ...selectedCustomer,
      ...form,
      status: newStatus,
    };

    setCustomers((current) =>
      current.map((customer) =>
        customer.id === selectedCustomer.id
          ? updated
          : customer
      )
    );

    setSelectedCustomer(updated);
    setForm(updated);
  };

  /* =========================================================
     EXCLUIR CLIENTE
  ========================================================= */

  const deleteCustomer = () => {
    if (!selectedCustomer) return;

    const confirmed = window.confirm(
      `Deseja realmente excluir o cliente "${selectedCustomer.full_name}"?`
    );

    if (!confirmed) return;

    setCustomers((current) =>
      current.filter(
        (customer) =>
          customer.id !== selectedCustomer.id
      )
    );

    closeDetails();
  };

  /* =========================================================
     SALVAR CLIENTE
  ========================================================= */

  const saveCustomer = () => {
    if (!form) return;

    if (showForm) {
      const newCustomer = {
        ...form,
        id: String(Date.now()),
        avatar_initials: form.full_name
          ? form.full_name
              .trim()
              .split(" ")
              .filter(Boolean)
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()
          : "",
        addresses: form.addresses || [],
        cards: form.cards || [],
      };

      setCustomers((current) => [
        ...current,
        newCustomer,
      ]);

      setSelectedCustomer(newCustomer);
      setShowForm(false);
      setAddCard(false);
      setActiveSection("dados");
      setEditingAddressId(null);
      setEditingCardId(null);

      return;
    }

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
    setForm(updatedCustomer);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* ===================================================
            CABEÇALHO
        =================================================== */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-[#56443F]">
              Clientes
            </h1>

            <p className="text-sm text-[#A28776] mt-1">
              {customers.length} clientes cadastrados
            </p>
          </div>

          <button
            onClick={openNewCustomer}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047]"
          >
            <Plus size={16} />
            Novo Cliente
          </button>

        </div>

        {/* ===================================================
            FILTROS
        =================================================== */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/20 p-5">

          <p className="text-sm font-bold text-[#56443F] mb-4">
            Filtrar clientes
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            <input
              placeholder="Código"
              value={filters.code}
              onChange={(e) =>
                updateFilter("code", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Nome"
              value={filters.name}
              onChange={(e) =>
                updateFilter("name", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Gênero"
              value={filters.gender}
              onChange={(e) =>
                updateFilter("gender", e.target.value)
              }
              className={inputClass}
            />

            <div>
              <input
                type="date"
                value={filters.birth_date}
                onChange={(e) =>
                  updateFilter(
                    "birth_date",
                    e.target.value
                  )
                }
                className={inputClass}
              />

              <p className="text-[10px] text-[#A28776] mt-1">
                Data de nascimento
              </p>
            </div>

            <input
              placeholder="CPF"
              value={filters.cpf}
              onChange={(e) =>
                updateFilter("cpf", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="Telefone"
              value={filters.phone}
              onChange={(e) =>
                updateFilter("phone", e.target.value)
              }
              className={inputClass}
            />

            <input
              placeholder="E-mail"
              value={filters.email}
              onChange={(e) =>
                updateFilter("email", e.target.value)
              }
              className={inputClass}
            />

            <select
              value={filters.status}
              onChange={(e) =>
                updateFilter(
                  "status",
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="all">
                Todos os status
              </option>
              <option value="active">
                Ativos
              </option>
              <option value="inactive">
                Inativos
              </option>
            </select>

          </div>
        </div>

        {/* ===================================================
            TABELA
        =================================================== */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/20 overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-xs font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Cliente
                  </th>

                  <th className="text-left text-xs font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Código
                  </th>

                  <th className="text-left text-xs font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Ranking
                  </th>

                  <th className="text-left text-xs font-bold uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Ações
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => {

                  const status =
                    statusConfig[customer.status] ||
                    statusConfig.active;

                  return (
                    <tr
                      key={customer.id}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5]"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-[#E4C7B7]/30 flex items-center justify-center text-xs font-bold text-[#8B645A]">
                            {customer.avatar_initials}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-[#56443F]">
                              {customer.full_name}
                            </p>

                            <p className="text-sm text-[#A28776]">
                              {customer.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-sm text-[#56443F]">
                        {customer.code}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1 text-[#8B645A]">

                          <Star
                            size={15}
                            fill="currentColor"
                          />

                          <span className="text-sm font-semibold">
                            {customer.ranking || "-"}
                          </span>

                        </div>

                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-sm font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1">

                          <button
                            onClick={() =>
                              openDetails(customer)
                            }
                            className="p-1.5 hover:bg-[#E4C7B7]/20 rounded-lg text-[#56443F]"
                            title="Ver cliente"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedCustomer(
                                customer
                              );
                              setForm(customer);
                              deleteCustomer();
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"
                            title="Excluir cliente"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
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

        {/* ===================================================
            MODAL
        =================================================== */}

        {(selectedCustomer || showForm) && form && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4C7B7]/20">

                <div>

                  <h2 className="text-xl font-bold text-[#56443F]">
                    {showForm
                      ? "Novo Cliente"
                      : "Dados do Cliente"}
                  </h2>

                  <p className="text-sm text-[#A28776] mt-1">
                    {form.code}
                  </p>

                </div>

                <button
                  onClick={closeDetails}
                  className="p-2 hover:bg-[#FAF9F5] rounded-lg"
                >
                  <X size={18} />
                </button>

              </div>

              {/* MENU */}

              {!showForm && (
                <div className="flex gap-1 px-6 pt-4 border-b border-[#E4C7B7]/20 overflow-x-auto">

                  {[
                    ["dados", "Dados"],
                    ["enderecos", "Endereços"],
                    ["cartoes", "Cartões"],
                    ["senha", "Senha"],
                    ["transacoes", "Transações"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() =>
                        setActiveSection(value)
                      }
                      className={`px-3 py-2 text-sm font-semibold ${
                        activeSection === value
                          ? "text-[#56443F] border-b-2 border-[#8B645A]"
                          : "text-[#A28776]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}

                </div>
              )}

              {/* =================================================
                  BODY
              ================================================= */}

              <div className="p-6">

                {/* =================================================
                    DADOS
                ================================================= */}

                {activeSection === "dados" && (

                  <div className="space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label className={labelClass}>
                          Código
                        </label>

                        <input
                          value={form.code || ""}
                          onChange={(e) =>
                            updateField(
                              "code",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Gênero
                        </label>

                        <input
                          value={form.gender || ""}
                          onChange={(e) =>
                            updateField(
                              "gender",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Nome
                        </label>

                        <input
                          value={form.full_name || ""}
                          onChange={(e) =>
                            updateField(
                              "full_name",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Data de Nascimento
                        </label>

                        <input
                          type="date"
                          value={form.birth_date || ""}
                          onChange={(e) =>
                            updateField(
                              "birth_date",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          CPF
                        </label>

                        <input
                          value={form.cpf || ""}
                          onChange={(e) =>
                            updateField(
                              "cpf",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          E-mail
                        </label>

                        <input
                          value={form.email || ""}
                          onChange={(e) =>
                            updateField(
                              "email",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Tipo de Telefone
                        </label>

                        <input
                          value={
                            form.phone?.type || ""
                          }
                          onChange={(e) =>
                            updatePhone(
                              "type",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          DDD
                        </label>

                        <input
                          value={
                            form.phone?.ddd || ""
                          }
                          onChange={(e) =>
                            updatePhone(
                              "ddd",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Número
                        </label>

                        <input
                          value={
                            form.phone?.number || ""
                          }
                          onChange={(e) =>
                            updatePhone(
                              "number",
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />
                      </div>

                      {showForm && (
                        <>
                          <div>
                            <label className={labelClass}>
                              Senha
                            </label>

                            <input
                              type="password"
                              value={
                                form.password || ""
                              }
                              onChange={(e) =>
                                updateField(
                                  "password",
                                  e.target.value
                                )
                              }
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>
                              Confirmar Senha
                            </label>

                            <input
                              type="password"
                              value={
                                form.password_confirmation ||
                                ""
                              }
                              onChange={(e) =>
                                updateField(
                                  "password_confirmation",
                                  e.target.value
                                )
                              }
                              className={inputClass}
                            />
                          </div>
                        </>
                      )}

                    </div>

                    {/* =============================================
                        ENDEREÇO NO CADASTRO
                    ============================================= */}

                    {showForm && (
                      <div className="border-t border-[#E4C7B7]/20 pt-6">

                        <div className="flex items-center justify-between mb-4">

                          <div>
                            <h3 className="text-base font-bold text-[#56443F]">
                              Endereços
                            </h3>

                            <p className="text-xs text-[#A28776] mt-1">
                              Cadastre até 2 endereços.
                            </p>
                          </div>

                          {form.addresses.length < 2 && (
                            <button
                              type="button"
                              onClick={addAddress}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8B645A] text-white text-xs font-semibold"
                            >
                              <Plus size={14} />
                              Adicionar endereço
                            </button>
                          )}

                        </div>

                        <div className="space-y-4">

                          {form.addresses.map(
                            (address, index) => (

                              <div
                                key={address.id}
                                className="border border-[#E4C7B7]/30 rounded-xl p-4"
                              >

                                <div className="flex items-center justify-between mb-4">

                                  <h4 className="text-sm font-bold text-[#56443F]">
                                    Endereço {index + 1}
                                  </h4>

                                  {form.addresses.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteAddress(
                                          address.id
                                        )
                                      }
                                      className="flex items-center gap-1 text-xs text-red-500 font-semibold"
                                    >
                                      <Trash2 size={13} />
                                      Excluir
                                    </button>
                                  )}

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                  <div>
                                    <label className={labelClass}>
                                      Identificação
                                    </label>
                                    <input
                                      placeholder="Ex.: Casa"
                                      value={
                                        address.name ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Tipo
                                    </label>
                                    <input
                                      placeholder="Entrega / Cobrança"
                                      value={
                                        address.type ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "type",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Tipo Residencia
                                    </label>
                                    <input
                                      value={
                                        address.residence_type ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "residence_type",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Tipo de logradouro
                                    </label>
                                    <input
                                      value={
                                        address.street_type ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "street_type",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Logradouro
                                    </label>
                                    <input
                                      value={
                                        address.street ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "street",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Número
                                    </label>
                                    <input
                                      value={
                                        address.number ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "number",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Bairro
                                    </label>
                                    <input
                                      value={
                                        address.neighborhood ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "neighborhood",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      CEP
                                    </label>
                                    <input
                                      value={
                                        address.cep || ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "cep",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Cidade
                                    </label>
                                    <input
                                      value={
                                        address.city ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "city",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Estado
                                    </label>
                                    <input
                                      value={
                                        address.state ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "state",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      País
                                    </label>
                                    <input
                                      value={
                                        address.country ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "country",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                  <div>
                                    <label className={labelClass}>
                                      Observações
                                    </label>
                                    <input
                                      value={
                                        address.notes ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        updateAddress(
                                          address.id,
                                          "notes",
                                          e.target.value
                                        )
                                      }
                                      className={inputClass}
                                    />
                                  </div>

                                </div>

                              </div>
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {/* =============================================
                        CARTÃO NO CADASTRO
                    ============================================= */}

                    {showForm && (
                      <div className="border-t border-[#E4C7B7]/20 pt-6">

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <CreditCard
                              size={17}
                              className="text-[#8B645A]"
                            />

                            <div>
                              <h3 className="text-base font-bold text-[#56443F]">
                                Cartão
                              </h3>

                            </div>

                          </div>

                          <label className="flex items-center gap-2 cursor-pointer">

                            <input
                              type="checkbox"
                              checked={addCard}
                              onChange={(e) =>
                                handleAddCardCheckbox(
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 accent-[#8B645A]"
                            />

                            <span className="text-xs font-semibold text-[#56443F]">
                              Adicionar cartão
                            </span>

                          </label>

                        </div>

                        {/* Só aparece se marcar */}
                        {addCard &&
                          form.cards?.map((card) => (
                            <div
                              key={card.id}
                              className="mt-5 border-t border-[#E4C7B7]/20 pt-5"
                            >

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>
                                  <label className={labelClass}>
                                    Número
                                  </label>

                                  <input
                                    value={
                                      card.number || ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "number",
                                        e.target.value
                                      )
                                    }
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>
                                    Nome
                                  </label>

                                  <input
                                    value={
                                      card.name || ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>
                                    Bandeira
                                  </label>

                                  <input
                                    value={
                                      card.brand || ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "brand",
                                        e.target.value
                                      )
                                    }
                                    className={inputClass}
                                  />
                                </div>

                                <div>
                                  <label className={labelClass}>
                                    CVV
                                  </label>

                                  <input
                                    value={
                                      card.security_code ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "security_code",
                                        e.target.value
                                      )
                                    }
                                    className={inputClass}
                                  />
                                </div>

                              </div>

                              <div className="flex items-center justify-between mt-4">

                                <label className="flex items-center gap-2 text-xs font-semibold text-[#56443F]">
                                  <input
                                    type="checkbox"
                                    checked={
                                      card.preferred ||
                                      false
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "preferred",
                                        e.target.checked
                                      )
                                    }
                                    className="accent-[#8B645A]"
                                  />

                                  Cartão preferencial
                                </label>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteCard(
                                      card.id
                                    )
                                  }
                                  className="flex items-center gap-1 text-xs text-red-500 font-semibold"
                                >
                                  <Trash2 size={13} />
                                  Excluir cartão
                                </button>

                              </div>

                            </div>
                          ))}

                      </div>
                    )}

                    {/* STATUS */}

                    {!showForm && (
                      <div className="pt-5 border-t border-[#E4C7B7]/20">

                        <button
                          onClick={toggleStatus}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                            selectedCustomer.status ===
                            "active"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          <CheckCircle size={15} />

                          {selectedCustomer.status ===
                          "active"
                            ? "Inativar Cliente"
                            : "Ativar Cliente"}
                        </button>

                      </div>
                    )}

                  </div>
                )}

                {/* =================================================
                    ENDEREÇOS
                ================================================= */}

                {activeSection === "enderecos" && (

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">

                      <div>
                        <h3 className="text-base font-bold text-[#56443F]">
                          Endereços
                        </h3>

                        <p className="text-sm text-[#A28776]">
                          Endereços de entrega ou cobrança
                        </p>
                      </div>

                      {form.addresses.length < 2 && (
                        <button
                          onClick={addAddress}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold"
                        >
                          <Plus size={15} />
                          Adicionar
                        </button>
                      )}

                    </div>

                    {form.addresses?.map((address) => {

                      const isEditing =
                        editingAddressId ===
                        address.id;

                      return (
                        <div
                          key={address.id}
                          className="border border-[#E4C7B7]/30 rounded-lg p-4"
                        >

                          {!isEditing ? (
                            <>
                              <div className="flex justify-between">

                                <div className="flex gap-3">

                                  <MapPin
                                    size={18}
                                    className="text-[#8B645A]"
                                  />

                                  <div>

                                    <p className="text-sm font-semibold text-[#56443F]">
                                      {address.name ||
                                        "Endereço"}
                                    </p>

                                    <p className="text-sm text-[#A28776]">
                                      {address.type ||
                                        "Não informado"}
                                    </p>

                                  </div>

                                </div>

                                <div className="flex gap-3">

                                  <button
                                    onClick={() =>
                                      setEditingAddressId(
                                        address.id
                                      )
                                    }
                                    className="flex items-center gap-1 text-sm text-[#8B645A] font-semibold"
                                  >
                                    <Pencil size={14} />
                                    Editar
                                  </button>

                                  <button
                                    onClick={() =>
                                      deleteAddress(
                                        address.id
                                      )
                                    }
                                    className="flex items-center gap-1 text-sm text-red-500 font-semibold"
                                  >
                                    <Trash2 size={14} />
                                    Excluir
                                  </button>

                                </div>

                              </div>

                              <p className="text-sm text-[#56443F] mt-3">
                                {address.street_type}{" "}
                                {address.street},{" "}
                                {address.number}
                              </p>

                              <p className="text-sm text-[#A28776] mt-1">
                                {address.neighborhood} ·{" "}
                                {address.cep} ·{" "}
                                {address.city} -{" "}
                                {address.state} ·{" "}
                                {address.country}
                              </p>

                              {address.notes && (
                                <p className="text-sm text-[#A28776] mt-2">
                                  {address.notes}
                                </p>
                              )}
                            </>
                          ) : (

                            <div className="space-y-4">

                              <div className="flex justify-between">

                                <h4 className="text-sm font-bold text-[#56443F]">
                                  Editar endereço
                                </h4>

                                <button
                                  onClick={() =>
                                    setEditingAddressId(
                                      null
                                    )
                                  }
                                  className="text-xs text-[#A28776]"
                                >
                                  Concluir
                                </button>

                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {[
                                  ["name", "Identificação"],
                                  ["type", "Tipo"],
                                  [
                                    "residence_type",
                                    "Tipo de residência",
                                  ],
                                  [
                                    "street_type",
                                    "Tipo de logradouro",
                                  ],
                                  ["street", "Logradouro"],
                                  ["number", "Número"],
                                  [
                                    "neighborhood",
                                    "Bairro",
                                  ],
                                  ["cep", "CEP"],
                                  ["city", "Cidade"],
                                  ["state", "Estado"],
                                  ["country", "País"],
                                  ["notes", "Observações"],
                                ].map(
                                  ([field, label]) => (
                                    <div key={field}>

                                      <label
                                        className={
                                          labelClass
                                        }
                                      >
                                        {label}
                                      </label>

                                      <input
                                        value={
                                          address[
                                            field
                                          ] || ""
                                        }
                                        onChange={(e) =>
                                          updateAddress(
                                            address.id,
                                            field,
                                            e.target
                                              .value
                                          )
                                        }
                                        className={
                                          inputClass
                                        }
                                      />

                                    </div>
                                  )
                                )}

                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })}

                    {(!form.addresses ||
                      form.addresses.length === 0) && (
                      <p className="text-sm text-[#A28776] py-6 text-center">
                        Nenhum endereço cadastrado.
                      </p>
                    )}

                  </div>
                )}

                {/* =================================================
                    CARTÕES
                ================================================= */}

                {activeSection === "cartoes" && (

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">

                      <div>
                        <h3 className="text-base font-bold text-[#56443F]">
                          Cartões de Crédito
                        </h3>

                        <p className="text-sm text-[#A28776]">
                          Cartões associados ao cliente
                        </p>
                      </div>

                      <button
                        onClick={addNewCard}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold"
                      >
                        <Plus size={15} />
                        Adicionar
                      </button>

                    </div>

                    {form.cards?.map((card) => {

                      const isEditing =
                        editingCardId === card.id;

                      return (
                        <div
                          key={card.id}
                          className="border border-[#E4C7B7]/30 rounded-lg p-4"
                        >

                          {!isEditing ? (
                            <>
                              <div className="flex justify-between">

                                <div className="flex items-center gap-3">

                                  <CreditCard
                                    size={18}
                                    className="text-[#8B645A]"
                                  />

                                  <div>

                                    <p className="text-sm font-semibold text-[#56443F]">
                                      {card.number ||
                                        "Cartão sem número"}
                                    </p>

                                    <p className="text-sm text-[#A28776]">
                                      {card.brand ||
                                        "Bandeira não informada"}{" "}
                                      ·{" "}
                                      {card.name ||
                                        "Nome não informado"}
                                    </p>

                                  </div>

                                </div>

                                {card.preferred && (
                                  <span className="flex items-center gap-1 text-sm font-semibold text-[#8B645A]">
                                    <Star
                                      size={14}
                                      fill="currentColor"
                                    />
                                    Preferencial
                                  </span>
                                )}

                              </div>

                              <div className="flex justify-end gap-4 mt-3">

                                <button
                                  onClick={() =>
                                    setEditingCardId(
                                      card.id
                                    )
                                  }
                                  className="flex items-center gap-1 text-sm text-[#8B645A] font-semibold"
                                >
                                  <Pencil size={14} />
                                  Editar
                                </button>

                                <button
                                  onClick={() =>
                                    deleteCard(
                                      card.id
                                    )
                                  }
                                  className="flex items-center gap-1 text-sm text-red-500 font-semibold"
                                >
                                  <Trash2 size={14} />
                                  Excluir
                                </button>

                              </div>
                            </>
                          ) : (

                            <div className="space-y-4">

                              <div className="flex justify-between">

                                <h4 className="text-sm font-bold text-[#56443F]">
                                  Editar cartão
                                </h4>

                                <button
                                  onClick={() =>
                                    setEditingCardId(
                                      null
                                    )
                                  }
                                  className="text-xs text-[#A28776]"
                                >
                                  Concluir
                                </button>

                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>
                                  <label
                                    className={
                                      labelClass
                                    }
                                  >
                                    Número do cartão
                                  </label>

                                  <input
                                    value={
                                      card.number ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "number",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      inputClass
                                    }
                                  />
                                </div>

                                <div>
                                  <label
                                    className={
                                      labelClass
                                    }
                                  >
                                    Nome no cartão
                                  </label>

                                  <input
                                    value={
                                      card.name || ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      inputClass
                                    }
                                  />
                                </div>

                                <div>
                                  <label
                                    className={
                                      labelClass
                                    }
                                  >
                                    Bandeira
                                  </label>

                                  <input
                                    value={
                                      card.brand ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "brand",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      inputClass
                                    }
                                  />
                                </div>

                                <div>
                                  <label
                                    className={
                                      labelClass
                                    }
                                  >
                                    CVV
                                  </label>

                                  <input
                                    value={
                                      card.security_code ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "security_code",
                                        e.target.value
                                      )
                                    }
                                    className={
                                      inputClass
                                    }
                                  />
                                </div>

                              </div>

                              <div className="flex justify-between items-center">

                                <label className="flex items-center gap-2 text-xs font-semibold text-[#56443F]">

                                  <input
                                    type="checkbox"
                                    checked={
                                      card.preferred ||
                                      false
                                    }
                                    onChange={(e) =>
                                      updateCard(
                                        card.id,
                                        "preferred",
                                        e.target
                                          .checked
                                      )
                                    }
                                    className="accent-[#8B645A]"
                                  />

                                  Cartão preferencial

                                </label>

                                <button
                                  onClick={() =>
                                    deleteCard(
                                      card.id
                                    )
                                  }
                                  className="flex items-center gap-1 text-xs text-red-500 font-semibold"
                                >
                                  <Trash2 size={13} />
                                  Excluir cartão
                                </button>

                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })}

                    {(!form.cards ||
                      form.cards.length === 0) && (

                      <div className="border border-dashed border-[#E4C7B7] rounded-lg py-10 text-center">

                        <CreditCard
                          size={24}
                          className="mx-auto text-[#A28776] mb-2"
                        />

                        <p className="text-sm text-[#A28776]">
                          Nenhum cartão cadastrado.
                        </p>

                      </div>
                    )}

                  </div>
                )}

                {/* =================================================
                    SENHA
                ================================================= */}

                {activeSection === "senha" && (

                  <div className="space-y-5">

                    <div className="flex items-center gap-3">

                      <div className="p-3 rounded-lg bg-[#FAF9F5]">

                        <Lock
                          size={20}
                          className="text-[#8B645A]"
                        />

                      </div>

                      <div>

                        <h3 className="text-base font-bold text-[#56443F]">
                          Alterar senha
                        </h3>

                        <p className="text-sm text-[#A28776]">
                          Altere somente a senha do cliente.
                        </p>

                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label className={labelClass}>
                          Nova senha
                        </label>

                        <input
                          type="password"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Confirmar nova senha
                        </label>

                        <input
                          type="password"
                          className={inputClass}
                        />
                      </div>

                    </div>

                    <button className="px-4 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold">
                      Alterar Senha
                    </button>

                  </div>
                )}

                {/* =================================================
                    TRANSAÇÕES
                ================================================= */}

                {activeSection === "transacoes" && (

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">

                      <ShoppingBag
                        size={19}
                        className="text-[#8B645A]"
                      />

                      <div>

                        <h3 className="text-base font-bold text-[#56443F]">
                          Transações
                        </h3>

                        <p className="text-sm text-[#A28776]">
                          Histórico de transações do cliente
                        </p>

                      </div>

                    </div>

                    {form.transactions?.map(
                      (transaction) => (

                        <div
                          key={transaction.id}
                          className="flex items-center justify-between border border-[#E4C7B7]/30 rounded-lg p-4"
                        >

                          <div>

                            <p className="text-sm font-semibold text-[#56443F]">
                              {transaction.order_number}
                            </p>

                            <p className="text-sm text-[#A28776]">
                              {formatDate(
                                transaction.date
                              )}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-sm font-bold text-[#56443F]">
                              {formatBRL(
                                transaction.total
                              )}
                            </p>

                            <p className="text-sm text-[#A28776]">
                              {transaction.status}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                    {(!form.transactions ||
                      form.transactions.length === 0) && (

                      <p className="text-sm text-[#A28776] py-6 text-center">
                        Nenhuma transação encontrada.
                      </p>
                    )}

                  </div>
                )}

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="flex items-center justify-between px-6 py-4 border-t border-[#E4C7B7]/20">

                {!showForm ? (
                  <button
                    onClick={deleteCustomer}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Excluir Cliente
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex justify-end gap-3">

                  <button
                    onClick={closeDetails}
                    className="px-4 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm font-semibold text-[#56443F]"
                  >
                    Fechar
                  </button>

                  <button
                    onClick={saveCustomer}
                    className="px-4 py-2 rounded-lg bg-[#8B645A] text-white text-sm font-semibold hover:bg-[#705047]"
                  >
                    {showForm
                      ? "Cadastrar Cliente"
                      : "Salvar Alterações"}
                  </button>

                </div>

              </div>

            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}