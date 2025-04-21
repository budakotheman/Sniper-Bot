const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('../config/constants');

// Initialize Telegram Bot only if the token is provided
let bot = null;
if (TELEGRAM_BOT_TOKEN) {
  bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
} else {
  console.warn('Telegram Bot Token not provided. Telegram notifications will be disabled.');
}

module.exports = {
  sendMessage: (message) => {
    if (!bot || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram details missing. Skipping message:', message);
      return;
    }

    bot.sendMessage(TELEGRAM_CHAT_ID, message).catch((error) => {
      console.error('Error sending Telegram message:', error);
    });
  },
};