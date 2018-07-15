module.exports = {
    "pages": {
        "sass": {
            moduleSrcDirtory: ['app/pages/**/*.scss'],
            moduleOutDirtory: 'app/pages',
            watchDirtory: ['app/scss/**/*.scss', 'app/scss/*.scss']
        }
    },
    "sass": {
        moduleSrcDirtory: ['app/scss/*.scss', 'app/scss/**/*.scss'],
        moduleOutDirtory: 'app/assets'
    }
}