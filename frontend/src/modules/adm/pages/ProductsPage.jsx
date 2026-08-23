import { useState } from "react";
import {
  Plus,
  Pencil,
  Power,
  Search,
  X,
  Boxes,
} from "lucide-react";

import { productsMock } from "../mocks/productsMock";
import AdminLayout from "../components/AdminLayout";

const pricingGroups = [
  { id: "padrao", name: "Padrão", margin: 30 },
  { id: "premium", name: "Premium", margin: 40 },
  { id: "luxo", name: "Luxo", margin: 50 },
];

const inactivityCategories = [
  "Produto descontinuado",
  "Baixa procura",
  "Fora de catálogo",
  "Outro",
];

const createCode = (products) =>
  `JAS-${String(products.length + 1).padStart(4, "0")}`;

const fmtBRL = (value) =>
  Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const initialForm = {
  name: "",
  subtitle: "",
  collection: "",
  aroma: "",
  familia_olfativa: "",
  size: "",
  weight: "",
  color: "",
  recipiente: "",
  cera: "",
  image: "",
  description: "",

  cost: "",
  pricing_group: "padrao",
  price: "",

  stock: 0,
  low_stock_threshold: 5,

  is_active: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState(productsMock);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    collection: "",
    aroma: "",
    familia_olfativa: "",
    size: "",
    weight: "",
    color: "",
    recipiente: "",
    cera: "",
    status: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(initialForm);

  const [stockProduct, setStockProduct] = useState(null);
  const [stockEntry, setStockEntry] = useState("");

  const [inactiveProduct, setInactiveProduct] = useState(null);
  const [inactiveCategory, setInactiveCategory] = useState("");
  const [inactiveReason, setInactiveReason] = useState("");

  const [priceAuthorization, setPriceAuthorization] =
    useState(false);

  const filteredProducts = products.filter((product) => {
    const text = search.toLowerCase();

    const searchMatch =
      product.name?.toLowerCase().includes(text) ||
      product.sku?.toLowerCase().includes(text);

    const filtersMatch =
      (!filters.collection ||
        product.collection === filters.collection) &&
      (!filters.aroma || product.aroma === filters.aroma) &&
      (!filters.familia_olfativa ||
        product.familia_olfativa === filters.familia_olfativa) &&
      (!filters.size || product.size === filters.size) &&
      (!filters.weight || product.weight === filters.weight) &&
      (!filters.color || product.color === filters.color) &&
      (!filters.recipiente ||
        product.recipiente === filters.recipiente) &&
      (!filters.cera || product.cera === filters.cera) &&
      (!filters.status ||
        (filters.status === "active" && product.is_active) ||
        (filters.status === "inactive" && !product.is_active));

    return searchMatch && filtersMatch;
  });

  function openCreate() {
    setEditingProduct(null);
    setForm({
      ...initialForm,
      sku: createCode(products),
    });
    setModalOpen(true);
  }

  function openEdit(product) {
    setEditingProduct(product);
    setForm({
      ...initialForm,
      ...product,
    });
    setPriceAuthorization(false);
    setModalOpen(true);
  }

  function change(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const selectedGroup = pricingGroups.find(
    (group) => group.id === form.pricing_group
  );

  const calculatedPrice =
    Number(form.cost || 0) *
    (1 + (selectedGroup?.margin || 0) / 100);

  const minimumPrice = calculatedPrice;

  function saveProduct() {
    const productData = {
      ...form,
      price: calculatedPrice,
      cost: Number(form.cost),
      stock: Number(form.stock),
      low_stock_threshold: Number(
        form.low_stock_threshold
      ),
    };

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...productData,
              }
            : product
        )
      );
    } else {
      setProducts((current) => [
        ...current,
        {
          ...productData,
          id: Date.now(),
          sku: createCode(current),
          rating: 0,
          reviews_count: 0,
        },
      ]);
    }

    setModalOpen(false);
  }

  function updatePrice(value) {
    const newPrice = Number(value);

    if (newPrice < minimumPrice) {
      setPriceAuthorization(true);
    } else {
      setPriceAuthorization(false);
    }

    change("price", value);
  }

  function savePrice() {
    if (
      Number(form.price) < minimumPrice &&
      !priceAuthorization
    ) {
      return;
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              price: Number(form.price),
            }
          : product
      )
    );

    setModalOpen(false);
  }

  function saveStock() {
    const quantity = Number(stockEntry);

    setProducts((current) =>
      current.map((product) =>
        product.id === stockProduct.id
          ? {
              ...product,
              stock: product.stock + quantity,
            }
          : product
      )
    );

    setStockProduct(null);
    setStockEntry("");
  }

  function openInactivation(product) {
    setInactiveProduct(product);
    setInactiveCategory("");
    setInactiveReason("");
  }

  function confirmInactivation() {
    setProducts((current) =>
      current.map((product) =>
        product.id === inactiveProduct.id
          ? {
              ...product,
              is_active: false,
              inactivity_category: inactiveCategory,
              inactivity_reason: inactiveReason,
            }
          : product
      )
    );

    setInactiveProduct(null);
  }

  function activateProduct(product) {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id
          ? {
              ...item,
              is_active: true,
            }
          : item
      )
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* CABEÇALHO */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#56443F]">
              Produtos
            </h1>

            <p className="text-xs text-[#A28776] mt-1">
              {products.length} produtos cadastrados
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#56443F] text-white text-sm font-semibold hover:bg-[#8B645A]"
          >
            <Plus size={16} />
            Novo Produto
          </button>
        </div>

        {/* FILTROS */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 p-4 space-y-3">

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A28776]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou código..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 text-sm outline-none focus:border-[#8B645A]"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

            {[
              ["collection", "Coleção"],
              ["aroma", "Aroma"],
              ["familia_olfativa", "Família olfativa"],
              ["size", "Tamanho"],
              ["weight", "Peso"],
              ["color", "Cor"],
              ["recipiente", "Recipiente"],
              ["cera", "Cera"],
            ].map(([field, label]) => (
              <input
                key={field}
                value={filters[field]}
                onChange={(e) =>
                  setFilters((current) => ({
                    ...current,
                    [field]: e.target.value,
                  }))
                }
                placeholder={label}
                className="px-3 py-2 rounded-lg border border-[#E4C7B7]/40 text-xs outline-none focus:border-[#8B645A]"
              />
            ))}

          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((current) => ({
                ...current,
                status: e.target.value,
              }))
            }
            className="px-3 py-2 rounded-lg border border-[#E4C7B7]/40 text-xs"
          >
            <option value="">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>

        </div>

        {/* TABELA */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#E4C7B7]/20">

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Produto
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Código
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Custo
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Venda
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Estoque
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    Ações
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5]"
                  >

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-[#E4C7B7]/20 overflow-hidden">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <p className="font-semibold text-sm text-[#56443F]">
                          {product.name}
                        </p>

                      </div>
                    </td>

                    <td className="px-5 py-4 text-xs text-[#A28776]">
                      {product.sku}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {fmtBRL(product.cost)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold">
                      {fmtBRL(product.price)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold">
                      {product.stock}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          product.is_active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.is_active
                          ? "Ativo"
                          : "Inativo"}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1">

                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20"
                          title="Editar"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => {
                            setStockProduct(product);
                            setStockEntry("");
                          }}
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20"
                          title="Entrada de estoque"
                        >
                          <Boxes size={14} />
                        </button>

                        {product.is_active ? (
                          <button
                            onClick={() =>
                              openInactivation(product)
                            }
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                            title="Inativar"
                          >
                            <Power size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              activateProduct(product)
                            }
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600"
                            title="Ativar"
                          >
                            <Power size={14} />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-sm text-[#A28776]">
              Nenhum produto encontrado.
            </div>
          )}

        </div>

        {/* MODAL PRODUTO */}

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
              className="absolute inset-0 bg-[#56443F]/40"
              onClick={() => setModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between px-6 py-4 border-b">

                <div>
                  <h2 className="font-bold text-[#56443F]">
                    {editingProduct
                      ? "Editar Produto"
                      : "Novo Produto"}
                  </h2>

                  <p className="text-xs text-[#A28776] mt-1">
                    Código: {form.sku}
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#E4C7B7]/20"
                >
                  <X size={18} />
                </button>

              </div>

              <div className="p-6 space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <Field
                    label="Nome"
                    value={form.name}
                    onChange={(value) =>
                      change("name", value)
                    }
                  />

                  <Field
                    label="Subtítulo"
                    value={form.subtitle}
                    onChange={(value) =>
                      change("subtitle", value)
                    }
                  />

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                  <Field
                    label="Coleção"
                    value={form.collection}
                    onChange={(value) =>
                      change("collection", value)
                    }
                  />

                  <Field
                    label="Aroma"
                    value={form.aroma}
                    onChange={(value) =>
                      change("aroma", value)
                    }
                  />

                  <Field
                    label="Família olfativa"
                    value={form.familia_olfativa}
                    onChange={(value) =>
                      change(
                        "familia_olfativa",
                        value
                      )
                    }
                  />

                  <Field
                    label="Tamanho"
                    value={form.size}
                    onChange={(value) =>
                      change("size", value)
                    }
                  />

                  <Field
                    label="Peso"
                    value={form.weight}
                    onChange={(value) =>
                      change("weight", value)
                    }
                  />

                  <Field
                    label="Cor"
                    value={form.color}
                    onChange={(value) =>
                      change("color", value)
                    }
                  />

                  <Field
                    label="Recipiente"
                    value={form.recipiente}
                    onChange={(value) =>
                      change("recipiente", value)
                    }
                  />

                  <Field
                    label="Cera"
                    value={form.cera}
                    onChange={(value) =>
                      change("cera", value)
                    }
                  />

                </div>

                {/* PRECIFICAÇÃO */}

                <div className="border-t pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#A28776] mb-3">
                    Precificação
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Field
                      label="Custo de compra"
                      type="number"
                      value={form.cost}
                      onChange={(value) =>
                        change("cost", value)
                      }
                    />

                    <label>
                      <span className="block text-xs font-semibold text-[#56443F] mb-1.5">
                        Grupo de precificação
                      </span>

                      <select
                        value={form.pricing_group}
                        onChange={(e) =>
                          change(
                            "pricing_group",
                            e.target.value
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 text-sm"
                      >
                        {pricingGroups.map((group) => (
                          <option
                            key={group.id}
                            value={group.id}
                          >
                            {group.name} — {group.margin}%
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="px-3.5 py-2.5 rounded-lg bg-[#FAF9F5] border border-[#E4C7B7]/30">

                      <span className="block text-xs text-[#A28776]">
                        Preço calculado
                      </span>

                      <strong className="text-[#56443F]">
                        {fmtBRL(calculatedPrice)}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* ESTOQUE */}

                <div className="border-t pt-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-[#A28776] mb-3">
                    Estoque
                  </p>

                  <div className="grid grid-cols-2 gap-4">

                    <Field
                      label="Quantidade"
                      type="number"
                      value={form.stock}
                      onChange={(value) =>
                        change("stock", value)
                      }
                    />

                    <Field
                      label="Estoque mínimo"
                      type="number"
                      value={form.low_stock_threshold}
                      onChange={(value) =>
                        change(
                          "low_stock_threshold",
                          value
                        )
                      }
                    />

                  </div>

                </div>

                {/* PREÇO MANUAL */}

                {editingProduct && (
                  <div className="border-t pt-5">

                    <p className="text-xs font-bold uppercase tracking-wider text-[#A28776] mb-3">
                      Alteração de preço
                    </p>

                    <Field
                      label="Novo preço"
                      type="number"
                      value={form.price}
                      onChange={updatePrice}
                    />

                    {priceAuthorization && (
                      <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">

                        Preço abaixo da margem mínima de{" "}
                        {fmtBRL(minimumPrice)}.
                        <br />

                        Autorização do gerente de vendas
                        necessária.

                        <label className="flex items-center gap-2 mt-2 font-semibold">
                          <input
                            type="checkbox"
                            checked={
                              priceAuthorization
                            }
                            onChange={(e) =>
                              setPriceAuthorization(
                                e.target.checked
                              )
                            }
                          />
                          Autorização concedida
                        </label>

                      </div>
                    )}

                  </div>
                )}

                <Field
                  label="URL da imagem"
                  value={form.image}
                  onChange={(value) =>
                    change("image", value)
                  }
                />

              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t bg-[#FAF9F5]">

                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E4C7B7]/30"
                >
                  Cancelar
                </button>

                <button
                  onClick={
                    editingProduct &&
                    priceAuthorization
                      ? savePrice
                      : saveProduct
                  }
                  className="px-4 py-2.5 rounded-lg bg-[#56443F] text-white text-sm font-semibold hover:bg-[#8B645A]"
                >
                  Salvar
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ENTRADA DE ESTOQUE */}

        {stockProduct && (
          <SimpleModal
            title="Entrada de estoque"
            onClose={() => setStockProduct(null)}
          >

            <p className="text-sm font-semibold text-[#56443F]">
              {stockProduct.name}
            </p>

            <p className="text-xs text-[#A28776] mb-4">
              Estoque atual: {stockProduct.stock}
            </p>

            <Field
              label="Quantidade recebida"
              type="number"
              value={stockEntry}
              onChange={setStockEntry}
            />

            <ModalButtons
              onCancel={() => setStockProduct(null)}
              onSave={saveStock}
              label="Registrar entrada"
            />

          </SimpleModal>
        )}

        {/* INATIVAÇÃO */}

        {inactiveProduct && (
          <SimpleModal
            title="Inativar produto"
            onClose={() => setInactiveProduct(null)}
          >

            <label>
              <span className="block text-xs font-semibold mb-1.5">
                Categoria de inativação
              </span>

              <select
                value={inactiveCategory}
                onChange={(e) =>
                  setInactiveCategory(e.target.value)
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 text-sm"
              >
                <option value="">
                  Selecione
                </option>

                {inactivityCategories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </label>

            <div className="mt-4">
              <Field
                label="Justificativa"
                value={inactiveReason}
                onChange={setInactiveReason}
              />
            </div>

            <ModalButtons
              onCancel={() => setInactiveProduct(null)}
              onSave={confirmInactivation}
              label="Confirmar inativação"
            />

          </SimpleModal>
        )}

      </div>
    </AdminLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#56443F] mb-1.5">
        {label}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm outline-none focus:border-[#8B645A]"
      />
    </label>
  );
}

function SimpleModal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-[#56443F]/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h2 className="font-bold text-[#56443F]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#E4C7B7]/20"
          >
            <X size={18} />
          </button>

        </div>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

function ModalButtons({
  onCancel,
  onSave,
  label,
}) {
  return (
    <div className="flex justify-end gap-3 mt-5">

      <button
        onClick={onCancel}
        className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E4C7B7]/30"
      >
        Cancelar
      </button>

      <button
        onClick={onSave}
        className="px-4 py-2.5 rounded-lg bg-[#56443F] text-white text-sm font-semibold hover:bg-[#8B645A]"
      >
        {label}
      </button>

    </div>
  );
}