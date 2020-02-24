const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const devConf = require('../../config/dev');
const prodConf = require('../../config/prod');
const alias = require('gulp-miniprogram-path-alias');


const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const dist = conf.output;
const inputSource = conf.input;
const aliasConfig = conf.aliasConfig
sass.compiler = require('node-sass');

function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(path.resolve(inputSource, './**/*.scss'))

            // Use sass with the files found, and log any errors
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                // 不美化属性值
                cascade: false,
            }))
            .pipe(rename((pathext) => {
                pathext.extname = '.wxss';
            }))
            .pipe(alias(aliasConfig))
            // What is the destination for the compiled file?
            .pipe(gulp.dest(dist))
    );
}

module.exports = style;
