const { src, series, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')

var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end');
};

var sassOptions = {
  outputStyle: 'expanded'
};

var prefixerOptions = {
  browsers: ['last 2 versions']
};

// BUILD SUBTASKS
// ---------------

const styles = () => {
  return src('src/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass.sync(sassOptions).on('error', sass.logError))
    .pipe(dest('./dist/'))
    .pipe(prefix(prefixerOptions))
    .pipe(rename('main.css'))
    .pipe(dest('./dist/'))
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist/'))
}

const watcher = () => {
  watch('src/**/*.scss', styles)
}

// BUILD TASKS
// ------------

exports.default = series(styles, watcher)
exports.build = styles