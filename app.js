const Blockchain = require("./blockchain");
const { Node, Network } = require("./network");
const Wallet = require("./wallet");
const createCLI = require("./cli");  // Importing the CLI module

// Initialize the blockchain and network
const blockchain = new Blockchain();
const network = new Network();

// Store wallets created during runtime
const wallets = [];

console.log("Initializing blockchain...");

// Start the CLI for user interaction
createCLI(blockchain, network, wallets);
