const {src, dest, series} = require('gulp');

function build(cb) {
    src('./src/**/*').pipe(dest('./dist/'));
    cb();
}

exports.build = build;
exports.default = series(build);