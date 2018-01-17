const gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('styles', () => {
    return gulp.src('./assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', () => {
    gulp.watch('./assets/**/*.scss', ['styles']);
});

gulp.task('default', ['styles']);