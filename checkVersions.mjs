#!/usr/bin/env zx

$.verbose = false;
const versions = (await $`zx -v | awk '{print $NF}' | awk -F '.' '{print $1}'`)
  .stdout;
if (versions == 2) {
  console.log("zx version must use " + chalk.yellow("2.x"));
  try {
    await `exist 1`;
  } catch (p) {
    console.log(p);
  }
} else {
  console.log("successful");
}
