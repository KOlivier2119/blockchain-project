function proofOfWork(block, difficulty) {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      block.nonce++;
      block.hash = block.calculateHash();
    }
    return block;
  }
  
  function proofOfStake(nodes) {
    const totalStake = nodes.reduce((sum, node) => sum + node.stake, 0);
    const random = Math.random() * totalStake;
    let cumulative = 0;
  
    for (const node of nodes) {
      cumulative += node.stake;
      if (random < cumulative) return node;
    }
  }
  
  module.exports = { proofOfWork, proofOfStake };
  