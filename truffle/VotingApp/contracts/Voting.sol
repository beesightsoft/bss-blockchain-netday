pragma solidity >=0.5.0 <0.7.0;

contract Voting {

  // @nhancv: Define candidate 
  struct Candidate {
    uint8 id;
    string name;
    uint8 point;
  }

  // @nhancv: Candidate list
  Candidate[] public candidateList;

  // @nhancv: Event
  event AddCandidateEvent(address indexed from, uint8 candidateId);
  event VoteCandidateEvent(address indexed from, uint8 candidateId);

  // @nhancv: Get length of Candidate list
  function getNumberCandidate() public view returns (uint8) {
    return uint8(candidateList.length);
  }

  // @nhancv: Addition candidate
  function addCandidate(string name) public {
    Candidate memory candidate = Candidate(uint8(candidateList.length + 1), name, 0);
    candidateList.push(candidate);
    emit AddCandidateEvent(msg.sender, candidate.id);
  }

  // @nhancv: Get winner
  function getWinner() public view returns (uint8 candidateId) {
    Candidate memory candidate;
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidate.point < candidateList[i].point) {
        candidate = candidateList[i];
      }
    }
    return candidate.id;
  }

  // @nhancv: Vote for candidate
  function voteCandidate(uint8 candidateId) public payable returns (uint8) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i].id == candidateId) {
        candidateList[i].point++;
        emit VoteCandidateEvent(msg.sender, candidateId);
        return candidateList[i].point;
      }
    }
    return 0;
  }

}
