const login = $('#login')
const nodes = $('#nodes')
const streams = $('#streams')
const credentials = { username: 'test', password: 'test' }
const url = 'http://orchestra.broccolli.com:3000'

broccolli.login(url, credentials, function (data) {
  login.html(JSON.stringify(data))

  function handleNodes (user, nodes) {
    nodes.map(node => {
      console.log(`Logging in to node named ${node.name} with endpoint: ${node.url}`)
      broccolli.login(node.url, user, function (data) {
        fetch(`${node.url}/v2/streams`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }).then(res => res.json())
          .then(res => {
            res.streams
              .filter(stream => stream === 'Webcam')
              .map(stream => {
                const imgDOM = $('<img />', { 
                  src: '#',
                  alt: 'Loading stream'
                })

                broccolli.getStream(node.url, stream, data => {
                  imgDOM.attr('src', broccolli.chunkToBase64(data.chunk))
                })

                streams.append(imgDOM)
              })
          })
      })
    })
  }

  fetch(`${url}/v2/whoami`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json())
    .then(res => {
      const user = {
        username: res.user._id,
        password: res.user.token
      }

      fetch(`${url}/v2/node`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(res => res.json())
        .then(res => handleNodes(user, res.nodes))
    })
})
