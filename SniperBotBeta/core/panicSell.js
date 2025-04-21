const ethers = require('ethers');
const Logger = require('../utils/logger');
const { SWAP_ROUTER_ADDRESS, DEFAULT_POOL_FEE, WETH_ADDRESS, MAIN_WALLET_ADDRESS } = require('../config/constants');

module.exports = {
  panicSellAll: async (wallet, tokenAddresses) => {
    Logger.warn('Panic sell initiated. Selling all assets and transferring to main wallet.');

    try {
      for (const tokenAddress of tokenAddresses) {
        // Fetch token balance
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ['function balanceOf(address) view returns (uint256)'],
          wallet
        );
        const balance = await tokenContract.balanceOf(wallet.address);

        if (balance.gt(0)) {
          Logger.info(`Selling token: ${tokenAddress} with balance: ${ethers.utils.formatEther(balance)}`);
          await sellTokens(wallet, tokenAddress, balance);
        }
      }

      // Transfer all WETH/ETH to the main wallet
      const ethBalance = await wallet.getBalance();
      if (ethBalance.gt(0)) {
        Logger.info(`Transferring ${ethers.utils.formatEther(ethBalance)} ETH to main wallet.`);
        const tx = await wallet.sendTransaction({
          to: MAIN_WALLET_ADDRESS,
          value: ethBalance,
        });
        Logger.info(`Transfer completed. Transaction Hash: ${tx.hash}`);
      }

      Logger.warn('Panic sell completed.');
    } catch (error) {
      Logger.error('Error during panic sell:', error);
      throw error;
    }
  },
};

async function sellTokens(wallet, tokenAddress, amountToSell) {
  Logger.info(`Selling tokens: ${tokenAddress}`);

  try {
    const swapRouterAbi = [
      'function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) payable returns (uint256)',
    ];
    const swapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, swapRouterAbi, wallet);

    // Set up parameters for exactInputSingle
    const params = {
      tokenIn: tokenAddress,
      tokenOut: WETH_ADDRESS,
      fee: DEFAULT_POOL_FEE,
      recipient: wallet.address,
      deadline: Math.floor(Date.now() / 1000) + 60,
      amountIn: amountToSell,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    };

    // Execute the sell transaction
    const tx = await swapRouter.exactInputSingle(params);
    Logger.info(`Sell executed. Transaction Hash: ${tx.hash}`);
    return tx;
  } catch (error) {
    Logger.error(`Error selling tokens: ${tokenAddress}`, error);
    throw error;
  }
}