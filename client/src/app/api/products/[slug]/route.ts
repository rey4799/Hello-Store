import { Product } from "@/db/models/product.model";

type ProductParam = { params: { slug: string } };
export async function GET(request: Request, { params }: ProductParam) {
    const productSlug = params.slug
    const products = await Product.findBySlug(productSlug)
    
    return Response.json(products)
}