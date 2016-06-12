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

import Artikel from '../../model/artikel';

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
                    <td><label>Bezeichnung</label></td>
                    <td>{{artikel.bezeichnung}}</td>
                </tr>
                <tr>
                    <td><label>Kategorie</label></td>
                    <td>
                        <span [ngSwitch]="artikel.kategorie">
                            <span *ngSwitchWhen="'BAD'">Bad</span>
                            <span *ngSwitchWhen="'BUERO'">Büro</span>
                            <span *ngSwitchWhen="'DIELE'">Diele</span>
                            <span *ngSwitchWhen="'ESSZIMMER'">Esszimmer</span>
                            <span *ngSwitchWhen="'KUECHE'">Küche</span>
                            <span *ngSwitchWhen="'SCHLAFZIMMER'">
                                Schlafzimmer</span>
                            <span *ngSwitchWhen="'WOHNZIMMER'">
                                Wohnzimmer</span>                                 
                            <span *ngSwitchDefault>unbekannt</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Ausgesondert</label></td>
                    <td>
                        <input type="checkbox" checked="{{artikel.ausgesondert}}"
                            disabled class="checkbox">
                    </td>
                </tr>    
                <tr>
                    <td><label>Preis</label></td>
                    <td>{{artikel.preis | currency: 'EUR': true}}</td>
                </tr>            
                <tr>
                    <td><label>Rating</label></td>
                    <td>
                        <span *ngFor="#a of artikel.ratingArray">
                            <i class="fa fa-star" style="color: yellow;"
                               *ngIf="a === true"></i>
                        </span>
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
    @Input() artikel: Artikel;

    constructor() { console.log('Stammdaten.constructor()'); }

    ngOnInit(): void {
        console.log('Stammdaten.ngOnInit(): artikel=', this.artikel);
    }
}
