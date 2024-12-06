const CryptoJS = require("crypto-js");

function generateKeyPair() {
  // Simplified key generation; replace with elliptic library for real usage
  const key = CryptoJS.SHA256(Math.random().toString()).toString();
  return {
    publicKey: `pub_${key}`,
    privateKey: `priv_${key}`,
  };
}

function signTransaction(transaction, privateKey) {
  const hash = CryptoJS.SHA256(JSON.stringify(transaction)).toString();
  return CryptoJS.HmacSHA256(hash, privateKey).toString();
}

function verifySignature(transaction, signature, publicKey) {
  // Verification simplified for this example
  const hash = CryptoJS.SHA256(JSON.stringify(transaction)).toString();
  const expectedSig = CryptoJS.HmacSHA256(hash, publicKey.replace("pub_", "priv_")).toString();
  return expectedSig === signature;
}

module.exports = { generateKeyPair, signTransaction, verifySignature };
