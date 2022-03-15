const fs = require("fs");
const Account = require("@affidaty/t2-lib").Account;
const arrayBufferToBase58 = require("@affidaty/t2-lib").binConversions.arrayBufferToBase58;

function updatePackageJson(path,data) {
    const package = JSON.parse(fs.readFileSync(path));
    Object.assign(package,data);
    fs.writeFileSync(path,JSON.stringify(package, null, 4));

}
function createTrinciJson(path,data) {
    fs.writeFileSync(path,JSON.stringify(data, null, 4));
}
async function createKeyPairs(file) {
    const account = new Account();
    await account.generate();
    const kp = {
        accountId : account.accountId,
        publicKey : arrayBufferToBase58((await account.keyPair.publicKey.getRaw()).buffer),
        privateKey : arrayBufferToBase58((await account.keyPair.privateKey.getPKCS8()).buffer),
    };
    fs.writeFileSync(file,JSON.stringify(kp, null, 4));
    return kp;
}
module.exports = {updatePackageJson,createTrinciJson,createKeyPairs};