const { parallel, watch, series } = require('gulp');

const devConf = require('../config/dev');
const prodConf = require('../config/prod');

const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const taskCbMap = require('./utils/getTaskList')();

const { taskFnLists } = conf;
const { watchMap } = devConf;

console.log(process.env.NODE_ENV);
/**
 * 监听逻辑
 */
if (process.env.NODE_ENV !== 'prod' && watchMap && watchMap.length) {
    for (const watchItem of watchMap) {
        const fnOptions = watchItem.options || {};

        watch(watchItem.path.replace(/\\/g, '/'), fnOptions, taskCbMap.get(watchItem.taskName));
    }
}


function evalTasksFn() {
    const taskLists = [];

    taskFnLists.forEach((item) => {
        taskLists.push(taskCbMap.get(item));
    });

    return taskLists;
}


exports.default = series(taskCbMap.get('clean'), parallel(evalTasksFn()));
