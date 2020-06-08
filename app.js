const commands = require('./taskManager').commands;
const TaskManager = require('./taskManager').TaskManager;
const chalk = require('chalk');
let command = process.argv[2];
if (commands.indexOf(command) === -1) {
    console.log(chalk.red('command is not valid'));
}

let taskManagerApp = new TaskManager();
let taskIndex;
switch (command) {
    case 'new':
        taskManagerApp.createNewTask();
        break;
    case 'list':
        taskManagerApp.printTasks();
        break;
    case 'delete':
        taskIndex = process.argv[3];
        taskManagerApp.deleteTask(taskIndex);
        break;
    case 'done':
        taskIndex = process.argv[3];
        taskManagerApp.setDone(taskIndex);
        break;

}