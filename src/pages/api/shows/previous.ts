import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import MixcloudClient from "@/lib/clients/mixcloud/mixcloudClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const shows = await MixcloudClient.getShows();
  res.status(StatusCodes.OK).json(shows);
  res.end();
};
export default handler;
