#!/usr/bin/env zx

import path from 'path'
import { promises as fs, constants } from 'fs'

const command = process.argv.slice(3)[0]
const dataPath = path.resolve(os.homedir(), './t', 'data.json')
if (command) {
  let data = {}
  try {
    await fs.access(dataPath, constants.F_OK | constants.W_OK)
    data = JSON.parse(await fs.readFile(dataPath, { encoding: 'utf-8' }))
  } catch (error) {
    const resp = await fetch(
      'https://gitee.com/hotplato/scripts/raw/main/scripts.json'
    )
    if (resp.ok) {
      data = JSON.parse(await resp.text())
    }
    await fs.mkdir(path.dirname(dataPath))
    fs.writeFile(dataPath, JSON.stringify(data), { encoding: 'utf-8' }).then(
      () => {}
    )
  }
  await $`zx ${data[command]}`
}
