const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TipJar", function () {
  let tipJar, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const TipJar = await ethers.getContractFactory("TipJar");
    tipJar = await TipJar.deploy(); // En ethers v6, no hace falta .deployed()
  });

  it("Should receive tips and emit event", async () => {
    const tipAmount = ethers.parseEther("0.01");

    await expect(tipJar.connect(addr1).tip("Great job!", { value: tipAmount }))
      .to.emit(tipJar, "NewTip")
      .withArgs(addr1.address, tipAmount, "Great job!");
  });

  it("Should only allow owner to withdraw", async () => {
    await expect(tipJar.connect(addr1).withdraw()).to.be.revertedWith(
      "Only owner can withdraw"
    );
  });

  it("Should update balance correctly after tip and withdraw", async () => {
    const tipAmount = ethers.parseEther("0.02");

    await tipJar.connect(addr1).tip("Nice!", { value: tipAmount });

    const balanceBefore = await ethers.provider.getBalance(owner.address);

    const tx = await tipJar.withdraw();
    const receipt = await tx.wait();

    // En Hardhat Network, a veces receipt.effectiveGasPrice es undefined → usar tx.gasPrice
    const gasUsed = BigInt(receipt.gasUsed) * BigInt(tx.gasPrice);

    const balanceAfter = await ethers.provider.getBalance(owner.address);

    expect(balanceAfter > balanceBefore - gasUsed).to.be.true;
  });
});
