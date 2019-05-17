import * as React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Button,
  Input,
  Alert
} from 'reactstrap'
import { Candidate } from '../../Contract/VotingContract'
import './style.css'

type MainProps = {
  currentBalance: string
  candidateList: Array<Candidate>
  winner: Candidate
  msgLog: string
  contractAddress: string
  addCandidateFunc: Function
  voteCandidateFunc: Function
}
type MainState = {
  inputValue: string
}
class Main extends React.Component<MainProps, MainState> {
  textInput: Input
  constructor(props: MainProps) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  updateInputValue = evt => {
    this.setState({
      inputValue: evt.target.value
    })
  }

  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col>
            <h3>Voting Application - Who is the bad boy here?? </h3>
            <h6>
              Contract Address: &nbsp;
              <a target="_blank" href={`https://ropsten.etherscan.io/address/${this.props.contractAddress}`}>
                {this.props.contractAddress}
              </a>
            </h6>
            <h6>Balance now: {this.props.currentBalance}</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Winner is: {this.props.winner.name}</CardTitle>
                <h6>Id: {this.props.winner.id}</h6>
                <h6>Point: {this.props.winner.point}</h6>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col>
            <Alert color="info" isOpen={this.props.msgLog ? true : false}>
              <div dangerouslySetInnerHTML={{ __html: this.props.msgLog }} />
            </Alert>
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col>
            <Input
              type="text"
              value={this.state.inputValue}
              onChange={evt => this.updateInputValue(evt)}
              placeholder="Candidate Name"
            />
          </Col>
          <Col>
            <Button
              color="primary"
              onClick={() => {
                this.setState({
                  inputValue: ''
                })
                this.props.addCandidateFunc(this.state.inputValue)
              }}
            >
              Add candidate
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <hr style={{ width: '100%' }} />
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col>
            {this.props.candidateList.map(candidate => (
              <Card key={candidate.id} className="Vote-Card">
                <CardBody>
                  <CardTitle>{candidate.name}</CardTitle>
                  <h6>
                    Id: {candidate.id} - Point: {candidate.point}
                  </h6>
                  <Button
                    color="info"
                    onClick={() => {
                      this.props.voteCandidateFunc(candidate.id)
                    }}
                  >
                    Vote
                  </Button>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    )
  }
}
export default Main
