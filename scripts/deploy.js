const hre = require("hardhat");

async function main() {
  const TipJar = await hre.ethers.getContractFactory("TipJar");
  const tipJar = await TipJar.deploy();

  // En Ethers v6, no hace falta .deployed()
  console.log(`TipJar deployado en: ${tipJar.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
