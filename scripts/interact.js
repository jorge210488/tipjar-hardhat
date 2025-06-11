const hre = require("hardhat");
const ethers = hre.ethers;

require("dotenv").config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

async function main() {
  const TipJar = await ethers.getContractFactory("TipJar");
  const tipJar = TipJar.attach(CONTRACT_ADDRESS);

  const tipAmount = ethers.parseEther("0.01");

  console.log("Enviando propina...");
  const tx = await tipJar.tip("Una pequeña propina!", { value: tipAmount });
  await tx.wait();
  console.log("Propina enviada!");

  const contractBalance = await ethers.provider.getBalance(CONTRACT_ADDRESS);
  console.log(
    `Balance del contrato: ${ethers.formatEther(contractBalance)} ETH`
  );

  // Withdraw (only owner should run this)
  // console.log("Withdrawing funds...");
  // const withdrawTx = await tipJar.withdraw();
  // await withdrawTx.wait();
  // console.log("Withdraw complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
