require('dotenv').config();
const axios = require("axios");
// internal lib
const settings = require("../settings");
const { translate } = require("./translator");

const longPoller = async () => {
  let updateId;
  while (true) {
    console.log(`${new Date} >> Making long poll w/ timeout of ${settings.longPoller.TIMEOUT}ms`);
    
    let updates;
    try {
      // see if there are new messages in the channel to translate
      const updateResponse = await getUpdates(updateId);
      
      if (!updateResponse.data.ok) throw updateResponse;

      updates = updateResponse.data.result;
      if (updates.length == 0) throw "no new updates";
      
      for (const update of updates) {
        
        const message = update.message;
        const languageCode = message.chat.title.split("_")[1];
        console.log(`\t translating message (${languageCode})...`);
        const translatedText = await translate(message, languageCode);

        console.log("\t sending translated message...");
        const resSendMessage = await sendMessage(message.chat.id, translatedText);
        console.log("\t sent translated message!")
      }
    } catch (e) {
      console.log(e);
    }

    if (updates.length > 0) updateId = updates[updates.length - 1].update_id + 1;
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
const sendMessage = (chatId, message) => {
  return axios({
    method: "GET",
    url: `${settings.telegram.BOT_ENDPOINT}sendMessage`, // https://core.telegram.org/bots/api#sendmessage
    params: {
      chat_id: chatId,
      text: message,
    },
  });
};

module.exports = {
  longPoller,
};