import { NextApiRequest, NextApiResponse } from "next";
import db, { notificationSchedules } from "@/lib/db";
import { getDocs, query, where } from "@firebase/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = query(notificationSchedules);
  const upcoming = await getDocs(q);
  res.status(StatusCodes.OK).json(
    upcoming.docs.map((r) => ({
      showId: r.id,
      ...r.data(),
    }))
  );
  res.end();
};
export default handler;
