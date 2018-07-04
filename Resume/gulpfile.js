//引入gulp
var gulp         = require('gulp');
//引入组件
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS    = require('gulp-clean-css');
var less         = require('gulp-less');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

// 静态服务器
gulp.task('serve', ['compressCSS'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/**/*.less", ['compressCSS']);
    gulp.watch(["*.html","src/**/*.less"]).on('change', reload);
});

//编译/压缩css
gulp.task('compressCSS',function(){
	gulp.src('src/less/**/index.less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove:true
        }))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

//默认任务
gulp.task('default', ['serve']);

