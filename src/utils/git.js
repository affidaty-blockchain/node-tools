const {  execSync } = require('child_process');
const path = require("path");
function createRepoFolders(folderName) {
    const cmd = `mkdir ${folderName}`;
    return execSync(cmd);
}

function cloneSDK(folder) {
    console.log("Cloning SDK....");
	//const cmd = "cd "+folder+" && git clone https://github.com/affidaty-blockchain/trinci-sdk-assemblyscript.git && cp -R ./trinci-sdk-assemblyscript/boilerplate/* ./ && rm -rf ./trinci-sdk-assemblyscript";
    const npm_folder = path.resolve(__dirname,"../../../")
    const cmd = "cp -R "+npm_folder+"/@affidaty/trinci-sdk-as/boilerplate/* ./"+folder;
    return execSync(cmd);
}

function cloneNode(folder) {
    console.log("Cloning Node...."); 
	const cmd = "cd "+folder+" && git clone https://github.com/affidaty-blockchain/trinci-node.git";
    return execSync(cmd);
}

module.exports = {cloneSDK,cloneNode, createRepoFolders};