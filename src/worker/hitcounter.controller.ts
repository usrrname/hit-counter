import { Context, Hono, Next } from 'hono';
import HitCounterService from './hitcounter.service';

const app = new Hono<{ Bindings: Env }>()
export type HitCounterContext = Context<{ Bindings: Env }>

app.use('*', async (c: HitCounterContext, next: Next) => {
    await next();
})

app.get('/health', (c: HitCounterContext) => {
    const response = new Response('OK', { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
})

app.get('/', async(c: HitCounterContext) => {
    const hitCounterService = new HitCounterService(c.env);
    const uniqueVisitors = await hitCounterService.getUniqueVisitors(c.env);
    console.log('uniqueVisitors', uniqueVisitors);
    return c.json({ visitors: uniqueVisitors });
});

export default app;