import { WSSharedDoc } from './utils.js'

export const isCallbackSet: boolean
export const callbackHandler: (update: Uint8Array, origin: any, doc: WSSharedDoc) => void
