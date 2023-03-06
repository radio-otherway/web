import { NextApiRequest, NextApiResponse } from "next";

// const _getPayload = (message: string) => ({
//   notification: {
//     title: "Argle Bargle",
//     body: `You are a ${message}`,
//     image: "https://otherway.fergl.ie/logo.png",
//   },
//   data: {
//     url: "https://google.com",
//   },
// });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Send a message to the device corresponding to the provided
  // registration token.
  // try {
  //   const results: any[] = [];
  //   const users = await getUsersByEmail();
  //   for (const u of userResultSet.docs) {
  //     const user = u.data() as Profile;
  //     if (user?.deviceRegistrations) {
  //       for (const token of user?.deviceRegistrations) {
  //         results.push(
  //           await firebaseAdmin
  //             .messaging()
  //             .sendToDevice(token.fcmToken, _getPayload(token.deviceType))
  //         );
  //       }
  //     }
  //   }
  //   res.status(StatusCodes.OK).json({ results });
  // } catch (err) {
  //   logger.error("fcm", "sendPush", "Failed", err);
  //   res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  // }
  res.end();
};
export default handler;
