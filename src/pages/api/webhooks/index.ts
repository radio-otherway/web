import { NextApiRequest, NextApiResponse } from "next";
import { setupCalendarWebhook } from "@/lib/util/google/calendarWatcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ hello: process.env });
};
export default handler;
