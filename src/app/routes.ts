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

import {RouteDefinition} from 'angular2/router';

/* tslint:disable:max-line-length */
import Home from './home';
import DetailsArtikel from
'../artikelverwaltung/component/details_artikel/details_artikel';

import SucheArtikel from '../artikelverwaltung/component/suche_artikel/suche_artikel';
import SucheArtikelId from '../artikelverwaltung/component/suche_artikel_id/suche_artikel_id';
import CreateArtikel from '../artikelverwaltung/component/create_artikel/create_artikel';
import PosArtikel from '../artikelverwaltung/component/pos_artikel/pos_artikel';

/* tslint:enable:max-line-length */

// Router DSL:
// https://angular.io/docs/ts/latest/guide/router.html
// https://github.com/angular/angular/issues/5557
/**
 * Konstante f&uuml;r ein JSON-Objekt zu allen Routes mit dem Route-Namen
 * als Schl&uuml;ssel.
 */
const APP_ROUTES: any = {
    homeDef: {path: '/home', name: 'Home', component: Home, useAsDefault: true},
    // home: {path: '/', name: 'Home', component: Home},
    detailsArtikelDef: {
        path: '/detailsArtikel/:id',
        name: 'DetailsArtikel',
        component: DetailsArtikel
    },
    sucheArtikelDef:
        {path: '/sucheArtikel', name: 'SucheArtikel', component: SucheArtikel},
    sucheArtikelIdDef: {
        path: '/sucheArtikelId',
        name: 'SucheArtikelId',
        component: SucheArtikelId
    },
    createArtikelDef: {
        path: '/createArtikel',
        name: 'CreateArtikel',
        component: CreateArtikel
    },
    posArtikelDef:
        {path: '/posArtikel', name: 'PosArtikel', component: PosArtikel},
    redirect: {path: '/', redirectTo: ['Home']}
};
export default APP_ROUTES;

// https://angular.io/docs/ts/latest/guide/router.html
/**
 * Route-Definitionen zur Verwendung bei @RouteConfig in der Komponente
 * <a href="../classes/_app_app_.default.html">App</a>.
 * Abgeleitet aus <a href="#app_routes">APP_ROUTES</a>.
 */
export const APP_ROUTE_DEFINITIONS: Array<RouteDefinition> =
    Object.keys(APP_ROUTES).map((key: string) => APP_ROUTES[key]);
