/**
 * 替换掉原来的.babelrc文件
 * js配置更具有灵活性。比如根据不同的环境babel可以有不同的配置
 */

module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "modules": false
        }],
        "react-app"
    ]
};
