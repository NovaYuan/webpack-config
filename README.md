## Getting Started

```

下载依赖

```bash
$ npm install or $ cnpm install
```

启动项目

```bash

$ npm run dev

```

项目打包

```bash
$ npm run build
```


## Project Instruction

项目目录

```bash
script --------- 对应node执行的相关命令
static --------- 公共静态资源目录
src ------------ 这个是项目的总入口
.editorconfig -- 这个是对编辑器编写规则的一些配置，如果要用，编辑器安装对应的插件即可（一般插件名称就叫editorconfig）
.eslintrc.js --- eslint语法检查相关配置，npm start默认开启语法检查，如果需要编辑器动态检查，需安装对应的插件
.postcssrc.js -- px转rem + 自动补齐前缀
```

src项目结构
```bash
config ------------ 环境配置页面
assets ------------ 静态资源
components -------- 组件
entry ------------- 入口文件
routes ------------ 路由管理
services ---------- ajax请求
util -------------- 通用js
views ------------- 子页面
index.html 
```


如果你所使用的过程中有任何疑问或者建议，欢迎提出！
