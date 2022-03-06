require('dotenv').config();
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const initTelegram = async () => {
  const apiId = Number.parseInt(process.env.API_ID);
  const apiHash = process.env.API_HASH;
  const stringSession = new StringSession(process.env.SESSION_STRING); // using this will avoid having to login again

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
        await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("Connected to Telegram.");
};

module.exports = {
  initTelegram
};