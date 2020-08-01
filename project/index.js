'use strict';

const fs = require('fs');
const pwd = process.cwd();
const path = require('path');
const mkdirp = require('mkdirp').sync;
const Generator = require('yeoman-generator');
const exec = require('child_process').exec;

module.exports = class extends Generator {

    initializing() {

        this.pkg = require('../package.json');

        let pkgJSON = {};

        try {

            pkgJSON = require(path.resolve(process.cwd(), 'package.json'));

        } catch (e) {
        }

        if (!pkgJSON.author || typeof pkgJSON.author == 'string') {

            let gitUser = this.user.git;

            if (pkgJSON.author) {

                let parts = /(.*)<(.*)\>/g.exec(pkgJSON.author);

                if (parts) {

                    pkgJSON.author = {

                        name: (parts[1] || '').trim(),
                        email: (parts[2] || '').trim()

                    };

                }

            } else {

                pkgJSON.author = {

                    name: gitUser.name() || '',
                    email: gitUser.email() || ''

                };

            }

        }

        if (!pkgJSON.name) {

            pkgJSON.name = 'tmp';

        }

        this.pkgJSON = pkgJSON;

    }

    prompting() {

        let done = this.async();
        let self = this;
        let pkgJSON = this.pkgJSON;
        let folderName = path.basename(process.cwd());
        let prompts = [{

            name: 'projectType',
            message: '项目类型',
            type: 'list',
            choices: [{
                name: 'H5',
                value: 'h5'
            }, {
                name: 'PC',
                value: 'pc'
            }, {
                name: 'nodejs',
                value: 'nodejs'
            }, {
                name: 'MiniProgram',
                value: 'miniprogram-ts'
            }]

        }, {

            name: 'frameType',
            message: '框架选型',
            type: 'list',
            choices: [{
                name: 'ts',
                value: 'miniprogram-ts'
            }],
            when: answer => answer.projectType === 'miniprogram-ts'

        }, {

            name: 'frameType',
            message: '框架选型',
            type: 'list',
            choices: [{
                name: 'use-cloud',
                value: 'cloud'
            }, {
                name: 'not-use-cloud',
                value: 'standalone'
            }],
            when: answer => answer.projectType === 'nodejs'

        }, {

            name: 'frameType',
            message: '框架选型',
            type: 'list',
            choices: [{
                name: 'React',
                value: 'react'
            }, {
                name: 'React-ts',
                value: 'react-ts'
            }],
            when: answer => answer.projectType === 'h5'

        }, {

            name: 'frameType',
            message: '框架选型',
            type: 'list',
            choices: [
                {
                    name: 'React-ant-ts',
                    value: 'react-ant-ts'
                },
                {
                    name: 'React-hooks-ant4-ts',
                    value: 'react-hooks-ant4-ts'
                },
                {
                    name: 'React-ant-mobx-ts',
                    value: 'react-ant-mobx-ts'
                }
            ],
            when: answer => answer.projectType === 'pc'

        }, {

            name: 'projectName',
            message: '请输入项目名',
            default: folderName,
            validate: function (input, answer) {

                if (!input.trim()) {

                    return '请输入项目名称';

                } else if (/A-Z/.test(input)) {

                    return '项目名不建议包含大写字母, 请使用 "-" 连字符分隔';

                }

                return true;

            }


        }, {

            name: 'projectDesc',
            message: '项目描述',
            default: '项目描述内容',
            validate: function (input) {
                console.log('star run demoDesc validate')
                return !!input.trim() || '请输入项目描述!';

            }

        }, {

            // 对于 React 项目, 询问是否启用redux
            name: 'useRedux',
            message: '是否使用 redux',
            type: 'confirm',
            default: false,
            when: answer => {
                // todo: react-ts暂未提供redux版
                return (answer.projectType === 'h5' && (answer.frameType === 'react'))
            }

        }, {

            name: 'author',
            message: '作者名',
            default: pkgJSON.author.name

        }, {

            name: 'email',
            message: '作者 Email',
            default: pkgJSON.author.email,
            validate: function (input) {
                return true;
                // /^.+@.+\..+$/.test(input.trim()) || '请输入合法的 Email 地址!';
            }

        }, {

            name: 'groupName',
            message: '项目所在 Gitlab 分组',
            default: 'FFF-team',
            validate: function (input) {
                return !!input.trim() || '请输入分组名!';
            }

        }, {

            name: 'version',
            message: '初始版本号',
            default: '0.1.0',
            validate: function (input) {
                return /^\d+\.\d+\.\d+$/.test(input.trim()) || '请输入合法的版本号!';
            }

        },
        // jiajianrong 20200122 去掉自动安装
        /*{

            name: 'installDep',
            message: '是否自动执行' + ' npm i'.yellow + ' 以安装依赖',
            type: 'confirm',
            default: false

        }*/];

        self.prompt(prompts).then(answer => {

            self.projectType = answer.projectType;
            self.frameType = answer.frameType;
            self.name = answer.projectName;
            self.desc = answer.projectDesc;
            self.useRedux = answer.useRedux;
            self.author = answer.author;
            self.email = answer.email;
            self.groupName = answer.groupName;
            self.version = answer.version;
            self.createRoot = answer.createRoot;
            self.installDep = answer.installDep;

            if (answer.projectName != folderName) {
                self.createRoot = true;
            }

            done();

        });
    }

    configuring() {

        this.sourceRoot(path.join(__dirname, this.frameType));

    }

    /**
     * 公共文件拷贝
     * @param option
     * @private
     */
    _copyReactCommonFiles(option) {

        const {outPutProjectFolder} = option;
        const outPutUrl = outPutProjectFolder;

        this.fs.copyTpl(
            this.templatePath(`../_gitignore`),
            outPutUrl + '.gitignore'
        );
        this.fs.copyTpl(
            this.templatePath(`../_editorconfig`),
            outPutUrl + '.editorconfig'
        );
        this.fs.copyTpl(
            this.templatePath(`../_babelrc.js`),
            outPutUrl + '.babelrc.js'
        );


        //add test
        this.fs.copyTpl(
            this.templatePath(`../../common/__test__`),
            `${outPutUrl}src/__test__/`
        );
    }

    writing() {


        let outPutUrl = this.createRoot ? this.name + '/' : './';
        let resetCss = this.projectType === 'h5' ? 'reset.scss' : 'reset_pc.scss';

        let tplFile = '';
        let tplPath = '';

        switch (this.frameType) {

            case 'cloud':
            case 'standalone':

                tplFile = this.frameType;

                tplPath = this.templatePath(`../${tplFile}`);

                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        //frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName
                    }
                );


            case 'react':

                if (this.useRedux) {
                    tplFile = `${this.frameType}-redux`;
                } else {
                    tplFile = `${this.frameType}`;
                }

                tplPath = this.templatePath(`../${tplFile}`);
                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: resetCss,
                        flexibleStr: '<%= htmlWebpackPlugin.options.flexibleStr %>'
                    }
                );

                //add scss
                this.fs.copyTpl(
                    this.templatePath(`../../common/scss_mixin`),
                    `${outPutUrl}src/scss_mixin/`
                );

                //add utils 语法糖
                this.fs.copyTpl(
                    this.templatePath(`../../common/utils`),
                    `${outPutUrl}src/tools/utils/`
                );

                // commonFiles
                this._copyReactCommonFiles({
                    outPutProjectFolder: outPutUrl
                });


                break;

            case 'react-ts':
                // TODO: 支持redux
                // if (this.useRedux) {
                //     tplFile = `${this.frameType}-redux`;
                // } else {
                //     tplFile = `${this.frameType}`;
                // }
                tplFile = `${this.frameType}`;

                tplPath = this.templatePath(`../${tplFile}`);
                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: resetCss,
                        flexibleStr: '<%= htmlWebpackPlugin.options.flexibleStr %>'
                    }
                );

                //add scss
                this.fs.copyTpl(
                    this.templatePath(`../../common/scss_mixin`),
                    `${outPutUrl}src/scss_mixin/`
                );

                //add utils 语法糖
                this.fs.copyTpl(
                    this.templatePath(`../../common/utils-ts`),
                    `${outPutUrl}src/tools/utils/`
                );

                // commonFiles
                this._copyReactCommonFiles({
                    outPutProjectFolder: outPutUrl
                });

                break;


            // react-ant-ts不再需要任何额外拷贝
            // jiajianrong 2020-8-1
            case 'react-ant-ts':

            
                tplFile = `${this.frameType}`;

                tplPath = this.templatePath(`../${tplFile}`);

                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: '',
                        flexibleStr: ''
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`./.babelrc.js`),
                    outPutUrl + '.babelrc.js'
                );
                this.fs.copyTpl(
                    this.templatePath(`./.env.development`),
                    outPutUrl + '.env.development'
                );
                this.fs.copyTpl(
                    this.templatePath(`./.env.production`),
                    outPutUrl + '.env.production'
                );
                this.fs.copyTpl(
                    this.templatePath(`./.gitignore`),
                    outPutUrl + '.gitignore'
                );


                break;


            case 'react-hooks-ant4-ts':
            case 'react-ant-mobx-ts':

                tplFile = `${this.frameType}`;

                tplPath = this.templatePath(`../${tplFile}`);

                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: '',
                        flexibleStr: ''
                    }
                );

                // commonFiles
                this._copyReactCommonFiles({
                    outPutProjectFolder: outPutUrl
                });


                break;

            //case 'react-ant-multi-pages':
            case 'miniprogram-ts':

                tplFile = `${this.frameType}`;

                tplPath = this.templatePath(`../${tplFile}`);

                this.fs.copyTpl(
                    tplPath,
                    outPutUrl,
                    {
                        name: this.name,
                        author: this.author,
                        frameType: this.frameType,
                        email: this.email,
                        version: this.version,
                        desc: this.desc,
                        groupName: this.groupName,
                        resetCss: '',
                        flexibleStr: ''
                    }
                );

                this.fs.copyTpl(
                    this.templatePath(`./.eslintignore`),
                    outPutUrl + '.eslintignore'
                );

                this.fs.copyTpl(
                    this.templatePath(`./.eslintrc.js`),
                    outPutUrl + '.eslintrc.js'
                );

                this.fs.copyTpl(
                    this.templatePath(`./.gitignore`),
                    outPutUrl + '.gitignore'
                );

                break;


            default:

                break;

        }
    }

    /*install() {
        //是否自动安装依赖 npm install
        this.installDep && this.npmInstall();
    }*/
};
