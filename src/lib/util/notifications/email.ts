import logger from "@/lib/util/logging";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const sendEmail = async (email: string, subject: string, body: string) => {
  try {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });
    const msg = await mg.messages.create("mg.podnoms.com", {
      from: "Radio Otherway <radio-otherway@podnoms.com>",
      to: [email],
      subject: subject,
      text: body
    });
    console.log("Email", "Email send successfully", msg);
  } catch (err) {
    logger.error("email", "Error sending email", err);
  }
};

export { sendEmail };
