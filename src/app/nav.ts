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

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {isAdmin} from '../iam/iam';

/**
 * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;app-nav&gt;.
 */
@Component({
    selector: 'app-nav',
    // Internationalisierung durch z.B. https://github.com/ocombe/ng2-translate
    template: `
        <nav class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3 jz-app-nav">
            <!-- http://v4-alpha.getbootstrap.com/components/list-group/#linked-items -->
            <!-- Alternative CSS-Klassen fuer list-group: navs, nav-item, nav-link -->
            <!-- http://v4-alpha.getbootstrap.com/components/navs -->
            <div class="list-group">
                <!-- DSL-Pfade durch @RouteConfig([{path: '/...', name: 'Home' ...} -->
                <div class="list-group-item">
                    <a [routerLink]="['Home']">
                        <i class="fa fa-home"></i> &nbsp; Startseite
                    </a>
                </div>
                <div class="list-group-item" *ngIf="isAdmin()">
                    <a [routerLink]="['SucheArtikel']">
                        <i class="fa fa-search"></i> &nbsp; Suche Artikel
                    </a>
                </div>
                <div class="list-group-item" *ngIf="isAdmin()">
                    <a [routerLink]="['SucheArtikelId']">
                        <i class="fa fa-search"></i> &nbsp; Suche Artikel nach ID
                    </a>
                </div>
            </div>

            <!-- DSL-Pfade durch @RouteConfig([{path: '/...', name: 'Home' ...} -->
            <!--
            <ul class="nav nav-pills nav-stacked">
                <li class="nav-item"><a [routerLink]="['Home']">
                    <i class="fa fa-home"></i> &nbsp; Startseite</a>
                </li>
                <li class="nav-item"><a [routerLink]="['SucheArtikel']">
                    <i class="fa fa-search"></i> &nbsp; Suche Artikel</a>
                </li>
            </ul>
            -->
        </nav>
    `,
    styleUrls: ['./app/nav.min.css'],
    // styles: ['.jz-app-nav{background-color:#BED6F8}'],
    directives: [CORE_DIRECTIVES]
    // viewProviders: [IamService]
})
export default class Nav {
    constructor() { console.log('Nav.constructor()'); }

    /**
     * Abfrage, ob ein Benutzer als Administrator eingeloggt ist.
     * @return true, falls ein Benutzer als Administrator eingeloggt
     *         ist. Sonst false.
     */
    isAdmin(): boolean { return isAdmin(); }
}
