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

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {isLoggedIn, logout} from '../iam/iam';
import {log} from '../shared/shared';

/**
 * Komponente f&uuml;r das Logout mit dem Tag &lt;logout&gt;.
 */
@Component({
    selector: 'logout',
    template: `
        <div *ngIf="isLoggedIn()">
            <i class="fa fa-2x fa-sign-out"></i> &nbsp;
            <button class="btn btn-default" type="button" (click)="logout()">
                Logout
            </button>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export default class Logout {
    constructor() { console.log('Logout.constructor()'); }

    /**
     * Abfrage, ob ein Benutzer &uuml;berhaupt eingeloggt ist.
     * @return true, falls ein Benutzer eingeloggt ist. Sonst false.
     */
    isLoggedIn(): boolean { return isLoggedIn(); }

    /**
     * Ausloggen und dabei Benutzername und Passwort zur&uuml;cksetzen.
     */
    @log
    logout(): void { logout(); }

    toString(): string { return 'Logout'; }
}
