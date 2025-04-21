const axios = require('axios');
const Logger = require('../utils/logger');

module.exports = {
  findBestTradeOn1Inch: async (fromToken, toToken, amount) => {
    const url = `https://api.1inch.io/v4.0/137/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&fromAddress=0xYourBotWalletAddress&slippage=1`; // Adjust slippage as needed

    try {
      const response = await axios.get(url);
      Logger.info(`1Inch Best Trade: ${response.data.tx.data}`);
      return response.data.tx;
    } catch (error) {
      Logger.error('Error finding trade on 1Inch:', error);
      return null;
    }
  },
};