import { useState } from "react";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { cartMock } from "../mocks/cartMock";

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}) {
  const [cart, setCart] = useState(cartMock);

  if (!isOpen) return null;

  const cartTotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Aumentar quantidade
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Diminuir quantidade
  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remover produto
  const removeItem = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      {/* Fundo externo */}
      <div
        className="absolute inset-0 bg-[#56443F]/20"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#F1F0E2] shadow-xl flex flex-col justify-between z-10 border-l border-[#E4C7B7]/20">

        {/* Cabeçalho */}
        <div className="p-6 border-b border-[#E4C7B7]/20 flex justify-between items-center bg-white">

          <span className="font-serif text-lg font-bold text-[#56443F]">
            Sua Sacola
          </span>

          <button
            onClick={onClose}
            className="text-[#56443F] hover:text-[#8B645A] transition-colors"
          >
            <X size={18} />
          </button>

        </div>

        {/* Produtos */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">

          {cart.length === 0 ? (

            <div className="h-full flex flex-col items-center justify-center text-center space-y-2">

              <span className="text-3xl">
                🍓🍂
              </span>

              <p className="text-xs text-[#A28776] font-semibold">
                Sua sacola está vazia.
              </p>

            </div>

          ) : (

            cart.map((item) => (

              <div
                key={item.product.id}
                className="flex gap-3 bg-white p-3 rounded-xl text-left text-xs"
              >

                {/* Imagem */}
                <div className="w-12 h-16 bg-[#FAF9F5] p-0.5 rounded-lg flex-shrink-0">

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md"
                  />

                </div>

                {/* Informações */}
                <div className="flex-grow flex flex-col justify-between">

                  <div className="flex justify-between items-start gap-2">

                    <div>

                      <h4 className="font-serif font-bold text-[#56443F]">
                        {item.product.name}
                      </h4>

                      <span className="text-[10px] text-[#A28776]">
                        {item.product.subtitle}
                      </span>

                    </div>

                    <span className="font-bold text-[#8B645A] whitespace-nowrap">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>

                  </div>

                  {/* Quantidade */}
                  <div className="flex justify-between items-center mt-2">

                    <div className="flex items-center gap-2 bg-[#FAF9F5] rounded-lg px-1.5 py-0.5">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.product.id)
                        }
                        className="hover:text-[#8B645A]"
                      >
                        <Minus size={10} />
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.product.id)
                        }
                        className="hover:text-[#8B645A]"
                      >
                        <Plus size={10} />
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.product.id)
                      }
                      className="text-[10px] text-red-400 hover:text-red-500"
                    >
                      Remover
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Rodapé */}
        {cart.length > 0 && (

          <div className="p-6 bg-white border-t border-[#E4C7B7]/20 space-y-4">

            <div className="flex justify-between font-bold text-xs text-[#56443F]">

              <span>
                Subtotal:
              </span>

              <span>
                R$ {cartTotal.toFixed(2)}
              </span>

            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#56443F] hover:bg-[#8B645A] text-white text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag size={14} />
              Finalizar Compra
            </button>

          </div>

        )}

      </div>

    </div>
  );
}