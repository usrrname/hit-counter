import type { ExecutionContext, Request } from "@cloudflare/workers-types";
import { default as app } from './hitcounter.controller';
// @ts-ignore
import type { Env } from './worker-configuration.d';

export default {
    ...app,
    fetch(request: Request<unknown, CfProperties<unknown>>, env: Env, ctx: ExecutionContext){
        return app.fetch(request, env, ctx)
    }
}
