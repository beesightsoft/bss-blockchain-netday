pragma solidity >=0.5.0 <0.7.0;

/**
Owned contract
 */
contract Owned {
  address payable public owner;
  address payable public newOwner;

  event OwnershipTransferred(address indexed _from, address indexed _to);

  constructor () public {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address payable _newOwner) public onlyOwner {
    newOwner = _newOwner;
  }

  function acceptOwnership() public {
    require(msg.sender == newOwner);
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
    newOwner = address(0);
  }
}

contract Voting is Owned{

  // @nhancv: Define candidate 
  struct Candidate {
    int8 id;
    string name;
    uint8 point;
  }

  // @nhancv: Candidate list
  Candidate[] public candidateList;

  // @nhancv: Event
  event AddCandidateEvent(address indexed from, int8 candidateId);
  event EditCandidateEvent(address indexed from, int8 candidateId);
  event RemoveCandidateEvent(address indexed from, int8 candidateId);
  event VoteCandidateEvent(address indexed from, int8 candidateId, bytes data);

  // @nhancv: Get length of Candidate list
  function getNumberCandidate() public view returns (uint8) {
    return uint8(candidateList.length);
  }

  // @nhancv: Remove candidate
  function removeCandidate(int8 candidateId) public {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i].id == candidateId) {
        delete candidateList[i];
        emit RemoveCandidateEvent(msg.sender, candidateId);
        return;
      }
    }
  }

  // @nhancv: Edit candidate
  function editCandidate(int8 candidateId, string memory name) public {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i].id == candidateId) {
        candidateList[i].name = name;
        emit EditCandidateEvent(msg.sender, candidateId);
        return;
      }
    }
  }

  // @nhancv: Addition candidate
  function addCandidate(string memory name) public {
    Candidate memory candidate = Candidate(int8(candidateList.length), name, 0);
    candidateList.push(candidate);
    emit AddCandidateEvent(msg.sender, candidate.id);
  }

  // @nhancv: Get winner
  function getWinner() public view returns (int8 candidateId) {
    Candidate memory candidate = Candidate(-1, "n/a", 0);
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidate.point < candidateList[i].point) {
        candidate = candidateList[i];
      }
    }
    return candidate.id;
  }

  // @nhancv: Vote for candidate
  function voteCandidate(int8 candidateId) public payable returns (uint8) {
    require(msg.value > 0, "Value must be greater than zero");
    require(candidateId > -1, "Invalid candidate id");
    uint i = 0;
    for (; i < candidateList.length; i++) {
      if (candidateList[i].id == candidateId) {
        candidateList[i].point++;
        
        (bool success, bytes memory data) = owner.call.value(msg.value).gas(20317)("");
        if (!success) {
          revert();
        }

        emit VoteCandidateEvent(msg.sender, candidateId, data);
        return candidateList[i].point;
      }
    }
    require(i < candidateList.length, "Invalid candidate id");
    return 0;
  }

}
