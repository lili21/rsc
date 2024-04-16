import { transformFile } from "@swc/core";
import fs from "node:fs/promises";

async function main() {
  const files = await fs.readdir("./src");
  files
    .filter((file) => /\.jsx$/.test(file))
    .forEach(async (file) => {
      const output = await transformFile(`./src/${file}`, {
        sourceMaps: false,
        jsc: {
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
          target: "esnext",
        },
      });
      fs.writeFile(`./dist/${file.replace(/jsx$/, "js")}`, output.code);
    });
}

main();
