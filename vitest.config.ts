import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject(() => {
    return {
        test: {
            include: ['src/**/*.test.ts'],
            globals: true,
            poolOptions: {
                workers: { wrangler: { configPath: './wrangler.toml' } },
            },
            miniflare: {
                kvNamespaces: ["HIT_COUNTER_KV"],
            },
        },
    }
})
