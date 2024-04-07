import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allInterests = await prisma.interest.findMany();
    res.status(200).json({ data: allInterests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching interests" });
  }
}
