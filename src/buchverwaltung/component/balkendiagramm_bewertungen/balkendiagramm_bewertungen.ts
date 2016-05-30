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
 * Komponente mit dem Tag &lt;balkendiagramm-bewertungen&gt; zur Visualisierung
 * von Bewertungen durch ein Balkendiagramm.
 */
@Component({
    selector: 'balkendiagramm-bewertungen',
    template: `
        <section id="stats">
            <canvas id="chart" width="600" height="400"></canvas>
        </section>
    `
})
@CanActivate(isAdmin)
export default class BalkendiagrammBewertungen implements OnInit {
    constructor(
        private _buecherService: BuecherService,
        private _elementRef: ElementRef) {
        console.log('BalkendiagrammBewertungen.constructor()');
    }

    /* tslint:disable:max-line-length */
    /**
     * Das Balkendiagramm beim Tag mit der id <code>chart</code> einf&uuml;gen.
     * Erst in ngOnInit ist das Rendering des Templates abgeschlossen:
     * https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html.
     *
     * https://angular.io/docs/js/latest/api/core/ElementRef-class.html
     * enth&auml;lt eine Warnung bzgl. <code>ElementRef</code> und
     * <code>Renderer</code>:
     * renderer.setElementStyle(elementRef.nativeElement, 'background-color',
     * 'blue');
     * statt elementRef.nativeElement.style.backgroundColor = 'blue';
     *
     * Mittels Renderer funktioniert dann solcher Code auch f&uuml;r Angular
     * Universal: https://github.com/angular/universal.
     *
     * @ViewChild ermittelt ausschlie&szlig;lich Kind-Komponenten:
     * http://blog.mgechev.com/2016/01/23/angular2-viewchildren-contentchildren-difference-viewproviders
     */
    /* tslint:ensable:max-line-length */
    ngOnInit(): void {
        console.log('BalkendiagrammBewertungen.ngOnInit()');
        const chartElement: HTMLCanvasElement =
            this._elementRef.nativeElement.querySelector('#chart');
        this._buecherService.setBarChart(chartElement);
    }
}
