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
System.register(['angular2/core', 'angular2/common', '../iam/iam', '../shared/shared'], function(exports_1, context_1) {
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
    var core_1, common_1, iam_1, shared_1;
    var Logout;
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
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Logout mit dem Tag &lt;logout&gt;.
             */
            let Logout = class Logout {
                constructor() {
                    console.log('Logout.constructor()');
                }
                /**
                 * Abfrage, ob ein Benutzer &uuml;berhaupt eingeloggt ist.
                 * @return true, falls ein Benutzer eingeloggt ist. Sonst false.
                 */
                isLoggedIn() { return iam_1.isLoggedIn(); }
                /**
                 * Ausloggen und dabei Benutzername und Passwort zur&uuml;cksetzen.
                 */
                logout() { iam_1.logout(); }
                toString() { return 'Logout'; }
            };
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', []), 
                __metadata('design:returntype', void 0)
            ], Logout.prototype, "logout", null);
            Logout = __decorate([
                core_1.Component({
                    selector: 'logout',
                    template: `
        <div *ngIf="isLoggedIn()">
            <button class="btn btn-default" type="button" (click)="logout()">
                Logout
            </button>
        </div>
    `,
                    directives: [common_1.CORE_DIRECTIVES]
                }), 
                __metadata('design:paramtypes', [])
            ], Logout);
            exports_1("default", Logout);
        }
    }
});

//# sourceMappingURL=../maps/app/logout.js.map
