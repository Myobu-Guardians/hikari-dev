const fs = require("fs");
const packageJSON = require("./package.json");
packageJSON.homepage = process.argv[2];
fs.copyFileSync("./package.json", "./package.tmp.json");
fs.writeFileSync(
  "./package.json",
  JSON.stringify(packageJSON, null, "  ") + "\n"
);
