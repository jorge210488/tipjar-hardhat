const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TipJar", function () {
  let tipJar, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const TipJar = await ethers.getContractFactory("TipJar");
    tipJar = await TipJar.deploy();
  });

  it("Debería recibir las propinas y emitir un evento", async () => {
    const tipAmount = ethers.parseEther("0.01");

    await expect(
      tipJar.connect(addr1).tip("Buen trabajo!", { value: tipAmount })
    )
      .to.emit(tipJar, "NuevaPropina")
      .withArgs(addr1.address, tipAmount, "Buen trabajo!");
  });

  it("Debería permitir retirar solo al dueno", async () => {
    await expect(tipJar.connect(addr1).withdraw()).to.be.revertedWith(
      "Solo el dueno puede retirar"
    );
  });

  it("Debería actualizar el balance correctamente despues de una propina y un retiro", async () => {
    const tipAmount = ethers.parseEther("0.02");

    await tipJar.connect(addr1).tip("Bien!", { value: tipAmount });

    const balanceBefore = await ethers.provider.getBalance(owner.address);

    const tx = await tipJar.withdraw();
    const receipt = await tx.wait();

    const gasUsed = BigInt(receipt.gasUsed) * BigInt(tx.gasPrice);

    const balanceAfter = await ethers.provider.getBalance(owner.address);

    expect(balanceAfter > balanceBefore - gasUsed).to.be.true;
  });
});
