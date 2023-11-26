import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/shop";

function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });

  console.log(products);

  return (
    <>
      {products?.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md p-4 rounded-md mb-4"
        >
          <h3 className="text-lg font-semibold mb-2">
            {product.name} - {product.price}
          </h3>
          <img src="../public/{product.image}" />
          <p className="text-gray-700">{product.description}</p>
        </div>
      ))}
    </>
  );
}

export default ProductList;
