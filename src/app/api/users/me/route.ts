import { getInfoFromToken } from "@/helpers/getInfoFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/odel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getInfoFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
