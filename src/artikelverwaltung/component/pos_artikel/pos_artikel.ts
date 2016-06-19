/*
 * Sven Baumann
 */

import {Component, OnInit} from 'angular2/core';
import {Router, CanActivate} from 'angular2/router';

import GefundeneArtikel from './gefundene_artikel';
import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';
import {isAdmin} from '../../../iam/iam';
import {ErrorMessage, isString} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>such-ergebnis</code>, die wiederum aus den
 * Kindkomponenten f&uuml;r diese Tags besteht:
 * <ul>
 *  <li><code>waiting</code>
 *  <li><code>gefundene-buecher</code>
 *  <li><code>error-message</code>
 * </ul>
 */
@Component({
    selector: 'pos-artikel',
    directives: [GefundeneArtikel, ErrorMessage],
    template: `
        <section>
            <gefundene-artikel [artikel]="artikel"></gefundene-artikel>
            <error-message [text]="errorMsg"></error-message>
        <section>
    `
})
@CanActivate(isAdmin)
export default class PosArtikel implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek, wie z.B. Redux http://redux.js.org

    // Property Binding: <such-ergebnis [waiting]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts

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
        this.find();
        this._observeArtikel();
        this._observeError();
    }

    find(): boolean {
        this._artikelService.findAll();
        console.log('findAll()');
        return false;
    }

    /**
     * Methode, um den injizierten <code>BuecherService</code> zu beobachten,
     * ob es gefundene bzw. darzustellende B&uuml;cher gibt, die in der
     * Kindkomponente f&uuml;r das Tag <code>gefundene-buecher</code>
     * dargestellt werden. Diese private Methode wird in der Methode
     * <code>ngOnInit</code> aufgerufen.
     */
    /* tslint:disable:align */
    private _observeArtikel(): void {
        // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
        this._artikelService.observeArtikelz((artikel: Array<Artikel>) => {
            // zuruecksetzen
            this.errorMsg = null;

            this.artikel = artikel;
            console.log('SuchErgebnis.artikel:', this.artikel);
        }, this);
    }

    /**
     * Methode, um den injizierten <code>BuecherService</code> zu beobachten,
     * ob es bei der Suche Fehler gibt, die in der Kindkomponente f&uuml;r das
     * Tag <code>error-message</code> dargestellt werden. Diese private Methode
     * wird in der Methode <code>ngOnInit</code> aufgerufen.
     */
    private _observeError(): void {
        this._artikelService.observeError((err: string | number) => {
            // zuruecksetzen
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
