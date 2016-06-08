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
System.register(['angular2/core', './shared'], function(exports_1, context_1) {
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
    var core_1, shared_1;
    var ChartService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Service-Klasse f&uuml;r die Verwendung von Chart.js.
             */
            let ChartService = class ChartService {
                constructor() {
                    this._colorsPie = new Map();
                    console.log('ChartService.constructor()');
                    this._colorsPie.set(0, { color: '#F7464A', highlight: '#FF5A5E' }); // red
                    this._colorsPie.set(1, { color: '#46BFBD', highlight: '#5AD3D1' }); // green
                    this._colorsPie.set(2, { color: '#FDB45C', highlight: '#FFC870' }); // yellow
                }
                /**
                 * @param elementId ID des HTML-Tags, bei dem das Chart eingesetzt wird.
                 * @return Chart-Objekt
                 */
                getChart(chartElement) {
                    if (shared_1.isBlank(chartElement)) {
                        console.error(`Kein HTML-Element fuer ein Chart gefunden:`, chartElement);
                        return null;
                    }
                    const ctx = chartElement.getContext('2d');
                    if (shared_1.isBlank(ctx)) {
                        console.error('Kein 2D-Kontext gefunden', ctx);
                        return null;
                    }
                    return new Chart(ctx);
                }
                /**
                 * @param idx Fortlaufende Nummer f&uuml;r die Farbe bei einem
                 *        Tortendiagramm.
                 * @return String mit dem Hex-Code der Farbe.
                 */
                getColorPie(idx) {
                    return this._colorsPie.get(idx % 3).color;
                }
                /**
                 * @param idx Fortlaufende Nummer f&uuml;r die Farbe zur Hervorhebung bei
                 *        einem Tortendiagramm.
                 * @return String mit dem Hex-Code dieser Farbe.
                 */
                getHighlightPie(idx) {
                    return this._colorsPie.get(idx % 3).highlight;
                }
                toString() {
                    return `ChartService: {colorsPie: ${this._colorsPie}}`;
                }
            };
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement]), 
                __metadata('design:returntype', Object)
            ], ChartService.prototype, "getChart", null);
            ChartService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], ChartService);
            exports_1("ChartService", ChartService);
        }
    }
});

//# sourceMappingURL=../maps/shared/chart_service.js.map
