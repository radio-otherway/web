import logger from "@/lib/util/logging";

const sendSMS = async (number: string, body: string) => {
  const client = require("twilio")(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const message = await client.messages.create({
    body: body,
    to: number, // Text this number
    from: process.env.TWILIO_FROM, // From a valid Twilio number
  });
  logger.debug(`SMS sent to ${number}`, message);
};
const sendWhatsApp = async (number: string, body: string): Promise<boolean> => {
  const client = require("twilio")(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  try {
    const message = await client.messages.create({
      body: body,
      from: `whatsapp:${process.env.WHATSAPP_NUMBER}`,
      to: `whatsapp:${number}`,
    });
    logger.debug(`WhatsApp sent to ${number}`, message);
    logger.debug("sms", "messageSent", message.sid);
    return true;
  } catch (err) {
    logger.error("sms", "message failure", err);
  }
  return false;
};

export { sendSMS, sendWhatsApp };
