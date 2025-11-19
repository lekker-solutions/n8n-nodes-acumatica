const gulp = require('gulp');

function buildIcons() {
    // Copy icon to each node directory
    gulp.src('src/nodes/acu.png')
        .pipe(gulp.dest('dist/nodes/ACM_Default_24_200_001'));

    return gulp.src('src/nodes/acu.png')
        .pipe(gulp.dest('dist/nodes/ACM_Default_25_200_001'));
}

exports['build:icons'] = buildIcons;
exports.default = buildIcons;