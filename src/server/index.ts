import Koa from 'koa';
import serve from 'koa-static';
import { config as loadDotenv } from 'dotenv';

loadDotenv();

const PORT = process.env.PORT;

const app = new Koa();

app.use(serve('public'));

app.listen(PORT);