# Keys and Addresses Guide

This guide provides step-by-step instructions for finding the keys and addresses required to configure the bot.

---

## **1. Finding Wallet Addresses and Private Keys in MetaMask**

### **Steps to Get Your Wallet Address**
1. Open the MetaMask extension or app.
2. Unlock your wallet using your password.
3. Click on the account name (e.g., "Account 1").
4. Copy the wallet address (it starts with `0x...`).

### **Steps to Export Your Private Key**
1. Open MetaMask and unlock your wallet.
2. Click on the three-dot menu in the top-right corner of your account.
3. Select **Account Details**.
4. Click **Export Private Key**.
5. Enter your MetaMask password and confirm.
6. Copy the private key and save it securely. **Never share this key with anyone!**

---

## **2. Obtaining an Alchemy API Key**

### **Steps to Create an Alchemy Account and Get an API Key**
1. Go to [Alchemy's website](https://www.alchemy.com/) and sign up for a free account.
2. Once logged in, create a new app:
   - Choose the **Base Mainnet** network.
   - Give your app a name (e.g., "SniperBot").
3. After the app is created, go to the app's dashboard.
4. Copy the **WebSocket URL** (it starts with `wss://...`).
5. Paste this URL into the `ALCHEMY_WSS_URL` field in your `.env` file.

---

## **3. Getting Telegram Bot Token and Chat ID**

### **Steps to Create a Telegram Bot and Get the Bot Token**
1. Open Telegram and search for the official **BotFather**.
2. Start a chat with BotFather and send the `/newbot` command.
3. Follow the instructions to create your bot:
   - Enter a name for your bot.
   - Enter a unique username for your bot.
4. BotFather will provide you with a **Bot Token**. Copy this token.

### **Steps to Get Your Telegram Chat ID**
1. Open Telegram and search for your bot using its username.
2. Start a chat with your bot and send a message (e.g., "Hello").
3. Open the following URL in your browser (replace `<BOT_TOKEN>` with your bot token):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Look for the `"chat"` section in the JSON response. Your **Chat ID** will be listed under `"id"`.

---

## **Important Notes**

- Keep all keys and private information secure.
- Do not share your `.env` file or private keys with anyone.
- If you suspect your private key has been compromised, move your funds to a new wallet immediately.