// import { connect } from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";

// connect();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email, otp } = reqBody;

//     // Validate email and OTP presence
//     if (!email || !otp) {
//       return NextResponse.json({ error: "Missing email or OTP", status: 400 });
//     }

//     const user = await User.findOne({
//       email,
//       verifyOTP: otp,
//       verifyOTPExpiry: { $gt: Date.now() }, // Check for valid and unexpired OTP
//     });

//     if (!user) {
//       return NextResponse.json({ error: "Invalid email or OTP", status: 400 });
//     }

//     console.log(user);

//     user.isVerfied = true;
//     user.verifyOTP = undefined;
//     user.verifyOTPExpiry = undefined;
//     await user.save()
//     return NextResponse.json({
//         message: "Email verified successfully",
//         success: true })
//     }catch (error:any) {
//         console.error("Error verifying email:", error);
//         return NextResponse.json({error: error.message}, {status: 500})
//     }
// }


import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, otp } = reqBody;

    // Validate email and OTP presence
    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or OTP", status: 400 });
    }

    // Find user with valid and unexpired OTP using Prisma
    const user = await prisma.user.findUnique({
      where: {
        email,
        verifyToken: otp,
        verifyTokenExpiry: { gt: new Date() }, // Use appropriate function for your database
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or OTP", status: 400 });
    }

    // Update user with verification status using Prisma
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });

    const verifiedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      verified: verifiedUser.isVerified, // Include verification status in response
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
