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
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, Validators} from 'angular2/common';
import {Router} from 'angular2/router';

import BuecherService from '../../service/buecher_service';
import Buch from '../../model/buch';
import BuchValidator from '../validator/buch_validator';
import APP_ROUTES from '../../../app/routes';
import {isBlank, log} from '../../../shared/shared';
/* tslint:enable:max-line-length */

/**
 * Komponente f&uuml;r das Tag <code>stammdaten</code>
 */
@Component({
    selector: 'stammdaten',
    // FormBuilder ist nur fuer die Komponente und ihre Kind-Komponenten
    // verfuegbar
    /* tslint:disable:max-line-length */
    // http://blog.thoughtram.io/angular/2015/08/20/host-and-visibility-in-angular-2-dependency-injection.html
    /* tslint:enable:max-line-length */
    providers: [FormBuilder],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    template: `
        <form [ngFormModel]="form" role="form">
            <div class="form-group row"
                 [class.text-danger]="!titel.valid && titel.touched">
                <label for="titelInput" class="col-sm-2 form-control-label">
                    Titel *
                </label>
                <div class="col-sm-10">
                    <input id="titelInput"
                        placeholder="Titel"
                        class="form-control"
                        autofocus
                        type="search"
                        [ngFormControl]="titel">
                </div>
                <div class="col-sm-offset-2 col-sm-10"
                     *ngIf="!titel.valid && titel.touched">
                    Ein Buchtitel muss mit einem Buchstaben oder einer Ziffer
                    beginnen.
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 form-control-label">Art *</label>
                <div class="col-sm-10">
                    <select class="form-control" [ngFormControl]="art">
                        <option value="DRUCKAUSGABE">Druckausgabe</option>
                        <option value="KINDLE">Kindle</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2 form-control-label">Verlag</label>
                <div class="col-sm-10">
                    <select class="form-control" [ngFormControl]="verlag">
                        <option value="OREILLY">O'Reilly</option>
                        <option value="PACKT">Packt</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary" (click)="update()"
                            [disabled]="form.pristine || !form.valid">
                        <i class="fa fa-check"></i> &nbsp; Stammdaten aktualisieren
                    </button>
                </div>
            </div>
        </form>
    `
})
export default class Stammdaten implements OnInit {
    // <stammdaten [buch]="...">
    @Input() buch: Buch;

    form: ControlGroup;
    titel: Control;
    art: Control;
    verlag: Control;

    constructor(
        private _formBuilder: FormBuilder,
        private _buecherService: BuecherService, private _router: Router) {
        console.log('Stammdaten.constructor()');
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren und mit den
     * Stammdaten des zu &auml;ndernden Buchs vorbelegen.
     */
    ngOnInit(): void {
        console.log('Stammdaten.ngOnInit(): buch=', this.buch);

        // Definition und Vorbelegung der Eingabedaten
        this.titel = new Control(this.buch.titel, BuchValidator.titel);
        this.art = new Control(this.buch.art, Validators.required);
        this.verlag = new Control(this.buch.verlag);

        this.form = this._formBuilder.group({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            'titel': this.titel,
            'art': this.art,
            'verlag': this.verlag
        });
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Buch-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    @log
    update(): boolean {
        if (this.form.pristine) {
            console.log('Stammdaten.update(): keine Aenderungen');
            return;
        }

        if (isBlank(this.buch)) {
            console.error('Stammdaten.update(): buch === null/undefined');
            return;
        }

        // rating, preis und rabatt koennen im Formular nicht geaendert werden
        this.buch.updateStammdaten(
            this.titel.value, this.buch.rating, this.art.value,
            this.verlag.value, this.buch.preis, this.buch.rabatt);
        console.log('Stammdaten.update(): buch=', this.buch);

        const successFn: () => void = () => {
            console.log(
                /* tslint:disable:max-line-length */
                `Stammdaten.update(): successFn: navigate: ${APP_ROUTES.homeDef.name}`);
            /* tslint:enable:max-line-length */
            this._router.navigate([APP_ROUTES.homeDef.name]);
        };
        this._buecherService.update(this.buch, successFn, null);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    toString(): String { return 'Stammdaten'; }
}
