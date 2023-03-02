import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(StatusCodes.OK).end();
}
