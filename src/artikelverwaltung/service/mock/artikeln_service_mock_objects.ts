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

import {VERSION as _VERSION} from 'lodash';
// import {IChart, ChartDataSet, LinearChartData, CircularChartData} from
// 'chart.js/Chart';

import Artikel from '../../model/artikel';
import {IArtikelServer, IArtikelForm} from '../../model/Artikel';
import AbstractArtikelService from '../abstract_artikel_service';
import artikelnService from '../artikel_service';
import artikeln from './artikeln';
import {ChartService, isEmpty, isBlank, isPresent, log} from '../../../shared/shared';
/* tslint:enable:max-line-length */

// Services
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service

/**
 * Mocking f&uuml;r die Service-Klasse zu B&uuml;cher. Die Artikelobjekte
 * werden durch Mockobjekte bereitgestellt.
 */
export default class ArtikelServiceMockObjects extends AbstractArtikelService {
    private _artikelnEmitter: EventEmitter<Array<Artikel>> =
        new EventEmitter<Array<Artikel>>();
    private _artikelEmitter: EventEmitter<Artikel> =
        new EventEmitter<Artikel>();
    private _errorEmitter: EventEmitter<string|number> =
        new EventEmitter<string|number>();

    private _alleartikeln: Array<Artikel> =
        artikeln.map((b: IArtikelServer) => Artikel.fromServer(b));
    private _artikel: Artikel = null;

    /**
     * @param _chartService injizierter ChartService
     * @return void
     */
    constructor(@Inject(ChartService) private _chartService: ChartService) {
        super();
        console.log(
            `ArtikelServiceMockObjects.constructor(): alleArtikeln=`,
            this._alleartikeln);
        console.log(`lodash=${_VERSION}`);
    }

    /**
     * Ein Artikel-Objekt puffern.
     * @param Artikel Das Artikel-Objekt, das gepuffert wird.
     * @return void
     */
    set artikel(artikel: Artikel) {
        console.log('artikelnServiceMockObjects.set artikel()', artikel);
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
     * artikeln suchen
     * @param {Object} suchkriterien Die Suchkriterien
     */
    @log
    find(suchkriterien: IArtikelForm): void {
        let artikeln: Array<Artikel> = this._alleartikeln;

        const {bezeichnung, kategorie}: any = suchkriterien;

        if (!isEmpty(bezeichnung)) {
            artikeln = artikeln.filter(
                (Artikel: Artikel) => Artikel.containsBezeichnung(bezeichnung));
        }
        if (!isEmpty(kategorie)) {
            artikeln = artikeln.filter(
                (Artikel: Artikel) => Artikel.hasKategorie(kategorie));
        }
        if (artikeln.length === 0) {
            console.log('artikelnServiceMockObjects.find(): status=404');
            this._errorEmitter.emit(404);
            return;
        }

        this._artikelnEmitter.emit(artikeln);
        console.log('artikelnServiceMockObjects.find(): artikeln=', artikeln);
    }

    /**
     * {method} findById
     * Ein Artikel anhand der ID suchen
     * @param {string} id Die ID des gesuchten Artikels
     * @param {Function} errorFn Eine Function fuer status !== OK
     */
    @log
    findById(id: string): void {
        // Gibt es ein gepuffertes Artikel mit der gesuchten ID?
        if (isPresent(this._artikel) && this._artikel._id === id) {
            this._artikelEmitter.emit(this._artikel);
            return;
        }
        if (isBlank(id)) {
            return;
        }

        if (isBlank(this._alleartikeln)) {
            this._artikel = null;
            return;
        }

        this._artikel =
            this._alleartikeln.find((Artikel: Artikel) => Artikel._id === id);
        if (this._artikel === undefined) {
            console.log('artikelnServiceMockObjects.findById(): response=404');
            this._errorEmitter.emit(404);
        }
        this._artikelEmitter.emit(this._artikel);
        console.log(
            'artikelnServiceMockObjects.find(): Artikel=', this._artikel);
    }
}

export const MOCK_OBJECTS_PROVIDER2: Provider =
    provide(artikelnService, {useClass: ArtikelServiceMockObjects});
