require("dotenv").config();

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
  query: {
    method: "POST",
    url: "https://libretranslate.de/translate",
    data: {
      // q: string
      // source: language code
      target: "en",
    },
  },
  MAX_CHARS_PER_TRANSLATION: 500,
  SPLIT_CHARS: ".@ ",
};

module.exports = {
  longPoller,
  telegram,
  translator,
};