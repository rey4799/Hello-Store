import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
};

const ProductCard = ({ name, slug, price, thumbnail }: ProductCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <Link href={`/products/${slug}`} className="block bg-white">
        <img
          src={thumbnail}
          alt={name}
          width={300}
          height={300}
          className="w-full h-64 object-contain"
        />
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2">{name}</h3>
          <p className="text-gray-900 text-xl font-semibold">
            Rp {price.toLocaleString("id-ID")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
