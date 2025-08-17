export const allowedOrigins = [
    "https://usrrname.github.io",
    "http://localhost:8787",
    "http://localhost:3000",
    "https://*.jenchan.biz",
];

export function appendHeaders(data: unknown, init: ResponseInit = {}) {
    const headers = {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": allowedOrigins.join(",")
    };
    return new Response(JSON.stringify(data), { ...init, headers: { ...headers, ...(init.headers || {}) } });
}