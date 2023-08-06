import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // check user exists
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordMatched = await bcryptjs.compare(password, user.password);

      if (isPasswordMatched) {
        // Create token data
        const tokenData = {
          id: user._id,
          username: user.username,
          email: user.email,
        };

        // Create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });

        const response = NextResponse.json({
          message: "Login successful",
          success: true,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json(
          { error: "Invalid Credentials: Password incorrect" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid Credentials: Email incorrect" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
