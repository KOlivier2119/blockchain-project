const Blockchain = require("./blockchain");
const Transaction = require("./transaction");
const { Node, Network } = require("./network");
const Wallet = require("./wallet");

const blockchain = new Blockchain();
const network = new Network();

console.log("Initializing blockchain...");

// Create wallets
const wallet1 = new Wallet();
const wallet2 = new Wallet();
console.log("Wallet 1:", wallet1.publicKey);
console.log("Wallet 2:", wallet2.publicKey);

// Add a transaction
const tx = new Transaction(wallet1.publicKey, wallet2.publicKey, 100);
blockchain.addTransaction(tx);

// Mine transactions
blockchain.minePendingTransactions(wallet1.publicKey);

// Display the blockchain
console.log(JSON.stringify(blockchain, null, 2));

// Add nodes to the network
const node1 = new Node("Node1", 10);
const node2 = new Node("Node2", 20);

network.addNode(node1);
network.addNode(node2);

// Broadcast the blockchain to all nodes
network.broadcast(blockchain);
