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

/* tslint:disable:max-line-length */
import {Inject, EventEmitter, provide, Provider} from 'angular2/core';
import {Http, Response, Headers, RequestOptionsArgs} from 'angular2/http';
import {IChart, ChartDataSet, LinearChartData, CircularChartData} from 'chart.js/Chart';

import Buch from '../../model/buch';
import {IBuchServer, IBuchForm} from '../../model/buch';
import AbstractBuecherService from '../abstract_buecher_service';
import BuecherService from '../buecher_service';
import {ChartService, BASE_URI, PATH_BUECHER, isPresent, isBlank, isEmpty, log} from '../../../shared/shared';
import {getAuthorization} from '../../../iam/iam';
/* tslint:enable:max-line-length */

// Methoden der Klasse Http: für vereinfachten Zugriff auf XMLHttpRequest
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Buchobjekte
 * werden durch das npm-Package json-server bereitgestellt.
 */
export default class BuecherServiceMockServer extends AbstractBuecherService {
    private _baseUriBuecher: string;
    private _buecherEmitter: EventEmitter<Array<Buch>> =
        new EventEmitter<Array<Buch>>();
    private _buchEmitter: EventEmitter<Buch> = new EventEmitter<Buch>();
    private _errorEmitter: EventEmitter<string|number> =
        new EventEmitter<string|number>();
    private _buch: Buch = null;

    /**
     * @param _chartService injizierter ChartService
     * @param _http injizierter Service Http (von AngularJS)
     * @return void
     */
    constructor(
        @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http) {
        super();
        this._baseUriBuecher = `${BASE_URI}${PATH_BUECHER}`;
        /* tslint:disable:max-line-length */
        console.log(
            `BuecherServiceMockServer.constructor(): baseUriBuecher=${this._baseUriBuecher}`);
        /* tslint:enable:max-line-length */
    }

    /**
     * Ein Buch-Objekt puffern.
     * @param buch Das Buch-Objekt, das gepuffert wird.
     * @return void
     */
    set buch(buch: Buch) {
        console.log('BuecherServiceMockServer.set buch()', buch);
        this._buch = buch;
    }

    @log
    observeBuecher(observerFn: (buecher: Array<Buch>) => void, thisArg: any):
        void {
        this._buecherEmitter.forEach(observerFn, thisArg);
    }

    @log
    observeBuch(observerFn: (buch: Buch) => void, thisArg: any): void {
        this._buchEmitter.forEach(observerFn, thisArg);
    }

    @log
    observeError(observerFn: (err: string|number) => void, thisArg: any): void {
        this._errorEmitter.forEach(observerFn, thisArg);
    }

    /**
     * {method} find
     * Buecher suchen
     * @param {Object} suchkriterien Die Suchkriterien
     */
    @log
    find(suchkriterien: IBuchForm): void {
        const uri: string = this._baseUriBuecher;
        console.log(`uri=${uri}`);
        const nextFn: ((response: Response) => void) = (response: Response) => {
            console.log('BuecherServiceMockServer.find(): nextFn()');
            let buecher: Array<Buch> = this._responseToArrayBuch(response);
            console.log(`nextFnd(): buecher=${JSON.stringify(buecher)}`);
            // Query-Parameter durch Filterung emulieren
            buecher = this._filterFind(buecher, suchkriterien);
            if (buecher.length === 0) {
                this._errorEmitter.emit(404);
                return;
            }

            this._buecherEmitter.emit(buecher);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(
                `BuecherServiceMockServer.find(): errorFn(): ${status}`);
            if (status === 400) {
                const body: string = err.text();
                if (isBlank(body)) {
                    this._errorEmitter.emit(status);
                } else {
                    // z.B. [PARAMETER][findByTitel.titel][Bei einem ...][x]
                    let errorMsg: string = body.split('[')[3];
                    errorMsg = errorMsg.substr(0, errorMsg.length - 2);
                    this._errorEmitter.emit(errorMsg);
                }
            } else {
                this._errorEmitter.emit(status);
            }
        };

        // Alternative zu Http von Angular: Swagger JS library
        // https://github.com/swagger-api/swagger-js

        // Die Daten werden vom (REST-) Server *asynchron* geliefert.
        // Deshalb gibt die Methode get() vom Service Http ein *Observable*
        // zurueck.
        // Ein Observable ist eine Alternative zu Callback (Hell), Promise, ...
        // Ein Observable kann andere Objekte ueber Aenderungen informieren,
        // falls diese dafuer ein Abbonnement durch die Methode subscribe()
        // haben. Diese Aenderungen koennen sukzessive in der Function
        // nextFn ermittelt werden.
        // Die Klasse Observable ist im Modul node_modules\rxjs\Observable.ts
        // http://reactivex.io ist von Netflix unter Mitarbeit von Microsoft
        // Uebrigens: RxJS wurde als RxJava nach Java portiert:
        // https://github.com/ReactiveX/RxJava/wiki
        // https://github.com/jhusain/learnrxjava
        this._http.get(uri).subscribe(nextFn, errorFn);

        // ggf. 3x retry
        // this._http.get(uri).retry(3).subscribe(nextFn);
    }

    /**
     * {method} findById
     * Ein Buch anhand der ID suchen
     * @param {string} id Die ID des gesuchten Buchs
     * @param {Function} errorFn Eine Function fuer status !== OK
     */
    @log
    findById(_id: string): void {
        if (isBlank(_id)) {
            return;
        }

        // Gibt es ein gepuffertes Buch mit der gesuchten ID?
        console.log('Gepuffertes Buch:', this._buch);
        if (isPresent(this._buch) && this._buch._id === _id) {
            this._buchEmitter.emit(this._buch);
            return;
        }

        const uri: string = `${this._baseUriBuecher}/${_id}`;
        const nextFn: ((response: Response) => void) = (response: Response) => {
            this._buch = this._responseToBuch(response);
            this._buchEmitter.emit(this._buch);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(
                `BuecherServiceMockServer.findById(): errorFn(): ${status}`);
            this._errorEmitter.emit(status);
        };

        this._http.get(uri).subscribe(nextFn, errorFn);
    }

    /**
     * Ein neues Buch anlegen
     * @param neuesBuch Das JSON-Objekt mit dem neuen Buch
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    @log
    save(
        neuesBuch: Buch, successFn: (location: string) => void,
        errorFn: (status: number, text: string) => void = null): void {
        const body: string = JSON.stringify(neuesBuch.toJSON());
        console.log('body=', body);

        const headers: Headers =
            new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', getAuthorization());
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

        const uri: string = this._baseUriBuecher;
        const nextFn: ((response: Response) => void) = (response: Response) => {
            if (response.status === 201) {
                // TODO Das Response-Objekt enthaelt im Header NICHT "Location"
                successFn(null);
                return;
            }
        };
        // async. Error-Callback statt sync. try/catch
        const errorFnPost: ((errResponse: Response) => void) =
            (errResponse: Response) => {
                if (isPresent(errorFn)) {
                    errorFn(errResponse.status, errResponse.text());
                }
            };
        this._http.post(uri, body, options).subscribe(nextFn, errorFnPost);
    }

    /**
     * Ein vorhandenes Buch aktualisieren
     * @param buch Das JSON-Objekt mit den aktualisierten Buchdaten
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    @log
    update(
        buch: Buch, successFn: () => void,
        errorFn: (status: number, text: string) => void): void {
        // json-server erwartet bei einem PUT-Request am Pfadende die ID
        const uri: string = `${this._baseUriBuecher}/${buch._id}`;

        const body: string = JSON.stringify(buch.toJSON());
        console.log('body=', body);

        const headers: Headers =
            new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', getAuthorization());
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

        const nextFn: ((response: Response) => void) = (response: Response) => {
            // json-server liefert bei erfolgreichem PUT-Request 200 (nicht 204)
            successFn();
        };
        const errorFnPut: ((errResponse: Response) => void) =
            (errResponse: Response) => {
                if (isPresent(errorFn)) {
                    errorFn(errResponse.status, errResponse.text());
                }
            };

        this._http.put(uri, body, options).subscribe(nextFn, errorFnPut);
    }

    /**
     * Ein Buch l&ouml;schen
     * @param buch Das JSON-Objekt mit dem zu loeschenden Buch
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    @log
    remove(
        buch: Buch, successFn: () => void,
        errorFn: (status: number) => void): void {
        // json-server erwartet bei einem DELETE-Request am Pfadende die ID
        const uri: string = `${this._baseUriBuecher}/${buch._id}`;

        const nextFn: ((response: Response) => void) = (response: Response) => {
            // json-server liefert bei erfolgreichem DELETE-Request 200 (nicht
            // 204)
            if (isPresent(successFn)) {
                successFn();
            }
        };
        const errorFnDelete: ((errResponse: Response) => void) =
            (errResponse: Response) => {
                if (isPresent(errorFn)) {
                    errorFn(errResponse.status);
                }
            };

        const headers: Headers =
            new Headers({'Authorization': getAuthorization()});
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

        this._http.delete(uri, options).subscribe(nextFn, errorFnDelete);
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
    @log
    setBarChart(chartElement: HTMLCanvasElement): void {
        const uri: string = this._baseUriBuecher;
        const successFn: Function = (response: Response) => {
            this._createBarChart(
                chartElement, this._responseToArrayBuch(response));
        };
        const errorFn: Function = (response: Response) => {
            console.error('Fehler beim Serverzugriff: response=', response);
        };
        const nextFn: ((response: Response) => void) = (response: Response) => {
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
    @log
    setLinearChart(chartElement: HTMLCanvasElement): void {
        const uri: string = this._baseUriBuecher;
        const successFn: Function = (response: Response) => {
            this._createLineChart(
                chartElement, this._responseToArrayBuch(response));
        };
        const errorFn: Function = (response: Response) => {
            console.error('Fehler beim Serverzugriff: response=', response);
        };
        const nextFn: ((response: Response) => void) = (response: Response) => {
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
    @log
    setPieChart(chartElement: HTMLCanvasElement): void {
        const uri: string = this._baseUriBuecher;
        const successFn: Function = (response: Response) => {
            this._createPieChart(
                chartElement, this._responseToArrayBuch(response));
        };
        const errorFn: Function = (response: Response) => {
            console.error('Fehler beim Serverzugriff: response=', response);
        };
        const nextFn: ((response: Response) => void) = (response: Response) => {
            if (response.status === 200) {
                successFn(response);
                return;
            }
            errorFn(response);
        };

        this._http.get(uri).subscribe(nextFn);
    }

    toString(): String {
        /* tslint:disable:max-line-length */
        return `BuecherServiceMockServer: {buch: ${JSON.stringify(this._buch, null, 2)}}`;
        /* tslint:enable:max-line-length */
    }

    /**
     * Ein Response-Objekt in ein Array von Buch-Objekten konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _responseToArrayBuch(response: Response): Array<Buch> {
        const jsonArray: Array<IBuchServer> = response.json();
        return jsonArray.map((jsonObjekt: IBuchServer) => {
            return Buch.fromServer(jsonObjekt);
        });
    }

    /**
     * Ein Response-Objekt in ein Buch-Objekt konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _responseToBuch(response: Response): Buch {
        return Buch.fromServer(<IBuchServer>response.json());
    }

    /**
     * Aus einem Array von Buch-Objekten diejenigen Objekte herausfiltern, die
     * den &uuml;bergebenen Suchkriterien entsprechen.
     * @param buecher Array von Buch-Objekten.
     * @param suchkriterien Die Suchkriterien aus einem Suchformular.
     */
    @log
    private _filterFind(buecher: Array<Buch>, suchkriterien: IBuchForm):
        Array<Buch> {
        const {titel, verlag, schnulze, scienceFiction}: any = suchkriterien;

        if (!isEmpty(titel)) {
            buecher = buecher.filter(
                (buch: Buch) =>
                    buch.titel.toLowerCase().includes(titel.toLowerCase()));
        }
        if (!isEmpty(verlag)) {
            buecher = buecher.filter((buch: Buch) => buch.verlag === verlag);
        }
        if (schnulze) {
            buecher = buecher.filter(
                (buch: Buch) =>
                    buch.schlagwoerter.find(
                        (schlagwort: string) => schlagwort === 'SCHNULZE')
                    !== undefined);
        }
        if (scienceFiction) {
            buecher = buecher.filter(
                (buch: Buch) => buch.schlagwoerter.find(
                                    (schlagwort: string) =>
                                        schlagwort === 'SCIENCE_FICTION')
                    !== undefined);
        }
        console.log('buecher=', buecher);
        return buecher;
    }

    /**
     * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     * @param buecher Die zu ber&uecksichtigenden B&uuml;cher
     */
    private _createBarChart(
        chartElement: HTMLCanvasElement, buecher: Array<Buch>): void {
        const labels: Array<string> = buecher.map((buch: Buch) => buch._id);
        const datasets: Array<ChartDataSet> = [{
            label: 'Bewertungen',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            data: buecher.map((buch: Buch) => buch.rating)
        }];
        const data: LinearChartData = {labels: labels, datasets: datasets};
        console.log(
            'BuecherMockServerService._createBarChart(): labels: ', labels);

        const chart: IChart = this._chartService.getChart(chartElement);
        if (isPresent(chart) && isPresent(datasets[0].data)
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
    private _createLineChart(
        chartElement: HTMLCanvasElement, buecher: Array<Buch>): void {
        const labels: Array<string> = buecher.map((buch: Buch) => buch._id);
        const datasets: Array<ChartDataSet> = [{
            label: 'Bewertungen',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            data: buecher.map((buch: Buch) => buch.rating)
        }];
        const data: LinearChartData = {labels: labels, datasets: datasets};

        // TODO Chart.js 2.0: Das Datenmodell aendert sich
        //      http://nnnick.github.io/Chart.js/docs-v2
        //      https://github.com/nnnick/Chart.js/blob/v2.0-alpha/README.md
        //      chart.d.ts gibt es noch nicht fuer 2.0:
        //      https://github.com/nnnick/Chart.js/issues/1572
        const chart: IChart = this._chartService.getChart(chartElement);
        if (isPresent(chart) && isPresent(datasets[0].data)
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
    private _createPieChart(
        chartElement: HTMLCanvasElement, buecher: Array<Buch>): void {
        const pieData: Array<CircularChartData> =
            new Array<CircularChartData>(buecher.length);

        buecher.forEach((buch: Buch, i: number) => {
            const data: CircularChartData = {
                value: buch.rating,
                color: this._chartService.getColorPie(i),
                highlight: this._chartService.getHighlightPie(i),
                label: `${buch._id}`
            };
            pieData[i] = data;
        });

        const chart: IChart = this._chartService.getChart(chartElement);
        if (isPresent(chart) && pieData.length !== 0) {
            chart.Pie(pieData);
        }
    }
}

/**
 * MOCK_SERVER_PROVIDER stellt einen Provider f&uuml;r die injizierbare
 * Klasse Buecherservice bereit. Durch diesen Provider kann in bootstrap.ts
 * statt des realen Servers z.B. json-server benutzt werden.
 */
export const MOCK_SERVER_PROVIDER: Provider =
    provide(BuecherService, {useClass: BuecherServiceMockServer});
