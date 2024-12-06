const readline = require("readline");
const Wallet = require("./wallet");  // <-- Add this line to import Wallet class

function createCLI(blockchain, network, wallets) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Helper to display menu options
  function displayMenu() {
    console.log("\n=== Blockchain Menu ===");
    console.log("1. Create a new wallet");
    console.log("2. Add a transaction");
    console.log("3. Mine pending transactions");
    console.log("4. Check wallet balance");
    console.log("5. Validate blockchain");
    console.log("6. Display blockchain");
    console.log("7. Add a node to the network");
    console.log("8. Broadcast blockchain to network");
    console.log("9. Exit");
    rl.question("\nEnter your choice: ", (choice) => {
      handleMenu(parseInt(choice));
    });
  }

  // Handle menu options
  function handleMenu(choice) {
    switch (choice) {
      case 1: // Create a new wallet
        const wallet = new Wallet();
        wallets.push(wallet);
        console.log(`New wallet created!\nPublic Key: ${wallet.publicKey}`);
        displayMenu();
        break;

      case 2: // Add a transaction
        if (wallets.length < 2) {
          console.log("At least two wallets are required to perform transactions.");
          displayMenu();
          return;
        }
        rl.question("Sender wallet index: ", (fromIndex) => {
          rl.question("Recipient wallet index: ", (toIndex) => {
            rl.question("Amount: ", (amount) => {
              try {
                const tx = new (require("./transaction"))(
                  wallets[fromIndex].publicKey,
                  wallets[toIndex].publicKey,
                  parseFloat(amount)
                );
                blockchain.addTransaction(tx);
                console.log("Transaction added!");
              } catch (error) {
                console.log("Error adding transaction:", error.message);
              }
              displayMenu();
            });
          });
        });
        break;

      case 3: // Mine pending transactions
        rl.question("Enter miner wallet index: ", (minerIndex) => {
          if (!wallets[minerIndex]) {
            console.log("Invalid wallet index.");
            displayMenu();
            return;
          }
          blockchain.minePendingTransactions(wallets[minerIndex].publicKey);
          console.log("Mining complete!");
          displayMenu();
        });
        break;

      case 4: // Check wallet balance
        rl.question("Enter wallet index: ", (walletIndex) => {
          if (!wallets[walletIndex]) {
            console.log("Invalid wallet index.");
            displayMenu();
            return;
          }
          const balance = blockchain.getBalance(wallets[walletIndex].publicKey);
          console.log(`Wallet balance: ${balance}`);
          displayMenu();
        });
        break;

      case 5: // Validate blockchain
        console.log("Is blockchain valid? ", blockchain.isChainValid());
        displayMenu();
        break;

      case 6: // Display blockchain
        console.log("\nBlockchain:");
        console.log(JSON.stringify(blockchain, null, 2));
        displayMenu();
        break;

      case 7: // Add a node to the network
        rl.question("Enter node ID: ", (nodeId) => {
          rl.question("Enter node stake: ", (stake) => {
            const node = new (require("./network").Node)(nodeId, parseFloat(stake));
            network.addNode(node);
            console.log(`Node ${nodeId} added to the network.`);
            displayMenu();
          });
        });
        break;

      case 8: // Broadcast blockchain to the network
        network.broadcast(blockchain);
        console.log("Blockchain broadcasted to all nodes.");
        displayMenu();
        break;

      case 9: // Exit
        console.log("Exiting the blockchain CLI. Goodbye!");
        rl.close();
        break;

      default:
        console.log("Invalid choice! Please try again.");
        displayMenu();
        break;
    }
  }

  // Start displaying the menu
  displayMenu();
}

module.exports = createCLI;
