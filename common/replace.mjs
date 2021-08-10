#!/usr/bin/env zx

$.verbose = false
try {
  const sources = argv.s || argv.sources
  if (!sources) {
    await $`exit 1`
  }
  const target = argv.t || argv.target
  if (!target) {
    console.log(
      chalk.yellowBright(
        '你没有填入输出源，结果将输出到终端，如需要输出到文件: ',
        chalk.white.bgYellowBright('-t/-target example.txt')
      )
    )
  }
  if (argv._.length > 3) {
    await $`exit 2`
  }
  const rules = argv._[1]
  const replacement = argv._[2]
  let raw = await fs.readFile(sources, { encoding: 'utf-8' })
  const replaceRaw = raw.replace(new RegExp(rules, 'g'), replacement)
  if (target) {
    await fs.writeFile(target, replaceRaw, { encoding: 'utf-8' })
  } else {
    console.log(chalk.white.bgBlue(replaceRaw))
  }
} catch (p) {
  const code = p.exitCode
  if (code === 1) {
    console.log('必须输入源: -t example.txt')
  } else if (code === 2) {
    console.log(
      chalk.red(
        '替换规则，应是: ',
        chalk.white.bgRed(
          'command regex replaceText -s sources.txt -t target.txt'
        )
      )
    )
  } else {
    console.log(
      chalk.red(
        '错误代码: ' + code,
        chalk.white.bgRed(
          'command regex replaceText -s sources.txt -t target.txt'
        )
      )
    )
  }
}
