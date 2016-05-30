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

import {Component, OnInit, ElementRef} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import BuecherService from '../../service/buecher_service';
import {isAdmin} from '../../../iam/iam';

/**
 * Komponente mit dem Tag &lt;tortendiagramm-bewertungen&gt; zur Visualisierung
 * von Bewertungen durch ein Tortendiagramm.
 */
@Component({
    selector: 'tortendiagramm-bewertungen',
    template: `
        <section id="stats">
            <canvas id="chart" width="600" height="400"></canvas>
        </section>
    `
})
@CanActivate(isAdmin)
export default class TortendiagrammBewertungen implements OnInit {
    constructor(
        private _buecherService: BuecherService,
        private _elementRef: ElementRef) {
        console.log('TortendiagrammBewertungen.constructor()');
    }

    /**
     * Das Tortendiagramm beim Tag mit der id <code>chart</code> einf&uuml;gen.
     * Erst in ngOnInit ist das Rendering des Templates abgeschlossen.
     */
    ngOnInit(): void {
        console.log('TortendiagrammBewertungen.ngOnInit()');
        const chartElement: HTMLCanvasElement =
            this._elementRef.nativeElement.querySelector('#chart');
        this._buecherService.setPieChart(chartElement);
    }
}
