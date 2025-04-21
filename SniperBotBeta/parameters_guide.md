# Parameters Customization Guide

This guide explains how to adjust the bot's parameters to customize its behavior.

---

## **1. Trade Parameters**

### **Trade Amount**
- **File**: `config/constants.js`
- **Parameter**:
  ```javascript
  MAX_TRADE_AMOUNT: '0.004', // Amount of ETH/WETH per trade
  ```
- **Description**: The amount of ETH/WETH the bot will use for each trade.
- **Recommendation**: Start with small amounts (e.g., `0.004`) to minimize risk.

---

## **2. Profit and Stop-Loss Settings**

### **Profit-Taking Tiers**
- **File**: `config/settings.js`
- **Parameter**:
  ```javascript
  PROFIT_TIERS: [2, 3], // Take profit at 2x, 3x, etc.
  ```
- **Description**: Determines at what multiples of the buy price the bot will sell.
- **Recommendation**: Use values like `[2, 3, 4]` for gradual profit-taking.

### **Stop-Loss**
- **File**: `config/settings.js`
- **Parameter**:
  ```javascript
  STOP_LOSS_THRESHOLD: 0.85, // Sell if the price drops below 85%
  ```
- **Description**: The percentage of the buy price below which the bot will sell to prevent losses.
- **Recommendation**: Keep this between `0.7` (70%) and `0.9` (90%).

---

## **3. Slippage**

### **Slippage**
- **File**: `config/settings.js`
- **Parameter**:
  ```javascript
  MAX_SLIPPAGE_PERCENT: 3, // Maximum slippage allowed
  ```
- **Description**: The maximum price difference allowed during trades.
- **Recommendation**: Keep this between `1%` and `5%`.

---

## **4. Gas and Performance**

### **Gas Costs**
- **File**: `config/constants.js`
- **Parameter**:
  ```javascript
  MAX_GAS_COST: '0.002', // Max gas cost in ETH
  ```
- **Description**: The maximum gas cost the bot will accept for a transaction.
- **Recommendation**: Monitor gas prices and adjust if needed.

### **Scan Frequency**
- **File**: `core/liquidityScanner.js`
- **Parameter**: Modify the interval for pool scanning.
- **Description**: Determines how frequently the bot checks for new pools.
- **Recommendation**: Avoid excessive scanning to minimize resource usage.

---

## **Important Notes**

- Adjust parameters cautiously, especially trade amounts and slippage.
- Test changes in a controlled environment (e.g., testnet or small ETH amounts).