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
System.register(['angular2/core', 'angular2/common', '../iam/iam'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, iam_1;
    var Nav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (iam_1_1) {
                iam_1 = iam_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;app-nav&gt;.
             */
            let Nav = class Nav {
                constructor() {
                    console.log('Nav.constructor()');
                }
                /**
                 * Abfrage, ob ein Benutzer als Administrator eingeloggt ist.
                 * @return true, falls ein Benutzer als Administrator eingeloggt
                 *         ist. Sonst false.
                 */
                isAdmin() { return iam_1.isAdmin(); }
            };
            Nav = __decorate([
                core_1.Component({
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
                <div class="list-group-item" *ngIf="isAdmin()">
                    <a [routerLink]="['CreateArtikel']">
                        <i class="fa fa-search"></i> &nbsp; Artikel erstellen
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
                    directives: [common_1.CORE_DIRECTIVES]
                }), 
                __metadata('design:paramtypes', [])
            ], Nav);
            exports_1("default", Nav);
        }
    }
});

//# sourceMappingURL=../maps/app/nav.js.map
