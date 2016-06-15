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

// Service-Funktionen fuer das Identity- and Access Management (IAM)
// zur Verwendung bei z.B. @CanActivate()

// import * as jwtDecode from 'jwt-decode';

import Cookie from './cookie';
import {toBase64, BASE_URI, HTTPS} from '../shared/shared';

const loginUri: string = `${BASE_URI}login`;
const authorization: string = 'authorization';
const roles: string = 'roles';
const expiration: string = 'expiration';

/**
 * @param username als String
 * @param password als String
 * @return void
 */
export function login(username: string, password: string): void {
    'use strict';
    console.log(`iam.login(): username=${username}, password=${password}`);

    if (BASE_URI.startsWith(HTTPS)) {
        // Mocking: String fuer Basic-Authentifizierung
        const authorizationValue: string =
            `Basic ${toBase64(username, password)}`;
        console.log(`iam.login(): authorization=${authorizationValue}`);
        Cookie.setCookie(authorization, authorizationValue);
        Cookie.setCookie(roles, 'admin,mitarbeiter');
        return;
    }

    console.log(`Login URI = ${loginUri}`);

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body: string = `username=${username}&password=${password}`;
    const request: Request =
        new Request(loginUri, {method: 'POST', headers: headers, body: body});

    fetch(request)
        .then(
            (response: Response):
                Promise<any> => {
                    const status: number = response.status;
                    console.log(`fetch.then(): status=${status}`);
                    if (status !== 200) {
                        return Promise.reject(new Error(response.statusText));
                    }
                    // Response.json() liefert Promise<any>
                    return Promise.resolve(response.json());
                })
        .then((json: any) => {
            console.log('fetch.then(): json', json);
            const token: string = json.token;

            const authorizationValue: string = `Bearer ${token}`;
            console.log(
                `fetch.then(): authorizationValue=${authorizationValue}`);
            Cookie.setCookie(authorization, authorizationValue);

            const rolesValue: string = json.roles.join();
            console.log(`fetch.then(): rolesValue=${rolesValue}`);
            Cookie.setCookie(roles, rolesValue);

            // FIXME jwt-decode statt manuelle Berechnen fuer 1 Tag
            // const decodedToken: any = jwtDecode(token);
            // console.log('fetch.then(): decodedToken', decodedToken);
            const current: number = Math.floor(Date.now() / 1000);
            const oneDay: number = 24 * 60 * 60;
            const expirationValue: number = current + oneDay;
            Cookie.setCookie(expiration, expirationValue.toString());
        })
        .catch(
            (err: any) =>
                console.error(`iam.login: err=${JSON.stringify(err)}`));
}

/**
 * @return void
 */
export function logout(): void {
    'use strict';
    console.log('iam.logout()');
    Cookie.deleteCookie(authorization);
    Cookie.deleteCookie(roles);
}

/**
 * @return true, falls ein User eingeloggt ist; sonst false.
 */
export function isLoggedIn(): boolean {
    'use strict';
    if (expired()) {
        return false;
    }

    return Cookie.getCookie(authorization) !== null;
}

/**
 * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
 *         sonst false.
 */
export function isAdmin(): boolean {
    'use strict';
    if (expired()) {
        return false;
    }

    // z.B. 'admin,mitarbeiter'
    const rolesStr: string = Cookie.getCookie(roles);
    if (rolesStr === null) {
        return false;
    }

    // z.B. ['admin', 'mitarbeiter']
    const rolesArray: Array<string> = rolesStr.split(',');
    return rolesArray !== null
        && rolesArray.find(r => r === 'admin') !== undefined;
}

/**
 * @return String Basic-Authentifizierung
 */
export function getAuthorization(): string {
    'use strict';
    return `Basic ${toBase64('admin', 'p')}`;
}

/**
 * @return Ist JWT abgelaufen oder noch g&uuml;ltig
 */
function expired(): boolean {
    'use strict';
    if (BASE_URI.startsWith(HTTPS)) {
        return false;
    }

    const expirationStr: string = Cookie.getCookie(expiration);
    const expirationNumber: number = parseInt(expirationStr, 10);
    const current: number = Math.floor(Date.now() / 1000);
    if (current > expirationNumber) {
        logout();
        return true;
    }
    return false;
}
