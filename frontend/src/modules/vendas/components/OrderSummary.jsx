export default function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 180 ? 0 : 15;

  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-xl p-6 space-y-5">

      <h2 className="font-serif text-lg font-bold text-[#56443F] border-b border-[#E4C7B7]/20 pb-3">
        Resumo da Encomenda
      </h2>

      <div className="space-y-4">

        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-3"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-12 h-14 object-cover rounded-md"
            />

            <div className="flex-1">

              <div className="flex justify-between gap-2">
                <span className="text-xs font-bold text-[#56443F]">
                  {item.product.name}
                </span>

                <span className="text-xs font-bold text-[#56443F]">
                  R${" "}
                  {(
                    item.product.price *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>

              <p className="text-[10px] text-[#A28776] mt-1">
                Quantidade: {item.quantity}
              </p>

            </div>
          </div>
        ))}

      </div>


      {/* Totais */}
      <div className="border-t border-[#E4C7B7]/20 pt-4 space-y-2 text-xs">

        <div className="flex justify-between text-[#A28776]">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-[#A28776]">
          <span>Frete</span>
          <span>
            {shipping === 0
              ? "Grátis"
              : `R$ ${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-[#E4C7B7]/20 pt-3 flex justify-between">

          <span className="font-serif font-bold text-[#56443F]">
            Total
          </span>

          <span className="font-serif text-xl font-bold text-[#8B645A]">
            R$ {total.toFixed(2)}
          </span>

        </div>

      </div>

    </div>
  );
}