#!/usr/bin/env zx
import { promises as fs } from "fs";
import path from "path";
import { existCommond } from "../utils/platform.mjs";

$.verbose = false;
const commond = "svn";
if (await existCommond(commond)) {
  const pidPath = path.resolve(process.cwd(), "svn.pid");
  let pid = await fs.readFile(pidPath, { encoding: "utf-8" });
  const regex = /[0-9]/g;
  let update = await $`${commond} update`;
  if (update.exitCode === 0) {
    const newPid = update.stdout.match(regex).join("");
    if (newPid !== pid) {
      console.log("update successful");
    } else {
      console.log("no update");
    }
    fs.writeFile(pidPath, newPid);
  } else {
    console.error(update.stderr);
  }
} else {
  console.log("svn must be installed");
}
