import axios from "axios";
import logger from "./logging";

const callWebHook = async (url: string, payload?: any): Promise<number> => {
  try {
    const response = await axios.post(url, payload);

    return response.status;
  } catch (err) {
    logger.error("httpUtils", "callWebHook", err);
  }
  return 500;
};

export { callWebHook };
