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
import {Component, Output, EventEmitter} from 'angular2/core';
// "common" enthaelt Direktiven (z.B. ngFor, ngIf), Form Controls und Pipes
import {CORE_DIRECTIVES} from 'angular2/common';

import ArtikelService from '../../service/artikel_service';
import {log} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>such-kriterien</code>
 */
@Component({
    selector: 'such-kriterien',
    directives: [CORE_DIRECTIVES],
    template: `
        <div class="card">
            <div class="card-header bg-primary">
                <h4>Eingabe der ID</h4>
            </div>
            <div class="card-block">
                <!-- Formulare zur Interaktion mit dem Endbenutzer:
                        * Daten werden modifiziert, z.B. in Suchfelder
                          oder Erfassungs-/Aenderungsformularen
                        * Aenderungen wirken sich auf Teile der Seite aus:
                          Ergebnisse/Fehler anzeigen, Navigationsmoeglichkeiten
                        * Eingaben werden validiert
                -->
                <!-- Template-Syntax:
                     (submit)="find()"   fuer Output = Event Binding
                                         d.h. Ereignis submit an find() anbinden
                                         oder on-submit="find"
                     Definition von Attributnamen gemaess HTML: Attribute names
                     must consist of one or more characters other than the
                     space characters, U+0000 NULL, """, "'", ">", "/", "=",
                     the control characters, and any characters that are not
                     defined by Unicode.
                -->
                <!-- CSS-Klassen von Bootstrap:
                     form-group, row, form-control-label, btn, ...
                     http://v4-alpha.getbootstrap.com/components/forms -->

                <form (submit)="find()" role="form">
                    <div class="form-group row">
                        <label for="idInput"
                               class="col-sm-2 form-control-label">ID</label>
                        <div class="col-sm-10">
                            <input id="idInput"
                                type="search"
                                placeholder="Die ID oder einen Teil davon eingeben"
                                class="form-control"
                                [(ngModel)]="id">
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-offset-2 col-sm-10">
                            <i class="fa fa-info-circle"></i>
                            Hinweis: Keine Eingabe liefert alle Artikel
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button class="btn btn-primary"><i class="fa fa-search"></i>
                            &nbsp; Go!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
})
export default class SuchKriterien {
    id: string = null;

    // Event Binding: <such-kriterien (waiting)="...">
    // siehe OutputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Output() waiting: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Empfehlung: Konstruktor nur fuer DI
    constructor(private _artikelService: ArtikelService) {
        console.log('SuchKriterien.constructor()');
    }

    /**
     * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
     * @param suchkriterien: Suchkriterien vom Typ IBuchForm
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    @log
    find(): boolean {
        const suchkriterium: string = this.id;
        console.log('suchkriterien=', suchkriterium);

        this.waiting.emit(true);
        this._artikelService.findById(suchkriterium);

        // Inspektion der Komponente mit dem Tag-Namen "app" im Debugger
        // Voraussetzung: globale Variable ng deklarieren (s.o.)
        // const app: any = document.querySelector('app');
        // global.ng.probe(app);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite.
        return false;
    }

    toString(): String { return 'SuchKriterium'; }
}
