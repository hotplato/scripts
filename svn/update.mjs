#!/usr/bin/env zx
import {promises as fs} from 'fs'
import path from 'path'

const pid = path.resolve(process.cwd(), 'svn.pid')
$.verbose = false
const regex = /[0-9]/g;
let update = await nothrow($`svn update`)
if (update.exitCode === 0) {
    fs.writeFile(pid, update.stdout.match(regex).join(''))
}else {
    console.error(update.stderr)
}