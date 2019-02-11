const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers/index');
const render = require('koa-art-template');
const path = require('path');
const serve = require('koa-static');
const koaBodyparser = require('koa-bodyparser')
const { error } = require('./middlewares/errorHandler');
const { init } = require('./middlewares/initHandler');
const config = require('./config');
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'log/error.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger();
//注册错误处理中间件
error(app, logger);

//注册初始化中间件
init(app);

//注册静态目录
app.use(serve(config.STATIC_DIR));

//配置post的中间件
app.use(koaBodyparser());

//注册控制器
controllers(app);

//注册模板引擎
render(app, {
  root: path.join(config.VIEWS_DIR),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
 
app.listen(config.PROT, () => console.log('server running at 3000!'));