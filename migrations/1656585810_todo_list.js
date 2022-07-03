const TodoList = artifacts.require("todo_list");

module.exports = function (deployer) {
  deployer.deploy(TodoList, "First Task");
};
