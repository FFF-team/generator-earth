# <%= name %>

* 作者：<%= author %>
* 邮箱：<%= email %>
* 版本：**`<%= version %>`**

## 介绍

_<%= desc %>_

---

## 安装

```
npm install
```

- 如果你还没有安装 `npm`，可通过以下方式进行 [安装](https://nodejs.org/en/download/)。
- 安装cnpm `npm install -g cnpm --registry=https://registry.npm.taobao.org`

---

## 开发调试 （见 开发文档.md）

进入项目目录后，使用 `node` 命令启动服务

```
npm run start
```

打包发布可通过 `node` 命令执行


```
npm run build
```

第一次 `npm run build` 之前，需要修改 `config/webpack.config.prod.js` 中的 `output.publicPath`，使其指定到正确的cdn项目

---
## 目录结构 （见 开发文档.md）



## 如何创建一个container

    step1, 复制 一个已有的container，如 `AssetMgmt` 到 新的目录，如 `AbcMgmt`
    step2, 修改 `AbcMgmt/constants.js`，确保命名空间唯一
    done
    step3, 修改App.js，添加该container的路由(route)，测试

## Changelog

### <%= version %>
1. init

---
