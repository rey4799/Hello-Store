"use client";
import Container from "./Container";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/products"
      );
      const data = await response.json();
      // Batasi jumlah produk yang ditampilkan hanya 6 data
      const limitedData = data.slice(0, 6);
      setFeaturedProducts(limitedData);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Container>
      <div>
        <h3 className="text-center text-3xl font-bold mb-2">
          Produk rekomendasi
        </h3>
        <p className="text-center">{featuredProducts.length} produk</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              name={product.name}
              slug={product.slug}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/products"
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            See All
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedProducts;
