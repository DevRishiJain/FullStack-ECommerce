// import { getDataFromToken } from "@/helpers/getData";

// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";
// import { connect } from "@/dbConfig/dbConfig";

// connect();

// export async function GET(request:NextRequest){

//     try {
//         const userId = await getDataFromToken(request);
//         const user = await User.findOne({_id: userId}).select("-password");
//         return NextResponse.json({
//             mesaaage: "User found",
//             data: user
//         })
//     } catch (error:any) {
//         return NextResponse.json({error: error.message}, {status: 400});
//     }

// }

// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";
// import { getDataFromToken } from "@/helpers/getData";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   try {
//     const user = await getDataFromToken(request);

//     // Find user by ID with Prisma
//     // const user = await prisma.user.findUnique({
//     //   where: { id: userId }, // Use Prisma-generated ID
//     //   select: { password: false }, // Exclude password from response
//     // });
//     const user = await prisma.user.findUnique({
//       where: { id: 1 },
//       select: {
//         id: true, // Select at least one field (e.g., ID)
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 400 });
//     }

//     return NextResponse.json({
//       message: "User found",
//       data: user,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// Import Prisma Client
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

// Import other dependencies
import { getDataFromToken } from '@/helpers/getData';
import { NextRequest, NextResponse } from 'next/server';
// import { connect } from '@/dbConfig/dbConfig'; // Assuming this sets up Prisma connection

connect(); // Establish Prisma connection

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // Fetch user data using Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true, // Specify other fields you want to include
        // Exclude password: password: false,
      },
    });

    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    await prisma.$disconnect(); // Close Prisma connection
  }
}
