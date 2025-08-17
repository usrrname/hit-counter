import type { ExecutionContext, ExportedHandler, Request } from "@cloudflare/workers-types";
import { default as app } from './hitcounter.controller';
// @ts-ignore
import type { Env } from './worker-configuration.d';

const allowedOrigins = [
    "https://usrrname.github.io",
    "http://localhost:8787",
    "http://localhost:3000",
    "https://jenchan.biz",
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
        return app.fetch(request, env, ctx)
    },
} satisfies ExportedHandler<Env>;
