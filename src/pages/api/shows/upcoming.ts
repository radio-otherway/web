import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const shows = await db
    .collection("shows")
    .orderBy("date")
    .get();
  res.status(200).json(shows.docs.map(show => {
    const result = {
      id: show.id,
      ...show.data()
    };
    return result;
  }));
  res.end();
};
export default handler;
