import { withAuth } from "@/lib/middleware";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(StatusCodes.OK).json(process.env);
  res.end();
};

export default withAuth(handler);
