require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const MNEMONIC=process.env.MNEMONIC
const ROPSTEN_URL=process.env.ROPSTEN_URL

module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  contracts_build_directory: "./frontend/src/Contract/abi",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC,ROPSTEN_URL),
      network_id: 3
    }
  }
  
};
