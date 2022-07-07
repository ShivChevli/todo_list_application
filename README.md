# Blockchian Application Demonstration

This application is an example of a blockchain application implementation. The Truffle suite was used to create this application.

Solidity, Truffle suite, and Ganache(Ethereum simulator) is the technology stacks used in this application.

## Require Tools 

- Truffle suite( development environment, testing framework, and asset pipeline for blockchains using Ethereum Virtual Machine (EVM))
- Ganache (Ethereum blockchain Simulator)
- Node js 

# Local setup procedures

1. Clone this repository 
```cmd
git clone https://github.com/ShivChevli/todo_list_application.git
```

2. Install Node depandances 
```cmd
cd todo_list_application
npm install 
```

3. Launch the Ethereum blockchain simulator, in this case, Ganache, and deploy the contract on that local blockchain using the command below.
```cmd
truffle migrate 
```

4. Replace contract address in app.js file in loadContract method on App object in following line 
```
App.TodoList = new web3.eth.Contract(tmp.abi, "your contract Address");
```

5. Start lite-server 
```cmd
npm run dev 
```

6. Now Browse to the URL http://127.0.0.1:3000