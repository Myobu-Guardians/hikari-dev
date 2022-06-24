const gulp = require("gulp");
const workboxBuild = require("workbox-build");

gulp.task("service-worker", () => {
  return workboxBuild
    .injectManifest({
      swSrc: "src/sw.js",
      swDest: "build/service-worker.js",
      globDirectory: "build",
      globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,otf,ttf}"],
      globIgnores: ["assets/apple-*"],
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 8, // 8mb
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
});
