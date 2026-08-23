import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-[#E4C7B7]/15 overflow-hidden transition-all duration-300 hover:border-[#E4C7B7]/50 flex flex-col justify-between">
      <div className="relative aspect-[4/5] bg-white overflow-hidden p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-[#8B645A] hover:bg-white transition-colors"
          aria-label="Favoritar"
        >
          <Heart size={14} fill={liked ? "#8B645A" : "none"} />
        </button>

        <span className="absolute bottom-6 left-6 bg-[#F1F0E2]/90 backdrop-blur-sm text-[#56443F] text-[10px] font-bold px-2.5 py-1 rounded-sm border border-[#E4C7B7]/30">
          {product.weight} • {product.burnTime}
        </span>
      </div>

      <div className="p-5 space-y-3 text-left">
        <div className="space-y-1">
          <div className="flex justify-between items-baseline gap-2">
            <h4 className="font-serif text-base font-bold text-[#56443F] line-clamp-1">
              {product.name}
            </h4>
            <span className="text-sm font-bold text-[#8B645A] whitespace-nowrap">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <p className="text-xs text-[#A28776] font-semibold">
            {product.aroma} • {product.familiaOlfativa}
          </p>
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#56443F] bg-[#FAF9F5] p-2 rounded border border-[#E4C7B7]/20">
          <span>{product.burnTime}</span>
          <span>{product.dimensions}</span>
        </div>

        <button className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#E4C7B7]/20 text-[#8B645A] border border-[#E4C7B7]/60 text-xs font-bold tracking-wider uppercase rounded-md transition-colors flex items-center justify-center gap-1.5">
          <ShoppingBag size={13} />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
}