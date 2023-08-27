const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.deployContract("SimpleStorage");
  console.log("Deploying Contract...");
  const simpleStorage = await SimpleStorageFactory.waitForDeployment();
  console.log(`
  Deployed contract to:${await SimpleStorageFactory.getAddress()}
  `);
  let address = await SimpleStorageFactory.getAddress();
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_APIKEY) {
    await SimpleStorageFactory.waitForDeployment();
    await verify(address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
