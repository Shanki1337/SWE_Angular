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
System.register(['angular2/core', 'angular2/router', './gefundene_artikel', '../../service/artikel_service', '../../../shared/shared'], function(exports_1, context_1) {
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
    var core_1, router_1, gefundene_artikel_1, artikel_service_1, shared_1;
    var SuchErgebnis;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (gefundene_artikel_1_1) {
                gefundene_artikel_1 = gefundene_artikel_1_1;
            },
            function (artikel_service_1_1) {
                artikel_service_1 = artikel_service_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Tag <code>such-ergebnis</code>, die wiederum aus den
             * Kindkomponenten f&uuml;r diese Tags besteht:
             * <ul>
             *  <li><code>waiting</code>
             *  <li><code>gefundene-buecher</code>
             *  <li><code>error-message</code>
             * </ul>
             */
            let SuchErgebnis = class SuchErgebnis {
                constructor(_artikelService, _router) {
                    this._artikelService = _artikelService;
                    this._router = _router;
                    this.artikelz = null;
                    this.errorMsg = null;
                    console.log('SuchErgebnis.constructor()');
                }
                // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
                // aufgerufen. Entspricht @PostConstruct bei Java EE
                // node_modules\angular2\ts\src\core\linker\interfaces.ts
                // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
                // https://angular.io/docs/ts/latest/guide/cheatsheet.html
                // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtet
                // IntelliSense bei der Verwendung von TypeScript.
                ngOnInit() {
                    this._observeArtikelz();
                    this._observeError();
                }
                /**
                 * Methode, um den injizierten <code>BuecherService</code> zu beobachten,
                 * ob es gefundene bzw. darzustellende B&uuml;cher gibt, die in der
                 * Kindkomponente f&uuml;r das Tag <code>gefundene-buecher</code>
                 * dargestellt werden. Diese private Methode wird in der Methode
                 * <code>ngOnInit</code> aufgerufen.
                 */
                /* tslint:disable:align */
                _observeArtikelz() {
                    // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
                    this._artikelService.observeArtikelz((artikelz) => {
                        // zuruecksetzen
                        this.waiting = false;
                        this.errorMsg = null;
                        this.artikelz = artikelz;
                        console.log('SuchErgebnis.artikelz:', this.artikelz);
                    }, this);
                }
                /**
                 * Methode, um den injizierten <code>BuecherService</code> zu beobachten,
                 * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
                 * Tag <code>error-message</code> dargestellt werden. Diese private Methode
                 * wird in der Methode <code>ngOnInit</code> aufgerufen.
                 */
                _observeError() {
                    this._artikelService.observeError((err) => {
                        // zuruecksetzen
                        this.waiting = false;
                        this.artikelz = null;
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
                                this.errorMsg = 'Keine Artikel gefunden.';
                                break;
                            default:
                                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                                break;
                        }
                        console.log(`SuchErgebnis.errorMsg: ${this.errorMsg}`);
                    }, this);
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Boolean)
            ], SuchErgebnis.prototype, "waiting", void 0);
            SuchErgebnis = __decorate([
                core_1.Component({
                    selector: 'such-ergebnis',
                    directives: [shared_1.Waiting, gefundene_artikel_1.default, shared_1.ErrorMessage],
                    template: `
        <section>
            <waiting [activated]="waiting"></waiting>
            <gefundene-artikel [artikel]="artikel"></gefundene-artikel>
            <error-message [text]="errorMsg"></error-message>
        <section>
    `
                }), 
                __metadata('design:paramtypes', [artikel_service_1.default, router_1.Router])
            ], SuchErgebnis);
            exports_1("default", SuchErgebnis);
        }
    }
});

//# sourceMappingURL=../../../maps/artikelverwaltung/component/suche_artikel_id/such_ergebnis.js.map
