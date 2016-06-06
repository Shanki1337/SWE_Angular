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

/* tslint:disable:max-line-length */
import {Inject, EventEmitter, provide, Provider} from 'angular2/core';
import {Http, Response} from 'angular2/http';
// import {IChart, ChartDataSet, LinearChartData, CircularChartData} from
// 'chart.js/Chart';

import Artikel from '../../model/artikel';
import {IArtikelServer, IArtikelForm} from '../../model/artikel';
import AbstractArtikelService from '../abstract_artikel_service';
import ArtikelnService from '../artikel_service';
import {ChartService, BASE_URI, PATH_BUECHER, isPresent, isBlank, isEmpty, log} from '../../../shared/shared';
// import {getAuthorization} from '../../../iam/iam';
/* tslint:enable:max-line-length */

// Methoden der Klasse Http: für vereinfachten Zugriff auf XMLHttpRequest
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Artikelobjekte
 * werden durch das npm-Package json-server bereitgestellt.
 */
export default class ArtikelServiceMockServer extends AbstractArtikelService {
    private _baseUriArtikeln: string;
    private _artikelnEmitter: EventEmitter<Array<Artikel>> =
        new EventEmitter<Array<Artikel>>();
    private _artikelEmitter: EventEmitter<Artikel> =
        new EventEmitter<Artikel>();
    private _errorEmitter: EventEmitter<string|number> =
        new EventEmitter<string|number>();
    private _artikel: Artikel = null;

    /**
     * @param _chartService injizierter ChartService
     * @param _http injizierter Service Http (von AngularJS)
     * @return void
     */
    constructor(
        @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http) {
        super();
        this._baseUriArtikeln = `${BASE_URI}${PATH_BUECHER}`;
        /* tslint:disable:max-line-length */
        console.log(
            `ArtikelnServiceMockServer.constructor(): baseUriArtikeln=${this._baseUriArtikeln}`);
        /* tslint:enable:max-line-length */
    }

    /**
     * Ein Artikel-Objekt puffern.
     * @param artikel Das Artikel-Objekt, das gepuffert wird.
     * @return void
     */
    set artikel(artikel: Artikel) {
        console.log('ArtikelnServiceMockServer.set artikel()', artikel);
        this._artikel = artikel;
    }

    @log
    observeArtikels(
        observerFn: (artikeln: Array<Artikel>) => void, thisArg: any): void {
        this._artikelnEmitter.forEach(observerFn, thisArg);
    }

    @log
    observeArtikel(observerFn: (artikel: Artikel) => void, thisArg: any): void {
        this._artikelEmitter.forEach(observerFn, thisArg);
    }

    @log
    observeError(observerFn: (err: string|number) => void, thisArg: any): void {
        this._errorEmitter.forEach(observerFn, thisArg);
    }

    /**
     * {method} find
     * Artikeln suchen
     * @param {Object} suchkriterien Die Suchkriterien
     */
    @log
    find(suchkriterien: IArtikelForm): void {
        const uri: string = this._baseUriArtikeln;
        console.log(`uri=${uri}`);
        const nextFn: ((response: Response) => void) = (response: Response) => {
            console.log('ArtikelnServiceMockServer.find(): nextFn()');
            let artikeln: Array<Artikel> =
                this._responseToArrayArtikel(response);
            console.log(`nextFnd(): artikeln=${JSON.stringify(artikeln)}`);
            // Query-Parameter durch Filterung emulieren
            artikeln = this._filterFind(artikeln, suchkriterien);
            if (artikeln.length === 0) {
                this._errorEmitter.emit(404);
                return;
            }

            this._artikelnEmitter.emit(artikeln);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(
                `ArtikelnServiceMockServer.find(): errorFn(): ${status}`);
            if (status === 400) {
                const body: string = err.text();
                if (isBlank(body)) {
                    this._errorEmitter.emit(status);
                } else {
                    // z.B. [PARAMETER][findByTitel.titel][Bei einem ...][x]
                    let errorMsg: string = body.split('[')[3];
                    errorMsg = errorMsg.substr(0, errorMsg.length - 2);
                    this._errorEmitter.emit(errorMsg);
                }
            } else {
                this._errorEmitter.emit(status);
            }
        };

        // Alternative zu Http von Angular: Swagger JS library
        // https://github.com/swagger-api/swagger-js

        // Die Daten werden vom (REST-) Server *asynchron* geliefert.
        // Deshalb gibt die Methode get() vom Service Http ein *Observable*
        // zurueck.
        // Ein Observable ist eine Alternative zu Callback (Hell), Promise, ...
        // Ein Observable kann andere Objekte ueber Aenderungen informieren,
        // falls diese dafuer ein Abbonnement durch die Methode subscribe()
        // haben. Diese Aenderungen koennen sukzessive in der Function
        // nextFn ermittelt werden.
        // Die Klasse Observable ist im Modul node_modules\rxjs\Observable.ts
        // http://reactivex.io ist von Netflix unter Mitarbeit von Microsoft
        // Uebrigens: RxJS wurde als RxJava nach Java portiert:
        // https://github.com/ReactiveX/RxJava/wiki
        // https://github.com/jhusain/learnrxjava
        this._http.get(uri).subscribe(nextFn, errorFn);

        // ggf. 3x retry
        // this._http.get(uri).retry(3).subscribe(nextFn);
    }

    /**
     * {method} findById
     * Ein Artikel anhand der ID suchen
     * @param {string} id Die ID des gesuchten Artikels
     * @param {Function} errorFn Eine Function fuer status !== OK
     */
    @log
    findById(_id: string): void {
        if (isBlank(_id)) {
            return;
        }

        // Gibt es ein gepuffertes Artikel mit der gesuchten ID?
        console.log('Gepuffertes Artikel:', this._artikel);
        if (isPresent(this._artikel) && this._artikel._id === _id) {
            this._artikelEmitter.emit(this._artikel);
            return;
        }

        const uri: string = `${this._baseUriArtikeln}/${_id}`;
        const nextFn: ((response: Response) => void) = (response: Response) => {
            this._artikel = this._responseToArtikel(response);
            this._artikelEmitter.emit(this._artikel);
        };
        const errorFn: (err: Response) => void = (err: Response) => {
            const status: number = err.status;
            console.log(
                `ArtikelnServiceMockServer.findById(): errorFn(): ${status}`);
            this._errorEmitter.emit(status);
        };

        this._http.get(uri).subscribe(nextFn, errorFn);
    }

    toString(): String {
        /* tslint:disable:max-line-length */
        return `ArtikelnServiceMockServer: {artikel:
          ${JSON.stringify(this._artikel, null, 2)}}`;
        /* tslint:enable:max-line-length */
    }

    /**
     * Ein Response-Objekt in ein Array von Artikel-Objekten konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _responseToArrayArtikel(response: Response): Array<Artikel> {
        const jsonArray: Array<IArtikelServer> = response.json();
        return jsonArray.map((jsonObjekt: IArtikelServer) => {
            return Artikel.fromServer(jsonObjekt);
        });
    }

    /**
     * Ein Response-Objekt in ein Artikel-Objekt konvertieren.
     * @param response Response-Objekt eines GET-Requests.
     */
    @log
    private _responseToArtikel(response: Response): Artikel {
        return Artikel.fromServer(<IArtikelServer>response.json());
    }

    /**
     * Aus einem Array von Artikel-Objekten diejenigen Objekte herausfiltern,
     * die
     * den &uuml;bergebenen Suchkriterien entsprechen.
     * @param artikeln Array von Artikel-Objekten.
     * @param suchkriterien Die Suchkriterien aus einem Suchformular.
     */
    @log
    private _filterFind(artikeln: Array<Artikel>, suchkriterien: IArtikelForm):
        Array<Artikel> {
        const {bezeichnung, kategorie}: any = suchkriterien;

        if (!isEmpty(bezeichnung)) {
            artikeln = artikeln.filter(
                (artikel: Artikel) =>
                    artikel.bezeichnung.toLowerCase().includes(
                        bezeichnung.toLowerCase()));
        }
        if (!isEmpty(kategorie)) {
            artikeln = artikeln.filter(
                (artikel: Artikel) => artikel.kategorie === kategorie);
        }
        console.log('artikeln=', artikeln);
        return artikeln;
    }

    /**
     * MOCK_SERVER_PROVIDER stellt einen Provider f&uuml;r die injizierbare
     * Klasse Artikelnservice bereit. Durch diesen Provider kann in bootstrap.ts
     * statt des realen Servers z.B. json-server benutzt werden.
     */
}
export const MOCK_SERVER_PROVIDER: Provider =
    provide(ArtikelnService, {useClass: ArtikelServiceMockServer});
