const ethers = require('ethers');
const Logger = require('../utils/logger');
const { SWAP_ROUTER_ADDRESS, WETH_ADDRESS, DEFAULT_POOL_FEE } = require('../config/constants');

module.exports = {
  executeTrade: async (wallet, tokenAddress, tradeAmount) => {
    Logger.info(`Executing trade: ${tradeAmount} ETH/WETH -> ${tokenAddress}`);

    try {
      // Define the SwapRouter ABI and connect to the contract
      const swapRouterAbi = [
        'function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) payable returns (uint256)',
      ];
      const swapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, swapRouterAbi, wallet);

      // Build the parameters for the exactInputSingle function
      const params = {
        tokenIn: WETH_ADDRESS,
        tokenOut: tokenAddress,
        fee: DEFAULT_POOL_FEE,
        recipient: wallet.address,
        deadline: Math.floor(Date.now() / 1000) + 60, // 1-minute deadline
        amountIn: ethers.utils.parseEther(tradeAmount.toString()),
        amountOutMinimum: 0, // Accept any amount of tokens
        sqrtPriceLimitX96: 0, // No price limit
      };

      // Execute the trade
      const tx = await swapRouter.exactInputSingle(params, {
        value: ethers.utils.parseEther(tradeAmount.toString()), // Send ETH/WETH
      });

      Logger.info(`Trade executed. Transaction Hash: ${tx.hash}`);
      return tx;
    } catch (error) {
      Logger.error('Trade execution failed:', error);
      throw error;
    }
  },
};