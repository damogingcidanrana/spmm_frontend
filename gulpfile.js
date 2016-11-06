var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    pug = require('gulp-pug'),
    sprites = require('gulp.spritesmith'),
    rename = require("gulp-rename"),
    compass = require('gulp-compass');

gulp.task('connect', function () {
    connect.server({
        root: path.build.html,
        port: 5000,
        livereload: true
    });
});

var path = {
    build: {
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        //js: 'Z:/www/influnet.svetas.sorokarm.ru/bitrix/templates/main/js',
        //css: 'Z:/www/influnet.svetas.sorokarm.ru/bitrix/templates/main/css',
        img_template: 'build/img/template',
        img_bs64:'build/img/template/base64',
        img_content: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.pug',
        js: 'src/js/scripts.js',
        style: 'src/sass/*.sass',  //Здесь указывается собирающий файл sass
        img: 'src/img/**/*.*',
        img_template: 'src/img/template/*.*',
        img_bs64: 'src/img/base64/*.*',
        img_sprite: 'src/img/sprites/*.*',
        img_content: 'src/img/content/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger())
       // .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(compass({
            project_path: __dirname + '/..',
            css: path.build.css,
            image: 'src/img/template',
            sass: 'src/sass',
            sourcemap: true,
            relative: false
        }))
        .pipe(prefixer({browsers:["last 5 version"]}))
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

gulp.task('image:build', function () {
   /* gulp.src(path.src.img_sprite)
        .pipe(sprites({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
            ,algorithm: 'alt-diagonal'
        }))
        .pipe(gulp.dest(path.build.img_template))
        .pipe(connect.reload());*/
    gulp.src(path.src.img_content) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_content))
        .pipe(connect.reload());
    gulp.src(path.src.img_template) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_template))
        .pipe(connect.reload());
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(connect.reload());
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['connect', 'build', 'watch']);