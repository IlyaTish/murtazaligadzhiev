const gulp         = require('gulp'),
      del          = require('del'),
      browserSync  = require('browser-sync').create(),
      include      = require('gulp-include'),
      pug          = require('gulp-pug'),
      sass         = require('gulp-sass'),
      pxtorem      = require('gulp-pxtorem'),
      cleanCSS     = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps   = require('gulp-sourcemaps'),
      concat       = require('gulp-concat'),
      babel        = require('gulp-babel'),
      uglify       = require('gulp-uglify-es').default,
      plumber      = require('gulp-plumber'),
      rename       = require('gulp-rename'),
      imagemin     = require('gulp-imagemin'),
      fs           = require('fs');


const PATHS = {
  src:  './src',
  dist: './dist',
  blocks: './src/blocks/',
  html: {
    src:  './src/*.html',
    dest: './dist'
  },
  pug: {
    src:  './src/*.pug',
    dest: './dist'
  },
  styles: {
    src:    './src/assets/sass/**/**/*.sass',
    blocks: './src/blocks/**/**/*.sass',
    dest:   './src/assets/css'
  },
  scripts: {
    src:    './src/assets/js/**/**/*.js',
    blocks: './src/blocks/**/**/*.js',
    dest:   './dist/assets/js'
  },
  libs: {
    jsSrc:   './src/assets/libs/*.js',
    cssSrc:  './src/assets/libs/**/*.css',
    cssDest: './src/assets/css'
  },
  images: {
    src: './src/blocks/**/**/*.+(png|jpg|jpeg|gif|svg|ico)',
  }
}


function reload() {
  browserSync.reload()
}


/* Удаление папки dist */

gulp.task('clear', async() => {
  console.log('\n' + '* Удаление папки dist *');

  const deletedPaths = await del([ PATHS.dist ])
});


/* Сборка html файлов */

gulp.task('html', () => {
  console.log('\n' + '* Сборка html файлов *');

  return gulp
    .src(PATHS.html.src)
    .pipe(gulp.dest(PATHS.html.dest))
    .pipe(browserSync.stream())
});


/* Компиляция pug файлов */

gulp.task('pug', () => {
  console.log('\n' + '* Компиляция pug файлов *');

  return gulp
    .src([ PATHS.pug.src, '!src/template.pug' ])
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: PATHS.blocks
    }))
    .pipe(gulp.dest(PATHS.pug.dest))
    .pipe(browserSync.stream())
});


/* Компиляция style.sass */

gulp.task('styles', () => {
  console.log('\n' + '* Компиляция style.sass *');

  return (
    gulp
      .src([ PATHS.styles.src, PATHS.styles.blocks ])
      .pipe(sass({
        includePaths: [PATHS.blocks]
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(concat('style.min.css'))
      .pipe(pxtorem({
        propList: ['*']
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest(PATHS.styles.dest))
      .pipe(browserSync.stream())
  )
});


/* Сборка библиотек стилей */

gulp.task('cssLibs', () => {
  console.log('\n' + '* Сборка библиотек стилей *');

  return (
    gulp
      .src(PATHS.libs.cssSrc)
      .pipe(concat('libs.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(PATHS.libs.cssDest))
      .pipe(browserSync.stream())
  )
});


/* Объединение всех стилей */

gulp.task('cssConcat', () => {
  console.log('\n' + '* Объединение всех стилей *');

  return (
    gulp
      .src(PATHS.src + '/assets/css/*.css')
      .pipe(concat('all.min.css'))
      .pipe(gulp.dest(PATHS.dist + '/assets/css'))
      .pipe(browserSync.stream())
  )
});


/* Объединение и сжатие скриптов */

gulp.task('scripts', () => {
  console.log('\n' + '* Объединение и сжатие скриптов *');

  return (
    gulp
      .src([ PATHS.libs.jsSrc, PATHS.scripts.src ])
      .pipe(plumber())
      .pipe(include({
        includePaths: [PATHS.blocks]
      }))
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(concat('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(PATHS.scripts.dest))
  )
});


/* Минификация картинок */

gulp.task('images', () => {
  console.log('\n' + '* Минификация картинок *');

  return gulp
    .src(PATHS.src + '/blocks/**/**/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(rename((path) => {
      let slash = '/';
      path.dirname = path.dirname.replace(slash + 'img', '')
    }))
    .pipe(gulp.dest(PATHS.dist + '/assets/img/'))
    .pipe(browserSync.stream())
});


/* Задача для копирования остальных файлов */

gulp.task('other.files', () => {
  console.log('\n' + '* Копирование остальных файлов *');

  return gulp.src(['**/**', '!**/*.{pug,sass}'], { cwd: PATHS.src + '/assets' })
  .pipe(gulp.dest(PATHS.dist + '/assets'))
});


/* Отслеживание pug/html/sass */

gulp.task('watch', () => {
  console.log('\n' + '* Отслеживание pug/html/sass *');

  browserSync.init({
    server: {
      baseDir: [ 'dist' ],
      index:   'index.html'
    },
    port: 3000
  });

  gulp.watch(PATHS.html.src).on('change', browserSync.reload);

  gulp.watch(
    [ PATHS.pug.src, PATHS.src + '/**/**/**/**/*.pug' ],
    gulp
      .series('pug'))
      .on('change', browserSync.reload
  );

  gulp.watch(
    [ PATHS.styles.src, PATHS.styles.blocks ],
    gulp
      .series('styles', 'cssLibs', 'cssConcat')
  );

  gulp.watch(PATHS.styles.dest);

  gulp.watch(
    [ PATHS.scripts.src, PATHS.scripts.blocks ],
    gulp
      .series('scripts'))
      .on('change', browserSync.reload
  );

  gulp.watch(PATHS.images.src, gulp.series('images'))
});


gulp.task('build',
  gulp.series(
    'clear',
    'html',
    'pug',
    'styles',
    'cssLibs',
    'cssConcat',
    'scripts',
    'images',
    'other.files'
  )
);

gulp.task('default', gulp.series('build', gulp.parallel('watch')))
