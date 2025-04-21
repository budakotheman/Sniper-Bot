# Crypto Sniper Bot for Base Network (Uniswap V3)

This bot is an autonomous crypto sniper bot built for the Base Network. It monitors Uniswap V3 for newly created liquidity pools, analyzes tokens for safety, and executes trades automatically based on predefined rules. The bot is optimized for gas efficiency and includes key features like profit-taking, stop-loss, and a panic sell mechanism.

---

## **Features**

- Monitors new liquidity pools on Uniswap V3 in real-time.
- Validates tokens for scams, honeypots, and other risks.
- Executes trades with customizable buy/sell parameters.
- Automatic profit-taking at 2x/3x and beyond.
- Stop-loss triggered when the price drops by 85%.
- Panic sell feature to sell all assets and transfer funds to a main wallet.
- Logs all actions (buys, sells, errors) for transparency.
- Sends Telegram notifications for critical events.

---

## **Prerequisites**

- **Node.js & npm** (Latest LTS version recommended)
- **MetaMask Wallet** (Private key for the bot's wallet)
- **Alchemy WebSocket RPC** (Paid plan for reliable real-time updates)
- **Telegram Bot** (Bot token and chat ID for notifications)

---

## **Installation**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sniper-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a `.env` File
Create a `.env` file in the project's root directory and add the following:

```plaintext
PRIVATE_KEY=your_bot_wallet_private_key
ALCHEMY_WSS_URL=wss://base-mainnet.g.alchemy.com/v2/your-api-key
MAIN_WALLET=your_main_wallet_address
BOT_WALLET=your_bot_wallet_address
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

---

## **Running the Bot**

### 1. Start the Bot
Run the bot with the following command:
```bash
node index.js
```

### 2. Panic Sell (Manual Trigger)
If needed, trigger the panic sell feature by pressing `Ctrl+C` while the bot is running. This will:
- Sell all tokens in the bot wallet.
- Transfer all WETH/ETH to the main wallet.

---

## **Troubleshooting & Optimization**

### Common Issues
1. **Bot Wallet Out of Funds**:
   - Ensure the bot wallet has enough ETH/WETH for trades and gas fees.

2. **High Gas Costs**:
   - Monitor gas costs and adjust `MAX_GAS_COST` in `constants.js` if needed.

3. **Missed Liquidity Pools**:
   - Verify that the Alchemy WebSocket connection is active and responsive.

---

## **Security Notes**

- Never share your `.env` file or private keys.
- Only run the bot on a secure, private machine.
- Use a separate wallet for the bot to minimize risk.

---

## **Additional Guides**

- [Keys and Addresses Guide](keys_and_addresses.md): Detailed instructions for finding wallet addresses, private keys, and API keys.
- [Parameters Customization Guide](parameters_guide.md): Explanation of all configurable parameters and how to modify them.