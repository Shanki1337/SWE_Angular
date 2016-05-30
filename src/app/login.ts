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

import {isLoggedIn, login} from '../iam/iam';
import {log} from '../shared/shared';

/**
 * Komponente f&uuml;r das Login mit dem Tag &lt;login&gt;.
 */
@Component({
    selector: 'login',
    template: `
        <div class="card-block" *ngIf="isNotLoggedIn()">
            <form (submit)="login()" role="form">
                <div class="form-group row">
                    <label for="usernameInput"
                           class="col-sm-4 form-control-label">
                        Benutzername
                    </label>
                    <div class="col-sm-6">
                        <input id="usernameInput"
                            type="search" class="form-control"
                            tabindex="1" autocomplete="off"
                            [(ngModel)]="username">
                    </div>
                    <div class="col-sm-2">
                        <button class="btn btn-primary" tabindex="3">
                        &nbsp; Login</button>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="passwordInput"
                           class="col-sm-4 form-control-label">Passwort</label>
                    <div class="col-sm-6">
                        <input id="passwordInput"
                            type="password" class="form-control"
                            tabindex="2" autocomplete="off"
                            [(ngModel)]="password">
                    </div>
                </div>
            </form>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export default class Login {
    username: string = null;
    password: string = null;

    constructor() { console.log('Login.constructor()'); }

    /**
     * Abfrage, ob ein Benutzer gerade eingeloggt ist.
     * @return true, falls ein Benutzer eingeloggt ist. Sonst false.
     */
    isNotLoggedIn(): boolean { return !isLoggedIn(); }

    @log
    login(): void { login(this.username, this.password); }

    toString(): string { return 'Login'; }
}
