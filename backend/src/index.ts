import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import KoaLogger from 'koa-logger';
import Router from 'koa-router';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(KoaLogger());
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(bodyParser());

const router = new Router();
router.get('', (ctx: Context) => {
  const data = { message: 'Hello World!' };
  const json = JSON.stringify(data);
  ctx.body = json;
});

app.use(router.routes());

app.use((ctx: Context) => {
  const data = { message: 'Error!', error: 'Not found', status: 404 };
  const json = JSON.stringify(data);
  ctx.status = 404;
  ctx.body = json;
});

const server = app
  .listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('close', () => {
    console.info('Server closed');
  });

export default server;
