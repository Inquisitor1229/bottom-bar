const gulp = require('gulp'),
      plumber = require('gulp-plumber'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create();

gulp.task('pug', function(done) {
    gulp.src("src/pug/page/index.pug")
        .pipe(plumber())
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream());

    done();
});

gulp.task('sass-compile', function(done) {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', function(done) {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'))
    gulp.watch('src/scss/**/*.scss', gulp.series('sass-compile'))
});

gulp.task('default', gulp.series('pug', 'sass-compile', 'serve'));