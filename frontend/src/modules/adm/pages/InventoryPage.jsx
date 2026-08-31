import { useState } from "react";
import { Boxes, AlertCircle, Save, Trash2 } from "lucide-react";
import { productsMock } from "../mocks/productsMock";
import AdminLayout from "../components/AdminLayout";
import { validateEstoqueEntry } from "../../../shared/validation/validation.js";

const fmtBRL = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function InventoryPage() {
  const [products, setProducts] = useState(productsMock);
  const [editingStock, setEditingStock] = useState({});
  const [stockTouched, setStockTouched] = useState({});

  function saveStock(id) {
    const newStock = Number(editingStock[id]);
    const product = products.find((item) => item.id === id);

    const errors = validateEstoqueEntry({
      supplier: product?.supplier || "Fornecedor padrão",
      entryDate:
        product?.entryDate ||
        new Date().toISOString().slice(0, 10),
      quantity: newStock,
      costValue:
        product?.costValue ??
        product?.cost ??
        0,
    });

    setStockTouched((current) => ({
      ...current,
      [id]: true,
    }));

    if (Object.keys(errors).length > 0) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: newStock,
            }
          : product
      )
    );

    setEditingStock((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  }

  function deleteProduct(id) {
    const product = products.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o produto "${product?.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );

    setEditingStock((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });

    setStockTouched((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  }

  function getStatus(product) {
    if (product.stock === 0) {
      return {
        label: "Sem estoque",
        className:
          "bg-red-50 text-red-700 border-red-200",
      };
    }

    if (
      product.stock <= product.low_stock_threshold
    ) {
      return {
        label: "Estoque baixo",
        className:
          "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    return {
      label: "Em estoque",
      className:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }

  const totalStock = products.reduce(
    (total, product) =>
      total + product.stock,
    0
  );

  const lowStockCount = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <=
        product.low_stock_threshold
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stock === 0
  ).length;

  const stockValue = products.reduce(
    (total, product) =>
      total +
      product.stock * product.price,
    0
  );

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* CABEÇALHO */}
        <div>
          <h1 className="text-xl font-bold text-[#56443F]">
            Controle de Estoque
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            Gerencie o estoque dos produtos
          </p>
        </div>

        {/* INDICADORES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* TOTAL EM ESTOQUE */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#8B645A]/10 flex items-center justify-center">
                <Boxes
                  size={18}
                  className="text-[#8B645A]"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Total em Estoque
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {totalStock}
                </p>
              </div>

            </div>
          </div>

          {/* ESTOQUE BAIXO */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertCircle
                  size={18}
                  className="text-amber-600"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Estoque Baixo
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {lowStockCount}
                </p>
              </div>

            </div>
          </div>

          {/* SEM ESTOQUE */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertCircle
                  size={18}
                  className="text-red-600"
                />
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Sem Estoque
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {outOfStockCount}
                </p>
              </div>

            </div>
          </div>

          {/* VALOR EM ESTOQUE */}
          <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm p-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-xs">
                  R$
                </span>
              </div>

              <div>
                <p className="text-xs text-[#A28776] font-semibold">
                  Valor em Estoque
                </p>

                <p className="text-xl font-bold text-[#56443F]">
                  {fmtBRL(stockValue)}
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
                    Produto
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    SKU
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Preço
                  </th>

                  <th className="text-left text-[10px] uppercase tracking-wider text-[#A28776] px-5 py-3">
                    Estoque
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

                {products.map((product) => {
                  const status =
                    getStatus(product);

                  const isEditing =
                    editingStock[
                      product.id
                    ] !== undefined;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-[#E4C7B7]/10 hover:bg-[#FAF9F5]"
                    >

                      {/* PRODUTO */}
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

                      {/* SKU */}
                      <td className="px-5 py-4 text-sm text-[#A28776]">
                        {product.sku}
                      </td>

                      {/* PREÇO */}
                      <td className="px-5 py-4 text-sm font-semibold">
                        {fmtBRL(product.price)}
                      </td>

                      {/* ESTOQUE */}
                      <td className="px-5 py-4">

                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={
                              editingStock[
                                product.id
                              ]
                            }
                            onChange={(event) =>
                              setEditingStock(
                                (current) => ({
                                  ...current,
                                  [product.id]:
                                    event.target
                                      .value,
                                })
                              )
                            }
                            className="w-20 px-3 py-2 rounded-lg border border-[#E4C7B7]/40 text-sm focus:outline-none focus:border-[#8B645A]"
                          />
                        ) : (
                          <span
                            className={`text-sm font-bold ${
                              product.stock <=
                              product.low_stock_threshold
                                ? "text-red-600"
                                : "text-[#56443F]"
                            }`}
                          >
                            {product.stock}
                          </span>
                        )}

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
  <div className="flex items-center gap-2">

    {isEditing ? (
      <button
        onClick={() => saveStock(product.id)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#56443F] text-white text-xs font-semibold hover:bg-[#8B645A]"
      >
        <Save size={13} />
        Salvar
      </button>
    ) : (
      <button
        onClick={() =>
          setEditingStock((current) => ({
            ...current,
            [product.id]: String(product.stock),
          }))
        }
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E4C7B7]/30 text-[#56443F] text-xs font-semibold border border-[#E4C7B7]/40 hover:bg-[#E4C7B7]/50"
      >
        Ajustar
      </button>
    )}

    <button
      onClick={() => deleteProduct(product.id)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold border border-red-200 hover:bg-red-100"
    >
      <Trash2 size={13} />
      Excluir
    </button>

  </div>
</td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}