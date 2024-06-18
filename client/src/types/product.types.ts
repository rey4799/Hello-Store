export type TProduct = {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: { color: string; colorCode: string; image: string }[];
  price: number;
  thumbnail: string;
  tags: string[];
};