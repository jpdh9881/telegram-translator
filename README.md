# Telegram Translator

After Russia invaded Ukraine I started following some Russian and Ukrainian public Telegram channels. Copying-and-pasting text into Google Translate got old pretty quickly. I was surprised to find that Telegram had no built-in translation function. This is a quick attempt to solve that problem.

Please let me know if:

- there is a better method for doing translations in Telegram
- this could be improved in any way
- there is a better translator API (that's also free)

## Description

How it works:

- you need a Telegram group(s) and a Telegram bot in that group
- forward the Telegram messages you want translated to that group
- message(s) are registered as a bot update
- this app polls the bot's updates, gets new messages, translates them, then uses the bot to send the translated messages back to the group

### Features

Can translate from multiple languages.
[List of supported languages](https://github.com/vitalets/google-translate-api/blob/master/languages.js)

### Built with

- Node.js
  - [Gram.js](https://gram.js.org/)
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)

## Getting started

### Prerequisites

- Telegram account
- Node.js

### Install

npm install

### Configure

1) Telegram configuration
    - [Get a Telegram API key](https://core.telegram.org/api/obtaining_api_id)
    - Create a Telegram group. The name of the group must be in the format "name_$$" where $$ is a (supported language code)[https://github.com/vitalets/google-translate-api/blob/master/languages.js].
      - You can create multiple groups (i.e. a translate_ru group, a translate_uk group, etc.)
    - [Create a bot](https://core.telegram.org/bots/api) (e.g. "translator_115522_bot"). You only need one bot.
    - Configure the bot to allow groups.
    - Add bot to your translator groups. Make bot an administrator.

2) Configure Gram.js
    - This app requires a Gram.js StringSession (so you don't need to login to Telegram with the Gram.js API every time).
    - Code for getting that can be found [here](https://gram.js.org/) under the *Installation* heading.

3) Create a .env file and put it in the root of this project. See .env_template for all the values you need.
4) settings.js configuration
    - the only setting you should have to change is the target language (currently EN)

### Usage

1) node ./server.js
2) Forward a Telegram message to your translator group.
3) The translated message should appear as a message in the group

### Troubleshooting

You'll probably have to figure it out on your own.

## Back matter

### Versions

Currently: 0.1.4

- 0.1.4
  - channel title is now followed by a new line post translation (fixed the SPLIT_CHARS in settings.js)
- 0.1.3
  - fixes bug where language codes were being lowercased, causing issues for Traditional/Simplified Chinese (zh-CN/zh-TW must allow uppercase)
- 0.1.2
  - LibreTranslate API stopped working. Switched to Google Translate alternative
- 0.1.1
  - Translates from multiple languages
- 0.1.0
  - Translates from 1 language

### Acknowledgements

- Inspired by [this thread](https://github.com/telegramdesktop/tdesktop/issues/6707).

### See also

- https://twitter.com/kamilkazani/status/1500505674991779842 !!

### To-do

- [x] Multiple language options
- [x] Better translation API
- [ ] Deploy app somewhere so that it doesn't have to be run locally

### License

This project is licensed under the MIT License.