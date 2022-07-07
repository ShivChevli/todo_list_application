if (Web3) {
    console.log("Web3 ")
}
else {
    console.log("eroor ")
}

App = {
    loading: true,
    contracts: {},
    list: [],
    count: 0,
    tmp: "",

    load: async () => {
        App.list = [];
        App.dsiplayLoading();

        console.log("This is ")
        await App.loadWeb3();
        await App.loadAccount();
        console.log(App.account);
        await App.loadContract();
        console.log("loadTasks");
        await App.loadTasks();

        App.hideLoading();

    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        console.log("This loadWeb 3");
        var options = {
            keepAlive: true,
            withCredentials: true,
            timeout: 20000, // ms
            headers: [
                {
                    name: 'Access-Control-Allow-Origin',
                    value: '*'
                },
            ]
        };

        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545', options));
        window.web3 = web3
        App.web3Provider = web3.currentProvider

        // if (window.ethereum) {
        //     window.web3 = new Web3(ethereum)
        //     try {
        //         // Request account access if needed
        //         await ethereum.enable()
        //         // Acccounts now exposed
        //         web3.eth.sendTransaction({/* ... */ })
        //     } catch (error) {
        //         // User denied account access...
        //     }
        // }
        // // Legacy dapp browsers...
        // else if (window.web3) {
        //     App.web3Provider = web3.currentProvider
        //     window.web3 = new Web3(web3.currentProvider)
        //     // Acccounts always exposed
        //     //  web3.eth.sendTransaction({/* ... */})
        // }
        // // Non-dapp browsers...
        // else {
        //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        // }
        // console.log("Web3 Service Provider");
        console.log(App.web3Provider);
    },
    loadAccount: async () => {
        let temp = await web3.eth.getAccounts();
        web3.eth.Contract.defaultAccount = temp[0];
        web3.eth.defaultHardfork = 'petersburg';
        // console.log(web3.eth.Contract.defaultAccount);
        App.account = temp[0];
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const todoList = await fetch('todo_list.json')
        let tmp = await todoList.json()
        console.log(tmp.abi);

        //Replace contract in below statment 
        // new web3.eth.Contract(tmp.abi, ["your contract address"])
        App.TodoList = new web3.eth.Contract(tmp.abi, "0xdfc8bF6D247132f443dFE78C22B33db6654E7d79");
        App.TodoList.setProvider(App.web3Provider)
        App.TodoList.DefaultChain = "MUIRGLACIER";

        console.log(App.TodoList);

    },
    loadTasks: async () => {

        let count = await App.TodoList.methods.getCount();
        console.log(count);
        count = await count.call();
        console.log(count);
        for (let i = 1; i <= count; i++) {
            tmp = await App.TodoList.methods.getTask(i).call();
            console.log(tmp)
            App.list.push({
                id: i,
                task: tmp[1],
                owner: tmp[0],
                complted: tmp[2]
            });
        }

        App.mappData();
    },
    addTask: async (task) => {
        App.dsiplayLoading();

        let gas = await App.TodoList.methods.addTask(task).estimateGas({ gas: 5000000 });
        let tmp = await App.TodoList.methods.addTask(task).send({ from: App.account, gas: gas });
        App.hideLoading();
        App.load();

    },

    markComplete: async (id) => {

        App.dsiplayLoading();

        let gas = await App.TodoList.methods.completeTask(id).estimateGas({ gas: 5000000 });
        let tmp = await App.TodoList.methods.completeTask(id).send({ from: App.account, gas: gas });
        App.hideLoading();
        App.load();

    },
    mappData: () => {

        App.dsiplayLoading();

        let tmp = document.querySelector("#TaskList");
        let tmp1 = document.querySelector("#completed_task");
        tmp.innerHTML = "";
        tmp1.innerHTML = "";
        App.list.map(d => {
            if (d.complted) {
                tmp1.innerHTML += `
                <li class="list-group-item disabled">
                    <input class="form-check-input me-1" checked type="checkbox" value="${d.id}" >  
                    ${d.task}
                </li> `;
            }
            else {
                tmp.innerHTML += `
                <li class="list-group-item">
                    <input class="form-check-input me-1 complete-task" onchange="App.markComplete(${d.id})" type="checkbox" value="${d.id}">
                        ${d.task}
                </li> `;
            }
        })

        App.hideLoading();
    },
    dsiplayLoading: async () => {
        if (App.loading) {
            return;
        }
        App.loading = true;
        document.querySelector("#loading").style.display = "block";
        document.querySelector("#context").style.display = "none";
    },

    hideLoading: async () => {
        if (!App.loading) {
            return;
        }
        App.loading = false;
        document.querySelector("#loading").style.display = "none";
        document.querySelector("#context").style.display = "block";
    },

    //Transaction function just for Demo pourpose
    // myTransaction: async () => {

    //     web3.eth.sendTransaction({
    //         from: App.account,
    //         gasPrice: "20000000000",
    //         gas: "6721975",
    //         to: "0x6a0EDe6678245a52601aA510CF041ddFa01f45D1",
    //         value: "1000000000000000000",
    //         data: web3.utils.toHex('First Transaction')
    //     }, 'c3c434e80c3584dbf02b817bc8aca01cc82416bd864591f7769de2b071ee3324')
    //         .then(console.log);
    // },
}

document.addEventListener("DOMContentLoaded", function () {

    if (Web3 == undefined) {
        console.log("Web3 is not Define");
    }
    App.load();

    document.querySelector("#addTaskForm").addEventListener("submit", function (event) {
        let task = document.querySelector("#new_task").value;
        if (task == "") {
            alert("Task field Must not be Empty");
            return false;
        }
        App.addTask(task);
        document.querySelector("#new_task").value = "";
        event.preventDefault();
    })

})

function DisplayMsg() {

    const toastTrigger = document.getElementById('liveToastBtn')

    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
            const toast = new bootstrap.Toast(toastLiveExample)

            toast.show()
        })
    }
}