/**
 * Created by Jannick on 12.06.2016.
 */

/* tslint:disable:max-line-length */
import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from 'angular2/common';
import {Router, CanActivate} from 'angular2/router';

import BuecherService from '../../service/buecher_service';
import Buch from '../../model/buch';
import BuchValidator from '../validator/buch_validator';
import APP_ROUTES from '../../../app/routes';
import {isAdmin} from '../../../iam/iam';
import {isPresent, log} from '../../../shared/shared';
/* tslint:enable:max-line-length */

/**
 * Komponente mit dem Tag &lt;create-buch&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'create-buch',

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
    templateUrl: '/buchverwaltung/component/create_buch/create_buch.html'

    // FIXME Relative URL https://github.com/angular/angular/issues/2383
    //       erfordert TypeScript 1.8 wg. Moment und CommonJS
    // templateUrl: 'create_buch.html',
    // moduleId: module.id,
})
// Die Komponente kann nur aktiviert bzw. benutzt werden, wenn die aufgerufene
// Function true liefert
// https://github.com/angular/angular/issues/2965
// https://github.com/angular/angular/issues/4112
@CanActivate(isAdmin)
export default class CreateBuch implements OnInit {
    form: ControlGroup;
    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    titel: Control = new Control('', BuchValidator.titel);
    rating: Control = new Control('');
    druckausgabe: Control = new Control({checked: true});
    kindle: Control = new Control({checked: false});
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    verlag: Control = new Control('');
    preis: Control = new Control('');
    rabatt: Control = new Control('');
    lieferbar: Control = new Control(false);
    schnulze: Control = new Control(false);
    scienceFiction: Control = new Control(false);

    constructor(
        private _formBuilder: FormBuilder,
        private _buecherService: BuecherService, private _router: Router) {
        console.log('CreateBuch.constructor()');
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
            'titel': this.titel,
            'rating': this.rating,
            'druckausgabe': this.druckausgabe,
            'kindle': this.kindle,
            'verlag': this.verlag,
            'preis': this.preis,
            'rabatt': this.rabatt,
            'lieferbar': this.lieferbar,
            'schnulze': this.schnulze,
            'scienceFiction': this.scienceFiction
        });
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um ein neues Buch anzulegen.
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

        if (!this.form.valid) {
            /* tslint:disable:max-line-length */
            console.log(
                `valid=${this.titel.valid}, errorRequired=${this.titel.errors['required']}`);
            /* tslint:enable:max-line-length */
            return false;
        }

        const neuesBuch: Buch = Buch.fromForm(this.form.value);
        console.log('neuesBuch=', neuesBuch);

        const successFn: (
            location: string) => void = (location: string = null) => {
            console.log(
                `CreateBuch.save(): successFn(): location: ${location}`);
            // TODO Das Response-Objekt enthaelt im Header NICHT "Location"
            console.log(
                /* tslint:disable:max-line-length */
                `CreateBuch.save(): successFn(): navigate: ${APP_ROUTES.homeDef.name}`);
            /* tslint:enable:max-line-length */
            this._router.navigate([APP_ROUTES.homeDef.name]);
        };
        const errorFn: (status: number, text: string) => void =
            (status: number, text: string = null): void => {
                console.log(`CreateBuch.save(): errorFn(): status: ${status}`);
                if (isPresent(text)) {
                    console.log(`CreateBuch.save(): errorFn(): text: ${text}`);
                }
            };
        this._buecherService.save(neuesBuch, successFn, errorFn);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false;
    }

    toString(): String { return 'CreateBuch'; }
}
