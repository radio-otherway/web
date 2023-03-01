import { sendWhatsApp } from "@/lib/util/notifications/sms";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
  const { number, message } = req.body;
  if (number && message) {
    const result = await sendWhatsApp(number, message);
    if (result) res.status(StatusCodes.OK);
    else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
  }
  res.end();
}
