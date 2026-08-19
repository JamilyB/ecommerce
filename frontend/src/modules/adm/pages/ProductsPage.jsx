import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Power,
  Star,
  Search,
  X,
} from "lucide-react";

import { productsMock } from "../mocks/productsMock";
import AdminLayout from "../components/AdminLayout";

const collections = [
  "relaxar",
  "cafe",
  "natureza",
  "floral",
  "gourmet",
  "luxo",
];

const initialForm = {
  name: "",
  subtitle: "",
  price: "",
  image: "",
  collection: "",
  aroma: "",
  familia_olfativa: "",
  size: "",
  weight: "",
  dimensions: "",
  burn_time: "",
  color: "",
  recipiente: "",
  cera: "",
  description: "",
  details: "",
  notes_top: "",
  notes_heart: "",
  notes_base: "",
  sku: "",
  stock: 0,
  low_stock_threshold: 5,
  is_active: true,
  is_featured: false,
};

export default function ProductsPage() {
  const [products, setProducts] = useState(productsMock);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(initialForm);

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && product.is_active) ||
      (statusFilter === "inactive" && !product.is_active) ||
      (statusFilter === "featured" && product.is_featured);

    return searchMatch && statusMatch;
  });

  function openCreate() {
    setEditingProduct(null);
    setForm(initialForm);
    setModalOpen(true);
  }

  function openEdit(product) {
    setEditingProduct(product);
    setForm({ ...product });
    setModalOpen(true);
  }

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function saveProduct() {
    if (!form.name || !form.price) {
      alert("Preencha nome e preço.");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : product
        )
      );
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        price: Number(form.price),
        stock: Number(form.stock),
        rating: 0,
        reviews_count: 0,
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    setModalOpen(false);
  }

  function toggleProduct(product) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, is_active: !item.is_active }
          : item
      )
    );
  }

  function deleteProduct(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmed) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
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
              {products.length} produtos no catálogo
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

        <div className="flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A28776]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou SKU..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm outline-none focus:border-[#8B645A]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm"
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="featured">Destaque</option>
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
                    Preço
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Estoque
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Avaliação
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

                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : null}

                        </div>

                        <div>
                          <p className="font-semibold text-[#56443F]">
                            {product.name}
                          </p>

                          <p className="text-xs text-[#A28776]">
                            {product.sku}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4 font-semibold">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={
                          product.stock <= product.low_stock_threshold
                            ? "font-semibold text-red-600"
                            : "font-semibold"
                        }
                      >
                        {product.stock}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1 text-xs">

                        <Star
                          size={12}
                          className="text-amber-500 fill-amber-500"
                        />

                        {product.rating.toFixed(1)}

                        <span className="text-[#A28776]">
                          ({product.reviews_count})
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          product.is_active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.is_active ? "Ativo" : "Inativo"}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1">

                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => toggleProduct(product)}
                          className="p-1.5 rounded-lg hover:bg-[#E4C7B7]/20"
                        >
                          <Power size={14} />
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>

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

        {/* MODAL */}

        {modalOpen && (

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
              className="absolute inset-0 bg-[#56443F]/40 backdrop-blur-sm"
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
                    Preencha as informações do produto
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
                      handleChange("name", value)
                    }
                  />

                  <Field
                    label="Subtítulo"
                    value={form.subtitle}
                    onChange={(value) =>
                      handleChange("subtitle", value)
                    }
                  />

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  <Field
                    label="Preço"
                    type="number"
                    value={form.price}
                    onChange={(value) =>
                      handleChange("price", value)
                    }
                  />

                  <Field
                    label="Estoque"
                    type="number"
                    value={form.stock}
                    onChange={(value) =>
                      handleChange("stock", value)
                    }
                  />

                  <Field
                    label="Alerta estoque"
                    type="number"
                    value={form.low_stock_threshold}
                    onChange={(value) =>
                      handleChange(
                        "low_stock_threshold",
                        value
                      )
                    }
                  />

                  <Field
                    label="SKU"
                    value={form.sku}
                    onChange={(value) =>
                      handleChange("sku", value)
                    }
                  />

                </div>

                <Field
                  label="URL da imagem"
                  value={form.image}
                  onChange={(value) =>
                    handleChange("image", value)
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <Field
                    label="Aroma"
                    value={form.aroma}
                    onChange={(value) =>
                      handleChange("aroma", value)
                    }
                  />

                  <Field
                    label="Família olfativa"
                    value={form.familia_olfativa}
                    onChange={(value) =>
                      handleChange(
                        "familia_olfativa",
                        value
                      )
                    }
                  />

                  <Field
                    label="Tamanho"
                    value={form.size}
                    onChange={(value) =>
                      handleChange("size", value)
                    }
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <Field
                    label="Peso"
                    value={form.weight}
                    onChange={(value) =>
                      handleChange("weight", value)
                    }
                  />

                  <Field
                    label="Dimensões"
                    value={form.dimensions}
                    onChange={(value) =>
                      handleChange(
                        "dimensions",
                        value
                      )
                    }
                  />

                  <Field
                    label="Tempo de queima"
                    value={form.burn_time}
                    onChange={(value) =>
                      handleChange(
                        "burn_time",
                        value
                      )
                    }
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <Field
                    label="Cor"
                    value={form.color}
                    onChange={(value) =>
                      handleChange("color", value)
                    }
                  />

                  <Field
                    label="Recipiente"
                    value={form.recipiente}
                    onChange={(value) =>
                      handleChange(
                        "recipiente",
                        value
                      )
                    }
                  />

                  <Field
                    label="Cera"
                    value={form.cera}
                    onChange={(value) =>
                      handleChange("cera", value)
                    }
                  />

                </div>

                <Field
                  label="Coleção"
                  value={form.collection}
                  onChange={(value) =>
                    handleChange("collection", value)
                  }
                />

                <div>

                  <label className="block text-xs font-semibold mb-1.5">
                    Descrição
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      handleChange(
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 outline-none"
                  />

                </div>

                <div>

                  <label className="block text-xs font-semibold mb-1.5">
                    Detalhes
                  </label>

                  <textarea
                    value={form.details}
                    onChange={(e) =>
                      handleChange(
                        "details",
                        e.target.value
                      )
                    }
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 outline-none"
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <Field
                    label="Notas de saída"
                    value={form.notes_top}
                    onChange={(value) =>
                      handleChange(
                        "notes_top",
                        value
                      )
                    }
                  />

                  <Field
                    label="Notas de coração"
                    value={form.notes_heart}
                    onChange={(value) =>
                      handleChange(
                        "notes_heart",
                        value
                      )
                    }
                  />

                  <Field
                    label="Notas de base"
                    value={form.notes_base}
                    onChange={(value) =>
                      handleChange(
                        "notes_base",
                        value
                      )
                    }
                  />

                </div>

                <div className="flex gap-6 pt-3 border-t">

                  <label className="flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        handleChange(
                          "is_active",
                          e.target.checked
                        )
                      }
                    />
                    Produto ativo
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) =>
                        handleChange(
                          "is_featured",
                          e.target.checked
                        )
                      }
                    />
                    Produto em destaque
                  </label>

                </div>

              </div>

              <div className="flex justify-end gap-3 px-6 py-4 border-t bg-[#FAF9F5]">

                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E4C7B7]/30"
                >
                  Cancelar
                </button>

                <button
                  onClick={saveProduct}
                  className="px-4 py-2.5 rounded-lg bg-[#56443F] text-white text-sm font-semibold hover:bg-[#8B645A]"
                >
                  Salvar Produto
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
}


/* CAMPO SIMPLES DA PRÓPRIA PÁGINA */

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
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4C7B7]/40 bg-white text-sm outline-none focus:border-[#8B645A]"
      />

    </label>
  );
}