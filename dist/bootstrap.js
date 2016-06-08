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
System.register(['angular2/platform/browser', 'angular2/core', 'angular2/router', 'angular2/http', 'angular2/platform/common_dom', './app/app'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, router_1, http_1, common_dom_1, app_1;
    function isForOfSupported() {
        'use strict';
        try {
            /* tslint:disable:no-eval */
            eval('for (var e of ["a"]) {}');
            /* tslint:enable:no-eval */
            console.info('ES 2015 wird zumindest teilweise durch den Webbrowser unterstuetzt.');
            return true;
        }
        catch (e) {
        }
        console.error('ES 2015 wird durch den Webbrowser NICHT unterstuetzt.');
        return false;
    }
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_dom_1_1) {
                common_dom_1 = common_dom_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            isForOfSupported();
            // Fuer die Produktion
            // enableProdMode();
            browser_1.bootstrap(app_1.default, [
                // Eigene Service-Objekte innerhalb der Root-Komponente sind Singletons
                // durch den "application-wide injector"
                // https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html
                router_1.ROUTER_PROVIDERS,
                // nicht mehr ROUTER_DIRECTIVES bei den "directives" eines Templates dekl.
                // notwendig fuer <router-outlet> und [routerLink]
                core_1.provide(core_1.PLATFORM_DIRECTIVES, { useValue: router_1.ROUTER_DIRECTIVES, multi: true }),
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_1.default }), http_1.HTTP_PROVIDERS,
                /* tslint:disable:max-line-length */
                // provide(LocationStrategy, {useClass: HashLocationStrategy}),
                // PathLocationStrategy ist der Default fuer LocationStrategy,
                // d.h. normale Pfade als Routen ("HTML5 routing").
                // https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries
                // Bookmarks und Page Refresh bei PathLocationStrategy:
                //      browser-sync:
                //          http://stackoverflow.com/questions/24474914/can-i-tell-browser-sync-to-always-use-one-html-file-for-html5mode-links#answer-30711530
                //      http-server:
                //          HashLocationStrategy wg. Refresh verwenden
                //      Apache Webserver:
                //          http://stackoverflow.com/questions/14319967/angularjs-routing-without-the-hash#answer-21484874
                //      nginx:   http://wiki.nginx.org/HttpRewriteModule#rewrite
                //               http://winginx.com/htaccess
                //               http://www.anilcetin.com/convert-apache-htaccess-to-nginx
                /* tslint:enable:max-line-length */
                //  Debugging durch z.B. ng.probe
                common_dom_1.ELEMENT_PROBE_PROVIDERS
            ])
                .catch((error) => console.error(error));
        }
    }
});

//# sourceMappingURL=maps/bootstrap.js.map
