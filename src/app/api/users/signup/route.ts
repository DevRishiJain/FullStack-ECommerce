// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest , NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

//  connect()

//  export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json()
//         const {username,email,password}=reqBody
//         console.log(reqBody);
//         // remove console.log

//         const user = await User.findOne({email})
//         if(user){
//             return NextResponse.json({error: "User already exists"},
//                 {status: 400})
//         }

//         const salt=await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash
//         (password, salt)

//         const newUser = new User({
//             username,
//             email,
//             password:hashedPassword
//         })

//         const savedUser = await newUser.save()
//         console.log(savedUser);
//         // Remove console log

//         await sendEmail({email, emailType:"VERIFY",
//                         userId: savedUser._id})

//         return NextResponse.json({
//             message: "User Created Successfully",
//             success:true,
//             savedUser
//         })

//     } catch (error:any) {
//         console.error(error);
//         return NextResponse.json({error: error.message},
//         {status: 500})
//     }
    
//  }

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

const prisma = new PrismaClient(); // Initialize Prisma client

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user_name, email, password } = reqBody;

    // Check for existing user with Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create user with Prisma
    const newUser = await prisma.user.create({
      data: {
        user_name,
        email,
        password: hashedPassword,
        // Add other fields as needed (e.g., isVerified)
      },
    });

    await sendEmail({ email, emailType: "VERIFY", userId: newUser.id });

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser: newUser, // Include Prisma-generated ID
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
