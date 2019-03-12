const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
//import ipfs from './ipfs'



const provider = new HDWalletProvider(
'regular when wrestle fatigue mystery cactus eye elbow shrug garbage trim solar',
'https://rinkeby.infura.io/v3/ea69551d1aa844e9b64203a72c34e513'
);
const web3 = new Web3(provider);


//IPFS
// //Referencer FileReader and node.js Buffer Module
//   const ipfsHash = async () => {
//   const file =; //Upload Image
//   const reader = new window.FileReader()
//   reader.onloadend = () => {
//     this.setState({buffer: Buffer(reader.result)})
//   }
// }
//IPFS END
// we can only use await inside async and await

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();  
  console.log('\nImporter Bank : Apporved \n');
  console.log('Exporter Bank : Apporved \n');
  console.log('Exporter : Apporved \n');
  console.log('Importer : Apporved \n');
  
  console.log('\nAttempting to deploy from account', accounts[0]);
  
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Letter Of Credit'] })  //INITIAL MESSAGE UINT CARE
  .send({ gas: '1000000', from: accounts[0] });
  
  //console.log(interface);
  console.log('\n\nContract deployed to', result.options.address);
};

deploy();