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
System.register(['angular2/core', './logo', './login', './logout'], function(exports_1, context_1) {
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
    var core_1, logo_1, login_1, logout_1;
    var Header;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logo_1_1) {
                logo_1 = logo_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (logout_1_1) {
                logout_1 = logout_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r die Kopfleiste mit dem Tag &lt;app-header&gt;.
             */
            let Header = class Header {
                constructor() {
                    console.log('Header.constructor()');
                }
            };
            Header = __decorate([
                core_1.Component({
                    selector: 'app-header',
                    template: `
        <!-- Bootstrap 4:
                xs:      -  480px ("extra small")
                sm:      -  767px ("small")
                md:  768 -  991px ("medium")
                lg:  992 - 1199px ("large")
                xl: 1200 px       ("extra large")
        -->
        <header class="col-xs-12 jz-app-header">
            <div class="clearfix">
                <div class="pull-left">
                    <logo></logo>
                </div>
                <div class="pull-right">
                    <login></login>
                    <logout></logout>
                </div>
            </div>
        </header>
    `,
                    styleUrls: ['./app/header.min.css'],
                    // styles: [
                    //     `header {
                    //         background-color: #BED6F8;
                    //         background-position: left top;
                    //         background-repeat: repeat-x;
                    //         background-image: url(/img/gradientBlueSky.png);
                    //      }`
                    // ],
                    directives: [logo_1.default, login_1.default, logout_1.default]
                }), 
                __metadata('design:paramtypes', [])
            ], Header);
            exports_1("default", Header);
        }
    }
});

//# sourceMappingURL=../maps/app/header.js.map
