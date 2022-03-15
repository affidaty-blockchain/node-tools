const {  execSync } = require('child_process');

function createRepoFolders(folderName) {
    const cmd = `mkdir ${folderName}`;
    return execSync(cmd);
}

function cloneSDK(folder) {
    console.log("Cloning SDK....");
	const cmd = "cd "+folder+" && git clone https://github.com/affidaty-blockchain/trinci-sdk-assemblyscript.git && cp -R ./trinci-sdk-assemblyscript/boilerplate/* ./ && rm -rf ./trinci-sdk-assemblyscript";
    return execSync(cmd);
}

function cloneNode(folder) {
    console.log("Cloning Node...."); 
	const cmd = "cd "+folder+" && git clone https://github.com/affidaty-blockchain/trinci-node.git";
    return execSync(cmd);
}

module.exports = {cloneSDK,cloneNode, createRepoFolders};