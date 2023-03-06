import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { Shows } from "@/lib/db/collections";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const shows = await Shows.getUpcomingShows();
  res.status(StatusCodes.OK).json(shows);
  res.end();
};
export default handler;

