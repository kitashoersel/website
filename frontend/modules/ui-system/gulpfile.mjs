import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { deleteAsync } from 'del';
import through from 'through2';
import { objectify } from 'postcss-js';
import { parse } from 'postcss';
import concat from 'gulp-concat';

const sass = gulpSass(dartSass);

const dist = './dist';
const pluginSrc = './src/index.js';
const scssSrc = './src/base/**/*.scss';

const cssToJs = () =>
  through.obj((file, enc, cb) => {
    const content = file.contents.toString('utf8');
    const js = objectify(parse(content));
    file.contents = Buffer.from(`module.exports=${JSON.stringify(js)}`);
    return cb(null, file);
  });

export const clean = () => {
  return deleteAsync(['dist']);
};

const buildStyles = () => {
  const postcssPlugins = [autoprefixer(), cssnano()];
  return gulp
    .src(scssSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(concat('styles.css'))
    .pipe(cssToJs())
    .pipe(terser())
    .pipe(rename('index.js'))
    .pipe(gulp.dest(dist + '/base'));
};

const buildPlugin = () => {
  return gulp.src(pluginSrc).pipe(terser()).pipe(gulp.dest(dist));
};

export const build = gulp.series(clean, gulp.parallel(buildStyles, buildPlugin));

export const watch = () => {
  gulp.watch(scssSrc, buildStyles);
  gulp.watch(pluginSrc, buildPlugin);
};
