//gulp 配置
'use strict';
//在gulpfile中先载入gulp包，因为这个包提供了一些api
//载入gulp模块
var gulp=require('gulp');
var less=require('gulp-less')//编译less
var cssnano=require('gulp-cssnano');
var browserSync=require('browser-sync').create();
var reload=browserSync.reload;
var concat=require('gulp-concat')//合并
var uglify=require('gulp-uglify')//压缩
var htmlmin=require('gulp-htmlmin')
//注册一个任务
/*****
 * 1.less编译 压缩 合并
 * 2.js合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 * *****/


//1.less编译 压缩 合并(合并没有必要，一般预处理css就可以导包)
gulp.task('style',function(){
	gulp.src('src/less/*.less'/*,'!src/less/_*.less')*/
	    .pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream:true
		}))//浏览器自动刷新(有问题待解决)
})
gulp.task('css',function(){
	gulp.src('src/css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream:true
		}))//浏览器自动刷新
})
//2.js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	 	.pipe(concat('all.js'))
	 	.pipe(uglify())
	 	.pipe(gulp.dest('dist/scripts'))
	 	.pipe(browserSync.reload({
			stream:true
		}))//浏览器自动刷新
})
//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	
	 	.pipe(gulp.dest('dist/images'))
	 	.pipe(browserSync.reload({
			stream:true
		}))//浏览器自动刷新
})
//4.html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
	 	.pipe(gulp.dest('dist/'))
	 	.pipe(browserSync.reload({
			stream:true
		}))//浏览器自动刷新
})
//5.配置本地服务器
gulp.task('serve',function(){
	browserSync.init({
		server: {
			baseDir:['dist']
		},	
	}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/less/*.less',['style'])//监听样式表文件
	gulp.watch('src/css/*.css',['css'])//监听样式表文件
	gulp.watch('src/scripts/*.js',['script'])//监听js文件
	gulp.watch('src/images/*.*',['image'])//监听img文件
	gulp.watch('src/*.html',['html'])//监听html文件
})
