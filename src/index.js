#!/usr/bin/env node

'use strict';
import inquirer from 'inquirer';
import chalk from 'chalk';
import {
    cloneSDK,
    cloneNode,
    createRepoFolders,
} from './utils/git.js';
import {
    updateJsonFile,
    objectFromJsonFile,
    updatePackageScripts,
    updateAsconfigJson,
    updateTestFile,
    createJsonFile,
    createKeyPairs,
} from './utils/package.js';

const warning = chalk.hex('#FFA500');

const present = function (msg) {
    console.log(chalk.green(msg)); 
}

const info = function(msg) {
    console.log(chalk.grey(msg));
}

console.log('\x1Bc'); // Clear screen
present('Hi, welcome to Trinci SmartContract and Blockchain generator');

const questions = [
     {
         type: 'input',
         name: 'name',
         message: 'What\'s your smart contract name?',
         validate(value) {
                if (new RegExp('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$').test(value)) {
                        return true;
                }
                return warning('Name not valid : pattern: ^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$');
         },
     },
     {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default() {
                return '';
        }
    },
     {
        type: 'input',
        name: 'version',
        message: 'Version?',
        default() {
                return '0.0.1';
            },
        validate(value) {
            ;
            if (value.length > 1) {
                return true;
            }
            return 'Please enter a valid version';
        },
    },
    {
        type: 'input',
        name: 'author_name',
        message: "Author name?"
    },
    {
        type: 'input',
        name: 'author_email',
        message: 'Author email?'
    },
    {
        type: 'input',
        name: 'author_website',
        message: 'Author website?'
    },
    {
        type: 'confirm',
        name: 'publisherKey',
        message: 'Do you want to create a new key pair for publish this smart contract? (if NO, you can use after 4rya credentials)',
        
    }
    ,
    {
        type: 'confirm',
        name: 'trinciNode',
        message: 'Do you want to download trinciNode?',
    }
];

inquirer.prompt(questions).then(async (answers) => {
        createRepoFolders(answers.name);
        cloneSDK(answers.name);
        info('Updating package.json file....');
        const packageJsonPath = `./${answers.name}/package.json`;
        updateJsonFile(packageJsonPath,{
            name:answers.name,
            description:answers.description,
            version:answers.version,
        });
        const asconfigJsonPath = `./${answers.name}/asconfig.json`;
        updateAsconfigJson(asconfigJsonPath, answers.name);
        const testFilePath = `./${answers.name}/test/example.spec.ts`;
        updateTestFile(testFilePath, asconfigJsonPath);
        let keypair = {accountId:""};
        let publishPackageScript = './utils/publish.js';
        if(answers.publisherKey) {
                console.log('publishAccount.json...');
                keypair = await createKeyPairs(`./${answers.name}/publishAccount.json`);
                publishPackageScript += ' -p ./publishAccount.json';
        }
        info('Generating publishMetadata.json...');
        const publishMetadataJsonPath = `./${answers.name}/publishMetadata.json`;
        createJsonFile(publishMetadataJsonPath,{
                name: answers.name,
                version: answers.version,
                description: answers.description,
                url: answers.author_website,
                wasmFile: objectFromJsonFile(asconfigJsonPath).targets.release.outFile,
        });
        updatePackageScripts(
            packageJsonPath,
            {
                publish: publishPackageScript,
            },
        );
        if(answers.trinciNode) {
                cloneNode(answers.name);
        }
        console.log(chalk.bold.green('Done.'));
        console.log(`next step:`);
        console.log(chalk.bold.blue(`$ cd ${answers.name} && npm install`));
        console.log();
        let additionalNotes = '';
        if (!answers.publisherKey) {
            additionalNotes += 'Looks like you didn\'t generate a publisher account.\n';
            additionalNotes += 'By default publish script will create a one-time publish account during execution.';
            additionalNotes += 'To save generated one-time account run \'npm run publish -- -P <path_to_file>\'.\n';
            additionalNotes += 'If you already have a publisher account, you can pass it to the script by running\n\'npm run publish -- -p <path_to_file>\'\n\n';
        }
        if (additionalNotes.length > 0) {
            console.log(chalk.bold.green('\nAdditional notes:'));
            console.log(additionalNotes);
            console.log();
        }
        console.log('For additional info on publish script run \'npm run publish:help\'.\n');
 });
