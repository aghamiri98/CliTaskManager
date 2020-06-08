const commands = ['new', 'done', 'delete', 'list'];
const fs = require('fs');
const prompt = require('prompt');
const chalk = require('chalk');
const taskFileName = 'tasks.json';

class TaskManager {
    tasks = [];

    constructor() {
        this.init();
    }

    init() {
        let taskFile = this.getOrCreateTaskFile();
        this.tasks = JSON.parse(taskFile);
    }

    getOrCreateTaskFile() {
        if (!fs.existsSync(taskFileName)) {
            fs.writeFileSync(taskFileName, JSON.stringify([]))
        }
        return fs.readFileSync(taskFileName, 'utf-8');
    }

    printTasks() {
        this.tasks.map((task, index) => {
            if (task.done) {
                console.log(chalk.green(index + ' ' + task.title));
            } else {
                console.log(chalk.yellow(index + ' ' + task.title));
            }
        });
    }

    createNewTask() {
        prompt.start();
        prompt.get(['task'], (err, result) => {
            let task = {
                title: result.task,
                timestamp: new Date().getTime(),
                done: false
            }
            this.tasks.push(task);
            this.updateTaskFile();
        });
    }

    updateTaskFile() {
        fs.writeFile(taskFileName, JSON.stringify(this.tasks), function (err) {

        });
    }

    deleteTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.updateTaskFile();
    }

    setDone(taskIndex){
        this.tasks[taskIndex].done=true;
        this.updateTaskFile();
    }

}

module.exports = {
    commands,
    TaskManager
}