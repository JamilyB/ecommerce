import React, { useMemo, useState } from "react";
import {
  Download,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import { ordersMock } from "../mocks/ordersMock";

/* =========================================================
   CORES DAS CATEGORIAS
========================================================= */

const categoryColors = [
  "#2563EB", // azul
  "#16A34A", // verde
  "#9333EA", // roxo
  "#EA580C", // laranja
  "#DB2777", // rosa
  "#0891B2", // ciano
];

/* =========================================================
   FORMATAÇÃO
========================================================= */

const formatBRL = (value) => {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatShortBRL = (value) => {
  const number = Number(value || 0);

  if (number >= 1000000) {
    return `R$ ${(number / 1000000).toFixed(1).replace(".", ",")} mi`;
  }

  if (number >= 1000) {
    return `R$ ${(number / 1000).toFixed(0)} mil`;
  }

  return `R$ ${number.toFixed(0)}`;
};

const formatMonth = (date) => {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "pt-BR",
    {
      month: "short",
      year: "numeric",
    }
  );
};

const formatMonthFull = (date) => {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    }
  );
};

/* =========================================================
   CATEGORIA
========================================================= */
const getCategory = (item) => {
  if (item.category) {
    return item.category;
  }

  if (item.category_name) {
    return item.category_name;
  }
  const categoryMap = {
    "Vela Relaxar": "Relaxamento",
    "Vela Café": "Gourmet",
    "Vela Gourmet": "Gourmet",
    "Vela Natureza": "Natureza",
    "Vela Floral": "Floral",
    "Vela Luxo": "Luxo",
  };

  return categoryMap[item.product_name] || "Outros";
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function DashboardPage() {

  /* =======================================================
     PERÍODO PADRÃO
  ======================================================= */

  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-08-19");

  /* =======================================================
     CATEGORIAS DISPONÍVEIS
  ======================================================= */

  const availableCategories = useMemo(() => {

    const categories = new Set();

    ordersMock.forEach((order) => {

      if (order.payment_status !== "paid") {
        return;
      }

      order.items?.forEach((item) => {
        categories.add(getCategory(item));
      });

    });

    return Array.from(categories);

  }, []);

  /* =======================================================
     CATEGORIAS SELECIONADAS
  ======================================================= */

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  /* =======================================================
     DROPDOWN DE CATEGORIAS
  ======================================================= */

  const [categoryOpen, setCategoryOpen] = useState(false);

  /* =======================================================
     ERRO DE DATA
  ======================================================= */

  const dateError =
    startDate &&
    endDate &&
    endDate < startDate;

  /* =======================================================
     ALTERAÇÃO DE CATEGORIA
  ======================================================= */

  const toggleCategory = (category) => {

    setSelectedCategories((current) => {

      if (current.includes(category)) {
        return current.filter(
          (item) => item !== category
        );
      }

      return [...current, category];

    });

  };

  /* =======================================================
     DADOS DO GRÁFICO
  ======================================================= */

  const chartData = useMemo(() => {

    if (dateError) {
      return [];
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);

    /*
     * Se nenhuma categoria foi selecionada,
     * não exibimos linhas.
     */

    if (selectedCategories.length === 0) {
      return [];
    }

    /*
     * Descobre todos os meses existentes no período.
     */

    const months = [];

    const cursor = new Date(
      start.getFullYear(),
      start.getMonth(),
      1
    );

    const finalMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      1
    );

    while (cursor <= finalMonth) {

      const year = cursor.getFullYear();
      const month = cursor.getMonth();

      months.push({
        key: `${year}-${String(month + 1).padStart(2, "0")}`,
        date: new Date(year, month, 1),
      });

      cursor.setMonth(cursor.getMonth() + 1);

    }

    const result = months.map((month) => {

      const values = {};

      selectedCategories.forEach((category) => {
        values[category] = 0;
      });

      return {
        key: month.key,
        date: month.date,
        label: formatMonth(
          `${month.key}-01`
        ),
        values,
      };

    });

    /*
     * Apenas vendas aprovadas/pagas entram
     * no gráfico.
     */

    ordersMock.forEach((order) => {

      if (order.payment_status !== "paid") {
        return;
      }

      const orderDate = new Date(order.created_at);

      if (
        orderDate < start ||
        orderDate > end
      ) {
        return;
      }

      const key =
        `${orderDate.getFullYear()}-${String(
          orderDate.getMonth() + 1
        ).padStart(2, "0")}`;

      const month = result.find(
        (item) => item.key === key
      );

      if (!month) {
        return;
      }

      order.items?.forEach((item) => {

        const category = getCategory(item);

        if (
          !selectedCategories.includes(category)
        ) {
          return;
        }

        const value =
          Number(item.unit_price || 0) *
          Number(item.quantity || 0);

        month.values[category] += value;

      });

    });

    return result;

  }, [
    startDate,
    endDate,
    selectedCategories,
    dateError,
  ]);

  /* =======================================================
     TOTAL DE VENDAS
  ======================================================= */

  const totalSales = useMemo(() => {

    return chartData.reduce(
      (total, month) => {

        const monthTotal =
          selectedCategories.reduce(
            (sum, category) =>
              sum +
              Number(month.values[category] || 0),
            0
          );

        return total + monthTotal;

      },
      0
    );

  }, [
    chartData,
    selectedCategories,
  ]);

  /* =======================================================
     MAIOR VALOR DO GRÁFICO
  ======================================================= */

  const maxValue = useMemo(() => {

    let max = 0;

    chartData.forEach((month) => {

      selectedCategories.forEach(
        (category) => {

          const value =
            Number(month.values[category]) || 0;

          if (value > max) {
            max = value;
          }

        }
      );

    });

    return max > 0 ? max : 100;

  }, [
    chartData,
    selectedCategories,
  ]);

  /* =======================================================
     ESCALA DO EIXO Y
  ======================================================= */

  const yMax = useMemo(() => {

    if (maxValue <= 1000) {
      return Math.ceil(maxValue / 200) * 200;
    }

    if (maxValue <= 5000) {
      return Math.ceil(maxValue / 1000) * 1000;
    }

    if (maxValue <= 10000) {
      return Math.ceil(maxValue / 2000) * 2000;
    }

    return Math.ceil(maxValue / 5000) * 5000;

  }, [maxValue]);

  /* =======================================================
     EXPORTAÇÃO
  ======================================================= */

  const exportData = () => {

    if (
      dateError ||
      selectedCategories.length === 0 ||
      chartData.length === 0
    ) {
      return;
    }

    const rows = [
      [
        "Período",
        "Categoria",
        "Valor de Venda",
      ],
    ];

    chartData.forEach((month) => {

      selectedCategories.forEach(
        (category) => {

          rows.push([
            formatMonthFull(
              `${month.key}-01`
            ),
            category,
            month.values[category]
              .toFixed(2)
              .replace(".", ","),
          ]);

        }
      );

    });

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(";")
      )
      .join("\n");

    const blob = new Blob(
      ["\uFEFF" + csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `historico-vendas-${startDate}-${endDate}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  };

  /* =======================================================
     DIMENSÕES DO GRÁFICO
  ======================================================= */

  const chartWidth = 900;
  const chartHeight = 320;

  const margin = {
    top: 20,
    right: 25,
    bottom: 55,
    left: 75,
  };

  const graphWidth =
    chartWidth -
    margin.left -
    margin.right;

  const graphHeight =
    chartHeight -
    margin.top -
    margin.bottom;

  /* =======================================================
     POSIÇÃO X
  ======================================================= */

  const getX = (index) => {

    if (chartData.length <= 1) {
      return margin.left + graphWidth / 2;
    }

    return (
      margin.left +
      (index /
        (chartData.length - 1)) *
        graphWidth
    );

  };

  /* =======================================================
     POSIÇÃO Y
  ======================================================= */

  const getY = (value) => {

    return (
      margin.top +
      graphHeight -
      (value / yMax) *
        graphHeight
    );

  };

  /* =======================================================
     LINHAS
  ======================================================= */

  const getPath = (category) => {

    if (chartData.length === 0) {
      return "";
    }

    return chartData
      .map((month, index) => {

        const x = getX(index);

        const y = getY(
          month.values[category] || 0
        );

        return `${index === 0 ? "M" : "L"} ${x} ${y}`;

      })
      .join(" ");

  };

  /* =======================================================
     RÓTULOS DO EIXO Y
  ======================================================= */

  const yTicks = 5;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AdminLayout>

      <div className="space-y-5">

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div>

          <h1 className="text-xl font-bold text-[#56443F]">
            Histórico de Vendas
          </h1>

          <p className="text-xs text-[#A28776] mt-1">
            Evolução mensal das vendas por categoria
          </p>

        </div>

        {/* =================================================
            FILTROS + GRÁFICO
        ================================================= */}

        <div className="bg-white rounded-xl border border-[#E4C7B7]/30 shadow-sm overflow-hidden">

          {/* FILTROS */}

          <div className="px-5 py-4 border-b border-[#E4C7B7]/20">

            <div className="flex flex-col lg:flex-row lg:items-end gap-4">

              {/* DATA INICIAL */}

              <div className="w-full sm:w-44">

                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1.5">
                  Data inicial
                </label>

                <div className="relative">

                  <CalendarDays
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B645A]"
                  />

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    className="w-full h-9 pl-9 pr-2 rounded-lg border border-[#E4C7B7]/40 bg-white text-xs text-[#56443F] outline-none focus:border-[#8B645A]"
                  />

                </div>

              </div>

              {/* DATA FINAL */}

              <div className="w-full sm:w-44">

                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1.5">
                  Data final
                </label>

                <div className="relative">

                  <CalendarDays
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B645A]"
                  />

                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) =>
                      setEndDate(
                        e.target.value
                      )
                    }
                    className={`w-full h-9 pl-9 pr-2 rounded-lg border bg-white text-xs text-[#56443F] outline-none focus:border-[#8B645A] ${
                      dateError
                        ? "border-red-400"
                        : "border-[#E4C7B7]/40"
                    }`}
                  />

                </div>

              </div>

              {/* CATEGORIAS */}

              <div className="w-full sm:w-64 relative">

                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A28776] mb-1.5">
                  Categorias
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setCategoryOpen(
                      !categoryOpen
                    )
                  }
                  className="w-full h-9 px-3 rounded-lg border border-[#E4C7B7]/40 bg-white text-xs text-[#56443F] flex items-center justify-between hover:border-[#8B645A]"
                >

                  <span>
                    {selectedCategories.length ===
                    0
                      ? "Selecionar categorias"
                      : `${selectedCategories.length} categoria(s) selecionada(s)`}
                  </span>

                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      categoryOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {categoryOpen && (

                  <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-[#E4C7B7]/40 rounded-lg shadow-lg p-2">

                    {availableCategories.map(
                      (category, index) => {

                        const selected =
                          selectedCategories.includes(
                            category
                          );

                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() =>
                              toggleCategory(
                                category
                              )
                            }
                            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-[#FAF9F5] text-left"
                          >

                            <span
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  categoryColors[
                                    index %
                                      categoryColors.length
                                  ],
                              }}
                            />

                            <span className="flex-1 text-xs font-medium text-[#56443F]">
                              {category}
                            </span>

                            {selected && (
                              <span className="w-4 h-4 rounded bg-[#56443F] flex items-center justify-center">
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M2 5L4 7L8 3"
                                    stroke="white"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </span>
                            )}

                          </button>
                        );

                      }
                    )}

                  </div>

                )}

              </div>

              {/* EXPORTAR */}

              <button
                type="button"
                onClick={exportData}
                disabled={
                  dateError ||
                  selectedCategories.length ===
                    0
                }
                className="h-9 px-4 rounded-lg bg-[#56443F] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#705047] disabled:opacity-40 disabled:cursor-not-allowed"
              >

                <Download size={14} />

                Exportar

              </button>

            </div>

            {/* ERRO DE DATA */}

            {dateError && (

              <p className="text-[11px] text-red-500 font-semibold mt-2">
                A data final não pode ser anterior à
                data inicial.
              </p>

            )}

          </div>

          {/* =================================================
              VENDAS TOTAIS
          ================================================= */}

          <div className="px-5 py-4 border-b border-[#E4C7B7]/20">

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#A28776]">
              Vendas Totais
            </p>

            <p className="text-2xl font-bold text-[#56443F] mt-1">
              {formatBRL(totalSales)}
            </p>

            <p className="text-[10px] text-[#A28776] mt-0.5">
              Período e categorias selecionados
            </p>

          </div>

          {/* =================================================
              GRÁFICO
          ================================================= */}

          <div className="p-5">

            {selectedCategories.length === 0 ? (

              <div className="h-[320px] flex flex-col items-center justify-center">

                <div className="w-10 h-10 rounded-full bg-[#F1F0E2] flex items-center justify-center mb-3">

                  <ChevronDown
                    size={18}
                    className="text-[#8B645A]"
                  />

                </div>

                <p className="text-sm font-semibold text-[#56443F]">
                  Selecione uma categoria
                </p>

                <p className="text-xs text-[#A28776] mt-1">
                  Selecione uma ou mais categorias
                  para visualizar a evolução das
                  vendas.
                </p>

              </div>

            ) : (

              <div className="w-full overflow-x-auto">

                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full min-w-[650px]"
                  style={{
                    height: "320px",
                  }}
                >

                  {/* =================================================
                      GRID
                  ================================================= */}

                  {Array.from({
                    length: yTicks + 1,
                  }).map((_, index) => {

                    const value =
                      (yMax / yTicks) *
                      index;

                    const y =
                      getY(value);

                    return (
                      <g key={index}>

                        <line
                          x1={margin.left}
                          x2={
                            chartWidth -
                            margin.right
                          }
                          y1={y}
                          y2={y}
                          stroke="#E9E4DF"
                          strokeWidth="1"
                        />

                        <text
                          x={
                            margin.left -
                            10
                          }
                          y={y + 4}
                          textAnchor="end"
                          fontSize="10"
                          fill="#8A817B"
                        >
                          {formatShortBRL(
                            value
                          )}
                        </text>

                      </g>
                    );

                  })}

                  {/* =================================================
                      EIXO X
                  ================================================= */}

                  {chartData.map(
                    (month, index) => {

                      const x =
                        getX(index);

                      return (
                        <text
                          key={month.key}
                          x={x}
                          y={
                            chartHeight -
                            22
                          }
                          textAnchor="middle"
                          fontSize="10"
                          fill="#8A817B"
                        >
                          {month.label}
                        </text>
                      );

                    }
                  )}

                  {/* =================================================
                      LINHAS
                  ================================================= */}

                  {selectedCategories.map(
                    (
                      category,
                      categoryIndex
                    ) => {

                      const color =
                        categoryColors[
                          categoryIndex %
                            categoryColors.length
                        ];

                      return (
                        <g key={category}>

                          {/* LINHA */}

                          <path
                            d={getPath(
                              category
                            )}
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* PONTOS */}

                          {chartData.map(
                            (
                              month,
                              index
                            ) => {

                              const value =
                                month.values[
                                  category
                                ] || 0;

                              const x =
                                getX(index);

                              const y =
                                getY(value);

                              return (
                                <g
                                  key={`${category}-${month.key}`}
                                  className="group"
                                >

                                  <circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="white"
                                    stroke={
                                      color
                                    }
                                    strokeWidth="3"
                                  />

                                  {/* Área maior para
                                      facilitar o hover */}

                                  <circle
                                    cx={x}
                                    cy={y}
                                    r="12"
                                    fill="transparent"
                                    className="cursor-pointer"
                                  />

                                  {/* TOOLTIP */}

                                  <g className="opacity-0 group-hover:opacity-100 pointer-events-none">
                                    <rect x={ x - 58 } y={ y - 45 } width="116" height="34" rx="6" fill="#2F2926"/>
                                    <text x={x} y={ y - 31 }
                                      textAnchor="middle"
                                      fontSize="9"
                                      fill="#FFFFFF"
                                      fontWeight="600"
                                    >
                                      {category}
                                    </text>

                                    <text
                                      x={x}
                                      y={
                                        y -
                                        19
                                      }
                                      textAnchor="middle"
                                      fontSize="10"
                                      fill="#FFFFFF"
                                      fontWeight="700"
                                    >
                                      {formatBRL(
                                        value
                                      )}
                                    </text>

                                  </g>

                                </g>
                              );

                            }
                          )}

                        </g>
                      );

                    }
                  )}

                </svg>

              </div>

            )}

          </div>

          {/* =================================================
              LEGENDA
          ================================================= */}

          {selectedCategories.length > 0 && (

            <div className="px-5 py-3 border-t border-[#E4C7B7]/20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">

              {selectedCategories.map(
                (category, index) => {

                  const color =
                    categoryColors[
                      index %
                        categoryColors.length
                    ];

                  return (
                    <div
                      key={category}
                      className="flex items-center gap-2"
                    >

                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            color,
                        }}
                      />

                      <span className="text-xs font-semibold text-[#56443F]">
                        {category}
                      </span>

                    </div>
                  );

                }
              )}

            </div>

          )}

        </div>

      </div>

    </AdminLayout>
  );
}