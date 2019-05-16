const BeeSightSoft = artifacts.require("BeeSightSoft");

contract('BeeSightSoft', (accounts) => {
  it('should put 1000000000 BSS token in the first account', async () => {
    const beeSightSoftInstance = await BeeSightSoft.deployed();
    const balance = await beeSightSoftInstance.balanceOf.call(accounts[0]);

    assert.equal(balance.valueOf(), 1000000000, "1000000000 wasn't in the first account");
  });
  it('should send coin correctly', async () => {
    const beeSightSoftInstance = await BeeSightSoft.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await beeSightSoftInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await beeSightSoftInstance.balanceOf.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await beeSightSoftInstance.transfer(accountTwo, amount);

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await beeSightSoftInstance.balanceOf.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await beeSightSoftInstance.balanceOf.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
