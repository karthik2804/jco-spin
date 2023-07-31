//@ts-ignore
import { getConfig } from "fermyon:spin/config"
//@ts-ignore
import { open, get, set, exists, getKeys, delete as del} from "fermyon:spin/key-value"

const Config = {
    get: (key: string) => {
        return getConfig(key)
    }
}

const Kv = {
    open(name: string) {

    },
    openDefault() {
        let openedStore = open("default")
        let store = {
            get: (key: string): Uint8Array => {
                return get(openedStore, key)
            },
            set: (key: string, value: ArrayBuffer) => {
                set(openedStore, key, value)
            },
            exists: (key: string): boolean => {
                return exists(openedStore, key)
            },
            list: (): string[] => {
                return getKeys(openedStore)
            },
            delete: (key: string): void => {
                del(openedStore, key)
            }
        }

        return store
    }
}


export { Config, Kv }