import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const metadataHost = process.env["METADATA_HOST"];
const tokenMetadataHost =  metadataHost ? metadataHost : "http://localhost:3000/api/shoe" 
const ShoeTokenModule = buildModule("ShoeTokenModule", (m) => {

  const st = m.contract("ShoeToken",[`${tokenMetadataHost}/{id}.json`]);

  return { st };
});

export default ShoeTokenModule;
