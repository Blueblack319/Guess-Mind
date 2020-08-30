import autoprefixer from "gulp-autoprefixer";
import babelify from "babelify";
import bro from "gulp-bro";
import del from "del";
import gulp from "gulp";
import minify from "gulp-csso";
import sass from "gulp-sass";

sass.compiler = require("node-sass");

const routes = {
  style: {
    src: "assets/scss/*.scss",
    dist: "src/static/styles/",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/*.js",
    dist: "src/static/js/",
    watch: "assets/js/**/*.js",
  },
};

const clean = () => del(["src/static/"]);

const watch = () => {
  gulp.watch(routes.style.watch, style);
  gulp.watch(routes.js.watch, js);
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

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dist));

export const build = gulp.series([clean, style, js]);
export const dev = gulp.series([clean, style, js, watch]);
