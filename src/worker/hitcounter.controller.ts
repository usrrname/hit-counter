import { Context, Hono, Next } from 'hono';
import { allowedOrigins, logHeaders } from './helper';
import HitCounterService from './hitcounter.service';
const app = new Hono<{ Bindings: Env }>()
export type HitCounterContext = Context<{ Bindings: Env }>

app.use('*', async (c: HitCounterContext, next: Next) => {
    logHeaders(c.req.raw);
    await next();
})

app.get('/', async(c: HitCounterContext) => {
    const hitCounterService = new HitCounterService(c.env);
    const uniqueVisitors = await hitCounterService.getUniqueVisitors(c.env);
    console.log('uniqueVisitors', uniqueVisitors);
    return c.json({ visitors: uniqueVisitors });
});

app.get('/health', (c: HitCounterContext) => {
    const response = new Response('OK', { status: 200 });
    if (allowedOrigins.includes(c.req.header['origin']))
    return response;
})

export default app;