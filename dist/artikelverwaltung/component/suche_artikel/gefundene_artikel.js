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
System.register(['angular2/core', 'angular2/common', 'angular2/router', '../../service/artikel_service', '../../model/artikel', '../../../app/routes', '../../../shared/shared'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, artikel_service_1, artikel_1, routes_1, shared_1;
    var GefundeneArtikel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (artikel_service_1_1) {
                artikel_service_1 = artikel_service_1_1;
            },
            function (artikel_1_1) {
                artikel_1 = artikel_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Tag <code>gefundene-artikel</code>
             */
            let GefundeneArtikel = class GefundeneArtikel {
                constructor(_artikelService, _router) {
                    this._artikelService = _artikelService;
                    this._router = _router;
                    console.log('GefundeneArtikel.constructor()');
                }
                /**
                 * Das ausgew&auml;hlte bzw. angeklickte Artikel in der Detailsseite
                 * anzeigen.
                 * @param artikelS Das ausgew&auml;hlte Artikel
                 */
                details(artikel) {
                    console.log(`detailsArtikelDef.name=${routes_1.default.detailsArtikelDef.name}`);
                    console.log(`id=${artikel.id}`);
                    this._router.navigate([routes_1.default.detailsArtikelDef.name, { id: artikel.id }]);
                }
                toString() { return 'GefundeneArtikel'; }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], GefundeneArtikel.prototype, "artikel", void 0);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [artikel_1.default]), 
                __metadata('design:returntype', void 0)
            ], GefundeneArtikel.prototype, "details", null);
            GefundeneArtikel = __decorate([
                core_1.Component({
                    selector: 'gefundene-artikel',
                    directives: [common_1.CORE_DIRECTIVES],
                    template: `
        <!-- Template Binding durch die Direktive ngIf -->
        <!-- Eine Direktive ist eine Komponente ohne View -->
        <div class="card" *ngIf="artikel != null">
            <div class="card-header">
                <h4><i class="fa fa-folder-open-o"></i> Gefundene Artikel</h4>
            </div>
            <div class="card-block">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <th>Nr.</th>
                        <th>ID</th>
                        <th>Bezeichnung</th>
                       <th>Kategorie</th>
                        <th>
                            <span class="sr-only">
                                Spalte f&uuml;r Details
                            </span>
                        </th> 
                        <th>
                            <span class="sr-only">
                                Spalte f&uuml;r Entfernen
                            </span>
                        </th>
                    </thead>
                    <tbody>
                        <!-- Template Binding: ngFor -->
                        <!-- Event-Binding: statt (click) auch on-click -->
                        <tr *ngFor="#a of artikel; #i = index" (click)="details(a)">
                            <td>{{i + 1}}</td>
                            <td>{{a.id}}</td>
                            <td>{{a.bezeichnung}}</td>
                            <td>
                                <span [ngSwitch]="a.kategorie">
                                  <span *ngSwitchWhen="'BAD'">BAD</span>
                                  <span *ngSwitchWhen="'BUERO'">BUERO</span>
                                  <span *ngSwitchWhen="'DIEHLE'">DIEHLE</span>
                                  <span *ngSwitchWhen="'ESSZIMMER'">ESSZIMMER</span>
                                  <span *ngSwitchWhen="'KINDERZIMMER'">KINDERZIMMER</span>
                                  <span *ngSwitchWhen="'KUECHE'">KUECHE</span>
                                  <span *ngSwitchWhen="'SCHLAFZIMMER'">SCHLAFZIMMER</span>
                                  <span *ngSwitchWhen="'WOHNZIMMER'">WOHNZIMMER</span>
                                  <span *ngSwitchDefault>unbekannt</span>
                                </span>
                            </td>
                            <td>
                                <a [routerLink]="['DetailsArtikel', {'id': a.id}]"
                                   data-toggle="tooltip" title="Details anzeigen">
                                    <i class="fa fa-search-plus"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <i class="fa fa-info-circle"></i>
                Zur Anzeige der JSON-Datens&auml;tze in gefundene_artikel.ts
                den Kommentar beim Tag &lt;pre&gt; entfernen
            </div>
        </div>

        <!-- Ausgabe des JSON-Datensatzes im Webbrowser statt console.log(...) -->
        <!--
        <pre *ngIf="artikel != null">{{artikel | json}}</pre>
        -->
    `
                }), 
                __metadata('design:paramtypes', [artikel_service_1.default, router_1.Router])
            ], GefundeneArtikel);
            exports_1("default", GefundeneArtikel);
        }
    }
});

//# sourceMappingURL=../../../maps/artikelverwaltung/component/suche_artikel/gefundene_artikel.js.map
