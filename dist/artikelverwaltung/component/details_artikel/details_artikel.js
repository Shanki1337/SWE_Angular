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
System.register(['angular2/core', 'angular2/common', 'angular2/router', '../../service/artikel_service', './stammdaten', '../../../iam/iam', '../../../shared/shared'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, artikel_service_1, stammdaten_1, iam_1, shared_1;
    var DetailsArtikel;
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
            function (stammdaten_1_1) {
                stammdaten_1 = stammdaten_1_1;
            },
            function (iam_1_1) {
                iam_1 = iam_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Tag <code>details-buch</code>
             */
            let DetailsArtikel = class DetailsArtikel {
                constructor(_artikelService, _routeParams) {
                    this._artikelService = _artikelService;
                    this._routeParams = _routeParams;
                    this.waiting = false;
                    this.artikel = null;
                    this.errorMsg = null;
                    console.log('DetailsArtikel.constructor(): routeParams=', _routeParams);
                }
                // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
                // aufgerufen: node_modules\angular2\ts\src\core\linker\interfaces.ts
                ngOnInit() {
                    this._observeArtikel();
                    this._observeError();
                    // Pfad-Parameter aus /detailsBuch/:id
                    const id = this._routeParams.params['id'];
                    console.log(`DetailsArtikel.ngOnInit(): id= ${id}`);
                    this._artikelService.findById(id);
                }
                isAdmin() { return iam_1.isAdmin(); }
                /* tslint:disable:align */
                _observeArtikel() {
                    this._artikelService.observeArtikel((artikel) => {
                        this.waiting = false;
                        this.artikel = artikel;
                        console.log('DetailsArtikel.artikel=', this.artikel);
                    }, this);
                }
                _observeError() {
                    this._artikelService.observeError((err) => {
                        this.waiting = false;
                        if (err === null) {
                            this.errorMsg = 'Ein Fehler ist aufgetreten.';
                            return;
                        }
                        if (shared_1.isString(err)) {
                            this.errorMsg = err;
                            return;
                        }
                        switch (err) {
                            case 404:
                                this.errorMsg = 'Kein Artikel gefunden.';
                                break;
                            default:
                                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                                break;
                        }
                        console.log(`DetailsArtikel.errorMsg: ${this.errorMsg}`);
                    }, this);
                }
            };
            DetailsArtikel = __decorate([
                core_1.Component({
                    selector: 'details-artikel',
                    directives: [common_1.CORE_DIRECTIVES, stammdaten_1.default, shared_1.Waiting, shared_1.ErrorMessage],
                    template: `
        <waiting [activated]="waiting"></waiting>

        <section *ngIf="artikel !== null">
            <h4>Artikel {{artikel.id}}:</h4>

            <!-- http://v4-alpha.getbootstrap.com/components/navs/#tabs -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="#stammdaten"
                       data-toggle="tab">
                        Stammdaten
                    </a>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade in active" id="stammdaten">
                    <div class="m-t-1">
                        <stammdaten [artikel]="artikel"></stammdaten>
                    </div>
                </div>
            </div>
        </section>

        <error-message [text]="errorMsg"></error-message>
    `
                }), 
                __metadata('design:paramtypes', [artikel_service_1.default, router_1.RouteParams])
            ], DetailsArtikel);
            exports_1("default", DetailsArtikel);
        }
    }
});

//# sourceMappingURL=../../../maps/artikelverwaltung/component/details_artikel/details_artikel.js.map
