#!/usr/bin/env zx

import net from 'net'

let server = net.createServer()
let port = 0
server.once('error', function(err) {
    console.log(`port ${port} is being listened on`)
})

server.once('listening', function() {
    server.close()
    server = null
    console.log(`port ${port} is available`)
})

const args = process.argv.slice(2)
port = args[1]
server.listen(port)