'use strict';

import fs from 'fs';
import { Account, base58Encode } from '@affidaty/t2-lib-core';

export function updateJsonFile(path, newData) {
    const jsonObject = JSON.parse(fs.readFileSync(path));
    Object.assign(jsonObject, newData);
    fs.writeFileSync(path, JSON.stringify(jsonObject, null, 4));
}

/**
 * @param {string} filePath 
 * @param {{[key: string]: string}} scripts 
 */
export function updatePackageScripts(filePath, scripts) {
    const jsonObject = JSON.parse(fs.readFileSync(filePath));
    for (const [scriptName, scriptCommand] of Object.entries(scripts)) {
        jsonObject.scripts[scriptName] = scriptCommand;
    }
    fs.writeFileSync(filePath, JSON.stringify(jsonObject, null, 4));
}

export function objectFromJsonFile(jsonFilePath) {
    return JSON.parse(fs.readFileSync(jsonFilePath));
}

export function updateAsconfigJson(path, outFileName) {
    const tempOutFileName = outFileName.toLowerCase().replaceAll("/ /g", "_");
    const jsonObject = JSON.parse(fs.readFileSync(path));
    jsonObject.targets.debug.outFile = `build/${tempOutFileName}_debug.wasm`;
    jsonObject.targets.debug.textFile = `build/${tempOutFileName}_debug.wat`;
    jsonObject.targets.release.outFile = `build/${tempOutFileName}_release.wasm`;
    jsonObject.targets.release.textFile = `build/${tempOutFileName}_release.wat`;
    fs.writeFileSync(path, JSON.stringify(jsonObject, null, 4));
}

export function updateTestFile(testFilePath, asconfigJsonPath) {
    const releaseBinContractFile = JSON.parse(fs.readFileSync(asconfigJsonPath)).targets.release.outFile;
    const testCode = fs.readFileSync(testFilePath).toString();
    const newTestCode = testCode.replaceAll('../build/release.wasm', `../${releaseBinContractFile}`);
    fs.writeFileSync(testFilePath, newTestCode);
}

export function createJsonFile(path,data) {
    fs.writeFileSync(path,JSON.stringify(data, null, 4));
}

export async function createKeyPairs(file) {
    const account = new Account();
    await account.generate();
    const kp = {
        accountId : account.accountId,
        publicKey : base58Encode(await account.keyPair.publicKey.getRaw()),
        privateKey : base58Encode(await account.keyPair.privateKey.getPKCS8()),
    };
    fs.writeFileSync(file,JSON.stringify(kp, null, 4));
    return kp;
}