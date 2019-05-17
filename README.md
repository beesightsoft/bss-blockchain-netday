# SmartContract

## Articles

- ERC20Token: https://medium.com/p/6e640eb613ff 

- ICO Crowdsale: https://medium.com/p/35dc5ff02459 

- Voting application: https://medium.com/p/185e16dbfa35 


## ERC20Token
```
------------------
> Contract Source Code Verified (Exact Match)
Contract Name: BeeSightSoft
Compiler Version: v0.5.1+commit.c8a2cb62
Optimization Enabled: No with 200 runs
Evm Version: default
------------------

ACCOUNT CREATOR (MetaMask): https://ropsten.etherscan.io/address/0xFd0c67EDD5e4cE03cd8397Dc748b19b0A5c0f645

Deployed Transaction Hash : 0x26ccf31dc23b223ba8bf050a920f20241855698c50c0bbccf0ec146b22d7835c
Token Contract Address    : https://ropsten.etherscan.io/address/0xd236fab33e5e9e34d5bbb82e2ef3a5590cb62532#code
Token address             : https://ropsten.etherscan.io/token/0xd236fab33e5e9e34d5bbb82e2ef3a5590cb62532
Symbol                    : BSS
Name                      : BeeSight Soft
Total supply              : 1000000000
Decimals                  : 0
```

## ICO CrowdSale
```
ACCOUNT CREATOR (infura.io): https://ropsten.etherscan.io/address/0x3418e633b76128f7bdd1ce8e9743e981644d4d7b

ABSTRACT
Start date      : Friday, May 17, 2019 9:33:06 AM GMT+07:00
Bonus end date  : Start date + 10 days
End date        : Start date + 365 days
Normal price    : 100 NETDay Tokens per 1 ETH
Bonus price     : 150 NETDay Tokens per 1 ETH

MIGRATION CONTRACT
------------------
> Contract Source Code Verified (Exact Match)
Contract Name: Migrations
Compiler Version: v0.5.0+commit.1d4f565a
Optimization Enabled: No with 200 runs
Evm Version: default
------------------

Deployed Transaction Hash : 0xfbe1878d589e0fdf2fcfeadd9f1f8d6fa80991de4ff4187b7c381c0a44a88900
Token Contract address    : https://ropsten.etherscan.io/address/0x37ae52dE47C654f1A5817D84cb7BaBD40D0004A0

TOKEN DETAIL
------------------
> Contract Source Code Verified (Exact Match)
Contract Name: NETDay
Compiler Version: v0.5.0+commit.1d4f565a
Optimization Enabled: No with 200 runs
Evm Version: default
------------------

Deployed Transaction Hash : 0x2c2802b2a496b13e307f674763d4aa746e678e3c6367baeeab6d87280409af42
Token Contract address    : https://ropsten.etherscan.io/address/0xe8377948Be01772ac1175e2794ef99Cbc0cA069F
Token address             : https://ropsten.etherscan.io/token/0xe8377948Be01772ac1175e2794ef99Cbc0cA069F
Symbol                    : NETDay
Name                      : NETDay Token
Decimals                  : 18

2_deploy_contracts.js [BUG VERSION]
=====================

   Deploying 'NETDay'
   ------------------
   > transaction hash:    0x9a32af4ca639406c21adf703b78642a620bbf905ab5fd8debd1ce4d0e1119469
   > Blocks: 0            Seconds: 9
   > contract address:    0xE3C300F25ace0FA42c9Fc347F4629f4BC2441Fea
   > block number:        5613259
   > block timestamp:     1558063501
   > account:             0x3418e633b76128F7bdd1Ce8E9743E981644D4D7B
   > balance:             0.95161638
   > gas used:            2092239
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04184478 ETH

```

## Voting app
```
> Compiled successfully using:
   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang

   
Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 0x7a1200


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x14abedb26213ae338c8638cd5304ee11f0787691f774ab2591344336ad4e0f9d
   > Blocks: 0            Seconds: 29
   > contract address:    0xB244EcdE1727748db4df8249a1f7A5e2888514c9
   > block number:        5614678
   > block timestamp:     1558082286
   > account:             0x3418e633b76128F7bdd1Ce8E9743E981644D4D7B
   > balance:             3.90251506
   > gas used:            284908
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00569816 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00569816 ETH


2_deploy_contracts.js
=====================

   Deploying 'Voting'
   ------------------
   > transaction hash:    0x5c58001cb76f6bf447a75853741e845f088fb05a3cebd7b28890da92b4c37b02
   > Blocks: 0            Seconds: 29
   > contract address:    0x92c5be1A8496b3045B61D79a5F6b611310f2FaAa
   > block number:        5614683
   > block timestamp:     1558082372
   > account:             0x3418e633b76128F7bdd1Ce8E9743E981644D4D7B
   > balance:             3.87403668
   > gas used:            1381885
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0276377 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0276377 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.03333586 ETH

```
