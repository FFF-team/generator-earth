require('colors');

/**
 * 执行结束提示
 * @param role {String}
 */
module.exports = (role) => {
    console.log(('\n · ' + role + ' initialization done, start happy coding now!\n').green);
};
