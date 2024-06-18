import { Product } from "@/db/models/product.model";
import ProductDetails from "./ProductDetails";
import Container from "@/components/Container";
import Head from "next/head";

type PageProps = { params: { slug: string } };

const detailProduct = async ({ params }: PageProps) => {
  const data = await Product.findBySlug(params.slug);

  if (!data) {
    throw new Error("Product not found");
  }

  const productData = {
    _id: data._id.toString(),
    name: data.name,
    slug: data.slug,
    description: data.description,
    category: data.category,
    images: data.images,
    price: data.price,
    thumbnail: data.thumbnail,
    tags: data.tags,
    excerpt: data.excerpt,
  };

  return (
    <div className="p-8">
      <Container>
        <Head>
          <title>{productData.name}</title>
          <meta name="description" content={productData.excerpt} />
          <meta property="og:image" content={productData.thumbnail} />
        </Head>
        <ProductDetails product={productData} />
      </Container>
    </div>
  );
};

export default detailProduct;
