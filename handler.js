import { sendRequest as fetch } from 'fermyon:spin/http';

export const inboundHttp = {
    handleRequest(req) {
        console.log(fetch);
        return { status: 200, body: new TextEncoder().encode(`Hello from ${req.uri}`) };
    }
}
