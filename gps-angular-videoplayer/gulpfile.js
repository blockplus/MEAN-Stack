var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('clean-tmp', function (done) {
    var files = config.tmp;
    clean(files, done);
});

gulp.task('clean', function (done) {
    var delconfig = [].concat(config.dist, config.tmp);
    log('Cleaning ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-all', function (done) {
    var delconfig = config.allToClean;
    log('Cleaning ' + $.util.colors.blue(delconfig));
    clean(delconfig, done);
});

gulp.task('less', function () {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 2%']}))
        .pipe(gulp.dest(config.tmp));
});

gulp.task('less-watcher', function () {
    gulp.watch([config.less], ['less']);
});

gulp.task('sass', function () {
    log('Compiling Sass --> CSS');

    var sassOptions = {
        outputStyle: 'nested' // nested, expanded, compact, compressed
    };

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.tmp + '/styles'));
});

gulp.task('sass-min', function () {
    log('Compiling Sass --> minified CSS');

    var sassOptions = {
        outputStyle: 'compressed' // nested, expanded, compact, compressed
    };

    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sass(sassOptions))
        .pipe(gulp.dest(config.tmp + '/styles'));
});

gulp.task('sass-watcher', function () {
    gulp.watch([config.sass], ['sass']);
});

gulp.task('inject-localhost', function () {
    log('Injecting localhost config and custom scripts to index.html');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.configLocalhost.concat(config.js)), {relative: true}))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject-development', function () {
    log('Injecting development config and custom scripts to index.html');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.configDevelopment.concat(config.js)), {relative: true}))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject-production', function () {
    log('Injecting production config and custom scripts to index.html');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.configProduction.concat(config.js)), {relative: true}))
        .pipe(gulp.dest(config.client));
});

gulp.task('copy', function () {
    log('Copying assets');

    return gulp
        .src(config.assets, {base: config.client})
        .pipe(gulp.dest(config.dist + '/'));
});

gulp.task('optimize', ['sass-min'], function () {
    log('Optimizing the js, css, html');

    var assets = $.useref.assets({
        searchPath: [config.client, config.tmp]
    });
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)

        .pipe(cssFilter)
        .pipe($.concat('styles/main.css'))
        .pipe(cssFilter.restore)

        .pipe(jsFilter)
        .pipe(ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore)

        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.dist));
});

gulp.task('localhost', ['inject-localhost', 'sass'], function () {
});

gulp.task('localdev', ['inject-development', 'sass'], function () {
});

gulp.task('development', ['inject-development', 'optimize', 'copy'], function () {
});

gulp.task('production', ['inject-production', 'optimize', 'copy'], function () {
});

gulp.task('start-localhost', ['localhost'], function () {
    startBrowserSync('localhost');
});

gulp.task('start-localdev', ['localdev'], function () {
    startBrowserSync('localdev');
});

gulp.task('start-development', ['development'], function () {
    startBrowserSync('development');
});

gulp.task('start-production', ['production'], function () {
    startBrowserSync('production');
});

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

// function changeEvent(event) {

// }

function startBrowserSync(opt) {
    if (args.nosync || browserSync.active) {
        return;
    }

    var options = {
        port: 8088,
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0, //1000,
        online: false
    };

    switch (opt) {
        case 'development':
        case 'production':
            log('Serving dist app');
            serveDistApp();
            break;
        default:
            log('Serving app');
            serveApp();
            break;
    }

    function serveApp() {
        log('serveApp');

        gulp.watch([config.sass], ['sass']);

        options.server = {
            baseDir: [
                config.client,
                config.tmp
            ],
            middleware: [
                modRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        };
        options.files = [
            '!' + config.sass,
            config.client + '/index.html',
            config.client + '/app/**/*.*',
            config.client + '/lib/**/*.*',
            config.client + '/i18n/*.json',
            config.tmp + '/**/*.css'
        ];
//        options.files = [
//            '!' + config.sass,
//            config.client + '/**/*.*',
//            config.tmp + '/**/*.css'
//        ];

        browserSync(options);
    }

    function serveDistApp() {
        log('serveDistApp');

        options.server = {
            baseDir: [
                config.dist
            ],
            middleware: [
                modRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        };
        options.files = [];

        browserSync(options);
    }

}


