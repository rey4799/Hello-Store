"use client";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/products"
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            slug={product.slug}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
