'use strict';

var gulp = require('gulp');
const { src, pipe, watch, series, dest } = require('gulp')
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

sass.compiler = require('node-sass');

const compile = function () {
  return src('./src/index.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./dist'));
};

const prefixer = function () {
  var plugins = [
      autoprefixer({browsers: ['last 1 version']}),
      cssnano()
  ];
  return src('./dist')
      .pipe(postcss(plugins))
      .pipe(dest('./dist'));
};

const watcher = function () {
  watch('./src/**/*.scss', series(compile, prefixer));
};

exports.watcher = watcher;
exports.default = series(compile, prefixer);

