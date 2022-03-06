# Telegram Translator

After Russia invaded Ukraine I started following some Russian and Ukrainian public Telegram channels. Copying-and-pasting text into Google Translate got old pretty quickly. I was surprised to find that Telegram had no built-in translation function. This is a quick attempt to solve that problem.

Please let me know if:

- there is a better method for doing translations in Telegram
- this could be improved in any way
- there is a better translator API (that's also free)

## Description

How it works:

- you need a Telegram group and a Telegram bot in that group
- forward the Telegram message(s) you want translated to that group
- message(s) is registered as a bot update
- this app polls the bot's updates, gets any new messages, translates them, then uses the bot to send the translated messages back to the group

### Features

- Limitations:
  - only allows translation from 1 language to 1 language (currently: RU to EN)
  - translation quality is rudimentary

### Built with

- Node.js
- [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)
- [Gram.js](https://gram.js.org/)

## Getting started

### Prerequisites

- Telegram account
- Node.js

### Install

npm install

### Configure

1) Telegram configuration
    - [Get a Telegram API key](https://core.telegram.org/api/obtaining_api_id)
    - Create a Telegram group (e.g. "translator").
    - [Create a bot](https://core.telegram.org/bots/api) (e.g. "translator_115522_bot"). Configure bot: Allow groups.
    - Add bot to group. Make bot an administrator.

2) Configure Gram.js
    - This app requires a Gram.js StringSession (so you don't need to login to Telegram with the Gram.js API every time).
    - Code for getting that can be found [here](https://gram.js.org/) under the *Installation* heading.

3) Create a .env file and put it in the root of this project. See .env_template for all the values you need.
4) settings.js configuration
    - the only settings you should have to change are the source and target languages (currently RU to EN)

### Usage

1) node ./server.js
2) Forward a Telegram message to your translator group.
3) The translated message should appear as a message in the group (also refer to Node console)

### Troubleshooting

You'll probably have to figure it out on your own.

## Back matter

### Acknowledgements

- Inspired by [this thread](https://github.com/telegramdesktop/tdesktop/issues/6707).

### See also

- https://twitter.com/kamilkazani/status/1500505674991779842?s=20&t=mJiatWG5Dcn7VT2sjwxy5A !!

### To-do

- [ ] Multiple language options
  - Possible solution:
    - have 1 group for RU translations and 1 group for UK translations
    - bot belongs to both groups
    - bot translates based on which group message was sent to
- [ ] Better translation API
- [ ] Deploy app somewhere so that it doesn't have to be run locally

### License

This project is licensed under the MIT License.