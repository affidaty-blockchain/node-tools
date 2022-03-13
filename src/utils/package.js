const fs = require("fs");
function updatePackageJson(path,data) {
    const package = JSON.parse(fs.readFileSync(path));
    Object.assign(package,data);
    fs.writeFileSync(path,JSON.stringify(package, null, 4));

}
function createTrinciJson(path,data) {
    fs.writeFileSync(path,JSON.stringify(data, null, 4));
}
function createKeyPairs(file) {
    //TODO: autoenerate new KeyPait and export in a json file
    const kp = {
        accountId : "accountId",
        publicKey : "public",
        privateKey : "private"
    };
    fs.writeFileSync(file,JSON.stringify(kp, null, 4));
    return kp;
}
module.exports = {updatePackageJson,createTrinciJson,createKeyPairs};