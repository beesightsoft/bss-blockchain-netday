pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BeeSightSoft.sol";

contract TestBeeSightSoft {

  function testInitialBalanceUsingDeployedContract() public {
    BeeSightSoft meta = BeeSightSoft(DeployedAddresses.BeeSightSoft());

    uint expected = 1000000000;

    Assert.equal(meta.totalSupply(), expected, "Owner should have 1000000000 BeeSightSoft initially");
  }

  function testInitialBalanceWithNewBeeSightSoft() public {
    BeeSightSoft meta = new BeeSightSoft();

    uint expected = 1000000000;
   
    Assert.equal(meta.balanceOf(meta.owner()), expected, "Owner should have 1000000000 BeeSightSoft initially");
  }

}
