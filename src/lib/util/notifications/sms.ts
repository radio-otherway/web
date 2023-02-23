import logger from "@/lib/util/logging";

const sendSMS = async (number: string, body: string) => {
  const twilio = require("twilio");
  const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

  const message = await client.messages
    .create({
      body: body,
      to: number, // Text this number
      from: process.env.TWILIO_FROM // From a valid Twilio number
    });
  logger.debug(`SMS sent to ${number}`, message);
};

export { sendSMS };
