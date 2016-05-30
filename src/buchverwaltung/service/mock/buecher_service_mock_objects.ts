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

import {VERSION as _VERSION} from 'lodash';
import {IChart, ChartDataSet, LinearChartData, CircularChartData} from 'chart.js/Chart';

import Buch from '../../model/buch';
import {IBuchServer, IBuchForm} from '../../model/buch';
import AbstractBuecherService from '../abstract_buecher_service';
import BuecherService from '../buecher_service';
import BUECHER from './buecher';
import {ChartService, isEmpty, isBlank, isPresent, log, uuid} from '../../../shared/shared';
/* tslint:enable:max-line-length */

// Services
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Buchobjekte
 * werden durch Mockobjekte bereitgestellt.
 */
export default class BuecherServiceMockObjects extends AbstractBuecherService {
    private _buecherEmitter: EventEmitter<Array<Buch>> =
        new EventEmitter<Array<Buch>>();
    private _buchEmitter: EventEmitter<Buch> = new EventEmitter<Buch>();
    private _errorEmitter: EventEmitter<string|number> =
        new EventEmitter<string|number>();

    private _alleBuecher: Array<Buch> =
        BUECHER.map((b: IBuchServer) => Buch.fromServer(b));
    private _buch: Buch = null;

    /**
     * @param _chartService injizierter ChartService
     * @return void
     */
    constructor(@Inject(ChartService) private _chartService: ChartService) {
        super();
        console.log(
            `BuecherServiceMockObjects.constructor(): alleBuecher=`,
            this._alleBuecher);
        console.log(`lodash=${_VERSION}`);
    }

    /**
     * Ein Buch-Objekt puffern.
     * @param buch Das Buch-Objekt, das gepuffert wird.
     * @return void
     */
    set buch(buch: Buch) {
        console.log('BuecherServiceMockObjects.set buch()', buch);
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
        let buecher: Array<Buch> = this._alleBuecher;

        const {titel, verlag, schnulze, scienceFiction}: any = suchkriterien;

        if (!isEmpty(titel)) {
            buecher = buecher.filter((buch: Buch) => buch.containsTitel(titel));
        }
        if (!isEmpty(verlag)) {
            buecher = buecher.filter((buch: Buch) => buch.hasVerlag(verlag));
        }
        if (schnulze) {
            buecher =
                buecher.filter((buch: Buch) => buch.hasSchlagwort('SCHNULZE'));
        }
        if (scienceFiction) {
            buecher = buecher.filter(
                (buch: Buch) => buch.hasSchlagwort('SCIENCE_FICTION'));
        }

        if (buecher.length === 0) {
            console.log('BuecherServiceMockObjects.find(): status=404');
            this._errorEmitter.emit(404);
            return;
        }

        this._buecherEmitter.emit(buecher);
        console.log('BuecherServiceMockObjects.find(): buecher=', buecher);
    }

    /**
     * {method} findById
     * Ein Buch anhand der ID suchen
     * @param {string} id Die ID des gesuchten Buchs
     * @param {Function} errorFn Eine Function fuer status !== OK
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

        if (isBlank(this._alleBuecher)) {
            this._buch = null;
            return;
        }

        this._buch = this._alleBuecher.find((buch: Buch) => buch._id === id);
        if (this._buch === undefined) {
            console.log('BuecherServiceMockObjects.findById(): response=404');
            this._errorEmitter.emit(404);
        }
        this._buchEmitter.emit(this._buch);
        console.log('BuecherServiceMockObjects.find(): buch=', this._buch);
    }

    /**
     * Ein neues Buch anlegen
     * @param neuesBuch Das JSON-Objekt mit dem neuen Buch
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Eine Callback-Function fuer den Fehlerfall
     */
    @log
    save(
        neuesBuch: Buch, successFn: () => void,
        errorFn: (status: number, text: string) => void): void {
        if (isBlank(this._alleBuecher)) {
            this._alleBuecher = [];
        }

        // FIXME Generierung einer ObjectId (von MongoDB) statt UUID
        neuesBuch._id = uuid();
        this._alleBuecher.push(neuesBuch);
        console.log(
            'BuecherServiceMockObjects.save(): _alleBuecher=',
            this._alleBuecher);

        if (isPresent(successFn)) {
            successFn();
        }
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
        for (let i: number = 0; i < this._alleBuecher.length; i++) {
            if (this._alleBuecher[i]._id === buch._id) {
                this._alleBuecher[i] = buch;
                console.log('alleBuecher=', this._alleBuecher);
                successFn();
                return;
            }
        }

        this._alleBuecher.push(buch);
        console.log('alleBuecher=', this._alleBuecher);
        successFn();
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
        console.log('buch=', buch);
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
        const buecher: Array<Buch> = this._alleBuecher;
        const labels: Array<string> = buecher.map((buch: Buch) => buch._id);
        const datasets: Array<ChartDataSet> = [{
            label: 'Bewertungen',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            data: buecher.map((buch: Buch) => buch.rating)
        }];
        const data: LinearChartData = {labels: labels, datasets: datasets};
        console.log(
            'BuecherServiceMockObjects.setBarChart(): labels: ', labels);

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
     */
    @log
    setLinearChart(chartElement: HTMLCanvasElement): void {
        const buecher: Array<Buch> = this._alleBuecher;
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
     */
    @log
    setPieChart(chartElement: HTMLCanvasElement): void {
        const buecher: Array<Buch> = this._alleBuecher;
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

    toString(): String {
        /* tslint:disable:max-line-length */
        return `BuecherServiceMockObjects: {buch: ${JSON.stringify(this.buch, null, 2)}}`;
        /* tslint:enable:max-line-length */
    }
}

export const MOCK_OBJECTS_PROVIDER: Provider =
    provide(BuecherService, {useClass: BuecherServiceMockObjects});
