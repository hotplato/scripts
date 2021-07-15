#!/usr/bin/env zx

const commands = Array.from(new Set(argv._.slice(1)))
const defaultCommands = {
  platform: () => os.platform(),
  type: () => os.type(),
  version: () => os.version(),
  arch: () => os.arch(),
  cpus: () => os.cpus().length,
  release: () => os.release(),
  mem: () => '~' + (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + 'G',
}
const output = (c) => {
  const command = defaultCommands[c]
  console.log(`${c}: ${command ? command() : ''}\n`)
}
if (commands.length) {
  commands.forEach(output)
} else {
  Object.keys(defaultCommands).forEach(output)
}
