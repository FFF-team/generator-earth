'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp').sync;
const Generator = require('yeoman-generator');
const shell = require('shelljs');
require('colors');

module.exports = class extends Generator {

    initializing() {

    }

    prompting() {

        let done = this.async();
        let self = this;
        let folderName = path.basename(process.cwd());
        let prompts = [{

            type: 'list',
            name: 'boilerplateType',
            message: 'update for ' + (folderName.magenta),
            choices: [{

                name: `项目(project)`,
                value: 'project'

            }, {

                name: `组件(component)`,
                value: 'component'


            }]

        }, {

            name: 'removeFolder',
            message: '是否覆盖原有scss_mixin 和 utils语法糖'.magenta,
            type: 'confirm',
            default: false

        }];

        self.prompt(prompts).then(answer => {

            self.boilerplateType = answer.boilerplateType;
            self.removeFolder = answer.removeFolder;

            done();

        });

    }

    configuring () {

    }

    writing() {

        if(this.removeFolder){

            switch (this.boilerplateType){

                case "project":

                    let scssFolder = './src/scss_mixin/';
                    let utilsFolder = './src/tools/utils/';

                    shell.rm('-rf', scssFolder);
                    shell.rm('-rf', utilsFolder);

                    //add scss
                    this.fs.copyTpl(
                        this.templatePath(`../../common/scss_mixin`),
                        scssFolder
                    );

                    //add utils 语法糖
                    this.fs.copyTpl(
                        this.templatePath(`../../common/utils`),
                        utilsFolder
                    );

                    break ;

                case "component":

                    let componentScssFolder = './scss_mixin/';
                    // let componentUtilsFolder = './utils/';

                    shell.rm('-rf', componentScssFolder);
                    // shell.rm('-rf', componentUtilsFolder);

                    //add scss
                    this.fs.copyTpl(
                        this.templatePath(`../../common/scss_mixin`),
                        componentScssFolder
                    );

                    //add utils 语法糖
                    // this.fs.copyTpl(
                    //     this.templatePath(`../../common/utils`),
                    //     componentUtilsFolder
                    // );

                    break ;

                default:
                    break ;
            }

        }


    }

    install() {

    }
};
