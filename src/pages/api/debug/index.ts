import {NextApiRequest, NextApiResponse} from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({hello: process.env});
};
export default handler;
