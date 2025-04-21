const ethers = require('ethers');
const Logger = require('../utils/logger');
const { MIN_LIQUIDITY_IN_WETH, MAX_TOKEN_AGE_SECONDS, BLACKLISTED_TOKENS } = require('../config/settings');
const { WETH_ADDRESS } = require('../config/constants');

module.exports = {
  validateToken: async (pool, token0, token1, provider) => {
    Logger.info(`Validating pool: ${pool}`);

    try {
      // Step 1: Check liquidity threshold
      const isLiquiditySufficient = await checkLiquidity(provider, pool);
      if (!isLiquiditySufficient) {
        Logger.warn(`Pool ${pool} skipped: Insufficient liquidity.`);
        return false;
      }

      // Step 2: Check token age
      const isTokenNew = await checkTokenAge(provider, pool);
      if (!isTokenNew) {
        Logger.warn(`Pool ${pool} skipped: Token too old.`);
        return false;
      }

      // Step 3: Check blacklist
      if (BLACKLISTED_TOKENS.includes(token0) || BLACKLISTED_TOKENS.includes(token1)) {
        Logger.warn(`Pool ${pool} skipped: Token is blacklisted.`);
        return false;
      }

      Logger.info(`Pool ${pool} passed validation.`);
      return true;

    } catch (error) {
      Logger.error(`Validation failed for pool ${pool}:`, error);
      return false;
    }
  },
};

async function checkLiquidity(provider, pool) {
  try {
    const poolContract = new ethers.Contract(
      pool,
      [
        'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
      ],
      provider
    );

    const [reserve0, reserve1] = await poolContract.getReserves();
    const liquidityInWETH = reserve0; // Assuming token0 is WETH
    return ethers.utils.formatEther(liquidityInWETH) >= MIN_LIQUIDITY_IN_WETH;
  } catch (error) {
    Logger.error('Error checking liquidity:', error);
    return false;
  }
}

async function checkTokenAge(provider, pool) {
  try {
    const block = await provider.getBlock('latest');
    const poolContract = new ethers.Contract(
      pool,
      [
        'event Sync(uint112 reserve0, uint112 reserve1)',
      ],
      provider
    );

    const filter = poolContract.filters.Sync();
    const events = await poolContract.queryFilter(filter, block.number - 5, block.number); // Check last 5 blocks

    if (events.length > 0) {
      const eventTimestamp = (await provider.getBlock(events[0].blockNumber)).timestamp;
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
      return currentTimestamp - eventTimestamp <= MAX_TOKEN_AGE_SECONDS;
    }
    return false;
  } catch (error) {
    Logger.error('Error checking token age:', error);
    return false;
  }
}