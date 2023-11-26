import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/shop";
import { useCartContext } from "../../context/CartContext";
import { Product } from "../../utils/types";
import { useState } from "react";
import { collect } from "../../utils/collection";
import { Link } from "react-router-dom";

function ProductList() {
  const { addProduct } = useCartContext();

  const [productQuantities, setProductQuantities] = useState(
    collect({} as Record<number, number>)
  );

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  const handleQuantityChange = (product: Product | number, delta: number) => {
    const key = typeof product === "number" ? product : product.id;

    const quantity = productQuantities.get(key) ?? 1;

    setProductQuantities(
      productQuantities.set(key, Math.max(1, quantity + delta))
    );
  };

  const handleAddToCart = (product: Product) => {
    setProductQuantities(productQuantities.set(product.id, 1));

    addProduct(product, productQuantities.get(product.id) ?? 1);
  };

  if (isLoading) {
    return <>Loading products...</>;
  }

  return (
    <>
      <Link to={"/cart"}>CART</Link>

      {products?.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md p-4 rounded-md mb-4"
        >
          <h3 className="text-lg font-semibold mb-2">
            {product.name} - {product.price}
          </h3>
          <img src={`/images/product_${product.id}.jpg`} />
          <p className="text-gray-700">{product.description}</p>

          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                handleQuantityChange(product, 1);
              }}
            >
              +
            </button>
            <p>{productQuantities.get(product.id) ?? 1}</p>
            <button
              onClick={() => {
                handleQuantityChange(product, -1);
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductList;
