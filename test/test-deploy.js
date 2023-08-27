const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  this.beforeEach(async function () {
    SimpleStorageFactory = await ethers.deployContract("SimpleStorage");
    console.log("Deploying Contract...");
    simpleStorage = await SimpleStorageFactory.waitForDeployment();
  });
  it("Should expect a '0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("Should expect a value to store", async function () {
    const expectedValue = "7";

    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);

    it("Should add the number and person", async function () {
      let name = "Hassan";
      let number = "3";
      const add = await simpleStorage.addPerson(name, number);
      value = await simpleStorage.people;
      assert.equal(value, name, number);
    });
  });
});
