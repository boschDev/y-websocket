'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var http = require('http');

const CALLBACK_URL = process.env.CALLBACK_URL ? new URL(process.env.CALLBACK_URL) : null;
const CALLBACK_TIMEOUT = Number(process.env.CALLBACK_TIMEOUT || 5000);
const CALLBACK_OBJECTS = process.env.CALLBACK_OBJECTS ? JSON.parse(process.env.CALLBACK_OBJECTS) : {};

const isCallbackSet = !!CALLBACK_URL;

/**
 * @param {Uint8Array} update
 * @param {any} origin
 * @param {import('./utils.js').WSSharedDoc} doc
 */
const callbackHandler = (update, origin, doc) => {
  if (CALLBACK_URL == null) return

  const room = doc.name;
  const dataToSend = {
    room: room,
    data: {}
  };
  const sharedObjectList = Object.keys(CALLBACK_OBJECTS);
  sharedObjectList.forEach(sharedObjectName => {
    const sharedObjectType = CALLBACK_OBJECTS[sharedObjectName];
    dataToSend.data[sharedObjectName] = {
      type: sharedObjectType,
      content: getContent(sharedObjectName, sharedObjectType, doc).toJSON()
    };
  });
  callbackRequest(CALLBACK_URL, CALLBACK_TIMEOUT, dataToSend);
};

/**
 * @param {URL} url
 * @param {number} timeout
 * @param {Object} data
 */
const callbackRequest = (url, timeout, data) => {
  data = JSON.stringify(data);
  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    timeout: timeout,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const req = http.request(options);
  req.on('timeout', () => {
    console.warn('Callback request timed out.');
    req.abort();
  });
  req.on('error', (e) => {
    console.error('Callback request error.', e);
    req.abort();
  });
  req.write(data);
  req.end();
};

/**
 * @param {string} objName
 * @param {string} objType
 * @param {import('./utils.js').WSSharedDoc} doc
 */
const getContent = (objName, objType, doc) => {
  switch (objType) {
    case 'Array':
      return doc.getArray(objName)
    case 'Map':
      return doc.getMap(objName)
    case 'Text':
      return doc.getText(objName)
    case 'XmlFragment':
      return doc.getXmlFragment(objName)
    // The function getXmlElement does not exists in the Y.Doc docs.
    // case 'XmlElement':
    //   return doc.getXmlElement(objName)
    default :
      return {}
  }
};

exports.callbackHandler = callbackHandler;
exports.isCallbackSet = isCallbackSet;
//# sourceMappingURL=callback.cjs.map
