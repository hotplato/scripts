#!/usr/bin/env zx
import {promises as fs} from 'fs'
import path from 'path'


$.verbose = false
const pidPath = path.resolve(process.cwd(), 'svn.pid')
let pid = await fs.readFile(pidPath)
const regex = /[0-9]/g;
let update = await $`svn update`
if (update.exitCode === 0) {
    const newPid = update.stdout.match(regex).join('')
    if (newPid !== pid) {
        console.log('update successful')
    }else {
        console.log('no update')
    }
    fs.writeFile(pidPath, newPid)
}else {
    console.error(update.stderr)
}