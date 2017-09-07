module.exports = function () {
    var client = 'client',
        clientApp = './client/app',
        clientConfig = './client/config',
        dist = 'dist',
        tmp = '.tmp';

    return {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + "/index.html",
        configLocalhost: [
            clientConfig + "/ConfigLocalhost.js",
            clientConfig + "/AnalyticsDevelopment.js"
        ],
        configDevelopment: [
            clientConfig + "/ConfigDevelopment.js",
            clientConfig + "/AnalyticsDevelopment.js"
        ],
        configProduction: [
            clientConfig + "/ConfigProduction.js",
            clientConfig + "/AnalyticsProduction.js"
        ],
        alljs: [
            client + "/app/**/*.js",
            './*.js'
        ],
        assets: [
            client + "/google52bc5840811db4a2.html",
            client + "/robots.txt",
            clientApp + "/**/*.html",
            clientApp + "/**/*.css",

            client + "/bower_components/font-awesome/css/font-awesome.min.css",
            client + "/bower_components/font-awesome/fonts/*",

            client + "/bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.css",
            client + "/bower_components/Leaflet.awesome-markers/dist/images/*",

            client + "/bower_components/Leaflet.extra-markers/dist/css/leaflet.extra-markers.min.css",
            client + "/bower_components/Leaflet.extra-markers/dist/img/*",

            client + "/bower_components/leaflet/dist/leaflet.css",
            client + "/bower_components/leaflet/dist/images/*",

            client + "/bower_components/videogular-themes-default/fonts/*",
            client + "/bower_components/videogular-themes-default/videogular.min.css",

            client + "/fonts/**/*",
            client + "/i18n/**/*",
            client + "/images/**/*",
            client + "/styles/loader.css",
            client + "/styles/ui/images/*"
        ],
        less: [],
        sass: [
            client + "/styles/**/*.scss"
        ],
        js: [
            clientApp + "/**/*.module.js",
            clientApp + "/**/*.js",
            '!' + clientApp + "/**/*.spec.js"
        ],
        allToClean: [
            tmp,
            ".DS_Store",
            ".sass-cache",
            "node_modules",
            client + "/bower_components",
            "readme.md"
        ]
    };
};