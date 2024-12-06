const Blockchain = require("./blockchain");
const Transaction = require("./transaction");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const blockchain = new Blockchain();

function menu() {
  console.log("\n=== Blockchain Menu ===");
  console.log("1. Add a transaction");
  console.log("2. Mine pending transactions");
  console.log("3. Check wallet balance");
  console.log("4. Validate blockchain");
  console.log("5. Display blockchain");
  console.log("6. Exit");
  rl.question("Enter your choice: ", (choice) => {
    handleMenu(choice);
  });
}

function handleMenu(choice) {
  switch (choice) {
    case "1":
      rl.question("From address: ", (from) => {
        rl.question("To address: ", (to) => {
          rl.question("Amount: ", (amount) => {
            blockchain.addTransaction(new Transaction(from, to, parseFloat(amount)));
            console.log("Transaction added!");
            menu();
          });
        });
      });
      break;

    case "2":
      rl.question("Enter miner address: ", (miner) => {
        blockchain.minePendingTransactions(miner);
        console.log("Mining complete!");
        menu();
      });
      break;

    case "3":
      rl.question("Enter wallet address: ", (address) => {
        const balance = blockchain.getBalance(address);
        console.log(`Balance: ${balance}`);
        menu();
      });
      break;

    case "4":
      console.log("Is blockchain valid? ", blockchain.isChainValid());
      menu();
      break;

    case "5":
      console.log(JSON.stringify(blockchain, null, 2));
      menu();
      break;

    case "6":
      rl.close();
      break;

    default:
      console.log("Invalid choice! Try again.");
      menu();
      break;
  }
}

menu();
