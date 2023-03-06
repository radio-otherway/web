import { getDoc } from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseConfig } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(StatusCodes.OK).json(process.env);
  res.end();
};

export default handler;
