import * as cp from "child_process";
import * as events from "events";
const EE = new events.EventEmitter();

const network = cp.exec("npx hardhat node", (err, cout, cerr) => { });
function networkStartedCB(c: Buffer){
    if (c.toString().includes("Started HTTP and WebSocket JSON-RPC server")) {
        EE.emit("NETWORK_READY");
    };
}

EE.once("NETWORK_READY",()=>{
    network.stdout?.removeListener("data",networkStartedCB)
    const contractDeploy = cp.exec("npx hardhat ignition deploy ./ignition/modules/ShoeToken.ts --network localhost")
    contractDeploy.stdout?.pipe(process.stdout);
    contractDeploy.addListener("spawn", () => {
        console.log(`[Hardhat Ignition] Spawned...`);
    })
    contractDeploy.addListener("close", (code) => {
        console.log(`[Hardhat Ignition] Closed with code ${code}`);
    })
})

network.stdout?.addListener("data", networkStartedCB)
network.stdout?.pipe(process.stdout);
network.addListener("spawn", () => {
    console.log("[Hardhat Network] Spawned...");
})
network.addListener("close", (code) => {
    console.log(`[Hardhat Network] Closed with code ${code}`);
})