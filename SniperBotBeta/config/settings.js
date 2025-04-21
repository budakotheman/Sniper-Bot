module.exports = {
  // Validation Rules
  MIN_LIQUIDITY_IN_WETH: 0.5, // Minimum liquidity in WETH
  MAX_TOKEN_AGE_SECONDS: 30, // Maximum token age for new pools
  BLACKLISTED_TOKENS: [
    // Add blacklisted token addresses here
  ],

  // Safety Checks
  MAX_BUY_TAX_PERCENT: 10, // Maximum buy tax allowed
  MAX_SELL_TAX_PERCENT: 10, // Maximum sell tax allowed
  CONTRACT_VERIFICATION_REQUIRED: true, // Require verified contracts
  CHECK_OWNER_PRIVILEGES: true, // Check for dangerous owner functions

  // Profit Strategy
  STOP_LOSS_THRESHOLD: 0.85, // Stop-loss at 85% of buy price
  PROFIT_TIERS: [2, 3], // Profit-taking at 2x, 3x, etc.

  // Miscellaneous
  MAX_SLIPPAGE_PERCENT: 3, // Maximum slippage allowed
};