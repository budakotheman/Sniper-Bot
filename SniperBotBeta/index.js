const Logger = require('./utils/logger');
const Wallet = require('./core/wallet');
const LiquidityScanner = require('./core/liquidityScanner');
const TokenAnalyzer = require('./core/tokenAnalyzer');
const TradeExecutor = require('./core/tradeExecutor');
const SellStrategy = require('./core/sellStrategy');
const PanicSell = require('./core/panicSell');
const { sendMessage } = require('./utils/telegram');

(async () => {
  try {
    // Step 1: Initialize wallet and provider
    const { wallet, provider } = Wallet.getWalletProvider();

    // Step 2: Start scanning for liquidity pools
    await LiquidityScanner.scanLiquidityPools(provider, async (token0, token1, fee, pool) => {
      Logger.info(`New pool detected: ${pool}`);
      sendMessage(`New pool detected: ${pool}\nToken0: ${token0}\nToken1: ${token1}`);

      // Step 3: Validate and analyze tokens
      const isValid = await TokenAnalyzer.validateToken(pool, token0, token1, provider);
      if (!isValid) {
        Logger.warn(`Skipping pool: ${pool}`);
        return;
      }

      // Step 4: Execute trade
      const tradeAmount = 0.004; // Defined in settings/config
      const tx = await TradeExecutor.executeTrade(wallet, token1, tradeAmount);

      // Step 5: Start monitoring for sell opportunities
      const buyPrice = tradeAmount; // Assume 1:1 initial price in this example
      SellStrategy.monitorAndSell(wallet, token1, buyPrice);
    });

    // Gracefully handle shutdowns (e.g., Ctrl+C)
    process.on('SIGINT', async () => {
      Logger.warn('Shutting down bot...');
      sendMessage('Bot shutting down. Initiating panic sell.');
      await PanicSell.panicSellAll(wallet, []); // Empty array for demo; populate with tracked tokens
      process.exit();
    });
  } catch (error) {
    Logger.error('Critical error in bot:', error);
    sendMessage(`Critical error in bot: ${error.message}`);
  }
})();