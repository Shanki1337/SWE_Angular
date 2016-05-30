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
import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from 'angular2/common';
import {Router} from 'angular2/router';

import BuecherService from '../../service/buecher_service';
import Buch from '../../model/buch';
import APP_ROUTES from '../../../app/routes';
import {isBlank, log} from '../../../shared/shared';
/* tslint:enable:max-line-length */

/**
 * Komponente f&uuml;r das Tag <code>schlagwoerter</code>
 */
@Component({
    selector: 'schlagwoerter',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    template: `
        <form [ngFormModel]="form" role="form">
            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" [ngFormControl]="schnulze">
                            Schnulze
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"[ngFormControl]="scienceFiction">
                            Science Fiction
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary" (click)="update()"
                            [disabled]="form.pristine || !form.valid">
                        <i class="fa fa-check"></i> &nbsp; Schlagw&ouml;rter aktualisieren
                    </button>
                </div>
            </div>
        </form>
    `
})
export default class Schlagwoerter implements OnInit {
    // <schlagwoerter [buch]="...">
    @Input() buch: Buch;

    form: ControlGroup;
    schnulze: Control;
    scienceFiction: Control;

    constructor(
        private _formBuilder: FormBuilder,
        private _buecherService: BuecherService, private _router: Router) {
        console.log('Schlagwoerter.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Schlagwoertern des zu &auml;ndernden Buchs vorbelegen.
     */
    ngOnInit(): void {
        console.log('Schlagwoerter.ngOnInit(): buch=', this.buch);

        // Definition und Vorbelegung der Eingabedaten (hier: Checkbox)
        const hasSchnulze: boolean = this.buch.hasSchlagwort('SCHNULZE');
        this.schnulze = new Control(hasSchnulze);
        const hasScienceFiction: boolean =
            this.buch.hasSchlagwort('SCIENCE_FICTION');
        this.scienceFiction = new Control(hasScienceFiction);

        this.form = this._formBuilder.group({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            'schnulze': this.schnulze,
            'scienceFiction': this.scienceFiction
        });
    }

    /**
     * Die aktuellen Schlagwoerter f&uuml;r das angezeigte Buch-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    @log
    update(): boolean {
        if (this.form.pristine) {
            console.log('Schlagwoerter.update(): keine Aenderungen');
            return;
        }

        if (isBlank(this.buch)) {
            console.error('Schlagwoerter.update(): buch === null/undefined');
            return;
        }

        this.buch.updateSchlagwoerter(
            this.schnulze.value, this.scienceFiction.value);
        console.log('Schlagwoerter.update(): buch=', this.buch);

        const successFn: () => void = () => {
            console.log(
                /* tslint:disable:max-line-length */
                `Schlagwoerter.update(): successFn: navigate: ${APP_ROUTES.homeDef.name}`);
            /* tslint:enable:max-line-length */
            this._router.navigate([APP_ROUTES.homeDef.name]);
        };
        this._buecherService.update(this.buch, successFn, null);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    toString(): String { return 'Schlagwoerter'; }
}
