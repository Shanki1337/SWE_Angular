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
 * Komponente f&uuml;r das Tag <code>gefundene-artikel</code>
 */
@Component({
    selector: 'gefundene-artikel',
    directives: [CORE_DIRECTIVES],
    template: `
        <!-- Template Binding durch die Direktive ngIf -->
        <!-- Eine Direktive ist eine Komponente ohne View -->
        <div class="card" *ngIf="artikel != null">
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
                        <th>
                            <span class="sr-only">
                                Spalte f&uuml;r Details
                            </span>
                        </th> 
                        <th>
                            <span class="sr-only">
                                Spalte f&uuml;r Entfernen
                            </span>
                        </th>
                    </thead>
                    <tbody>
                        <!-- Template Binding: ngFor -->
                        <!-- Event-Binding: statt (click) auch on-click -->
                        <tr *ngFor="#a of artikel; #i = index" (click)="details(a)">
                            <td>{{i + 1}}</td>
                            <td>{{a.id}}</td>
                            <td>{{a.bezeichnung}}</td>
                            <td>
                                <span [ngSwitch]="a.kategorie">
                                  <span *ngSwitchWhen="'BAD'">BAD</span>
                                  <span *ngSwitchWhen="'BUERO'">BUERO</span>
                                  <span *ngSwitchWhen="'DIEHLE'">DIEHLE</span>
                                  <span *ngSwitchWhen="'ESSZIMMER'">ESSZIMMER</span>
                                  <span *ngSwitchWhen="'KINDERZIMMER'">KINDERZIMMER</span>
                                  <span *ngSwitchWhen="'KUECHE'">KUECHE</span>
                                  <span *ngSwitchWhen="'SCHLAFZIMMER'">SCHLAFZIMMER</span>
                                  <span *ngSwitchWhen="'WOHNZIMMER'">WOHNZIMMER</span>
                                  <span *ngSwitchDefault>unbekannt</span>
                                </span>
                            </td>
                            <td>
                                <a [routerLink]="['DetailsArtikel', {'id': a.id}]"
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
                Zur Anzeige der JSON-Datens&auml;tze in gefundene_artikel.ts
                den Kommentar beim Tag &lt;pre&gt; entfernen
            </div>
        </div>

        <!-- Ausgabe des JSON-Datensatzes im Webbrowser statt console.log(...) -->
        <!--
        <pre *ngIf="artikel != null">{{artikel | json}}</pre>
        -->
    `
})

export default class GefundeneArtikel {
    // Property Binding: <gefundene-artikel [artikel]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() artikel: Array<Artikel>;

    constructor(
        private _artikelService: ArtikelService, private _router: Router) {
        console.log('GefundeneArtikel.constructor()');
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Artikel in der Detailsseite
     * anzeigen.
     * @param artikelS Das ausgew&auml;hlte Artikel
     */
    @log
    details(artikel: Artikel): void {
        console.log(
            `detailsArtikelDef.name=${APP_ROUTES.detailsArtikelDef.name}`);
        console.log(`id=${artikel.id}`);
        this._router.navigate(
            [APP_ROUTES.detailsArtikelDef.name, {id: artikel.id}]);
    }

    toString(): String { return 'GefundeneArtikel'; }
}
