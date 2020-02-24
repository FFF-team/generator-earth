const gulp = require('gulp');
const path = require('path');
const devConf = require('../../config/dev');
const prodConf = require('../../config/prod');

const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const dist = conf.output;
const inputSource = conf.input;

function move() {
    return gulp.src(path.resolve(inputSource, './**/!(*.ts|*.scss|*.wxml)'))
        .pipe(gulp.dest(dist));
}

module.exports = move;
