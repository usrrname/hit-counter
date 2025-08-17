import { describe, expect, it, vi } from 'vitest';

import { KVNamespaceGetOptions, KVNamespacePutOptions } from '@cloudflare/workers-types';
import {
    env, // @ts-ignore
} from "cloudflare:test";
import worker from './index';
vi.mock('google-auth-library', () => ({ GoogleAuth: class { } }));
vi.mock('googleapis', () => ({ google: { analyticsdata: { properties: { runReport: async () => ({ data: { rows: [{ metricValues: [{ value: '0' }] }] } }) } } } }));

const mockEnv = {
    HIT_COUNTER_KV: {
        get: async (key: string, options?: Partial<KVNamespaceGetOptions<"text">>) => {
            console.log('get', key, options);
            return '0';
        },
        put: async (key: string, value: string, options?: Partial<KVNamespacePutOptions>) => {
            return;
        },
    },
    PROPERTY_ID: '1234567890',
    GA_CREDENTIALS: 'test/credentials.json',
};

describe('worker', () => {
    it('should be defined', () => {
        expect(worker).toBeDefined();        
    });

    it('should return 200 when GET to /health is from allowed origin', async () => {
        const headers = new Headers();
        headers.set('Origin', 'http://localhost:3000');
        const request = new Request('http://localhost:8787/health', {
            headers
        });
        const response = await worker.fetch(request, mockEnv, env);
        expect(response.status).toBe(200);
    });

    it('should return 404 when GET to /health is not from allowed origin', async () => {
        const headers = new Headers();
        headers.set('Origin', 'http://localhost:3002');
        const request = new Request('http://localhost:8787/api/health', {
            headers
        });
        const response = await worker.fetch(request, mockEnv, env);
        expect(response.status).toBe(404);
    });

    it('should return 200 when GET to /api', async () => {
        const request = new Request('http://localhost:8787/api', {
            headers: {
                'Origin': 'http://localhost:3000'
            }
        });
        const response = await worker.fetch(request, mockEnv, env);
        const body = await response.text();
        expect(body).toBe('0');
    });
});