import { NextApiRequest, NextApiResponse } from "next";
import db, { shows } from "@/lib/db";
import { getDocs, query, where } from "@firebase/firestore";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = query(shows, where("date", ">", new Date()));
  const upcoming = await getDocs(q);
  res.status(StatusCodes.OK).json(upcoming.docs.map((r) => r.data()));
  res.end();
};
export default handler;
