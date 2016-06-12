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
System.register(['./home', '../artikelverwaltung/component/details_artikel/details_artikel', '../artikelverwaltung/component/suche_artikel/suche_artikel', '../artikelverwaltung/component/suche_artikel_id/suche_artikel_id', '../artikelverwaltung/component/create_artikel/create_artikel'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var home_1, details_artikel_1, suche_artikel_1, suche_artikel_id_1, create_artikel_1;
    var APP_ROUTES, APP_ROUTE_DEFINITIONS;
    return {
        setters:[
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (details_artikel_1_1) {
                details_artikel_1 = details_artikel_1_1;
            },
            function (suche_artikel_1_1) {
                suche_artikel_1 = suche_artikel_1_1;
            },
            function (suche_artikel_id_1_1) {
                suche_artikel_id_1 = suche_artikel_id_1_1;
            },
            function (create_artikel_1_1) {
                create_artikel_1 = create_artikel_1_1;
            }],
        execute: function() {
            /* tslint:enable:max-line-length */
            // Router DSL:
            // https://angular.io/docs/ts/latest/guide/router.html
            // https://github.com/angular/angular/issues/5557
            /**
             * Konstante f&uuml;r ein JSON-Objekt zu allen Routes mit dem Route-Namen
             * als Schl&uuml;ssel.
             */
            APP_ROUTES = {
                homeDef: { path: '/home', name: 'Home', component: home_1.default, useAsDefault: true },
                // home: {path: '/', name: 'Home', component: Home},
                detailsArtikelDef: {
                    path: '/detailsArtikel/:id',
                    name: 'DetailsArtikel',
                    component: details_artikel_1.default
                },
                sucheArtikelDef: { path: '/sucheArtikel', name: 'SucheArtikel', component: suche_artikel_1.default },
                sucheArtikelIdDef: {
                    path: '/sucheArtikelId',
                    name: 'SucheArtikelId',
                    component: suche_artikel_id_1.default
                },
                createArtikelDef: {
                    path: '/createArtikel',
                    name: 'CreateArtikel',
                    component: create_artikel_1.default
                },
                redirect: { path: '/', redirectTo: ['Home'] }
            };
            exports_1("default",APP_ROUTES);
            // https://angular.io/docs/ts/latest/guide/router.html
            /**
             * Route-Definitionen zur Verwendung bei @RouteConfig in der Komponente
             * <a href="../classes/_app_app_.default.html">App</a>.
             * Abgeleitet aus <a href="#app_routes">APP_ROUTES</a>.
             */
            exports_1("APP_ROUTE_DEFINITIONS", APP_ROUTE_DEFINITIONS = Object.keys(APP_ROUTES).map((key) => APP_ROUTES[key]));
        }
    }
});

//# sourceMappingURL=../maps/app/routes.js.map
