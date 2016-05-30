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

// In tsconfig.json *wird* man aehnlich wie bei SystemJS konfigurieren koennen,
// wo nicht-relative Pfade wie z.B. angular2/core zu suchen sind.
// Derzeit sucht TypeScript nur in node_modules.
// https://github.com/Microsoft/TypeScript/issues/5039
// https://github.com/DefinitelyTyped/DefinitelyTyped

// import 'reflect-metadata/Reflect';
// import 'es7-reflect-metadata/dist/browser';
// import 'zone.js/lib/browser/zone';

// AngularJS unterstuetzt npm als Package Manager und enthaelt .d.ts-Dateien
// im Verzeichnis node_modules
// https://github.com/angular/angular/issues/5248#issuecomment-156886060

// .d.ts-Dateien fuer Moment, Chart.js und lodash bereitstellen:
/// <reference path="../typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT} from
'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
// import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

// Nur fuer die Entwicklung, nicht fuer die Produktion
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
// Fuer die Produktion
// import {enableProdMode} from 'angular2/core';

import App from './app/app';

function isForOfSupported(): boolean {
    'use strict';
    try {
        /* tslint:disable:no-eval */
        eval('for (var e of ["a"]) {}');
        /* tslint:enable:no-eval */
        console.info(
            'ES 2015 wird zumindest teilweise durch den Webbrowser unterstuetzt.');
        return true;
    } catch (e) {
        // Evtl. pruefen: e instanceof SyntaxException
    }
    console.error('ES 2015 wird durch den Webbrowser NICHT unterstuetzt.');
    return false;
}
isForOfSupported();

// Fuer die Produktion
// enableProdMode();

bootstrap(
    App,
    [
      // Eigene Service-Objekte innerhalb der Root-Komponente sind Singletons
      // durch den "application-wide injector"
      // https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html
      ROUTER_PROVIDERS,
      // nicht mehr ROUTER_DIRECTIVES bei den "directives" eines Templates dekl.
      // notwendig fuer <router-outlet> und [routerLink]
      provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true}),
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}), HTTP_PROVIDERS,

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
      ELEMENT_PROBE_PROVIDERS
    ])
    // .then((success: any) => console.log(success))
    .catch((error: any) => console.error(error));
