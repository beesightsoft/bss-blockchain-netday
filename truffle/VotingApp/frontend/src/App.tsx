import * as React from 'react'
import VotingContract from './Contract/VotingContract'
import { Candidate } from './Contract/VotingContract'
import { Header, VotingView } from './Component'
import './App.css'
import Web3 from 'web3'

type AppProps = {}
type AppState = {
  providerValid: boolean
  winner: Candidate
  candicateList: Array<Candidate>
  currentBalance: string
  contractAddress: string
  msgLog: string
}
class App extends React.Component<AppProps, AppState> {
  web3: Web3
  account: string
  contract: VotingContract
  constructor(props: AppProps) {
    super(props)
    this.state = {
      providerValid: false,
      winner: {
        id: 0,
        name: '',
        point: 0
      },
      candicateList: [],
      currentBalance: '',
      contractAddress: '',
      msgLog: ''
    }
  }

  componentWillMount() {
    this.initWeb3(() => {
      this.contract = new VotingContract(this.web3, this.account)
      this.setState({ providerValid: true })
      this.getContractAddress()
      this.getCurrentBalance()
      this.getVotingCandidateList()
    })
  }

  initWeb3 = async (doneCb: any) => {

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    if (typeof window !== 'undefined') {
      // Modern dapp browsers...
      if (window['ethereum']) {
        window['web3'] = new Web3(window['ethereum'])
        try {
          // Request account access if needed
          await window['ethereum'].enable()
        } catch (error) {
          // User denied account access...
          console.log('User denied account access...')
        }
      } else if (window['web3']) {
        // Legacy dapp browsers...
        window['web3'] = new Web3(window['web3'].currentProvider)
      } else {
        // Non-dapp browsers...
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }

    if (typeof window !== 'undefined' && typeof window['web3'] !== 'undefined') {
      // We are in the browser and metamask is running.
      this.web3 = new Web3(window['web3'].currentProvider)
    } else {
      // We are on the server *OR* the user is not running metamask
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
      this.web3 = new Web3(provider)
    }
    if (this.web3) {
      // this.web3 = new Web3(Web3.givenProvider)
      try {
        this.web3.eth.getAccounts((error, accounts) => {
          if (!error && accounts.length !== 0) {
            this.account = accounts[0]
            this.web3.eth.defaultAccount = this.account
            doneCb()
          } else {
            console.error(error)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  getContractAddress = () => {
    this.setState({
      contractAddress: this.contract.contractAddress
    })
  }

  getCurrentBalance = () => {
    if (!this.constractReady()) return
    this.contract.viewBalance().then(balance => {
      this.setState({
        currentBalance: `${this.web3.utils.fromWei(balance, 'ether')} ETH`
      })
    })
  }

  addCandidate = (candidate: string) => {
    if (!this.constractReady()) return
    this.setState({
      msgLog: `addCandidate is sending, please wait for confirmation`
    })
    this.contract
      .addCandidateContract(candidate, transactionHash => {
        this.setState({
          msgLog: `addCandidate is sending with txhash: 
        <a href="https://ropsten.etherscan.io/tx/${transactionHash}" target="_blank" className="alert-link">
        ${transactionHash}</a>`
        })
      })
      .then(
        hashObject => {
          this.setState({
            msgLog: `addCandidate success: 
        <a href="https://ropsten.etherscan.io/tx/${hashObject.transactionHash}" target="_blank" className="alert-link">
        View Detail</a><br/>
        TransactionHash: ${hashObject.transactionHash}<br/>
        BlockHash: ${hashObject.blockNumber}<br/>
        CumulativeGasUsed: ${hashObject.cumulativeGasUsed}<br/>
        GasUsed: ${hashObject.gasUsed}<br/>
        From: ${hashObject.from}<br/>
        To: ${hashObject.to}<br/>
        `
          })
          this.getVotingCandidateList()
        },
        error => {
          this.setState({
            msgLog: ''
          })
        }
      )
  }

  voteCandidate = (candidateId: number) => {
    if (!this.constractReady()) return
    this.setState({
      msgLog: `voteCandidate is sending, please wait for confirmation`
    })
    this.contract
      .voteCandidateContract(candidateId, transactionHash => {
        this.setState({
          msgLog: `voteCandidate is sending with txhash: 
        <a href="https://ropsten.etherscan.io/tx/${transactionHash}" target="_blank" className="alert-link">
        ${transactionHash}</a>`
        })
      })
      .then(
        hashObject => {
          this.setState({
            msgLog: `voteCandidate success: 
        <a href="https://ropsten.etherscan.io/tx/${hashObject.transactionHash}" target="_blank" className="alert-link">
        View Detail</a><br/>
        TransactionHash: ${hashObject.transactionHash}<br/>
        BlockHash: ${hashObject.blockNumber}<br/>
        CumulativeGasUsed: ${hashObject.cumulativeGasUsed}<br/>
        GasUsed: ${hashObject.gasUsed}<br/>
        From: ${hashObject.from}<br/>
        To: ${hashObject.to}<br/>
        `
          })
          this.getVotingCandidateList()
        },
        error => {
          this.setState({
            msgLog: ''
          })
        }
      )
  }

  getWinner = (list: Array<Candidate>) => {
    if (!this.constractReady()) return
    this.contract.getWinner().then(winnerId => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === winnerId) {
          this.setState({
            winner: list[i]
          })
        }
      }
    })
  }

  getVotingCandidateList = () => {
    if (!this.constractReady()) return
    this.contract.getCandidateListContract().then(list => {
      this.setState({
        candicateList: list
      })
      this.getWinner(list)
    })
  }

  constractReady = (): boolean => {
    if (this.state && this.state.providerValid && this.contract) {
      return true
    }
    return false
  }

  renderContainer = () => {
    if (this.constractReady()) {
      return (
        <VotingView
          msgLog={this.state.msgLog}
          currentBalance={this.state.currentBalance}
          candidateList={this.state.candicateList}
          winner={this.state.winner}
          contractAddress={this.state.contractAddress}
          addCandidateFunc={this.addCandidate}
          voteCandidateFunc={this.voteCandidate}
        />
      )
    } else {
      return (
        <div className="App-invalidProvider">
          <br />
          <p>Non-Ethereum browser detected. You should consider trying MetaMask!</p>
          <a href="https://metamask.io/">https://metamask.io/</a>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <Header />

        {this.renderContainer()}
      </div>
    )
  }
}

export default App
