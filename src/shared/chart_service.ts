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

// Charts mittes JavaScript, siehe http://www.jsgraphs.com und
// http://jqueryhouse.com/javascript-chart-and-graph-libraries
// - D3: fuehrend, flexibel, aber keine vorgefertigten Layouts fuer z.B.
// Balken-Diagramme
// - Google Charts: nur online benutzbar, JS-Datei *nicht* auf eigenem Server
// benutzbar
// - Chart.js
// - ...

import {Injectable} from 'angular2/core';
import {IChart, ChartSettings} from 'chart.js/Chart';

import {isBlank, log} from './shared';

interface ColorHighlight {
    color: string;
    highlight: string;
}

declare var Chart: {
    new (context: CanvasRenderingContext2D): IChart;
    defaults: {global: ChartSettings}
};

/**
 * Service-Klasse f&uuml;r die Verwendung von Chart.js.
 */
@Injectable()
export class ChartService {
    private _colorsPie: Map<number, ColorHighlight> =
        new Map<number, ColorHighlight>();

    constructor() {
        console.log('ChartService.constructor()');

        this._colorsPie.set(
            0, {color: '#F7464A', highlight: '#FF5A5E'});  // red
        this._colorsPie.set(
            1, {color: '#46BFBD', highlight: '#5AD3D1'});  // green
        this._colorsPie.set(
            2, {color: '#FDB45C', highlight: '#FFC870'});  // yellow
    }

    /**
     * @param elementId ID des HTML-Tags, bei dem das Chart eingesetzt wird.
     * @return Chart-Objekt
     */
    @log
    getChart(chartElement: HTMLCanvasElement): IChart {
        if (isBlank(chartElement)) {
            console.error(
                `Kein HTML-Element fuer ein Chart gefunden:`, chartElement);
            return null;
        }
        const ctx: CanvasRenderingContext2D =
            <CanvasRenderingContext2D>chartElement.getContext('2d');
        if (isBlank(ctx)) {
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
    getColorPie(idx: number): string {
        return this._colorsPie.get(idx % 3).color;
    }

    /**
     * @param idx Fortlaufende Nummer f&uuml;r die Farbe zur Hervorhebung bei
     *        einem Tortendiagramm.
     * @return String mit dem Hex-Code dieser Farbe.
     */
    getHighlightPie(idx: number): string {
        return this._colorsPie.get(idx % 3).highlight;
    }

    toString(): string {
        return `ChartService: {colorsPie: ${this._colorsPie}}`;
    }
}
