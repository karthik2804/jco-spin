import { Response, fetch, Kv } from 'spin-sdk';

export const inboundHttp = {
    handleRequest(req: any) {
        let a = fetch("https://random-data-api.fermyon.app/animals/json")
        let store = Kv.openDefault()
        store.set("test", new TextEncoder().encode("value"))
        console.log(new TextDecoder().decode(store.get("test")))
        store.delete("test")
        console.log(store.list())
        console.log(a.text())
        return  new Response("hello world", {status: 201, headers: {"foo": "bar"}});
    }
}
