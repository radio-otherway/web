import { getDoc } from "firebase/firestore";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(StatusCodes.OK).json({ response: "Hello Sailor" });
  res.end();
};

export default handler;
