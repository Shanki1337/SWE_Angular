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

import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import Buch from '../../model/buch';

/**
 * Komponente f&uuml;r das Tag <code>stammdaten</code>
 */
@Component({
    selector: 'stammdaten',
    directives: [CORE_DIRECTIVES],
    // siehe @Input in der Komponenten-Klasse
    // inputs: ['buch'],
    template: `
        <table class="table table-stripped table-hover table-responsive">
            <tbody>
                <tr>
                    <td><label>Titel</label></td>
                    <td>{{buch.titel}}</td>
                </tr>
                <tr>
                    <td><label>Bewertung</label></td>
                    <td>
                        <span *ngFor="#r of buch.ratingArray">
                            <i class="fa fa-star" style="color: yellow;"
                               *ngIf="r === true"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Art</label></td>
                    <td>
                        <span [ngSwitch]="buch.art">
                            <span *ngSwitchWhen="'DRUCKAUSGABE'">Druckausgabe</span>
                            <span *ngSwitchWhen="'KINDLE'">Kindle</span>
                            <span *ngSwitchDefault>unbekannt</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Verlag</label></td>
                    <td>
                        <span [ngSwitch]="buch.verlag">
                            <span *ngSwitchWhen="'OREILLY'">O'Reilly</span>
                            <span *ngSwitchWhen="'PACKT'">Packt</span>
                            <span *ngSwitchDefault>unbekannt</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Datum</label></td>
                    <td>
                        {{buch.datumFormatted}}<br/>
                        {{buch.datumFromNow}}
                    </td>
                </tr>
                <tr>
                    <td><label>Preis</label></td>
                    <!-- TODO 2 Nachkommastellen. Pipe "| number: '.2'" -->
                    <td>{{buch.preis | currency: 'EUR': true}}</td>
                </tr>
                <tr>
                    <td><label>Rabatt</label></td>
                    <!-- {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits} -->
                    <!-- default: 1.0-3 -->
                    <!-- node_modules\angular2\ts\src\...\number_pipe.ts -->
                    <td>{{buch.rabatt | percent: '.2'}}</td>
                </tr>
                <tr>
                    <td><label>Lieferbar?</label></td>
                    <td>
                        <input type="checkbox" checked="{{buch.lieferbar}}"
                            disabled class="checkbox">
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export default class Stammdaten implements OnInit {
    // Property Binding: <stammdaten [buch]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() buch: Buch;

    constructor() { console.log('Stammdaten.constructor()'); }

    ngOnInit(): void { console.log('Stammdaten.ngOnInit(): buch=', this.buch); }
}
