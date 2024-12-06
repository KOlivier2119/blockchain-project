const { generateKeyPair, signTransaction, verifySignature } = require("./crypto-utils");

class Wallet {
  constructor() {
    const keys = generateKeyPair();
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
  }

  signTransaction(transaction) {
    return signTransaction(transaction, this.privateKey);
  }
}

module.exports = Wallet;
