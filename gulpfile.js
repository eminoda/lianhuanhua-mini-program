const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const argv = require('minimist')(process.argv.slice(2))
const mpConfig = require('./mp.config');
gulp.task("build-wxss", function () {
    if (mpConfig.pages.sass) {
        return gulp.src(mpConfig.pages.sass.moduleSrcDirtory)
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(rename(function (path) {
                path.extname = '.wxss';
            }))
            .pipe(gulp.dest(mpConfig.pages.sass.moduleOutDirtory))
    }
})
// gulp.task("build-sass", function () {
//     if (mpConfig.sass) {
//         return gulp.src(mpConfig.sass.moduleSrcDirtory)
//             .pipe(sass({
//                 outputStyle: 'compressed'
//             }).on('error', sass.logError))
//             .pipe(gulp.dest(mpConfig.sass.moduleOutDirtory))
//     }
// })
gulp.task("build", ['build-wxss'], function () {
    if (argv.watch) {
        gulp.watch(mpConfig.pages.sass && mpConfig.pages.sass.moduleSrcDirtory.concat(mpConfig.pages.sass.watchDirtory), ['build-wxss']);
        // gulp.watch(mpConfig.sass && mpConfig.sass.moduleSrcDirtory, ['build-sass']);
    }
})