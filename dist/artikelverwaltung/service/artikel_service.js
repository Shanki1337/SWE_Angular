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
System.register(['angular2/core', 'angular2/http', '../model/artikel', '../../shared/shared'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, http_1, artikel_1, shared_1;
    var ArtikelService, ARTIKEL_SERVICE_PROVIDER;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (artikel_1_1) {
                artikel_1 = artikel_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            // import {getAuthorization} from '../../iam/iam';
            /* tslint:enable:max-line-length */
            // Methoden der Klasse Http
            //  * get(url, options) – HTTP GET request
            //  * post(url, body, options) – HTTP POST request
            //  * put(url, body, options) – HTTP PUT request
            //  * patch(url, body, options) – HTTP PATCH request
            //  * delete(url, options) – HTTP DELETE request
            // Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
            // DI in eine Komponente injiziert werden kann, falls sie in einer
            // Elternkomponente durch @Component(provider: ...) bereitgestellt wird.
            // Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
            // Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.
            /**
             * Die Service-Klasse zu B&uuml;cher.
             */
            class ArtikelService {
                /**
                 * @param _chartService injizierter ChartService
                 * @param _http injizierter Service Http (von AngularJS)
                 * @return void
                 */
                constructor(_chartService, _http) {
                    this._chartService = _chartService;
                    this._http = _http;
                    this._artikelzEmitter = new core_1.EventEmitter();
                    this._artikelEmitter = new core_1.EventEmitter();
                    this._errorEmitter = new core_1.EventEmitter();
                    this._artikel = null;
                    this._baseUriArtikel = `${shared_1.BASE_URI}${shared_1.PATH_ARTIKEL}`;
                    this._baseUriKatalog = `${shared_1.BASE_URI}${shared_1.PATH_KATALOG}`;
                    console.log(`ArtikelService.constructor(): 
                baseUriArtikel${this._baseUriArtikel}
                baseUriKatalog${this._baseUriKatalog}`);
                }
                /**
                 * Ein Buch-Objekt puffern.
                 * @param artikel Das Artikel-Objekt, das gepuffert wird.
                 * @return void
                 */
                set artikel(artikel) {
                    console.log('ArtikelService.set artikel()', artikel);
                    this._artikel = artikel;
                }
                observeArtikelz(observerFn, thisArg) {
                    this._artikelzEmitter.forEach(observerFn, thisArg);
                }
                observeArtikel(observerFn, thisArg) {
                    this._artikelEmitter.forEach(observerFn, thisArg);
                }
                observeError(observerFn, thisArg) {
                    this._errorEmitter.forEach(observerFn, thisArg);
                }
                /**
                 * Buecher suchen
                 * @param suchkriterien Die Suchkriterien
                 */
                find(suchkriterien) {
                    const searchParams = this._suchkriterienToSearchParams(suchkriterien);
                    const uri = this._baseUriKatalog;
                    console.log(`ArtikelService.find(): uri=${uri}`);
                    const nextFn = (response) => {
                        console.log(`ArtikelService.find(): nextFn()`);
                        let artikel = this._responseToArrayArtikel(response);
                        this._artikelzEmitter.emit(artikel);
                    };
                    const errorFn = (err) => {
                        const status = err.status;
                        console.log(`ArtikelService.find(): errorFn(): ${status}`);
                        if (status === 400) {
                            const body = err.text();
                            if (shared_1.isBlank(body)) {
                                this._errorEmitter.emit(status);
                            }
                            else {
                                // z.B. [PARAMETER][findByTitel.titel][Bei einem ...][x]
                                let errorMsg = body.split('[')[3];
                                errorMsg = errorMsg.substr(0, errorMsg.length - 2);
                                this._errorEmitter.emit(errorMsg);
                            }
                        }
                        else {
                            this._errorEmitter.emit(status);
                        }
                    };
                    this._http.get(uri, { search: searchParams }).subscribe(nextFn, errorFn);
                }
                /**
                 * Ein Buch anhand der ID suchen
                 * @param id Die ID des gesuchten Buchs
                 */
                findById(id) {
                    if (shared_1.isPresent(this._artikel) && this._artikel.id === id) {
                        this._artikelEmitter.emit(this._artikel);
                        return;
                    }
                    if (shared_1.isBlank(id)) {
                        return;
                    }
                    const uri = `${this._baseUriKatalog}/${id}`;
                    const nextFn = (response) => {
                        this._artikel = this._responseToArtikel(response);
                        this._artikelEmitter.emit(this._artikel);
                        console.log(`ArtikelService.findById(): ${this._artikel}`);
                    };
                    const errorFn = (err) => {
                        const status = err.status;
                        console.log(`ArtikelService.findById(): errorFn(): ${status}`);
                        this._errorEmitter.emit(status);
                    };
                    this._http.get(uri).subscribe(nextFn, errorFn);
                }
                /**
                 * Ein neuen Artikel anlegen
                 * @param neuerArtikel Das JSON-Objekt mit dem neuen Buch
                 * @param successFn Die Callback-Function fuer den Erfolgsfall
                 * @param errorFn Die Callback-Function fuer den Fehlerfall
                 */
                save(neuerArtikel, successFn, errorFn) {
                    const uri = this._baseUriArtikel;
                    const body = JSON.stringify(neuerArtikel.toJSON());
                    console.log('body=', body);
                    const authorizationValue = `Basic ${shared_1.toBase64('admin', 'p')}`;
                    const headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    headers.append('Authorization', authorizationValue);
                    // RequestOptionsArgs in
                    // node_modules\angular2\ts\src\http\interfaces.ts
                    const options = { headers: headers };
                    console.log('options=', options);
                    const nextFn = (response) => {
                        if (response.status === 201) {
                            // TODO Das Response-Objekt enthaelt im Header NICHT "Location"
                            successFn(null);
                            return;
                        }
                    };
                    // async. Error-Callback statt sync. try/catch
                    const errorFnPost = (errResponse) => {
                        if (shared_1.isPresent(errorFn)) {
                            errorFn(errResponse.status, errResponse.text());
                        }
                    };
                    this._http.post(uri, body, options).subscribe(nextFn, errorFnPost);
                }
                // http://www.sitepoint.com/15-best-javascript-charting-libraries
                // http://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries
                // http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3
                // D3 (= Data Driven Documents) ist das fuehrende Produkt fuer
                // Datenvisualisierung:
                //  initiale Version durch die Dissertation von Mike Bostock
                //  gesponsort von der New York Times, seinem heutigen Arbeitgeber
                //  basiert auf SVG = scalable vector graphics: Punkte, Linien, Kurven, ...
                //  ca 250.000 Downloads/Monat bei https://www.npmjs.com
                //  https://github.com/mbostock/d3 mit ueber 100 Contributors
                // Chart.js ist deutlich einfacher zu benutzen als D3
                //  basiert auf <canvas>
                //  ca 25.000 Downloads/Monat bei https://www.npmjs.com
                //  https://github.com/nnnick/Chart.js mit ueber 60 Contributors
                /**
                 * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 */
                setBarChart(chartElement) {
                    const uri = this._baseUriArtikel;
                    const successFn = (response) => {
                        this._createBarChart(chartElement, this._responseToArrayArtikel(response));
                    };
                    const errorFn = (response) => { console.error('response=', response); };
                    const nextFn = (response) => {
                        if (response.status === 200) {
                            successFn(response);
                            return;
                        }
                        errorFn(response);
                    };
                    this._http.get(uri).subscribe(nextFn);
                }
                /**
                 * Ein Liniendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 */
                setLinearChart(chartElement) {
                    const uri = this._baseUriArtikel;
                    const successFn = (response) => {
                        this._createLineChart(chartElement, this._responseToArrayArtikel(response));
                    };
                    const errorFn = (response) => { console.error('response=', response); };
                    const nextFn = (response) => {
                        if (response.status === 200) {
                            successFn(response);
                            return;
                        }
                        errorFn(response);
                    };
                    this._http.get(uri).subscribe(nextFn);
                }
                /**
                 * Ein Tortendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 */
                setPieChart(chartElement) {
                    const uri = this._baseUriArtikel;
                    const successFn = (response) => {
                        this._createPieChart(chartElement, this._responseToArrayArtikel(response));
                    };
                    const errorFn = (response) => { console.error('response=', response); };
                    const nextFn = (response) => {
                        if (response.status === 200) {
                            successFn(response);
                            return;
                        }
                        errorFn(response);
                    };
                    this._http.get(uri).subscribe(nextFn);
                }
                toString() {
                    return `ArtikelService:
            {artikel: ${JSON.stringify(this._artikel, null, 2)}}`;
                }
                /**
                 * Ein Response-Objekt in ein Array von Buch-Objekten konvertieren.
                 * @param response Response-Objekt eines GET-Requests.
                 */
                _suchkriterienToSearchParams(suchkriterien) {
                    const searchParams = new http_1.URLSearchParams();
                    if (!shared_1.isEmpty(suchkriterien.id)) {
                        searchParams.set('id', suchkriterien.id);
                    }
                    if (!shared_1.isEmpty(suchkriterien.bezeichnung)) {
                        searchParams.set('bezeichnung', suchkriterien.bezeichnung);
                    }
                    return searchParams;
                }
                /**
                 * Ein Response-Objekt in ein Array von Buch-Objekten konvertieren.
                 * @param response Response-Objekt eines GET-Requests.
                 */
                _responseToArrayArtikel(response) {
                    const jsonArray = (response.json());
                    return jsonArray.map((jsonObjekt) => {
                        return artikel_1.default.fromServer(jsonObjekt);
                    });
                }
                /**
                 * Ein Response-Objekt in ein Buch-Objekt konvertieren.
                 * @param response Response-Objekt eines GET-Requests.
                 */
                _responseToArtikel(response) {
                    const jsonObjekt = (response.json());
                    return artikel_1.default.fromServer(jsonObjekt);
                }
                /**
                 * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 * @param buecher Die zu ber&uecksichtigenden B&uuml;cher
                 */
                _createBarChart(chartElement, artikelz) {
                    const labels = artikelz.map((artikel) => artikel.id);
                    const datasets = [{
                            label: 'Bewertungen',
                            fillColor: 'rgba(220,220,220,0.2)',
                            strokeColor: 'rgba(220,220,220,1)',
                            data: artikelz.map((artikel) => artikel.rating)
                        }];
                    const data = { labels: labels, datasets: datasets };
                    console.log('ArtikelService._createBarChart(): labels: ', labels);
                    const chart = this._chartService.getChart(chartElement);
                    if (shared_1.isPresent(chart) && shared_1.isPresent(datasets[0].data)
                        && datasets[0].data.length !== 0) {
                        chart.Bar(data);
                    }
                }
                /**
                 * Ein Liniendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 * @param buecher Die zu ber&uecksichtigenden B&uuml;cher
                 */
                _createLineChart(chartElement, artikelz) {
                    const labels = artikelz.map((artikel) => artikel.id);
                    const datasets = [{
                            label: 'Bewertungen',
                            fillColor: 'rgba(220,220,220,0.2)',
                            strokeColor: 'rgba(220,220,220,1)',
                            data: artikelz.map((artikel) => artikel.rating)
                        }];
                    const data = { labels: labels, datasets: datasets };
                    // TODO Chart.js 2.0: Das Datenmodell aendert sich
                    //      http://nnnick.github.io/Chart.js/docs-v2
                    //      https://github.com/nnnick/Chart.js/blob/v2.0-alpha/README.md
                    //      chart.d.ts gibt es noch nicht fuer 2.0:
                    //      https://github.com/nnnick/Chart.js/issues/1572
                    const chart = this._chartService.getChart(chartElement);
                    if (shared_1.isPresent(chart) && shared_1.isPresent(datasets[0].data)
                        && datasets[0].data.length !== 0) {
                        chart.Line(data);
                    }
                }
                /**
                 * Ein Tortendiagramm erzeugen und bei einem Tag <code>canvas</code>
                 * einf&uuml;gen.
                 * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
                 * @param buecher Die zu ber&uecksichtigenden B&uuml;cher
                 */
                _createPieChart(chartElement, artikelz) {
                    const pieData = new Array(artikelz.length);
                    artikelz.forEach((artikel, i) => {
                        const data = {
                            value: artikel.rating,
                            color: this._chartService.getColorPie(i),
                            highlight: this._chartService.getHighlightPie(i),
                            label: `${artikel.id}`
                        };
                        pieData[i] = data;
                    });
                    const chart = this._chartService.getChart(chartElement);
                    if (shared_1.isPresent(chart) && pieData.length !== 0) {
                        chart.Pie(pieData);
                    }
                }
            }
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Function, Object]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "observeArtikelz", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Function, Object]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "observeArtikel", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Function, Object]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "observeError", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "find", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [String]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "findById", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [artikel_1.default, Function, Function]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "save", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "setBarChart", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "setLinearChart", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "setPieChart", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Object]), 
                __metadata('design:returntype', http_1.URLSearchParams)
            ], ArtikelService.prototype, "_suchkriterienToSearchParams", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [http_1.Response]), 
                __metadata('design:returntype', Array)
            ], ArtikelService.prototype, "_responseToArrayArtikel", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [http_1.Response]), 
                __metadata('design:returntype', artikel_1.default)
            ], ArtikelService.prototype, "_responseToArtikel", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement, Array]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "_createBarChart", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement, Array]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "_createLineChart", null);
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [HTMLCanvasElement, Array]), 
                __metadata('design:returntype', void 0)
            ], ArtikelService.prototype, "_createPieChart", null);
            ArtikelService = __decorate([
                __param(0, core_1.Inject(shared_1.ChartService)),
                __param(1, core_1.Inject(http_1.Http)), 
                __metadata('design:paramtypes', [shared_1.ChartService, http_1.Http])
            ], ArtikelService);
            exports_1("default", ArtikelService);
            exports_1("ARTIKEL_SERVICE_PROVIDER", ARTIKEL_SERVICE_PROVIDER = core_1.provide(ArtikelService, { useClass: ArtikelService }));
        }
    }
});

//# sourceMappingURL=../../maps/artikelverwaltung/service/artikel_service.js.map
