/// <binding BeforeBuild='sass' AfterBuild='sass' />
var sass = require("gulp-sass");
var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');

var paths = {
    src: "./Content/Sass/main.scss",
    dest: "./Content/Css"
};

gulp.task('watch', function(){
    gulp.watch('./Content/Sass/**/*.scss', ['sass']);
})

gulp.task('sass', function () {
    return gulp.src(paths.src)
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', gutil.log)
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['sass','watch'])