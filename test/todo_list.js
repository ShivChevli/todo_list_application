const todo_list = artifacts.require("todo_list");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("todo_list", function (/* accounts */) {
  before(async ()=>{
    this.todo_list = await todo_list.deployed();
  })

  describe("Todo_list Deployment test ", async ()=>{
    
    it("Null Test ", async ()=> {
      // assert.notEqual(this.todo_list.address, "", "Contract is not deploye");
      // assert.notEqual(this.todo_list.address, undefined, "Contract is not deploye");
      assert.notEqual(this.todo_list.address, null , "Contract is not deploye");
    });
    it("Empty test ", async ()=> {
      assert.notEqual(this.todo_list.address, "", "Contract is not deploye");
      // assert.notEqual(this.todo_list.address, undefined, "Contract is not deploye");
      // assert.notEqual(this.todo_list.address, null , "Contract is not deploye");
    });
    it("Undefine test ", async ()=> {
      // assert.notEqual(this.todo_list.address, "", "Contract is not deploye");
      assert.notEqual(this.todo_list.address, undefined, "Contract is not deploye");
      // assert.notEqual(this.todo_list.address, null , "Contract is not deploye");
    });


  })

  
});
