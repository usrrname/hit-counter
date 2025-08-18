import type { ExecutionContext, Request } from "@cloudflare/workers-types";
import { default as app } from './hitcounter.controller';
// @ts-ignore
import type { Env } from './worker-configuration.d';

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        //@ts-ignore
        return app.fetch(request, env, ctx)
    }
}
