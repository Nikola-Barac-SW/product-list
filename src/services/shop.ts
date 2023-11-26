import type { Product } from "../utils/types";
import { client } from "./client";

export async function getProducts(): Promise<Product[]> {
  const { data } = await client.get<Product[]>(
    "http://localhost/shop/products.php"
  );

  return data;
}
