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
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MIN_RATING, MAX_RATING, Artikel;
    return {
        setters:[],
        execute: function() {
            // import {isBlank, isPresent} from '../../shared/shared';
            /* tslint:disable:max-line-length */
            // https://github.com/urish/angular2-moment/blob/master/TimeAgoPipe.ts
            // https://github.com/felixge/node-dateformat
            // Moment exportiert den Namespace moment und die gleichnamige Function:
            // http://stackoverflow.com/questions/35254524/using-moment-js-in-angular-2-typescript-application#answer-35255412
            /* tslint:enable:max-line-length */
            // import {Moment} from 'moment';
            // import * as moment_ from 'moment';
            // const moment: (date: string) => Moment = (<any>moment_)['default'];
            MIN_RATING = 0;
            MAX_RATING = 5;
            /**
             * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
             * Functions fuer Abfragen und Aenderungen.
             */
            class Artikel {
                // wird i.a. nicht direkt aufgerufen, sondern Buch.fromServer oder
                // Buch.fromForm
                constructor(id, bezeichnung, rating, kategorie, preis, ausgesondert) {
                    this.id = id;
                    this.bezeichnung = bezeichnung;
                    this.rating = rating;
                    this.kategorie = kategorie;
                    this.preis = preis;
                    this.ausgesondert = ausgesondert;
                    this.ratingArray = [];
                    this.id = id || null;
                    this.bezeichnung = bezeichnung || null;
                    this.rating = rating || null;
                    this.kategorie = kategorie || null;
                    this.preis = preis || null;
                    this.ausgesondert = ausgesondert || null;
                    for (let i = MIN_RATING; i < rating; i++) {
                        this.ratingArray.push(true);
                    }
                    for (let i = this.rating; i < MAX_RATING; i++) {
                        this.ratingArray.push(false);
                    }
                }
                /* tslint:enable:max-line-length */
                /**
                 * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
                 * Service kommen.
                 * @param artikelS JSON-Objekt mit Daten vom RESTful Web Server
                 * @return Das initialisierte Buch-Objekt
                 */
                static fromServer(artikelServer) {
                    const artikel = new Artikel(artikelServer.id, artikelServer.bezeichnung, artikelServer.rating, artikelServer.kategorie, artikelServer.preis, artikelServer.ausgesondert);
                    console.log('Artikel.fromServer(): artikel=', artikel);
                    return artikel;
                }
                /**
                 * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
                 * @param artikelS JSON-Objekt mit Daten vom Formular
                 * @return Das initialisierte Buch-Objekt
                 */
                static fromForm(artikelForm) {
                    console.log(artikelForm);
                    // preis = parseInt(artikelForm.preis, 10);
                    var rating = parseInt(artikelForm.rating, 10);
                    // preis und rabatt muss von string in number konvertiert werden
                    console.log('preis: ', artikelForm.preis);
                    console.log('ausgesondert:  ', artikelForm.ausgesondert);
                    console.log('rating', rating);
                    const artikel = new Artikel(artikelForm.id, artikelForm.bezeichnung, rating, artikelForm.kategorie, artikelForm.preis, artikelForm.ausgesondert);
                    console.log('Artikel.fromForm(): artikel=', artikel);
                    return artikel;
                }
                /**
                 * Abfrage, ob im Artikeltitel der angegebene Teilstring enthalten ist. Dabei
                 * wird nicht auf Gross-/Kleinschreibung geachtet.
                 * @param titel Zu &uuml;berpr&uuml;fender Teilstring
                 * @return true, falls der Teilstring im Buchtitel enthalten ist. Sonst
                 *         false.
                 */
                containsBezeichnung(bezeichnung) {
                    return this.bezeichnung.toLowerCase().includes(bezeichnung.toLowerCase());
                }
                containsId(id) {
                    return this.id.toLowerCase().includes(id.toLowerCase());
                }
                /**
                 * Die Bewertung ("rating") des Buches um 1 erh&ouml;hen
                 */
                rateUp() {
                    if (this.rating < MAX_RATING) {
                        this.rating++;
                    }
                }
                /**
                 * Die Bewertung ("rating") des Buches um 1 erniedrigen
                 */
                rateDown() {
                    if (this.rating > MIN_RATING) {
                        this.rating--;
                    }
                }
                /**
                 * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
                 * @param verlag der Name des Verlags
                 * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
                 */
                hasKategorie(kategorie) {
                    return this.kategorie === kategorie;
                }
                /**
                 * Aktualisierung der Stammdaten des Buch-Objekts.
                 * @param titel Der neue Buchtitel
                 * @param rating Die neue Bewertung
                 * @param art Die neue Buchart (DRUCKAUSGABE oder KINDLE)
                 * @param verlag Der neue Verlag
                 * @param preis Der neue Preis
                 * @param rabatt Der neue Rabatt
                 */
                updateStammdaten(titel, rating, kategorie, 
                    /* tslint:enable:max-line-length */
                    preis) {
                    this.bezeichnung = titel;
                    this.rating = rating;
                    this.kategorie = kategorie;
                    this.preis = preis;
                }
                /**
                 * Abfrage, ob es zum Buch auch Schlagw&ouml;rter gibt.
                 * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
                 */
                // hasSchlagwoerter(): boolean { return this.schlagwoerter.length !== 0; }
                /**
                 * Abfrage, ob es zum Buch das angegebene Schlagwort gibt.
                 * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
                 * @return true, falls es das Schlagwort gibt. Sonst false.
                 */
                /*hasSchlagwort(schlagwort: string): boolean {
                    return this.schlagwoerter.find((s: string) => s === schlagwort)
                        !== undefined;
                }*/
                /**
                 * Aktualisierung der Schlagw&ouml;rter des Buch-Objekts.
                 * @param schnulze ist das Schlagwort SCHNULZE gesetzt
                 * @param scienceFiction ist das Schlagwort SCIENCE_FICTION gesetzt
                 */
                /*updateSchlagwoerter(schnulze: boolean, scienceFiction: boolean): void {
                    this._resetSchlagwoerter();
                    if (schnulze) {
                        this._addSchlagwort('SCHNULZE');
                    }
                    if (scienceFiction) {
                        this._addSchlagwort('SCIENCE_FICTION');
                    }
                }*/
                /**
                 * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
                 * Web Service.
                 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
                 */
                toJSON() {
                    return {
                        id: this.id,
                        bezeichnung: this.bezeichnung,
                        rating: this.rating,
                        kategorie: this.kategorie,
                        preis: this.preis,
                        ausgesondert: this.ausgesondert,
                    };
                }
                toString() { return JSON.stringify(this, null, 2); }
            }
            exports_1("default", Artikel);
        }
    }
});

//# sourceMappingURL=../../maps/artikelverwaltung/model/artikel.js.map
