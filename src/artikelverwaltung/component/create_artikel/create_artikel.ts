/**
 * Created by Jannick Weichert.
 */

/* tslint:disable:max-line-length */
import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from 'angular2/common';
import {Router, CanActivate} from 'angular2/router';

import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';
import ArtikelValidator from '../validator/artikel_validator';
import APP_ROUTES from '../../../app/routes';
import {isAdmin} from '../../../iam/iam';
import {isPresent, log} from '../../../shared/shared';
/* tslint:enable:max-line-length */

/**
 * Komponente mit dem Tag &lt;create-artikel&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Artikel zu realisieren.
 */
@Component({
    selector: 'create-artikel',

    // FormBuilder ist nur fuer die Komponente und ihre Kind-Komponenten
    // verfuegbar
    /* tslint:disable:max-line-length */
    // http://blog.thoughtram.io/angular/2015/08/20/host-and-visibility-in-angular-2-dependency-injection.html
    /* tslint:enable:max-line-length */
    providers: [FormBuilder],

    // Verwendung der Direktiven ngFormModel und ngFormControl
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],

    // Keine Zerlegung in Subkomponenten, weil das Control-Objekt der
    // Subkomponente im Konstruktor fuer die ControlGroup benoetigt wird
    templateUrl:
        '/artikelverwaltung/component/create_artikel/create_artikel.html'
    // FIXME Relative URL https://github.com/angular/angular/issues/2383
    //       erfordert TypeScript 1.8 wg. Moment und CommonJS
    // templateUrl: 'create_artikel.html',
    // moduleId: module.id,
})
// Die Komponente kann nur aktiviert bzw. benutzt werden, wenn die aufgerufene
// Function true liefert
// https://github.com/angular/angular/issues/2965
// https://github.com/angular/angular/issues/4112
@CanActivate(isAdmin)
export default class CreateArtikel implements OnInit {
    form: ControlGroup;
    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    bezeichnung: Control =
        new Control('bezeichnung', ArtikelValidator.bezeichnung);
    rating: Control = new Control('rating');
    kategorie: Control = new Control('art');
    preis: Control = new Control('preis');
    ausgesondert: Control = new Control({checked: true});
    constructor(
        private _formBuilder: FormBuilder,
        private _artikelService: ArtikelService, private _router: Router) {
        console.log('CreateArtikel.constructor()');
        if (!isPresent(_router)) {
            console.error('Injizierter Router:', _router);
        }
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren.
     */
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            // siehe ngFormControl innerhalb von @Component({template: `...`})
            'bezeichnung': this.bezeichnung,
            'rating': this.rating,
            'kategorie': this.kategorie,
            'preis': this.preis,
            'ausgesondert': this.ausgesondert
        });
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neuen Artikel anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    @log
    save(): boolean {
        // In einem Control oder in einer ControlGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der ControlGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid     true/false
        //    dirty     true/false, falls der Wert geaendert wurde
        console.log(this.form);
        if (!this.form.valid) {
            /* tslint:disable:max-line-length */
            console.log(
                `valid=${this.bezeichnung.valid}, errorRequired=${this.bezeichnung.errors['required']}`);
            /* tslint:enable:max-line-length */
            return false;
        }

        const neuerArtikel: Artikel = Artikel.fromForm(this.form.value);
        console.log('neuerArtikel=', neuerArtikel);

        const successFn: (
            location: string) => void = (location: string = null) => {
            console.log(
                `CreateArtikel.save(): successFn(): location: ${location}`);
            // TODO Das Response-Objekt enthaelt im Header NICHT "Location"
            console.log(
                /* tslint:disable:max-line-length */
                `CreateArtikel.save(): successFn(): navigate: ${APP_ROUTES.homeDef.name}`);
            /* tslint:enable:max-line-length */
            this._router.navigate([APP_ROUTES.homeDef.name]);
        };
        const errorFn: (status: number, text: string) => void =
            (status: number, text: string = null): void => {
                console.log(
                    `CreateArtikel.save(): errorFn(): status: ${status}`);
                if (isPresent(text)) {
                    console.log(
                        `CreateArtikel.save(): errorFn(): text: ${text}`);
                }
                /* tslint:enable:max-line-length */
            };
        this._artikelService.save(neuerArtikel, successFn, errorFn);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false;
    }

    toString(): String { return 'CreateArtikel'; }
}
