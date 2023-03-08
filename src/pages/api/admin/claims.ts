import { auth } from "@/lib/firebase/admin";
import { withAuth } from "@/lib/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth.setCustomUserClaims(req.uid, { admin: true });
    res.status(200);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  res.end();
};

export default withAuth(handler);
