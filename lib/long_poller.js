require('dotenv').config();
const axios = require("axios");
// internal lib
const settings = require("../settings");
const { translate } = require("./translator");

const longPoller = async () => {
  let updateId;
  while (true) {
    console.log(`${new Date} >> Making long poll w/ timeout of ${settings.longPoller.TIMEOUT}ms`);
    

    try {
      // see if there are new messages in the channel to translate
      const updateResponse = await getUpdates(updateId);
      
      if (!updateResponse.data.ok) throw updateResponse;

      const updates = updateResponse.data.result;
      if (updates.length == 0) throw "no new updates";
      
      for (const update of updates) {
        console.log("\t translating message...");
        const message = update.message;
        const translatedText = await translate(message);

        console.log("\t sending translated message...");
        const resSendMessage = await axios({
          method: "GET",
          url: `${settings.telegram.BOT_ENDPOINT}sendMessage`, // https://core.telegram.org/bots/api#sendmessage
          params: {
            chat_id: process.env.CHAT_ID,
            text: translatedText,
          },
        });
        console.log("\t sent translated message!")
      }

      updateId = updates[updates.length - 1].update_id + 1;
    } catch (e) {
      console.log(e);
    }
  }
};

// helper functions
const getUpdates = (updateId) => {
  return axios({
    method: "GET",
    url: `${settings.telegram.BOT_ENDPOINT}getUpdates`, // https://core.telegram.org/bots/api#getupdates
    params: {
      timeout: settings.longPoller.TIMEOUT,
      allowed_updates: ["message"],
      offset: updateId || "",
    },
    timeout: settings.longPoller.TIMEOUT,
  });
};

module.exports = {
  longPoller,
};