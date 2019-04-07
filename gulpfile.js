var sass = require("gulp-sass");
var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    src: "./Content/src",
    dest: "./Content/dist"
};

gulp.task('inject', function(){
    var target = gulp.src('./index.html');
    var sources = gulp.src([ paths.dest + '/Css/**/*.css', paths.dest + '/Scripts/**/*.js'], { read: false });

    return target.pipe(inject(sources, {   
        relative: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    return gulp.watch([paths.src +'/Sass/**/*.scss', paths.src + '/Scripts/**/*.js'], ['sass', 'scripts']);
})

gulp.task('assets', function(){
   return gulp.src(paths.src + '/Assets/**/*.*')
    .pipe(gulp.dest(paths.dest + '/Assets/'))
});

gulp.task('scripts', function(){
   return gulp.src(paths.src + '/Scripts/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + '/Scripts'))
});

gulp.task('sass', function () {
    return gulp.src(paths.src + '/Sass/main.scss')
        .pipe(sass({ 
            outputStyle: 'compressed' 
        }))
        .on('error', gutil.log)
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
        .pipe(gulp.dest(paths.dest + '/Css'));
});

gulp.task('clean', function(){
    return del.sync([
        paths.dest + '/**'
      ]);
});

gulp.task('default', ['clean','assets', 'sass', 'scripts', 'inject', 'watch'])