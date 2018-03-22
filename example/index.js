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