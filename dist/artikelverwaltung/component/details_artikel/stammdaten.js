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
System.register(['angular2/core', 'angular2/common', '../../model/artikel'], function(exports_1, context_1) {
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
    var core_1, common_1, artikel_1;
    var Stammdaten;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (artikel_1_1) {
                artikel_1 = artikel_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Tag <code>stammdaten</code>
             */
            let Stammdaten = class Stammdaten {
                constructor() {
                    console.log('Stammdaten.constructor()');
                }
                ngOnInit() {
                    console.log('Stammdaten.ngOnInit(): artikel=', this.artikel);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', artikel_1.default)
            ], Stammdaten.prototype, "artikel", void 0);
            Stammdaten = __decorate([
                core_1.Component({
                    selector: 'stammdaten',
                    directives: [common_1.CORE_DIRECTIVES],
                    // siehe @Input in der Komponenten-Klasse
                    // inputs: ['buch'],
                    template: `
        <table class="table table-stripped table-hover table-responsive">
            <tbody>
                <tr>
                    <td><label>Bezeichnung</label></td>
                    <td>{{artikel.bezeichnung}}</td>
                </tr>
                <tr>
                    <td><label>Kategorie</label></td>
                    <td>
                        <span [ngSwitch]="artikel.kategorie">
                            <span *ngSwitchWhen="'BAD'">Bad</span>
                            <span *ngSwitchWhen="'BUERO'">Büro</span>
                            <span *ngSwitchWhen="'DIELE'">Diele</span>
                            <span *ngSwitchWhen="'ESSZIMMER'">Esszimmer</span>
                            <span *ngSwitchWhen="'KUECHE'">Küche</span>
                            <span *ngSwitchWhen="'SCHLAFZIMMER'">
                                Schlafzimmer</span>
                            <span *ngSwitchWhen="'WOHNZIMMER'">
                                Wohnzimmer</span>                                 
                            <span *ngSwitchDefault>unbekannt</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Ausgesondert</label></td>
                    <td>
                        <input type="checkbox" checked="{{artikel.ausgesondert}}"
                            disabled class="checkbox">
                    </td>
                </tr>    
                <tr>
                    <td><label>Preis</label></td>
                    <td>{{artikel.preis | currency: 'EUR': true}}</td>
                </tr>            
                <tr>
                    <td><label>Rating</label></td>
                    <td>
                        <span *ngFor="#a of artikel.ratingArray">
                            <i class="fa fa-star" style="color: yellow;"
                               *ngIf="a === true"></i>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    `
                }), 
                __metadata('design:paramtypes', [])
            ], Stammdaten);
            exports_1("default", Stammdaten);
        }
    }
});

//# sourceMappingURL=../../../maps/artikelverwaltung/component/details_artikel/stammdaten.js.map
