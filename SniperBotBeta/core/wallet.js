const ethers = require('ethers');
const Logger = require('../utils/logger');
require('dotenv').config();

const { BOT_PRIVATE_KEY, ALCHEMY_WSS_URL } = process.env;

module.exports = {
  getWalletProvider: () => {
    try {
      // Initialize WebSocket provider with Alchemy
      const provider = new ethers.providers.WebSocketProvider(ALCHEMY_WSS_URL);
      Logger.info('Connected to Alchemy WebSocket RPC.');

      // Initialize wallet from private key
      const wallet = new ethers.Wallet(BOT_PRIVATE_KEY, provider);
      Logger.info(`Wallet connected: ${wallet.address}`);

      return { wallet, provider };
    } catch (error) {
      Logger.error('Error initializing wallet and provider:', error);
      throw error;
    }
  },
};