import { registerUser } from "@/db/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await registerUser(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      }, {
        status: 201 
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message,
      }, {
        status: 400 
      });
    }
  } catch (error) {
    console.error("API Register Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    }, {
      status: 500 
    });
  }
};
