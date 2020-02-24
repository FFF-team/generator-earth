const path = require('path');
const getDirFiles = require('./getDirFiles');
const requireDefault = require('./requireDefault');


function getTaskList() {
    const taskCbMap = new Map();
    const taskListSum = getDirFiles(path.resolve(__dirname, '../tasks'));

    taskListSum.forEach((fileName) => {
        const taskName = fileName.split('.')[0];
        const taskFn = requireDefault(path.resolve(__dirname, '../tasks/', fileName));

        taskCbMap.set(taskName, taskFn);
    });

    return taskCbMap;
}

module.exports = getTaskList;
