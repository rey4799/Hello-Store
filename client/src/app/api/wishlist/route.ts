import { Wishlist } from "@/db/models/wishlist.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  productId: string;
}

export const GET = async (request: NextRequest) => {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is missing from the request headers" }, { status: 400 });
    }

    const wishlist = await Wishlist.findAllByUserId(new ObjectId(userId));
    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("Wishlist GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is missing from the request headers" }, { status: 400 });
    }

    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is missing from the request body" }, { status: 400 });
    }

    const added = await Wishlist.add(new ObjectId(userId), new ObjectId(productId));

    return NextResponse.json({
      success: added,
      message: added ? "Product added to wishlist" : "Failed to add product to wishlist"
    });
  } catch (error) {
    console.error("Wishlist POST Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is missing from the request headers" }, { status: 400 });
    }

    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is missing from the request body" }, { status: 400 });
    }

    const removed = await Wishlist.remove(new ObjectId(userId), new ObjectId(productId));

    return NextResponse.json({
      success: removed,
      message: removed ? "Product removed from wishlist" : "Failed to remove product from wishlist"
    });
  } catch (error) {
    console.error("Wishlist DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
