/*
 * Copyright (C) 2015 - 2016 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global process */
/* global require */

/* eslint-disable quotes */
/* eslint-enable quotes: [2, "single"] */

/**
 * Tasks auflisten
 *    gulp --tasks
 *    gulp --tasks-simple
 */

import gulp from 'gulp';
import gulplog from 'gulplog';

// import debug from 'gulp-debug';
import tslintModule from 'tslint';
import gulpTslint from 'gulp-tslint';
import gulpNewer from 'gulp-newer';
import gulpReplace from 'gulp-replace';
import gulpSass from 'gulp-sass';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpRename from 'gulp-rename';
import gulpSourcemaps from 'gulp-sourcemaps';
import CleanCSS from 'clean-css';
import vinylMap from 'vinyl-map';
import gulpImagemin from 'gulp-imagemin';
import gulpClangFormat from 'gulp-clang-format';
import clangFormatPkg from 'clang-format';
import gulpTypescript from 'gulp-typescript';
import typescript from 'typescript';
import through from 'through2';

import chalk from 'chalk';
import shelljs from 'shelljs';
import rimraf from 'rimraf';

import browserSync from 'browser-sync';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import minimist from 'minimist';
import inquirer from 'inquirer';

const host = '127.0.0.1';
const portWebServer = 443;
const portJsonServer = 8080;

const srcDir = 'src';
const distDir = 'dist';

const dir = {
        app: `${srcDir}/app`,
        appDist: `${distDir}/app`,
        img: `${srcDir}/img`,
        css: `${distDir}/css`,
        fonts: `${distDir}/fonts`,
        imgDist: `${distDir}/img`,
        js: `${distDir}/js`,

        baseWeb: distDir
    };

const dateien = {
        ts: `${srcDir}/**/*.ts`,
        html: `${srcDir}/**/*.html`,
        configjs: `${srcDir}/config.js`,
        ico: `${srcDir}/*.ico`,
        sassApp: `${dir.app}/*.scss`,
        minCssApp: `${dir.appDist}/*.min.css*`,
        img: `${dir.img}/*`,
        js: [
            'node_modules/zone.js/dist/zone.min.js',
            'node_modules/reflect-metadata/Reflect.js*',
            'node_modules/systemjs/dist/system.js*',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.js',
            'node_modules/angular2/bundles/http.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/chart.js/Chart.min.js',
            'node_modules/lodash/lodash.js',
            'node_modules/moment/min/moment-with-locales.min.js',
            // 'node_modules/zone.js/dist/zone.js',
            // 'node_modules/systemjs/dist/system.src.js',
        ],
        ngMin: [
            'node_modules/rxjs/bundles/Rx.min.js*',
            'node_modules/angular2/bundles/angular2.min.js',
            'node_modules/angular2/bundles/router.min.js',
            'node_modules/angular2/bundles/http.min.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/font-awesome/css/font-awesome.css.map'
        ],
        fonts: [
            'node_modules/font-awesome/fonts/*'
        ],
        chartjsDts: [
            'config/typings/chart.js/*.d.ts'
        ],
        jwtDecode: [
            'node_modules/jwt-decode/lib/*.js'
        ]
    };

const tsconfigJson = require('./tsconfig.json');
const minExtCss = '.min.css';
const noop = through.obj;

let username;
let password;

function tslint(done) {
    'use strict';
    const argv = minimist(process.argv.slice(2));
    if (argv.nocheck) {
        done();
        return;
    }

    gulp.src(dateien.ts)
        //.pipe(debug({title: 'tslint:'}))
        .pipe(gulpTslint({tslint: tslintModule}))
        .pipe(gulpTslint.report('verbose'));
    done();
}
gulp.task(tslint);

function clangFormat(done) {
    'use strict';
    const argv = minimist(process.argv.slice(2));
    if (argv.nocheck) {
        done();
        return;
    }

    // http://clang.llvm.org/docs/ClangFormatStyleOptions.html
    return gulp.src(dateien.ts)
        // clang ist ein C/C++/Objective-C Compiler des Projekts LLVM http://www.llvm.org
        // Formatierungseinstellungen in .clang-format:
        // Google (default) http://google-styleguide.googlecode.com/svn/trunk/cppguide.html
        // LLVM http://llvm.org/docs/CodingStandards.html
        // Chromium http://www.chromium.org/developers/coding-style
        // Mozilla https://developer.mozilla.org/en-US/docs/Developer_Guide/Coding_Style
        // WebKit http://www.webkit.org/coding/coding-style.html
        .pipe(gulpClangFormat.checkFormat('file', clangFormatPkg, {verbose: true}))
        .on('warning', function(e) {
            process.stdout.write(e.message);
            done();
            process.exit(1);
        });
}
gulp.task(clangFormat);

// FIXME clang-format kann nicht parallel zu tslint ausgefuehrt werden
gulp.task('check', gulp.series(tslint, clangFormat));

// statt gulp-typescript kann man auch ts-loader fuer webpack verwenden
function tsc() {
    'use strict';
    const options = tsconfigJson.compilerOptions;
    options.typescript = typescript;
    return gulp.src(dateien.ts)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(options))
        .pipe(gulpSourcemaps.write('./maps'))
        .pipe(gulp.dest(distDir));
}
gulp.task('ts', gulp.series('check', tsc));

function js(done) {
    'use strict';
    gulp.src(dateien.js)
        .pipe(gulpNewer(dir.js))
        .pipe(gulp.dest(dir.js));

    const argv = minimist(process.argv.slice(2));
    if (argv.ngmin) {
        gulp.src(dateien.ngMin)
            .pipe(gulpNewer(dir.js))
            .pipe(gulp.dest(dir.js));
    }
    gulp.src(dateien.jwtDecode)
        .pipe(gulpNewer(`${dir.js}/jwt-decode`))
        .pipe(gulp.dest(`${dir.js}/jwt-decode`));
    done();
}
gulp.task(js);

// htmlhint funktioniert nur fuer komplette HTML-Seiten, nicht fuer Fragmente,
// d.h. nur fuer index.html.
// Ergaenzend koennte noch html-minifier verwendet werden.
function html(done) {
    'use strict';
     gulp.src([dateien.html, dateien.ico, dateien.configjs])
        .pipe(gulpNewer(distDir))
        .pipe(gulp.dest(distDir));
     done();
}
gulp.task(html);

// statt gulp-sass kann man auch sass-loader fuer webpack verwenden
function sass() {
    'use strict';
    const newerOptions = {dest: dir.appDist, ext: 'min.css'};
    // gulp-clean-css ist deprecated
    // Alternativen: clean-css direkt verwenden (s.u.) oder gulp-nanocss (Basis: PostCSS)
    const minify = vinylMap((buffer) => {
        return new CleanCSS({
            // Eigene Optionen fuer clean-css
        }).minify(buffer.toString()).styles;
    });

    return gulp.src(dateien.sassApp)
        .pipe(gulpNewer(newerOptions))
        .pipe(gulpSass())
        // Zulaessige Prefixe (-webkit, -moz, ...) siehe http://caniuse.com
        .pipe(gulpAutoprefixer({
            // siehe https://github.com/ai/browserslist
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpRename({extname: minExtCss}))
        .pipe(gulpSourcemaps.init())
        .pipe(minify)
        .pipe(gulpSourcemaps.write('.'))
        .pipe(gulp.dest(dir.appDist));
}
gulp.task(sass);

function css(done) {
    'use strict';
     gulp.src(dateien.css)
        .pipe(gulpNewer(dir.css))
        .pipe(gulp.dest(dir.css));
     done();
}
gulp.task(css);

function fonts(done) {
    'use strict';
     gulp.src(dateien.fonts)
        .pipe(gulpNewer(dir.fonts))
        .pipe(gulp.dest(dir.fonts));
     done();
}
gulp.task(fonts);

// nach der Installation von gulp-imagemin ist der Pfad node_modules\gulp-imagemin\... zum Loeschen zu lang
// Workaround: kuerzer Pfad durch das Windows-Kommando SUBST bis sich ein Teil des Pfades loeschen laesst usw.
function img(done) {
    'use strict';
    const argv = minimist(process.argv.slice(2));
    gulp.src(dateien.img)
        .pipe(gulpNewer(dir.imgDist))
        .pipe(argv.imagemin ? gulpImagemin() : noop())
        .pipe(gulp.dest(dir.imgDist));
    done();
}
gulp.task(img);

function chartjs(done) {
    'use strict';
     gulp.src(dateien.chartjsDts)
        .pipe(gulpNewer('node_modules/chart.js'))
        .pipe(gulp.dest('node_modules/chart.js'));
    done();
}
gulp.task(chartjs);

gulp.task('default', gulp.parallel('ts', js, html, sass, css, fonts, img, chartjs));

// Empfehlung: Kein Auto-Save im Editor
gulp.task('watch', gulp.series('default', () => {
    'use strict';
    // Aenderungen an TypeScript-Dateien?
    gulp.watch([dateien.ts], gulp.parallel('ts'));

    // Aenderungen an den Sass-Dateien?
    gulp.watch(dateien.sass, gulp.parallel(sass));
}));

function clean(done) {
    'use strict';
    rimraf(distDir, (e) => { if (e) { throw e; }});
    rimraf(dateien.minCssApp, (e) => { if (e) { throw e; }});
    done();
}
gulp.task(clean);

gulp.task('rebuild', gulp.series(clean, 'default'));

// Bei file:/// erlaubt jeder Browser aus Sicherheitsgründen keine Ajax-Requests,
// weil JavaScript sonst direkt im Dateisystem lesen koennte
function webserver() {
    'use strict';

    const argv = minimist(process.argv.slice(2));

    // browser-sync basiert auf connect   https://github.com/browsersync/browser-sync
    // Evtl. Probleme mit Windows 10: https://github.com/BrowserSync/browser-sync/issues/718
    const options = {
        // http://www.browsersync.io/docs/options
        server: {baseDir: dir.baseWeb},
        https: {key: 'config/https/key.pem', cert: 'config/https/cert.cer'},
        port: portWebServer,
        host: host,
        // https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries
        middleware: [connectHistoryApiFallback()],
        // Falls die Option --online NICHT gesetzt ist, sind xip und tunnel deaktiviert (werden fuer SWE nicht benoetigt)
        online: argv.online !== undefined,
        // Admin-Oberflaeche durch http://localhost:444 wird deaktiviert
        ui: false,
        // 'default', 'firefox', 'chrome'
        browser: 'chrome',
        reloadOnRestart: true,
        notify: false

        // Defaultwerte:
        // port: 3000
        // open: 'local'
    };

    browserSync(options);
}
gulp.task(webserver);

// Bei file:/// erlaubt jeder Browser aus Sicherheitsgründen keine Ajax-Requests,
// weil JavaScript sonst direkt im Dateisystem lesen koennte
function httpserver() {
    'use strict';

    // http-server als Webserver: auch einfach von der Console zu starten
    //                            KEIN Refresh moeglich bei SPA mit HTML5-Pfaden statt Hash-Location
    // Default-Port: 8080
    shelljs.exec(`http-server ${dir.baseWeb} -a 127.0.0.1 -p ${portWebServer} -S -K config/https/key.pem -C config/https/cert.cer -c no-cache`);
}
gulp.task(httpserver);

// Alternative Webserver:
//  live-server basiert auch auf connect, kann aber kein https
//  https://www.npmjs.com/package/live-server
//  https://github.com/tapio/live-server
//
//  gulp-webserver kann nur das aktuelle Verzeichnis als Basisverzeichnis
//  https://github.com/schickling/gulp-webserver

// http://localhost:8443
// http://localhost:8443/db
// http://localhost:8443/buecher
// http://localhost:8443/buecher/000000000000000000000001
function jsonserver(done) {
    'use strict';
    shelljs.exec(`json-server -w config/jsonserver/db.json -p ${portJsonServer} -i _id`);
    done();
}
gulp.task(jsonserver);

function doc(done) {
    'use strict';
    shelljs.exec('typedoc --verbose --options typedoc.json src');
    done();
}
gulp.task(doc);

function promptUsernamePassword(done) {
    'use strict';
    const questions = [
        {
            message: 'Username: ',
            name: 'username'
        },
        {
            message: 'Password: ',
            name: 'password',
            type: 'password'
        }
    ];
    inquirer.prompt(questions, (answers) => {
        username = answers.username;
        password = answers.password;
        done();
    });
}

function proxyNpm(done) {
    'use strict';
    shelljs.exec(`npm c set proxy http://${username}:${password}@proxy.hs-karlsruhe.de:8888`);
    shelljs.exec(`npm c set https-proxy http://${username}:${password}@proxy.hs-karlsruhe.de:8888`);
    done();
}

// Git fuer z.B. Alpha-Releases von GitHub (z.B. gulp 4.0.0.alpha2)
function proxyGit(done) {
    'use strict';
    shelljs.exec(`git config --global http.proxy http://${username}:${password}@proxy.hs-karlsruhe.de:8888`);
    shelljs.exec(`git config --global https.proxy http://${username}:${password}@proxy.hs-karlsruhe.de:8888`);
    shelljs.exec('git config --global url."http://".insteadOf git://');
    done();
}

function proxyTypings(done) {
    'use strict';
    gulp.src('config/proxy/.typingsrc')
        .pipe(gulpReplace('USERNAME', username))
        .pipe(gulpReplace('PASSWORD', password))
        .pipe(gulp.dest('.'));
    done();
}

gulp.task('proxy', gulp.series(promptUsernamePassword, gulp.parallel(proxyNpm, proxyGit, proxyTypings)));

function noproxyNpm(done) {
    'use strict';
    shelljs.exec('npm c delete proxy');
    shelljs.exec('npm c delete https-proxy');
    done();
}

function noproxyGit(done) {
    'use strict';
    shelljs.exec('git config --global --unset http.proxy');
    shelljs.exec('git config --global --unset https.proxy');
    shelljs.exec('git config --global --unset url."http://".insteadOf');
    done();
}

function noproxyTypings(done) {
    'use strict';
    rimraf('.typingsrc', (e) => { if (e) { throw e; }});
    done();
}

gulp.task('noproxy', gulp.parallel(noproxyNpm, noproxyGit, noproxyTypings));

function notes(done) {
    'use strict';
    gulplog.info(chalk.yellow.bgRed.bold(`Besser direkt aufrufen: notes ${srcDir}`));
    shelljs.exec(`notes ${srcDir}`);
    done();
}
gulp.task(notes);

function deps(done) {
    'use strict';
    gulplog.info(chalk.yellow.bgRed.bold('Besser direkt aufrufen: npm-dview'));
    shelljs.exec('npm-dview');
    done();
}
gulp.task(deps);
