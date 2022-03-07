const axios = require("axios");
// internal lib
const settings = require("../settings");

const translate = async (message, languageCode) => {
  let textToTranslate = [];

  if (!message.forward_from_chat) throw "\t received non-forwarded message, aborting translation";

  if (message.video) {
    textToTranslate.push(message.forward_from_chat.title);
    textToTranslate.push(message.caption);
  } else if (message.photo) {
    textToTranslate.push(message.forward_from_chat.title);
    textToTranslate.push(message.caption);
  } else {
    textToTranslate.push(message.forward_from_chat.title);
    textToTranslate.push(message.text);
  }

  // for translation efficiency: separate fields from the message object are joined
  //  together for translation, then split again afterwards
  textToTranslate = textToTranslate.join(settings.translator.SPLIT_CHARS);

  let chunks = [];
  if (textToTranslate.length > settings.translator.MAX_CHARS_PER_TRANSLATION) {
    chunks = chunkify(textToTranslate, settings.translator.MAX_CHARS_PER_TRANSLATION);
  } else {
    chunks.push(textToTranslate);
  }

  let translatedText = [];
  for (const i in chunks) {
    const chunk = chunks[i];
    const translation = await translator(chunk, languageCode);
    translatedText.push(translation);
  }

  translatedText = translatedText.join("").split(settings.translator.SPLIT_CHARS).join("\n");

  return translatedText;
};

const chunkify = (text, boundary) => {
  // this will split at first . or \n prior to boundary (to maintain integrity of the translation)
  const ACTUAL_EDGE = boundary - 8;
  const chunks = [];

  let leftover = text;
  while (leftover.length > 0) {
    const substr = leftover.substring(0, ACTUAL_EDGE);
    const substrRev = substr.split("").reverse().join("");
    const firstStopCharRev = substrRev.search(/[.]|\n/g);
    const lastStopChar = substr.length - firstStopCharRev;

    if (lastStopChar <= substr.length) {
      chunks.push(substr.substring(0, lastStopChar));
      leftover = leftover.substring(lastStopChar);
    } else {
      chunks.push(substr);
      leftover = leftover.substring(ACTUAL_EDGE);
    }
  }

  return chunks;
}

const translator = async (text, from) => {
  if (settings.translator.query) {
    const data = settings.translator.query.data;
    data.q = chunk;
    data.source = languageCode;

    const res = axios({
      method: settings.translator.query.method,
      url: settings.translator.query.url,
      data,
    });
    return Promise.resolve(res.data.translatedText);
  } else {
    const res = await settings.translator.func(text, from);
    return Promise.resolve(res.text);
  }
};

module.exports = {
  translate,
};