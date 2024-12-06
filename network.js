class Node {
    constructor(id, stake = 0) {
      this.id = id;
      this.stake = stake;
      this.blockchain = null;
    }
  
    broadcastBlockchain(blockchain) {
      this.blockchain = blockchain;
    }
  }
  
  module.exports = Node;
  