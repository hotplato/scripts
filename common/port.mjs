#!/usr/bin/env zx

import net from 'net'

let server = net.createServer()
const port = argv._[1]
server.once('error', function(err) {
    console.log(`port ${port} is being listened on`)
})

server.once('listening', function() {
    server.close()
    server = null
    console.log(`port ${port} is available`)
})

server.listen(port)