## Deploy on the ropsten network

```
truffle compile
truffle migrate
```

### Setup
https://codecalamity.com/truffle-going-from-ganache-to-testnet-ropsten/

- Create new wallet in infura.io

- Funding your wallet for deploying contract: https://faucet.ropsten.be/

- Create `.env` file from `.env.example`


### Deploy
```
$ truffle deploy --network ropsten
```
### Migrate
```
$ truffle migrate -f 2 --network ropsten
```

## Init smart contract with web3

- Compile smart contract with truffle 