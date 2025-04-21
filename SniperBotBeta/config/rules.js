module.exports = {
  // Phase 1: Basic Validation Filters
  MIN_LIQUIDITY_IN_WETH: 0.5, // Minimum liquidity threshold
  MAX_TOKEN_AGE_SECONDS: 30, // Max age for new tokens
  BLACKLISTED_TOKENS: [
    // Add blacklisted token addresses here
  ],

  // Phase 2: Token Safety Scoring
  MAX_BUY_TAX_PERCENT: 10, // Max buy tax
  MAX_SELL_TAX_PERCENT: 10, // Max sell tax
  CONTRACT_VERIFICATION_REQUIRED: true, // Require verified contracts
  CHECK_OWNER_PRIVILEGES: true, // Check for dangerous owner functions

  // Phase 3: Profit Potential Estimation
  MIN_WETH_LIQUIDITY_RATIO: 0.6, // Minimum WETH proportion in liquidity
  TOKEN_SUPPLY_RANGE: { min: 1_000_000, max: 1_000_000_000 }, // Token supply range
  MAX_INITIAL_PRICE_IN_WETH: 0.01, // Max initial price per token

  // Phase 4: Custom Strategy Filters
  MAX_SLIPPAGE_PERCENT: 3, // Max slippage allowance
  STOP_LOSS_THRESHOLD: 0.85, // Stop-loss at 85% of buy price
  PROFIT_TIERS: [2, 3], // Profit-taking at 2x, 3x, etc.
};