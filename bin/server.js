#!/usr/bin/env node
import { setPersistence, setupWSConnection } from './utils.js'
import { WebSocketServer } from 'ws'
import http from 'http'
import { LeveldbPersistence } from 'y-leveldb'
import * as Y from 'yjs'

const persistenceDir = process.env.YPERSISTENCE
if (typeof persistenceDir === 'string') {
  console.info('Persisting documents to "' + persistenceDir + '"')
  // @ts-ignore
  const ldb = new LeveldbPersistence(persistenceDir)
  setPersistence({
    provider: ldb,
    bindState: async (docName, ydoc) => {
      const persistedYdoc = await ldb.getYDoc(docName)
      const newUpdates = Y.encodeStateAsUpdate(ydoc)
      ldb.storeUpdate(docName, newUpdates)
      Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
      ydoc.on('update', update => {
        ldb.storeUpdate(docName, update)
      })
    },
    writeState: async (docName, ydoc) => {}
  })
}

const wss = new WebSocketServer({ noServer: true })

const host = process.env.HOST ?? 'localhost'
const port = parseInt(process.env.PORT ?? '1234')

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('okay')
})

wss.on('connection', setupWSConnection)

server.on('upgrade', (request, socket, head) => {
  // You may check auth of request here..
  // See https://github.com/websockets/ws#client-authentication
  /**
   * @param {any} ws
   */
  const handleAuth = ws => {
    wss.emit('connection', ws, request)
  }
  wss.handleUpgrade(request, /** @type {any} */ (socket), head, handleAuth)
})

server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`)
})
