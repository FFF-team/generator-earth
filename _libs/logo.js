"use strict";

require('colors');
let updater = require('npm-updater');

module.exports = function (context, callback) {
    var version = context ? 'v' + context.pkg.version : '';

    // var logo = 'Welcome to earth! \n'.magenta
                // + 'Please complete the following operation!\n'.magenta;
    var logo = '\n'+
                '  ___  _  __    _____    _    ____ _____ _   _  \n' +
                ' / _ \\| |/ /   | ____|  / \\  |  _ \\_   _| | | | \n' +
                '| | | | \' /    |  _|   / _ \\ | |_) || | | |_| | \n' +
                '| |_| | . \\    | |___ / ___ \\|  _ < | | |  _  | \n' +
                ' \\___/|_|\\_\\   |_____/_/   \\_\\_| \\_\\|_| |_| |_| \n';

    logo = logo + '\nPlease complete the following operation!\n'.magenta;

    logo = logo + ('This version is ' + version + ' \n\n').magenta;

    updater({
        package: context.pkg,
        level: 'patch',
        interval: '1s',
        abort: false,
        updateMessage: `你可以执行 npm i -g ${context.pkg.name}@latest 来安装此版本`
    }).then(() => {
        !process.LOGO_PRINTED && console.log(logo);
        process.LOGO_PRINTED = true;
        callback && callback();
    });
};
