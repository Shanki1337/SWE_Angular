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
System.register(['angular2/core', '../shared/shared', '../artikelverwaltung/service/artikel_service'], function(exports_1, context_1) {
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
    var core_1, shared_1, artikel_service_1;
    var Main;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (artikel_service_1_1) {
                artikel_service_1 = artikel_service_1_1;
            }],
        execute: function() {
            /* tslint:enable:max-line-length */
            /**
             * Komponente f&uuml;r den Hauptteil einer Seite mit dem Tag &lt;app-main&gt;.
             */
            let Main = class Main {
                constructor() {
                    console.log('Main.constructor()');
                }
            };
            Main = __decorate([
                core_1.Component({
                    selector: 'app-main',
                    // Provider fuer die Main-Komponente und ihre Kindkomponenten,
                    // d.h. Singletons innerhalb dieses Teilbaums
                    providers: [
                        shared_1.ChartService, artikel_service_1.default
                    ],
                    template: `
        <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
            <!-- Abstand: margin top 1 rem -->
            <!-- http://v4-alpha.getbootstrap.com/components/utilities -->
            <div class="m-t-1">
                <!-- Komponente fuer das Routing, d.h. Platzhalter fuer den -->
                <!-- Austausch der HTML-Templates (= Fragmente) -->
                <!-- FIXME router-outlet wird zu router-viewport, -->
                <!--       RouterOutlet zu RouterViewport -->
                <!--       https://github.com/angular/angular/issues/4679 -->
                <!-- viewport: framed area on a display screen for viewing information -->
                <router-outlet></router-outlet>
            </div>
        </main>
    `
                }), 
                __metadata('design:paramtypes', [])
            ], Main);
            exports_1("default", Main);
        }
    }
});

//# sourceMappingURL=../maps/app/main.js.map
