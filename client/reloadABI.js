const fs = require("fs");
async function main(){
    const dirents = fs.readdirSync("../hardhat/artifacts/contracts",{withFileTypes:true});
    const contractFolders = [];
    dirents.forEach(dirent=>{
        if(!dirent.isDirectory()) return;
        if(!/(.*)\.sol/.test(dirent.name)) return;
        contractFolders.push(dirent.name);
    })
    let abi = {};
    contractFolders.forEach(cf=>{
        const json = fs.readFileSync(`../hardhat/artifacts/contracts/${cf}/${`${cf}`.slice(0,-4)}.json`,"utf8");
        const {abi:_abi} = JSON.parse(json);
        abi[cf.slice(0,-4)]=_abi;
    });
    fs.writeFileSync("./src/functions/ABI.ts",`export const abi=${JSON.stringify(abi)}`,"utf-8");
}

main();