class Node {
    constructor(id, stake = 0) {
      this.id = id;
      this.stake = stake;
      this.blockchain = null;
    }
  
    broadcastBlockchain(blockchain) {
      this.blockchain = blockchain;
      console.log(`Blockchain broadcasted to Node ${this.id}`);
    }
  }
  
  class Network {
    constructor() {
      this.nodes = [];
    }
  
    addNode(node) {
      this.nodes.push(node);
      console.log(`Node ${node.id} added to the network.`);
    }
  
    broadcast(blockchain) {
      this.nodes.forEach((node) => node.broadcastBlockchain(blockchain));
    }
  }
  
  module.exports = { Node, Network };
  