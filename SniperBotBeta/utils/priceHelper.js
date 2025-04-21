const ethers = require('ethers');
const Logger = require('../utils/logger');

module.exports = {
  getChainlinkPrice: async (provider, priceFeedAddress) => {
    const priceFeedAbi = [
      'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    ];

    try {
      const priceFeed = new ethers.Contract(priceFeedAddress, priceFeedAbi, provider);
      const [, answer] = await priceFeed.latestRoundData();
      const price = parseFloat(ethers.utils.formatUnits(answer, 8)); // Chainlink prices are usually in 8 decimals
      Logger.info(`Chainlink Price: ${price}`);
      return price;
    } catch (error) {
      Logger.error('Error fetching Chainlink price:', error);
      return null;
    }
  },
};