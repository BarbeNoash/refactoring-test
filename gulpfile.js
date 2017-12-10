const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// Transpile with babel and set in public folder
gulp.task('app', () => {
    return gulp.src(['app.js'], { base: "." })
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('public/dist/'))
});

// Transpile folder with babel
gulp.task('run', () => {
    return gulp.src(['routes/*', 'controllers/*', 'libs/**/*'], { base: "." })
        .pipe(babel({ presets: ['es2015'] }))
});

// Use sass preprocecing for styles
gulp.task('sass', () => {
    return gulp.src(['sass/**/*'], { base: "." })
        .pipe(notify({ message: 'preprocecing sass into styles.css' }))
        .pipe(sass().on('error', sass.logError))
        // Concat to output instead of directory
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/dist/'))
});

// Optimize size of images
gulp.task('images', function () {
    return gulp.src(['assets/images/*'])
        .pipe(notify({ message: 'images built' }))
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'))
});

// Build fonts
gulp.task('fonts', function () {
    return gulp.src(['assets/fonts/*'])
        .pipe(notify({ message: 'built fonts' }))
        .pipe(gulp.dest('public/fonts/'));
});

// Clean public directory
gulp.task('clean', () => {
    return gulp.src('public/', { read: false })
        .pipe(clean());
});

// Lauch localhost server
gulp.task('server', () => {
    nodemon({
        script: 'public/dist/app.js',
        watch: ['app.js', 'routes/*', 'controllers/*', 'libs/**/*', 'sass/**/*'],
        ext: 'js json scss png gif jpg svg',
        tasks: ['build'],
    }).on('restart', () => {
        gulp.src('public/dist/app.js').pipe(notify('Server successfully restarted'));
    })
});

// Define task lauch config
gulp.task('default', ['build', 'server']);
gulp.task('build', ['app', 'run', 'sass', 'images', 'fonts']);
gulp.task('heroku', ['clean', 'build']);
