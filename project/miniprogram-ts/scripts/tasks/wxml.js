const gulp = require('gulp');
const path = require('path');
const devConf = require('../../config/dev');
const prodConf = require('../../config/prod');
const alias = require('gulp-miniprogram-path-alias');

const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const dist = conf.output;
const inputSource = conf.input;
const aliasConfig = conf.aliasConfig

function wxml() {
    return gulp.src(path.resolve(inputSource, './**/*.wxml'))
        .pipe(alias(aliasConfig))
        .pipe(gulp.dest(dist));
}

module.exports = wxml;
