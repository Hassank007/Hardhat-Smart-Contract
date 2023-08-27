require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require('solidity-coverage');

SEPOLIA_URL = process.env.SEPOLIA_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;
ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY;
COINMARKET_APIKEY = process.env.COINMARKET_APIKEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_APIKEY,
  },
  gasReporter: {
    enabled: true,
    outputFile:'gas-Reporter.txt',
    noColors: true,
    currency: "USD",
    coinmarketcap:COINMARKET_APIKEY,
  },
};
