初始化：
配置project.config.json 中appid

### 构建config配置

开发环境配置：/config/dev.js
生产环境配置：/config/prod.js
开发和生产环境配置：/config/baseConf.js   

input: 编译源文件路径
output: 编译后输出路径
taskFnLists: gulp 任务执行集合
watchMap: 开发环境中，监听任务
mockPort: mock服务端口

开发环境：
开启ts编译： npm run start
开启mock服务： npm run mock
开启esLint监听： npm run lint-w
vscode开启mock服务快捷键： F5
eslint 自动修复： npm run fix-src

生产构建：
npm run build:pro



vscode辅助插件：
wxapp-helper


单测

eslint

动态config

vscode mock

组件通用能力