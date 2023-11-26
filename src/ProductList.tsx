import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getProductList = async () => {
    try {
      // Replace with your actual server endpoint
      const response = await axios.get<string>(
        "http://localhost/shop/product-list"
      );
      console.log("product list ", response);
      setProducts(JSON.parse(response.data));
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
    /*const user: User = { username: 'user123', password: 'password123' };
        if (credentials.username === user.username && credentials.password === user.password) {
          setIsLoggedIn(true);
          alert('Login successful!');
        } else {
          alert('Invalid credentials. Please try again.');
        }*/
  };

  getProductList();
  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">List of products</h2>
        <div>
          {products.map((product) => (
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
        </div>
      </div>
    );
  }
};

export default ProductList;
