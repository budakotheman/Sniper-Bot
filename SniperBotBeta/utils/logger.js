const fs = require('fs');
const path = require('path');

class Logger {
  static logFile = path.join(__dirname, '../logs/bot.log');

  static info(message) {
    this.writeLog('INFO', message);
  }

  static warn(message) {
    this.writeLog('WARN', message);
  }

  static error(message, error = null) {
    this.writeLog('ERROR', message);
    if (error) {
      this.writeLog('ERROR', error.stack || error.message);
    }
  }

  static writeLog(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    console.log(logMessage);

    // Append to log file
    fs.appendFileSync(this.logFile, logMessage);
  }
}

module.exports = Logger;