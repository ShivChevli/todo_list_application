// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract todo_list {

  uint public count = 0;

  struct task{
    address creator;
    bool completed;
    string task;
    uint createdAt;
    uint compltedAt;
  }
  
  mapping(uint => task) public TaskList;

  function addTask(string memory name) public {
      count++;
      TaskList[count] = task({creator : msg.sender, completed : false, task: name, createdAt : block.timestamp, compltedAt : 0});
  }

  function getCount() public view returns(uint num){
    num = count;
  }

  function getTask(uint id) public view returns (address owner ,string memory askedTask, bool completed){
      askedTask =  TaskList[id].task;
      completed = TaskList[id].completed;
      owner = TaskList[id].creator;

  }

  function completeTask(uint id) public {

    require(!TaskList[id].completed, "Task is Already Complted");

    TaskList[id].completed = true;
    TaskList[id].compltedAt = block.timestamp;
  }
  
  constructor(string memory taskName){
    addTask(taskName);
  }
}
