import type { CfProperties, ExecutionContext, ExportedHandler, KVNamespace, Request } from "@cloudflare/workers-types";
import { default as app } from './controller';

export interface Env {
    HIT_COUNTER_KV: KVNamespace;
    GA4_PROPERTY_ID: string;
    GA_CREDENTIALS: string;
}

const allowedOrigins = [
    "https://usrrname.github.io",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://jenchan.biz"
];

function json(data: unknown, init: ResponseInit = {}) {
    const headers = {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": allowedOrigins.join(",")
    };
    return new Response(JSON.stringify(data), { ...init, headers: { ...headers, ...(init.headers || {}) } });
}

export default {
    fetch(request: Request<unknown, CfProperties<unknown>>, env: Env, ctx: ExecutionContext): Response | Promise<Response> {
        return app.fetch(request, env, ctx);
    },
} satisfies ExportedHandler<Env>;
