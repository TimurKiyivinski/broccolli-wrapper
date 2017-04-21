const io = require('socket.io-client')
const encode = require('base64-arraybuffer').encode

const chunkToBase64 = chunk => `data:image/jpeg;base64,${encode(chunk)}`

const sockets = {}

const connectSocket = path => {
  if (!sockets[path]) {
    sockets[path] = io(path)
  }
}

// Callback for Broccolli event Stream
// broccolli.getStream('http://node.broccolli.com', 'Webcam', function (data) {
//   $('#stream').attr('src', broccolli.chunkToBase64(data.chunk))
// })
const getStream = (path, event, callback) => {
  connectSocket(path)
  sockets[path].on(event, callback)
}

// Emit an event on Broccolli Socket
// broccolli.emitSocket('http://node.broccolli.com', 'PTZ', { direction: 'Right' })
const emitSocket = (path, event, data) => {
  connectSocket(path)
  sockets[path].emit(event, data)
}

const login = (path, credentials, callback) => {
  fetch(`${path}/v2/auth/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(res => res.json())
    .then(res => callback(res))
}

const broccolli = {
  chunkToBase64: chunkToBase64,
  getStream: getStream,
  emitSocket: emitSocket,
  login: login
}

module.exports = broccolli
