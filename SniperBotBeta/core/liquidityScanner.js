const ethers = require('ethers');
const Logger = require('../utils/logger');
const { UNISWAP_FACTORY_ADDRESS } = require('../config/constants');

module.exports = {
  scanLiquidityPools: async (provider, onPoolCreated) => {
    Logger.info('Starting liquidity pool scanner...');

    const factoryAbi = [
      'event PoolCreated(address indexed token0, address indexed token1, uint24 fee, int24 tickSpacing, address pool)'
    ];

    const factoryContract = new ethers.Contract(UNISWAP_FACTORY_ADDRESS, factoryAbi, provider);

    factoryContract.on('PoolCreated', async (token0, token1, fee, tickSpacing, pool) => {
      Logger.info(`New Pool Detected: ${pool}`);
      Logger.info(`Token0: ${token0}, Token1: ${token1}, Fee: ${fee}`);

      // Trigger callback for handling newly created pools
      if (onPoolCreated) {
        await onPoolCreated(token0, token1, fee, pool);
      }
    });
  },
};