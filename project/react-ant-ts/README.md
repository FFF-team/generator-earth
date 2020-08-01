# demo-4-earth-pc

* 作者：jiajianrong
* 邮箱：16446358@qq.com
* 版本：**`0.1.0`**
* 介绍：项目描述内容





## 安装

```
npm install
```







## 开发调试 （见 开发文档.md）

- 开发环境启动webpack dev server

```
npm run start
```

- 启动mock server

```
npm run build
```






## 打包

```
npm run build
```








## 如何创建一个page

```
    step1, 复制一个已有的page，如`/src/pages/index`到新目录，如`/src/pages/pageA`
    step2, 在`/public`目录里创建同名的html文件，如`pageA.html`
    done
```





## 如何创建一个container

```
    step1, 复制 一个已有的container，如 `Standard` 到 新的目录，如 `ContainerA`
    step2, 修改 `ContainerA/constants.js`，确保命名空间唯一
    done
    step3, 修改App.js，添加该container的路由(route)，测试
```



