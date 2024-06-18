"use client";

import Container from "@/components/Container";
import { useState, useEffect } from "react";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
  };
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeProduct = async (productId: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }

      setWishlist(wishlist.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  const formatPriceToRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <Container>
        <h1 className="text-3xl font-semibold mb-8">Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="py-3 px-4">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{item.product.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.product.description}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      {formatPriceToRupiah(item.product.price)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => removeProduct(item.product._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() =>
                            alert(
                              `Proceed to checkout for ${item.product.name}`
                            )
                          }
                        >
                          Checkout
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
