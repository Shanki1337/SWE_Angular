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

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import {Component, Input} from 'angular2/core';
// "common" enthaelt Direktiven (z.B. ngFor, ngIf), Form Controls und Pipes
import {CORE_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';
import APP_ROUTES from '../../../app/routes';
import {log} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>gefundene-bueche</code>
 */
@Component({
    selector: 'gefundene-artikel',
    directives: [CORE_DIRECTIVES],
    template: `
        <!-- Template Binding durch die Direktive ngIf -->
        <!-- Eine Direktive ist eine Komponente ohne View -->
        <div class="card" *ngIf="artikelz != null">
            <div class="card-header">
                <h4><i class="fa fa-folder-open-o"></i> Gefundene Artikel</h4>
            </div>
            <div class="card-block">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <th>Nr.</th>
                        <th>ID</th>
                        <th>Bezeichnung</th>
                        <th>Kategorie</th>
                        <th>Ausgesondert</th>
                        <th>Preis</th>
                        <th>Rating</th>
                        <th>
                            <span class="sr-only">
                                Spalte f&uuml;r Details
                            </span>
                        </th>
                    </thead>
                    <tbody>
                        <!-- Template Binding: ngFor -->
                        <!-- Event-Binding: statt (click) auch on-click -->
                        <tr *ngFor="#a of artikelz; #i = index" (click)="details(b)">
                            <td>{{i + 1}}</td>
                            <td>{{a._id}}</td>
                            <td>{{a.bezeichnung}}</td>
                            <td>
                                <span [ngSwitch]="a.kategorie">
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
                            <td>
                                <span [ngSwitch]="a.ausgesondert">
                                    <span *ngSwitchWhen=true>x</span>
                                    <span *ngSwitchWhen=false>-</span>
                            </td>
                            <td>{{a.preis}}</td>
                            <td>{{a.rating}}</td>
                            <td>
                                <!-- Pfad /detailsBuch/:id, @RouteConfig in app.ts -->
                                <!-- modaler Dialog als Alternative: -->
                                <!-- http://v4-alpha.getbootstrap.com/components/modal -->
                                <a [routerLink]="['DetailsArtikel', {'id': a._id}]"
                                   data-toggle="tooltip" title="Details anzeigen">
                                    <i class="fa fa-search-plus"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <i class="fa fa-info-circle"></i>
                Diese Datensätze stammen vom Server javaee
            </div>
        </div>

        <!-- Ausgabe des JSON-Datensatzes im Webbrowser statt console.log(...) -->
        <!--
        <pre *ngIf="buecher != null">{{buecher | json}}</pre>
        -->
    `
})
export default class GefundeneArtikel {
    // Property Binding: <gefundene-buecher [buecher]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() artikelz: Array<Artikel>;

    constructor(
        private _artikelService: ArtikelService, private _router: Router) {
        console.log('GefundeneArtikel.constructor()');
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Buch in der Detailsseite anzeigen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    @log
    details(artikel: Artikel): void {
        console.log(
            `detailsArtikelDef.name=${APP_ROUTES.detailsArtikelDef.name}`);
        console.log(`id=${artikel._id}`);
        this._router.navigate(
            [APP_ROUTES.detailsArtikelDef.name, {id: artikel._id}]);
    }

    toString(): String { return 'GefundeneArtikel'; }
}