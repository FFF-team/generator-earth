# ts-learm

* 作者：xuhechuan
* 邮箱：xuhechuan@58.com
* 版本：**`0.1.0`**

## 介绍

_项目描述内容_

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



## Changelog

### 0.1.0
1. init

---
