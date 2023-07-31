//@ts-ignore
import { sendRequest } from "fermyon:spin/http"
import { statusTextList } from "./statusTextList"

class Response {
    status: number
    headers?: [String, String][]
    body?: ArrayBuffer
    constructor(body: string | ArrayBuffer, { headers = {}, status = 200 }) {
        this.headers = Object.entries(headers)
        this.status = status
        if (typeof (body) === "string") {
            this.body = new TextEncoder().encode(body)
        } else {
            this.body = body
        }
    }
}

interface FetchOptions {
    method?: string
    headers?: Record<string, string>
    body?: ArrayBuffer | Uint8Array | string
}

interface FetchHeaders {
    entries: () => [string, string][]
    get: (key: string) => string | null
    has: (key: string) => boolean
}

interface FetchResult {
    status: number
    headers: FetchHeaders
    arrayBuffer: () => ArrayBuffer
    ok: boolean
    statusText: string
    text: () => string
    json: () => object
}


function encodeBody(body: ArrayBuffer | Uint8Array | string) {
    if (typeof (body) == "string") {
        return new TextEncoder().encode(body).buffer
    } else if (ArrayBuffer.isView(body)) {
        return body.buffer
    } else {
        return body
    }
}

function fetch(uri: string | URL, options?: FetchOptions): FetchResult {
    let encodedBodyData = (options && options.body) ? encodeBody(options.body) : new Uint8Array(0).buffer
    const { status, headers, body } = sendRequest({
        method: (options && options.method) || "get",
        uri: (uri instanceof URL) ? uri.toString() : uri,
        headers: (options && Object.entries(options.headers || {})) || {},
        params: [],
        body: encodedBodyData,
    })
    return {
        status,
        headers: {
            entries: () => Object.entries(headers || {}),
            get: (key: string) => (headers && headers[key]) || null,
            has: (key: string) => (headers && headers[key]) ? true : false
        },
        arrayBuffer: () => body,
        ok: (status > 199 && status < 300),
        statusText: statusTextList[status],
        text: () => new TextDecoder().decode(body || new Uint8Array(0)),
        json: () => {
            let text = new TextDecoder().decode(body || new Uint8Array(0))
            return JSON.parse(text)
        }
    }
}


export {Response, fetch}