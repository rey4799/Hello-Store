"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ProductDetail = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: { color: string; colorCode: string; image: string }[];
  price: number;
  thumbnail: string;
  tags: string[];
};

interface ProductDetailsProps {
  product: ProductDetail;
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.images[0].color
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0].image
  );
  const router = useRouter();

  useEffect(() => {
    const currentImage = product.images.find(
      (image) => image.color === selectedColor
    )?.image;
    if (currentImage) {
      setSelectedImage(currentImage);
    }
  }, [selectedColor, product.images]);

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        router.push("/wishlist");
      } else {
        alert(result.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      router.push("/login");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg h-[400px] overflow-hidden bg-white flex items-center justify-center rounded-lg">
          <img
            src={selectedImage}
            alt={`${product.name} - ${selectedColor}`}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex gap-2 mt-4">
          {product.images.map((image) => (
            <button
              key={image.color}
              className={`w-10 h-10 rounded-full border-2 `}
              style={{ backgroundColor: image.colorCode }}
              onClick={() => setSelectedColor(image.color)}
              aria-label={`Select ${image.color} color`}
            ></button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-medium">{product.name}</h2>
        <div className="mt-2  ">
          <span className="text-2xl font-bold">
            {formatRupiah(product.price)}
          </span>
        </div>
        <div className="text-justify text-slate-700">{product.description}</div>
        <div>
          <span className="font-semibold text-slate-700">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold text-slate-700">TAGS: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="font-semibold text-slate-700">COLOR:</span>
          <div className="flex gap-2 mt-2">
            {product.images.map((image) => (
              <button
                key={image.color}
                className={`w-10 h-10 rounded-full border-2`}
                style={{ backgroundColor: image.colorCode }}
                onClick={() => setSelectedColor(image.color)}
                aria-label={`Select ${image.color} color`}
              ></button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddToWishlist}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Tambah ke wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
