'use strict';

import { execSync } from 'child_process';
import path from 'path';

export function createRepoFolders(folderName) {
    const cmd = `mkdir ${folderName}`;
    return execSync(cmd);
}

export function cloneSDK(folder) {
    console.log('Cloning SDK....');
    const dirname = path.dirname(import.meta.url.substring(7));
    const npm_folder = path.resolve(dirname, "../../../");
    // const npm_folder = path.resolve(__dirname,"../../node_modules");
    const cmd = `cp -R ${npm_folder}/@affidaty/trinci-sdk-as/boilerplate/* ./${folder}`;
    return execSync(cmd);
}

export function cloneNode(folder) {
    console.log('Cloning Node....'); 
    const cmd = `cd ${folder} && git clone https://github.com/affidaty-blockchain/trinci-node.git`;
    return execSync(cmd);
}
