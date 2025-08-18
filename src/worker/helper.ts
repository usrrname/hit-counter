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

export const logHeaders = (request: Request) => {
    let headersObject = Object.fromEntries(request.headers);
    let requestHeaders = JSON.stringify(headersObject, null, 2);
    console.log(`Request headers: ${requestHeaders}`);
}