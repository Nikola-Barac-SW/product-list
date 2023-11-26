import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import styes from "./Cart.module.scss";
import { useMemo } from "react";

function Cart() {
  const { entries, removeProduct, updateQuantity } = useCartContext();

  const totalPrice = useMemo(
    () =>
      entries
        .reduce(
          (carry, { product: { price }, quantity }) => carry + quantity * price,
          0
        )
        .toFixed(2),
    [entries]
  );

  return (
    <>
      <Link to="/products">SHOP</Link>

      <h3>Shopping Cart</h3>

      <div className={styes.cart}>
        {entries.length === 0 ? (
          <>EMPTY CART</>
        ) : (
          <>
            {entries.map(({ product, quantity }) => {
              const { id, name, price } = product;

              return (
                <div key={id}>
                  <h3 className="text-lg font-semibold mb-2">
                    {name} - {price}
                  </h3>
                  <button
                    onClick={() => {
                      updateQuantity(product, 1);
                    }}
                  >
                    +
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => {
                      updateQuantity(product, -1);
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      removeProduct(product);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div>
        <h3>SUMMARY</h3>
        <h5>Total price</h5>
        <p>{totalPrice}</p>
      </div>
    </>
  );
}

export default Cart;
