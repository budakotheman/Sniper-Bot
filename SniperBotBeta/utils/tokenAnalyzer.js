const axios = require('axios');
const Logger = require('../utils/logger');

module.exports = {
  analyzeTokenWithTokenSniffer: async (tokenAddress) => {
    try {
      const response = await axios.get(`https://tokensniffer.com/api/v1/${tokenAddress}`);
      if (response.data && response.data.scam) {
        Logger.warn(`Token ${tokenAddress} flagged as scam by TokenSniffer.`);
        return false;
      }
      Logger.info(`Token ${tokenAddress} passed TokenSniffer check.`);
      return true;
    } catch (error) {
      Logger.error('Error analyzing token with TokenSniffer:', error);
      return false;
    }
  },
};