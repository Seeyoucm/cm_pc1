let gulp = require("gulp"),
    sass = require("gulp-sass"),
    uglifyJS = require("gulp-uglify"),
    babel = require("gulp-babel"),
     htmlmin = require("gulp-htmlmin"),
    connect = require("gulp-connect")
    dest = "dist";//项目部署目标目录

// 定制任务：编译sass
gulp.task("sass", function(){
    gulp.src("./src/sass/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
});

// 定制任务：压缩JS
gulp.task("js", function(){
    gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglifyJS())
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
});

// 定制任务，压缩HTML
gulp.task("html", function(){
    gulp.src("./src/**/*.html")
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});


// 启动服务器
gulp.task('connect', function() {
    connect.server({
        root : dest,
        livereload : true
    });
});

// 复制 images,lib,mock 到dist中
gulp.task("copy-images", function(){
    gulp.src("./src/images/**/*.*")
        .pipe(gulp.dest("./dist/images"))
        .pipe(connect.reload());
});
gulp.task("copy-lib", function(){
    gulp.src("./src/lib/**/*.*")
        .pipe(gulp.dest("./dist/lib"))
        .pipe(connect.reload());
});
gulp.task("copy-mock", function(){
    gulp.src("./src/mock/**/*.*")
        .pipe(gulp.dest("./dist/mock"))
        .pipe(connect.reload());
});
gulp.task("copy",["copy-images","copy-lib","copy-mock"]);

//监视任务
gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/js/*.js'],['js']);
    gulp.watch(['./src/sass/*.scss'],['sass']);
});
//定制默认任务
gulp.task('default', ["sass","js","html","copy",'connect', 'watch']);
