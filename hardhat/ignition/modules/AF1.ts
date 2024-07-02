import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AF1Module = buildModule("AF1Module", (m) => {

  const af1 = m.contract("AF1");

  return { af1 };
});

export default AF1Module;
