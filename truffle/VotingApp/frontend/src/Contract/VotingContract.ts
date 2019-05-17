import Web3 from 'web3'
const votingSol = require('./abi/Voting.json')

export type Candidate = {
  id: number
  name: string
  point?: number
}

export default class VotingContract {
  web3: Web3
  account: string
  contract
  contractAddress: string
  constructor(web3: any, account: any) {
    this.web3 = web3
    this.account = account
    this.initContract()
  }

  viewBalance() {
    return this.web3.eth.getBalance(this.account)
  }

  initContract(contractAddress: string = '0x92c5be1A8496b3045B61D79a5F6b611310f2FaAa') {
    this.contractAddress = contractAddress
    this.contract = new this.web3.eth.Contract(votingSol.abi, this.contractAddress)
  }

  getWinner(): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.contract.methods.getWinner().call((err, candidateId) => {
        if (err) {
          reject(err)
        } else {
          resolve(candidateId)
        }
      })
    })
  }

  getCandidateListContract(): Promise<Array<Candidate>> {
    return new Promise((resolve, reject) => {
      this.contract.methods.getNumberCandidate().call((err, res) => {
        let requestList: any = []
        for (let i = 0; i < res; i++) {
          requestList.push(
            new Promise((resolve1, reject1) => {
              this.contract.methods.candidateList(i).call((err1, res1) => {
                if (err1) {
                  reject1(err1)
                } else {
                  resolve1({
                    id: res1.id,
                    name: res1.name,
                    point: res1.point
                  })
                }
              })
            })
          )
        }
        Promise.all(requestList).then(
          candidateList => {
            let response: Array<Candidate> = []
            for (var i = 0; i < candidateList.length; i++) {
              let c: Candidate = {
                id: candidateList[i]['id'],
                name: candidateList[i]['name'],
                point: candidateList[i]['point']
              }
              response.push(c)
            }
            resolve(response)
          },
          error => reject(error)
        )
      })
    })
  }

  addCandidateContract(candiate: string, transactionHash?: Function) {
    return this.contract.methods
      .addCandidate(candiate)
      .send({ from: this.account })
      .on('transactionHash', hash => {
        if (transactionHash) transactionHash(hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('=> confirmation: ' + confirmationNumber)
      })
      .on('receipt', receipt => {
        console.log('=> reciept', receipt)
      })
      .on('error', error => {
        console.error('Error: ', error)
      })
  }

  voteCandidateContract(candiateId: number, transactionHash?: Function) {
    return this.contract.methods
      .voteCandidate(candiateId)
      .send({ from: this.account, value: 0.5e18 })
      .on('transactionHash', hash => {
        if (transactionHash) transactionHash(hash)
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('=> confirmation: ' + confirmationNumber)
      })
      .on('receipt', receipt => {
        console.log('=> reciept', receipt)
      })
      .on('error', error => {
        console.error('Error: ', error)
      })
  }
}
