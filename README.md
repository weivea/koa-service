# koa-servise

koa-router 提供了control。  
koa-servise 为control提供service，  
用法类似 egg 的service,    
就不用再把臃肿的代码写在 control里边了

service下的方法 可以通过`this.ctx.servics.xxx` 相互调用，  
`this.ctx`即为每次请求的ctx

支持`async/await`方法


## install

```
npm install koa-service --save
```

## usage
具体使用参考 [example](./example)

```
#目录环境
./index.js
./service
./service/testa
./service/testa/testd.js
./service/testa.js
./service/testb.js
./service/testc
./service/testc/testc.js
```

 ./index.js
```javascript

const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const service = require('../lib/koaService')

const app = new Koa();

app.use(service({
  serviceRoot: path.join(__dirname, 'service')
}))

const router = new Router();
router.get('/', async function(ctx, next) {
  ctx.service.testb.bFun()

  const re = await ctx.service.testa.testd.b2Fun()
  // console.log(re);
  ctx.body = re
  await next()
});
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8081, () => {
  console.log('listen 8081')
})
```

写一个service文件 ./service/testb.js
```javascript
class Servic {
  bFun() {
    console.log(__filename);
    return __filename;
  }
  async b2Fun() {
    const re = await this.ctx.service.testa.testd.b2Fun()
    console.log(__filename, 'log out:' , re)
    return await (() =>
      new Promise((resolve, reject) => {
        // 自运行返回Promise
        setTimeout(() => {
          resolve(`async ${__filename}`);
        }, 100);
      }))();
  }
}

module.exports = Servic;
```
