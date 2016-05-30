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

import BuecherService from '../../service/buecher_service';
import Buch from '../../model/buch';
import APP_ROUTES from '../../../app/routes';
import {log} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>gefundene-bueche</code>
 */
@Component({
    selector: 'gefundene-buecher',
    directives: [CORE_DIRECTIVES],
    template: `
        <!-- Template Binding durch die Direktive ngIf -->
        <!-- Eine Direktive ist eine Komponente ohne View -->
        <div class="card" *ngIf="buecher != null">
            <div class="card-header">
                <h4><i class="fa fa-folder-open-o"></i> Gefundene B&uuml;cher</h4>
            </div>
            <div class="card-block">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <th>Nr.</th>
                        <th>ID</th>
                        <th>Titel</th>
                        <th>Verlag</th>
                        <th>Schlagw&ouml;rter</th>
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
                        <tr *ngFor="#b of buecher; #i = index" (click)="details(b)">
                            <td>{{i + 1}}</td>
                            <td>{{b._id}}</td>
                            <td>{{b.titel}}</td>
                            <td>
                                <span [ngSwitch]="b.verlag">
                                    <span *ngSwitchWhen="'OREILLY'">O'Reilly</span>
                                    <span *ngSwitchWhen="'PACKT'">Packt</span>
                                    <span *ngSwitchDefault>unbekannt</span>
                                </span>
                            </td>
                            <td>
                                <span *ngFor="#sw of b.schlagwoerter">
                                    <span [ngSwitch]="sw">
                                        <span *ngSwitchWhen="'SCHNULZE'">
                                            Schnulze<br>
                                        </span>
                                        <span *ngSwitchWhen="'SCIENCE_FICTION'">
                                            Sc. Fiction
                                        </span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <!-- Pfad /detailsBuch/:id, @RouteConfig in app.ts -->
                                <!-- modaler Dialog als Alternative: -->
                                <!-- http://v4-alpha.getbootstrap.com/components/modal -->
                                <a [routerLink]="['DetailsBuch', {'id': b._id}]"
                                   data-toggle="tooltip" title="Details anzeigen">
                                    <i class="fa fa-search-plus"></i>
                                </a>
                            </td>
                            <td>
                                <a (click)="remove(b)" data-toggle="tooltip"
                                   title="Entfernen">
                                    <i class="fa fa-remove"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <i class="fa fa-info-circle"></i>
                Zur Anzeige der JSON-Datens&auml;tze in gefundene_buecher.ts
                den Kommentar beim Tag &lt;pre&gt; entfernen
            </div>
        </div>

        <!-- Ausgabe des JSON-Datensatzes im Webbrowser statt console.log(...) -->
        <!--
        <pre *ngIf="buecher != null">{{buecher | json}}</pre>
        -->
    `
})
export default class GefundeneBuecher {
    // Property Binding: <gefundene-buecher [buecher]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() buecher: Array<Buch>;

    constructor(
        private _buecherService: BuecherService, private _router: Router) {
        console.log('GefundeneBuecher.constructor()');
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Buch in der Detailsseite anzeigen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    @log
    details(buch: Buch): void {
        console.log(`detailsBuchDef.name=${APP_ROUTES.detailsBuchDef.name}`);
        console.log(`id=${buch._id}`);
        this._router.navigate([APP_ROUTES.detailsBuchDef.name, {id: buch._id}]);
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Buch l&ouml;schen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    @log
    remove(buch: Buch): void {
        const errorFn: (status: number) => void = (status: number): void => {
            console.error(`Fehler beim Loeschen: status=${status}`);
        };
        this._buecherService.remove(buch, null, errorFn);
        this.buecher = this.buecher.filter((b: Buch) => b._id !== buch._id);
    }

    toString(): String { return 'GefundeneBuecher'; }
}
