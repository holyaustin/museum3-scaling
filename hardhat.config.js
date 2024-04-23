require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.17",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      chainId: 128123,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    sphinx: {
      url: "https://sphinx.shardeum.org/",
      chainId: 8082,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 59141,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    rtfTestnet: {
      url: `https://rpc-testnet.rtfight.com/`,
      chainId: 22999,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
  settings: {
    optimizer: {
      enabled: true,
    },
  },
};
