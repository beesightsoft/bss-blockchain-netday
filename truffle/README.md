## Deploy on the ropsten network


### Setup
https://codecalamity.com/truffle-going-from-ganache-to-testnet-ropsten/

Create `.env` file from `.env.example`

### Deploy
```
$ truffle deploy --network ropsten
```
### Migrate
```
$ truffle migrate -f 2 --network ropsten
```