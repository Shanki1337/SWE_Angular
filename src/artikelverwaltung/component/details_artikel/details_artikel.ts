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

import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';
import Stammdaten from './stammdaten';
import {isAdmin} from '../../../iam/iam';
import {isString, Waiting, ErrorMessage} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>details-buch</code>
 */
@Component({
    selector: 'details-artikel',
    directives: [CORE_DIRECTIVES, Stammdaten, Waiting, ErrorMessage],
    template: `
        <waiting [activated]="waiting"></waiting>

        <section *ngIf="artikel !== null">
            <h4>Artikel {{artikel.id}}:</h4>

            <!-- http://v4-alpha.getbootstrap.com/components/navs/#tabs -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="#stammdaten"
                       data-toggle="tab">
                        Stammdaten
                    </a>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade in active" id="stammdaten">
                    <div class="m-t-1">
                        <stammdaten [artikel]="artikel"></stammdaten>
                    </div>
                </div>
            </div>
        </section>

        <error-message [text]="errorMsg"></error-message>
    `
})
export default class DetailsArtikel implements OnInit {
    waiting: boolean = false;
    artikel: Artikel = null;
    errorMsg: string = null;

    constructor(
        private _artikelService: ArtikelService,
        private _routeParams: RouteParams) {
        console.log('DetailsArtikel.constructor(): routeParams=', _routeParams);
    }

    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen: node_modules\angular2\ts\src\core\linker\interfaces.ts
    ngOnInit(): void {
        this._observeArtikel();
        this._observeError();

        // Pfad-Parameter aus /detailsBuch/:id
        const id: string = this._routeParams.params['id'];
        console.log(`DetailsArtikel.ngOnInit(): id= ${id}`);
        this._artikelService.findById(id);
    }

    isAdmin(): boolean { return isAdmin(); }

    /* tslint:disable:align */
    private _observeArtikel(): void {
        this._artikelService.observeArtikel((artikel: Artikel) => {
            this.waiting = false;
            this.artikel = artikel;
            console.log('DetailsArtikel.artikel=', this.artikel);
        }, this);
    }

    private _observeError(): void {
        this._artikelService.observeError((err: string | number) => {
            this.waiting = false;
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
                    this.errorMsg = 'Kein Artikel gefunden.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`DetailsArtikel.errorMsg: ${this.errorMsg}`);
        }, this);
    }
    /* tslint:enable:align */
}
