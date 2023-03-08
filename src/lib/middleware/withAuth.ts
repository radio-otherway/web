import { auth } from "@/lib/firebase/admin";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "../util/logging";

const withAuth = (handler: any) => {
  return async (req: any, res: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end("Not authenticated. No Auth header");
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end("Not authenticated");
      req.uid = decodedToken.uid;
    } catch (error: any) {
      logger.error("withAuth", error);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === "auth/internal-error") {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
};
export default withAuth;
