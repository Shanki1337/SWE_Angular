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

import {Component, OnInit, Input} from 'angular2/core';
import {Router} from 'angular2/router';

import GefundeneArtikel from './gefundene_artikel';
import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';
import {Waiting, ErrorMessage, isString} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>such-ergebnis</code>, die wiederum aus den
 * Kindkomponenten f&uuml;r diese Tags besteht:
 * <ul>
 *  <li><code>waiting</code>
 *  <li><code>gefundene-artikel</code>
 *  <li><code>error-message</code>
 * </ul>
 */
@Component({
    selector: 'such-ergebnis',
    directives: [Waiting, GefundeneArtikel, ErrorMessage],
    template: `
        <section>
            <waiting [activated]="waiting"></waiting>
            <gefundene-artikel [artikel]="artikel"></gefundene-artikel>
            <error-message [text]="errorMsg"></error-message>
        <section>
    `
})
export default class SuchErgebnis implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

    // Property Binding: <such-ergebnis [waiting]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() waiting: boolean;

    artikel: Array<Artikel> = null;
    errorMsg: string = null;

    constructor(
        private _artikelService: ArtikelService, private _router: Router) {
        console.log('SuchErgebnis.constructor()');
    }

    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen. Entspricht @PostConstruct bei Java EE
    // node_modules\angular2\ts\src\core\linker\interfaces.ts
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtet
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit(): void {
        this._observeArtikel();
        this._observeError();
    }

    /**
     * Methode, um den injizierten <code>ArtikelService</code> zu beobachten,
     * ob es gefundene bzw. darzustellende Artikel gibt, die in der
     * Kindkomponente f&uuml;r das Tag <code>gefundene-artikel</code>
     * dargestellt werden. Diese private Methode wird in der Methode
     * <code>ngOnInit</code> aufgerufen.
     */
    /* tslint:disable:align */
    private _observeArtikel(): void {
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        this._artikelService.observeArtikels((artikel: Array<Artikel>) => {
            // zuruecksetzen
            this.waiting = false;
            this.errorMsg = null;

            this.artikel = artikel;
            console.log('SuchErgebnis.artikel:', this.artikel);
        }, this);
    }

    /**
     * Methode, um den injizierten <code>ArtikelService</code> zu beobachten,
     * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
     * Tag <code>error-message</code> dargestellt werden. Diese private Methode
     * wird in der Methode <code>ngOnInit</code> aufgerufen.
     */
    private _observeError(): void {
        this._artikelService.observeError((err: string | number) => {
            // zuruecksetzen
            this.waiting = false;
            this.artikel = null;

            if (err === null) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.';
                return;
            }

            if (isString(err)) {
                this.errorMsg = <string>err;
                return;
            }

            switch (err) {
                case 404:
                    this.errorMsg = 'Keine Artikel gefunden.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`SuchErgebnis.errorMsg: ${this.errorMsg}`);
        }, this);
    }
    /* tslint:enable:align */
}
