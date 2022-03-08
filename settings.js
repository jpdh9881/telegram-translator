require("dotenv").config();
const translate = require("@vitalets/google-translate-api");

const longPoller = {
  /**
   * This is the timeout for the long poll
   */
  TIMEOUT: 5 * 60 * 1000, // 5 mins
};

const telegram = {
  BOT_ENDPOINT: `https://api.telegram.org/bot${process.env.BOT_STRING}/`
};

const translator = {
  // query: {
  //   method: "POST",
  //   url: "https://libretranslate.de/translate",
  //   data: {
  //     // q: string
  //     // source: language code
  //     target: "en",
  //   },
  // },
  query: null,
  func(text, from, to = "en") {
    return translate(text, { from, to });
  },
  MAX_CHARS_PER_TRANSLATION: 5000,
  SPLIT_CHARS: " @@@ ",
  SPLIT_CHARS_POST_TRANSLATION: ". @@@ ", // google translate does this for some reason
};

module.exports = {
  longPoller,
  telegram,
  translator,
};