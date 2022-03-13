const {  execSync } = require('child_process');

function cloneSDK() {
    console.log("Cloning SDK...."); 
    const target_path = "test_path";
	const cmd = "git clone https://github.com/affidaty-blockchain/trinci-sdk-assemblyscript.git && cp -R ./trinci-sdk-assemblyscript/boilerplate/* ./"+target_path+" && rm -rf ./trinci-sdk-assemblyscript";
    return execSync(cmd);
}

function cloneNode() {
    console.log("Cloning Node...."); 
	const cmd = "git clone https://github.com/affidaty-blockchain/trinci-node.git";
    return execSync(cmd);
}

module.exports = {cloneSDK,cloneNode};