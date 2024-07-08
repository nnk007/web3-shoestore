"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var events = require("events");
var EE = new events.EventEmitter();
var network = cp.exec("npx hardhat node", function (err, cout, cerr) { });
function networkStartedCB(c) {
    if (c.toString().includes("Started HTTP and WebSocket JSON-RPC server")) {
        EE.emit("NETWORK_READY");
    }
    ;
}
EE.once("NETWORK_READY", function () {
    var _a, _b;
    (_a = network.stdout) === null || _a === void 0 ? void 0 : _a.removeListener("data", networkStartedCB);
    var contractDeploy = cp.exec("npx hardhat ignition deploy ./ignition/modules/ShoeToken.ts --network localhost");
    (_b = contractDeploy.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
    contractDeploy.addListener("spawn", function () {
        console.log("[Hardhat Ignition] Spawned...");
    });
    contractDeploy.addListener("close", function (code) {
        console.log("[Hardhat Ignition] Closed with code ".concat(code));
    });
});
(_a = network.stdout) === null || _a === void 0 ? void 0 : _a.addListener("data", networkStartedCB);
(_b = network.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
network.addListener("spawn", function () {
    console.log("[Hardhat Network] Spawned...");
});
network.addListener("close", function (code) {
    console.log("[Hardhat Network] Closed with code ".concat(code));
});
