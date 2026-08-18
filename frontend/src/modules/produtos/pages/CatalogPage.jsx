import { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Filter,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { productMock } from "../mocks/productMock";

export default function CatalogPage() {

  const [filters, setFilters] = useState({
    collection: "all",
    familia: "all",
    tamanho: "all",
    queima: "all",
    recipiente: "all",
    cera: "all",
    cor: "all",
    maxPrice: 130,
  });

  const [showMessage, setShowMessage] = useState(false);

  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      collection: "all",
      familia: "all",
      tamanho: "all",
      queima: "all",
      recipiente: "all",
      cera: "all",
      cor: "all",
      maxPrice: 130,
    });
  };

  const filteredProducts = productMock.filter((product) => {

    if (
      filters.collection !== "all" &&
      product.colecao !== filters.collection
    ) {
      return false;
    }

    if (
      filters.familia !== "all" &&
      product.familiaOlfativa !== filters.familia
    ) {
      return false;
    }

    if (
      filters.recipiente !== "all" &&
      product.recipiente !== filters.recipiente
    ) {
      return false;
    }

    if (
      filters.cera !== "all" &&
      product.cera !== filters.cera
    ) {
      return false;
    }

    if (
      filters.cor !== "all" &&
      product.cor !== filters.cor
    ) {
      return false;
    }

    if (product.preco > filters.maxPrice) {
      return false;
    }

    if (filters.tamanho !== "all") {

      if (
        filters.tamanho === "Pequeno" &&
        product.pesoGramas >= 200
      ) {
        return false;
      }

      if (
        filters.tamanho === "Medio" &&
        (
          product.pesoGramas < 200 ||
          product.pesoGramas > 250
        )
      ) {
        return false;
      }

      if (
        filters.tamanho === "Grande" &&
        product.pesoGramas <= 250
      ) {
        return false;
      }
    }

    if (filters.queima !== "all") {

      const hours = parseInt(product.tempoQueima);

      if (
        filters.queima === "curto" &&
        hours > 40
      ) {
        return false;
      }

      if (
        filters.queima === "medio" &&
        (hours < 40 || hours > 50)
      ) {
        return false;
      }

      if (
        filters.queima === "longo" &&
        hours <= 50
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-6 md:px-12 py-10">

      {/* Banner IA */}
        <section className="mb-10 bg-[#E4C7B7]/15 border border-[#E4C7B7]/40 rounded-xl px-6 py-5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Texto */}
            <div className="text-left space-y-1.5">

            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8B645A]">
                <Sparkles size={12} />
                Encontre seu aroma ideal
            </span>

            <h3 className="font-serif text-lg md:text-xl font-bold text-[#56443F]">
                Converse com nossa IA para receber recomendações personalizadas.
            </h3>

            </div>

            {/* Botão */}
            <button
            onClick={() => setShowMessage(true)}
            className="shrink-0 px-5 py-2.5 bg-[#56443F] hover:bg-[#8B645A] text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
            >
            <MessageSquare size={13} />
            Iniciar conversa
            </button>

        </div>

        {/* Mensagem do protótipo */}
        {showMessage && (
            <p className="text-[10px] text-[#8B645A] font-semibold text-center mt-3">
            Assistente de IA disponível em uma próxima etapa do protótipo.
            </p>
        )}
        </section>

      {/* Coleções */}
      <div className="text-center space-y-4 mb-8">

        <span className="text-xs font-bold tracking-widest text-[#8B645A] uppercase">
          Menu de Coleções
        </span>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#56443F]">
          Sintonias por Coleção
        </h2>

      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Filtros */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E4C7B7]/30 text-left space-y-6">

          <div className="flex justify-between items-center border-b border-[#E4C7B7]/30 pb-3">

            <h3 className="font-serif text-base font-bold flex items-center gap-1.5">
              <Filter size={15} />
              Filtros Rápidos
            </h3>

            <button
              onClick={clearFilters}
              className="text-[10px] text-[#8B645A] font-bold hover:underline"
            >
              Limpar Todos
            </button>

          </div>

          {/* Preço */}
          <div className="space-y-2">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Preço Máximo: R$ {filters.maxPrice}
            </label>

            <input
              type="range"
              min="50"
              max="130"
              value={filters.maxPrice}
              onChange={(event) =>
                updateFilter(
                  "maxPrice",
                  Number(event.target.value)
                )
              }
              className="w-full accent-[#8B645A]"
            />

          </div>

          {/* Família */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Família Olfativa
            </label>

            <select
              value={filters.familia}
              onChange={(event) =>
                updateFilter("familia", event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Todas</option>
              <option value="Doce">Doce</option>
              <option value="Floral">Floral</option>
              <option value="Herbal">Herbal</option>
              <option value="Cítrico">Cítrico</option>
              <option value="Amadeirado">Amadeirado</option>
              <option value="Cafés">Cafés</option>
            </select>

          </div>

          {/* Tamanho */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Tamanho / Peso
            </label>

            <select
              value={filters.tamanho}
              onChange={(event) =>
                updateFilter("tamanho", event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Todos</option>
              <option value="Pequeno">
                Pequeno (&lt; 200g)
              </option>
              <option value="Medio">
                Médio (200g - 250g)
              </option>
              <option value="Grande">
                Grande (&gt; 250g)
              </option>
            </select>

          </div>

          {/* Queima */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Tempo de Queima
            </label>

            <select
              value={filters.queima}
              onChange={(event) =>
                updateFilter("queima", event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Qualquer tempo</option>
              <option value="curto">Até 40 Horas</option>
              <option value="medio">40h a 50 Horas</option>
              <option value="longo">Mais de 50 Horas</option>
            </select>

          </div>

          {/* Recipiente */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Recipiente
            </label>

            <select
              value={filters.recipiente}
              onChange={(event) =>
                updateFilter(
                  "recipiente",
                  event.target.value
                )
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Todos os materiais</option>
              <option value="Vidro">Vidro</option>
              <option value="Cerâmica">Cerâmica</option>
            </select>

          </div>

          {/* Cera */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Tipo de Cera
            </label>

            <select
              value={filters.cera}
              onChange={(event) =>
                updateFilter("cera", event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Todas as ceras</option>
              <option value="Soja">Cera de Soja</option>
              <option value="Coco">Cera de Coco</option>
              <option value="Vegetal">Cera Vegetal</option>
            </select>

          </div>

          {/* Cor */}
          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold text-[#8B645A]">
              Tonalidade do Pote
            </label>

            <select
              value={filters.cor}
              onChange={(event) =>
                updateFilter("cor", event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/60 rounded-lg p-2 text-xs font-semibold text-[#56443F]"
            >
              <option value="all">Todas as cores</option>
              <option value="Rosa">Rosa</option>
              <option value="Marrom">Marrom</option>
              <option value="Branco">Branco</option>
              <option value="Terracota">Terracota</option>
              <option value="Verde">Verde</option>
            </select>

          </div>

        </aside>

        {/* Produtos */}
        <section className="lg:col-span-9 space-y-6">

          {filteredProducts.length === 0 ? (

            <div className="bg-white rounded-2xl p-12 text-center border border-[#E4C7B7]/20">

              <span className="text-3xl block mb-2">
                🕯
              </span>

              <h4 className="font-serif text-lg font-bold text-[#56443F]">
                Nenhuma vela encontrada
              </h4>

              <p className="text-xs text-[#A28776] max-w-xs mx-auto mt-1 leading-relaxed">
                Não encontramos resultados para sua busca.
                Tente ajustar os filtros.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  variant="shop"
                />

              ))}

            </div>

          )}

        </section>

      </div>

    </div>
  );
}