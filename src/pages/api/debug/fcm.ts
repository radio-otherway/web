import { getMessaging } from "firebase/messaging";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token:
      "eQM4lB5_AWPgTPfIqdJ4jQ:APA91bHwBiljwSbyx7gU_IPLu59hFPkCPd-0OElLNQyF4m6nBluXfBnyvh115tpSjR0ceO9IhY7PuwkoR09u_JykBmjBvrsuUkDWzOdKxVLnV5STOV98dr56Avo5HdmPrei6SxMbHeTb",
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};
