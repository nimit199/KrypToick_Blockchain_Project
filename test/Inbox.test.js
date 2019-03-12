const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');               //Import constructor function so capital W in Web3
const web3 = new Web3(ganache.provider()); //small w as we are accessing the instance
const { interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    // web3.eth.getAccounts()                   // Every function with web3 is asynchronus and return promise
    //     .then(fetchedAccounts => {           // but rather than chaining then we will use async await syntax to cleanup code
    //         console.log(fetchedAccounts);
    //   });

    accounts = await web3.eth.getAccounts();            //Await

    //use one of the accounts to deploy the contract

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Status : Approved for Letter of'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default ipfsHash', async () => {
        const ipfsHash = await inbox.methods.ipfsHash().call();  
        /*
            Inbox is instance of our contract
            our contract has a property call methods 
            methods is an object taht contains all of the diffrent public functions that are in our contract
            we have 2 methods in our contract 1) setipfsHash and ipfsHash (as we called it a 'string public' it becomes a method)
            Inbox is a constructor function so is is not a method
            so we are accessing the ipfsHash method
            then we are calling it with .call() as it is for free since we are not changing contracts data
        */
       assert.equal(ipfsHash, 'Hi there!');
    });

    it('can change the ipfsHash', async () => {
        await inbox.methods.setipfsHash('Bye').send({ from: accounts[0] })
        /*
            Since we are trying to modify contract data we need to send a transaction to a function
            so we are using send
            it needs a object saying who is paying for it
        */
        // Now we need to test the ipfsHash to check if our ipfsHash has changes
        const ipfsHash = await inbox.methods.ipfsHash().call();
        assert.equal(ipfsHash, 'Bye');
    });
});