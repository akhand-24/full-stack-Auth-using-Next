import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { token } = requestBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }
    user.isVerified = true;
    // user.forgotPasswordToken=undefined;
    // user.forgotPasswordTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("Error in verifying email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
