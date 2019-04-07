const gulp = require('gulp');
const sass = require("gulp-sass");
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const inject = require('gulp-inject');
const uglify = require('gulp-uglify');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const cleanCSS = require('gulp-clean-css');

const paths = {
    src: "./Content/src",
    dest: "./Content/dist"
};

gulp.task('inject', function(){
    return gulp.src('./index.html')
    .pipe(inject(gulp.src([ paths.dest + '/Css/**/*.css', paths.dest + '/Scripts/**/*.js'], { read: false }), {   
        relative: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    return gulp.watch([paths.src +'/Sass/**/*.scss', paths.src + '/Scripts/**/*.js'], ['sass', 'scripts']);
})

gulp.task('assets', function(){
   return gulp.src(paths.src + '/Assets/**/*.*')
        .pipe(plumber({ errorHandler: function(err){
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(gulp.dest(paths.dest + '/Assets/'))
});

gulp.task('scripts', function(){
   return gulp.src(paths.src + '/Scripts/**/*.js')
        .pipe(plumber({ errorHandler: function(err){
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest + '/Scripts'))
});

gulp.task('sass', function () {
    return gulp.src(paths.src + '/Sass/main.scss')
        .pipe(plumber({ errorHandler: function(err){
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({ browsers: ["last 5 versions"] }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dest + '/Css'));
});

gulp.task('clean', function(){
    return del.sync([
        paths.dest + '/**'
      ]);
});

gulp.task('default', ['clean','assets', 'sass', 'scripts', 'inject', 'watch'])