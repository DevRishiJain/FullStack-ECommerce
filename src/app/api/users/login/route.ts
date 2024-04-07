// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest , NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

//  connect()

//  export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json()
//         const {email,password}=reqBody
//         console.log(reqBody);
//         // remove console.log

//         const user = await User.findOne({email})
//         if(!user){
//             return NextResponse.json({error: "User does not exists"},
//                 {status: 400})
//         }
//         console.log("User Exists")

//         const validPassword = await bcryptjs.compare(password, user.password)
//         if(!validPassword){
//             return NextResponse.json({error: "Invalid Password"},
//                 {status: 400})
//         }
//         console.log(user)

//        const tokenData={
//         id:user._id,
//         username: user.username,
//         email:user.email
//        }

//        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})

//        const response = NextResponse.json({
//         message:"Login Successful",
//         success:true,
//        })

//        response.cookies.set("token",token,{
//         httpOnly:true,
//        })

//        return response

//     } catch (error:any) {
//         console.error(error);
//         return NextResponse.json({error: error.message},
//         {status: 500})
//     }
    
//  }


import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient(); // Initialize Prisma client

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Find user by email with Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Validate password with bcrypt
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    // Create JWT token with user data
    const tokenData = {
      id: user.id, // Use Prisma-generated ID
      username: user.user_name || "", // Use user_name if available
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h", // Set token expiration time
    });

    // Create a response with a cookie containing the token
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
