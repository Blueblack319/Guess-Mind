import autoprefixer from "gulp-autoprefixer";
import del from "del";
import gulp from "gulp";
import minify from "gulp-csso";
import path from "path";
import sass from "gulp-sass";

sass.compiler = require("node-sass");

const routes = {
  style: {
    src: "assets/scss/*.scss",
    dist: "src/static/styles/",
    watch: "assets/scss/**/*.scss",
  },
};

const clean = () => del(path.join(__dirname, "src", "static", "/", "*"));

const watch = () => {
  gulp.watch(routes.style.watch, style);
};

const style = () =>
  gulp
    .src(routes.style.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.style.dist));

export const build = gulp.series([clean, style]);
export const dev = gulp.series([clean, style, watch]);
