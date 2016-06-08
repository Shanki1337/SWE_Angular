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

import {Component, OnDestroy} from 'angular2/core'; // externes Modul

import SuchKriterien from './such_kriterien_id'; // internes Modul
import SuchErgebnis from './such_ergebnis';
import {log} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>&lt;suche-buecher&gt;</code>, die aus den
 * Kindkomponenten f&uuml;r diese Tags besteht:
 * <ul>
 *  <li> <code>such-kriterien</code>
 *  <li> <code>such-ergebnis</code>
 * </ul>
 */
@Component({
    selector: 'suche-artikel-id',
    directives: [SuchKriterien, SuchErgebnis],
    template: `
        <such-kriterien (waiting)="setWaiting($event)"></such-kriterien>
        <such-ergebnis [waiting]="waiting"></such-ergebnis>

        <!-- alternative Syntax:
                eigenes Ereignis "waiting" (ausgeloest in SuchKriterien):
                <such-kriterien on-waiting="setWaiting($event)"></such-kriterien>

                Property "waiting" in der Komponentenklasse
                <such-ergebnis bind-waiting="waiting"></such-ergebnis>
        -->
    `
})
export default class SucheArtikel implements OnDestroy {
    waiting: boolean = false;

    constructor() { console.log('SucheArtikel.constructor()'); }

    // Methode zum "LifeCycle Hook" OnDestroy:
    // wird direkt vor dem Garbage Collector aufgerufen
    // node_modules\angular2\ts\src\core\linker\interfaces.ts
    ngOnDestroy(): void { console.log('SucheArtikel.onDestroy()'); }

    /**
     * Das Attribut <code>waiting</code> wird auf den Wert des boole'schen
     * Ereignisses <code>$event</code> gesetzt. Diese Methode wird aufgerufen,
     * wenn in der Kindkomponente f&uuml;r <code>such-kriterien</code> das
     * Ereignis ausgel&ouml;st wird. Der aktuelle Wert vom Attribut
     * <code>&lt;waiting&gt;</code> wird an die Kindkomponente f&uuml;r
     * <code>&lt;such-ergebnis&gt;</code> weitergereicht.
     * @param $event
     */
    @log
    setWaiting($event: boolean): void { this.waiting = $event; }

    toString(): String { return 'SucheArtikel'; }
}
