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
import {Http, Response, Headers, RequestOptionsArgs, URLSearchParams} from 'angular2/http';

// Moment exportiert den Namespace moment und die gleichnamige Function:
// http://stackoverflow.com/questions/35254524/using-moment-js-in-angular-2-typescript-application#answer-35255412
import {Moment} from 'moment';
import * as moment_ from 'moment';
const moment: (date: Date) => Moment = (<any>moment_)['default'];

import {IChart, ChartDataSet, LinearChartData, CircularChartData} from 'chart.js/Chart';

import Buch from '../model/buch';
import {IBuchServer, IBuchForm} from '../model/buch';
import AbstractBuecherService from './abstract_buecher_service';
import {ChartService, BASE_URI, PATH_BUECHER, isBlank, isPresent, isEmpty, log} from '../../shared/shared';
import {getAuthorization} from '../../iam/iam';
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
export default class BuecherService extends AbstractBuecherService {
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
        console.log(
            `BuecherService.constructor(): baseUriBuecher=${this._baseUriBuecher}`);
    }

    /**
     * Ein Buch-Objekt puffern.
     * @param buch Das Buch-Objekt, das gepuffert wird.
     * @return void
     */
    set buch(buch: Buch) {
        console.log('BuecherService.set buch()', buch);
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
     * Buecher suchen
     * @param suchkriterien Die Suchkriterien
     */
    @log
    find(suchkriterien: IBuchForm): void {
        const searchParams: URLSearchParams =
            this._suchkriterienToSearchParams(suchkriterien);
        const uri: string = this._baseUriBuecher;
        console.log(`BuecherService.find(): uri=${uri}`);

        const nextFn: ((response: Response) => void) = (response: Response) => {
            console.log('BuecherService.find(): nextFn()');
            let buecher: Array<Buch> = this._responseToArrayBuch(response);
            this._buecherEmitter.emit(buecher);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(`BuecherService.find(): errorFn(): ${status}`);
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

        this._http.get(uri, {search: searchParams}).subscribe(nextFn, errorFn);
    }

    /**
     * Ein Buch anhand der ID suchen
     * @param id Die ID des gesuchten Buchs
     */
    @log
    findById(id: string): void {
        // Gibt es ein gepuffertes Buch mit der gesuchten ID?
        if (isPresent(this._buch) && this._buch._id === id) {
            this._buchEmitter.emit(this._buch);
            return;
        }
        if (isBlank(id)) {
            return;
        }

        const uri: string = `${this._baseUriBuecher}/${id}`;
        const nextFn: ((response: Response) => void) = (response: Response) => {
            this._buch = this._responseToBuch(response);
            this._buchEmitter.emit(this._buch);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(`BuecherService.findById(): errorFn(): ${status}`);
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
        errorFn: (status: number, text: string) => void): void {
        neuesBuch.datum = moment(new Date());

        const uri: string = this._baseUriBuecher;
        const body: string = JSON.stringify(neuesBuch.toJSON());
        console.log('body=', body);

        const headers: Headers =
            new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', getAuthorization());
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

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
        const uri: string = `${this._baseUriBuecher}`;
        const body: string = JSON.stringify(buch.toJSON());
        console.log('body=', body);

        const headers: Headers =
            new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', getAuthorization());
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

        const nextFn: ((response: Response) => void) =
            (response: Response) => { successFn(); };
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
        const uri: string = `${this._baseUriBuecher}/${buch._id}`;
        const headers: Headers =
            new Headers({'Authorization': getAuthorization()});
        // RequestOptionsArgs in
        // node_modules\angular2\ts\src\http\interfaces.ts
        const options: RequestOptionsArgs = {headers: headers};
        console.log('options=', options);

        const nextFn: ((response: Response) => void) = (response: Response) => {
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
        const errorFn: Function =
            (response: Response) => { console.error('response=', response); };
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
        const errorFn: Function =
            (response: Response) => { console.error('response=', response); };
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
        const errorFn: Function =
            (response: Response) => { console.error('response=', response); };
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
        return `BuecherService: {buch: ${JSON.stringify(this._buch, null, 2)}}`;
    }

    /**
     * Ein Response-Objekt in ein Array von Buch-Objekten konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _suchkriterienToSearchParams(suchkriterien: IBuchForm):
        URLSearchParams {
        const searchParams: URLSearchParams = new URLSearchParams();

        if (!isEmpty(suchkriterien.titel)) {
            searchParams.set('titel', suchkriterien.titel);
        }
        if (suchkriterien.druckausgabe) {
            searchParams.set('art', 'DRUCKAUSGABE');
        } else if (suchkriterien.kindle) {
            searchParams.set('art', 'KINDLE');
        }
        if (isPresent(suchkriterien.rating)) {
            searchParams.set('rating', suchkriterien.rating.toString());
        }
        if (!isEmpty(suchkriterien.verlag)) {
            searchParams.set('verlag', suchkriterien.verlag);
        }
        if (isPresent(suchkriterien.schnulze) && suchkriterien.schnulze) {
            searchParams.set('schnulze', 'true');
        }
        if (isPresent(suchkriterien.scienceFiction)
            && suchkriterien.scienceFiction) {
            searchParams.set('scienceFiction', 'true');
        }
        return searchParams;
    }

    /**
     * Ein Response-Objekt in ein Array von Buch-Objekten konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _responseToArrayBuch(response: Response): Array<Buch> {
        const jsonArray: Array<IBuchServer> =
            <Array<IBuchServer>>(response.json());
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
        const jsonObjekt: IBuchServer = <IBuchServer>(response.json());
        return Buch.fromServer(jsonObjekt);
    }

    /**
     * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
     * einf&uuml;gen.
     * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
     * @param buecher Die zu ber&uecksichtigenden B&uuml;cher
     */
    @log
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
        console.log('BuecherService._createBarChart(): labels: ', labels);

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
    @log
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
    @log
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

export const BUECHER_SERVICE_PROVIDER: Provider =
    provide(BuecherService, {useClass: BuecherService});
