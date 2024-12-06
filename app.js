const Blockchain = require("./blockchain");
const Transaction = require("./transaction");
const { proofOfWork, proofOfStake } = require("./consensus");
const Node = require("./network");

const myBlockchain = new Blockchain();

// Add transactions
myBlockchain.addTransaction(new Transaction("Alice", "Bob", 50));
myBlockchain.addTransaction(new Transaction("Bob", "Charlie", 30));

// Mine pending transactions
console.log("Mining block...");
myBlockchain.minePendingTransactions("Miner1");

// Verify blockchain
console.log("Is blockchain valid?", myBlockchain.isChainValid());

// Simulate Proof of Stake
const nodes = [
  new Node("Node1", 5),
  new Node("Node2", 15),
  new Node("Node3", 10)
];
console.log("Selected node for PoS:", proofOfStake(nodes).id);
