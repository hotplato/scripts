#!/usr/bin/env zx

'use strict'

const { networkInterfaces } = require('os')

const nets = networkInterfaces()
const result = {}
for (const key of Object.keys(nets)) {
    const r = {}
    const net = nets[key]
    for (const name of Object.keys(net)) {
        const n =  net[name]
        r[n.family] = n.address
    }
    result[key] = r
}
console.log(result)