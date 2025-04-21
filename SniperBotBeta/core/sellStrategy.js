const ethers = require('ethers');
const Logger = require('../utils/logger');
const PriceHelper = require('../utils/priceHelper');
const { SWAP_ROUTER_ADDRESS, DEFAULT_POOL_FEE, WETH_ADDRESS } = require('../config/constants');
const { STOP_LOSS_THRESHOLD, PROFIT_TIERS } = require('../config/settings');

module.exports = {
  monitorAndSell: async (wallet, tokenAddress, initialBuyPrice) => {
    Logger.info(`Monitoring token: ${tokenAddress} for sell opportunities.`);

    try {
      const tokenData = {
        currentProfitTier: 0, // Start at the first profit tier
      };

      while (true) {
        // Fetch the current token price
        const currentPrice = await PriceHelper.getTokenPrice(wallet, tokenAddress, WETH_ADDRESS);

        // Check for profit-taking
        if (
          tokenData.currentProfitTier < PROFIT_TIERS.length &&
          currentPrice >= initialBuyPrice * PROFIT_TIERS[tokenData.currentProfitTier]
        ) {
          Logger.info(`Profit tier ${PROFIT_TIERS[tokenData.currentProfitTier]}x reached.`);
          await sellTokens(wallet, tokenAddress, 0.75); // Sell 75% of tokens
          tokenData.currentProfitTier++;
        }

        // Check for stop-loss
        if (currentPrice <= initialBuyPrice * STOP_LOSS_THRESHOLD) {
          Logger.warn('Stop-loss threshold reached. Selling all tokens.');
          await sellTokens(wallet, tokenAddress, 1.0); // Sell 100% of tokens
          break;
        }

        // Wait before the next check (interval of 5 seconds)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      Logger.error('Error in sell strategy:', error);
      throw error;
    }
  },
};

async function sellTokens(wallet, tokenAddress, sellPercentage) {
  Logger.info(`Selling ${sellPercentage * 100}% of tokens: ${tokenAddress}`);

  try {
    // Define the SwapRouter ABI and connect to the contract
    const swapRouterAbi = [
      'function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) payable returns (uint256)',
    ];
    const swapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, swapRouterAbi, wallet);

    // Fetch token balance
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['function balanceOf(address) view returns (uint256)'],
      wallet
    );
    const balance = await tokenContract.balanceOf(wallet.address);

    // Calculate the amount to sell
    const amountToSell = balance.mul(ethers.BigNumber.from(Math.floor(sellPercentage * 100))).div(100);

    // Build the parameters for the exactInputSingle function
    const params = {
      tokenIn: tokenAddress,
      tokenOut: WETH_ADDRESS,
      fee: DEFAULT_POOL_FEE,
      recipient: wallet.address,
      deadline: Math.floor(Date.now() / 1000) + 60, // 1-minute deadline
      amountIn: amountToSell,
      amountOutMinimum: 0, // Accept any amount of ETH/WETH
      sqrtPriceLimitX96: 0, // No price limit
    };

    // Execute the trade
    const tx = await swapRouter.exactInputSingle(params);
    Logger.info(`Sell executed. Transaction Hash: ${tx.hash}`);
    return tx;
  } catch (error) {
    Logger.error('Sell execution failed:', error);
    throw error;
  }
}