import { Context, Hono } from 'hono';
import HitCounterService from './hitcounter.service';

const app = new Hono<{ Bindings: Env }>()
type HitCounterContext = Context<{ Bindings: Env }>

app.get('/health', (c: HitCounterContext) => {
    const response = new Response('OK', { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
})

app.get('/api', async(c: HitCounterContext) => {
    const hitCounterService = new HitCounterService(c.env);
    const uniqueVisitors = await hitCounterService.getUniqueVisitors(c.env);
    console.log('uniqueVisitors', uniqueVisitors);
    return c.json({ visitors: uniqueVisitors });
});

export default app;