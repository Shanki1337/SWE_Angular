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
import SucheBuecher from '../buchverwaltung/component/suche_buecher/suche_buecher';
import DetailsBuch from '../buchverwaltung/component/details_buch/details_buch';
import DetailsArtikel from
'../artikelverwaltung/component/details_artikel/details_artikel';
import CreateBuch from '../buchverwaltung/component/create_buch/create_buch';
import UpdateBuch from '../buchverwaltung/component/update_buch/update_buch';

import SucheArtikel from '../artikelverwaltung/component/suche_artikel/suche_artikel';
import SucheArtikelId from '../artikelverwaltung/component/suche_artikel_id/suche_artikel_id';


import BalkendiagrammBewertungen from '../buchverwaltung/component/balkendiagramm_bewertungen/balkendiagramm_bewertungen';
import LiniendiagrammBewertungen from '../buchverwaltung/component/liniendiagramm_bewertungen/liniendiagramm_bewertungen';
import TortendiagrammBewertungen from '../buchverwaltung/component/tortendiagramm_bewertungen/tortendiagramm_bewertungen';
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
    sucheBuecherDef:
        {path: '/sucheBuecher', name: 'SucheBuecher', component: SucheBuecher},
    detailsBuchDef:
        {path: '/detailsBuch/:id', name: 'DetailsBuch', component: DetailsBuch},
    detailsArtikelDef:
         {path: '/detailsArtikel/:id', name: 'DetailsArtikel', component:
         DetailsArtikel},
    sucheArtikelDef:
        {path: '/sucheArtikel', name: 'SucheArtikel', component: SucheArtikel},
    sucheArtikelIdDef:
        {path: '/sucheArtikelId', name: 'SucheArtikelId', component: SucheArtikelId},
    updateBuchDef:
        {path: '/updateBuch/:id', name: 'UpdateBuch', component: UpdateBuch},
    createBuchDef:
        {path: '/createBuch', name: 'CreateBuch', component: CreateBuch},
    balkendiagrammDef: {
        path: '/balkendiagramm',
        name: 'Balkendiagramm',
        component: BalkendiagrammBewertungen
    },
    liniendiagrammDef: {
        path: '/liniendiagramm',
        name: 'Liniendiagramm',
        component: LiniendiagrammBewertungen
    },
    tortendiagrammDef: {
        path: '/tortendiagramm',
        name: 'Tortendiagramm',
        component: TortendiagrammBewertungen
    },
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
