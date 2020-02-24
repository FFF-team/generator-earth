const Koa = require('koa');
const app = new Koa();


app.use(async function(ctx, next) {
    ctx.body = 'welcome';
});

app.listen(8088);


