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
import {RouteParams, CanActivate} from 'angular2/router';

import BuecherService from '../../service/buecher_service';
import Buch from '../../model/buch';
import Stammdaten from './stammdaten';
import Schlagwoerter from './schlagwoerter';
import {isAdmin} from '../../../iam/iam';
import {isString, ErrorMessage} from '../../../shared/shared';

/**
 * Komponente f&uuml;r das Tag <code>update-buch</code> mit Kindkomponenten
 * f&uuml;r die folgenden Tags:
 * <ul>
 *  <li> <code>stammdaten</code>
 *  <li> <code>schlagwoerter</code>
 * </ul>
 */
@Component({
    selector: 'update-buch',
    directives: [CORE_DIRECTIVES, Stammdaten, Schlagwoerter, ErrorMessage],
    template: `
        <section *ngIf="buch !== null">
            <h4>Buch {{buch._id}}:</h4>

            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="#stammdaten"
                       data-toggle="tab">
                        Stammdaten
                    </a>
                </li>
                <li class="nav-item" *ngIf="buch.schlagwoerter.length !== 0">
                    <a class="nav-link" href="#schlagwoerter"
                       data-toggle="tab">
                        Schlagw&ouml;rter
                    </a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane fade in active" id="stammdaten">
                    <div class="m-t-1">
                        <stammdaten [buch]="buch"></stammdaten>
                    </div>
                </div>
                <div class="tab-pane fade" id="schlagwoerter">
                    <div class="m-t-1">
                        <schlagwoerter [buch]="buch"></schlagwoerter>
                    </div>
                </div>
            </div>
        </section>

        <error-message [text]="errorMsg"></error-message>
    `
})
// Die Komponente kann nur aktiviert bzw. benutzt werden, wenn die aufgerufene
// Function true liefert
@CanActivate(isAdmin)
export default class UpdateBuch implements OnInit {
    buch: Buch = null;
    errorMsg: string = null;

    constructor(
        private _buecherService: BuecherService,
        private _routeParams: RouteParams) {
        console.log('UpdateBuch.constructor(): routeParams=', _routeParams);
    }

    /**
     * Die Beobachtung starten, ob es ein zu aktualisierendes Buch oder einen
     * Fehler gibt.
     */
    ngOnInit(): void {
        this._observeBuch();
        this._observeError();

        // Pfad-Parameter aus /updateBuch/:id
        const id: string = this._routeParams.params['id'];
        console.log(`UpdateBuch.ngOnInit(): id=${id}`);
        this._buecherService.findById(id);
    }

    /**
     * Beobachten, ob es ein zu aktualisierendes Buch gibt.
     */
    /* tslint:disable:align */
    private _observeBuch(): void {
        this._buecherService.observeBuch((buch: Buch) => {
            this.buch = buch;
            console.log('UpdateBuch.buch=', this.buch);
        }, this);
    }

    /**
     * Beobachten, ob es einen Fehler gibt.
     */
    private _observeError(): void {
        this._buecherService.observeError((err: string | number) => {
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
                    this.errorMsg = 'Kein Buch vorhanden.';
                    break;
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.';
                    break;
            }
            console.log(`UpdateBuch.errorMsg: ${this.errorMsg}`);
        }, this);
    }
    /* tslint:enable:align */
}
