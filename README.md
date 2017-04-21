# broccolli-wrapper
A wrapper around the Broccolli API, for convenience sake.

## distribution
Compiled distribution available as `dist/broccolli.js`.

## example
Load `index.html` and edit values in `index.js` as required.

## api
### base64 encoding
Returns a base64 encoded image string
```
broccolli.chunkToBase64(:chunk)
```
### Get Broccolli stream
```
// broccolli.getStream('http://node.broccolli.com', 'Webcam', function (data) {
//   $('#stream').attr('src', broccolli.chunkToBase64(data.chunk))
// })
broccolli.getStream(:path, :event, :callback)
```
### Pass event to Broccolli node
```
// Emit an event on Broccolli Socket
// broccolli.emitSocket('http://node.broccolli.com', 'PTZ', { direction: 'Right' })
emitSocket = (:path, :event, :data)
```
### Login to a component
```
login(:path, :credentials, :callback)
```
