#!/usr/bin/env node

'use strict';
 const inquirer = require('inquirer');
 const {cloneSDK,cloneNode, createRepoFolders} = require('./utils/git');
 const {updatePackageJson,createKeyPairs,createTrinciJson} = require("./utils/package");
 

 console.log('Hi, welcome to Trinci SmartContract and Blockchain generator');
 const requireLetterAndNumber = (value) => {
    if (/\w/.test(value) && /\d/.test(value)) {
      return true;
    }
  
    return 'Password need to have at least a letter and a number';
  };

 const questions = [
   {
     type: 'input',
     name: 'name',
     message: "What's your smart contract name?",
     validate(value) {
        if (new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$").test(value)) {
            return true;
        }
        return "Name not valid : pattern: ^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$";
     },
   },
   {
    type: 'input',
    name: 'description',
    message: "Description:",
    default() {
        return "";
    }
  },
   {
    type: 'input',
    name: 'version',
    message: "Version?",
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
    message: "Author email?"
  },
  {
    type: 'confirm',
    name: 'publisherKey',
    message: "Do you want to create a new key pair for publish this smart contract? (if NO, you can use after 4rya credentials)",
    
  }
  ,
  {
    type: 'confirm',
    name: 'trinciNode',
    message: "Do you want to download trinciNode?",
  }
 ];
 
 inquirer.prompt(questions).then((answers) => {
    createRepoFolders(answers.name);
    cloneSDK(answers.name);
    console.log("Updating json file....");
    const packageJsonPath = `./${answers.name}/package.json`;
    updatePackageJson(packageJsonPath,{name:answers.name,description:answers.description,version:answers.version});
    let keypair = {accountId:""};
    if(answers.publisherKey) {
        console.log("Generating keypair...");
        keypair = createKeyPairs(`./${answers.name}/publisher.json`);
    }
    console.log("Generating trinci.json ...");
    const trinciJsonPath = `./${answers.name}/trinci.json`;
    createTrinciJson(trinciJsonPath,{
        name:answers.author,
        description:answers.description,
        version:answers.version,
        wasmFile : "./build/release.wasm",
        pulisher :  keypair.accountId
    });
    if(answers.trinciNode) {
        cloneNode(answers.name);
    }
    console.log("All DONE!");
    console.log("Now you can run npm install");
 });
 
