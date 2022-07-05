import { IncomingMessage } from 'http'
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness.js'
import { mutex } from 'lib0/mutex.js'
import WebSocket from 'ws'

export interface SetupWSConnectionOptions {
  docName?: string | undefined
  gc?: boolean | undefined
}

export interface WSSharedDoc extends Y.Doc {
  readonly name: string
  readonly mux: mutex
  readonly conns: Map<object, Set<number>>
  readonly awareness: Awareness
}

export interface Persistence {
  bindState: (docName: string, yDoc: WSSharedDoc) => void
  writeState: (docName: string, yDoc: WSSharedDoc) => Promise<any>
  provider: any
}

export const setPersistence: (persistence: Persistence | null) => void
export const getPersistence: () => Persistence | null
export const docs: Map<string, WSSharedDoc>
export const getYDoc: (docname: string, gc?: boolean) => WSSharedDoc
export const setupWSConnection: (conn: WebSocket, req: IncomingMessage, options?: SetupWSConnectionOptions) => void
