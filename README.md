Koa-combo
=========

## 描述

用来合并js和css请求的Koajs中间件，类似[nginx-http-concat](https://github.com/alibaba/nginx-http-concat)功能。

## 使用

```javascript
var koa = require('koa');
var combo = require('koa-combo');
var app = koa();

app.use(combo('.', '&&'));
```

## 参数
  - path **{String}** 设置文件目录，必填
  - identifier **{String}** 设置切割符，可选，默认为`??`

## 例子

使用harmony模式启动example.js

```javascript
node --harmony example.js

// get http://localhost:88/assets/??a.css,b.css
// get http://localhost:88/assets/??test1.js,test2.js
```

## License

The MIT License (MIT)

Copyright (c) 2014 寒飞紫

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.