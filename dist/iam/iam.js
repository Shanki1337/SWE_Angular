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
System.register(['./cookie', '../shared/shared'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var cookie_1, shared_1;
    var loginUri, authorization, roles, expiration;
    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    function login(username, password) {
        'use strict';
        console.log(`iam.login(): username=${username}, password=${password}`);
        if (shared_1.BASE_URI.startsWith(shared_1.HTTPS)) {
            // Mocking: String fuer Basic-Authentifizierung
            const authorizationValue = `Basic ${shared_1.toBase64(username, password)}`;
            console.log(`iam.login(): authorization=${authorizationValue}`);
            cookie_1.default.setCookie(authorization, authorizationValue);
            cookie_1.default.setCookie(roles, 'admin,mitarbeiter');
            return;
        }
        console.log(`Login URI = ${loginUri}`);
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const body = `username=${username}&password=${password}`;
        const request = new Request(loginUri, { method: 'POST', headers: headers, body: body });
        fetch(request)
            .then((response) => {
            const status = response.status;
            console.log(`fetch.then(): status=${status}`);
            if (status !== 200) {
                return Promise.reject(new Error(response.statusText));
            }
            // Response.json() liefert Promise<any>
            return Promise.resolve(response.json());
        })
            .then((json) => {
            console.log('fetch.then(): json', json);
            const token = json.token;
            const authorizationValue = `Bearer ${token}`;
            console.log(`fetch.then(): authorizationValue=${authorizationValue}`);
            cookie_1.default.setCookie(authorization, authorizationValue);
            const rolesValue = json.roles.join();
            console.log(`fetch.then(): rolesValue=${rolesValue}`);
            cookie_1.default.setCookie(roles, rolesValue);
            // FIXME jwt-decode statt manuelle Berechnen fuer 1 Tag
            // const decodedToken: any = jwtDecode(token);
            // console.log('fetch.then(): decodedToken', decodedToken);
            const current = Math.floor(Date.now() / 1000);
            const oneDay = 24 * 60 * 60;
            const expirationValue = current + oneDay;
            cookie_1.default.setCookie(expiration, expirationValue.toString());
        })
            .catch((err) => console.error(`iam.login: err=${JSON.stringify(err)}`));
    }
    exports_1("login", login);
    /**
     * @return void
     */
    function logout() {
        'use strict';
        console.log('iam.logout()');
        cookie_1.default.deleteCookie(authorization);
        cookie_1.default.deleteCookie(roles);
    }
    exports_1("logout", logout);
    /**
     * @return true, falls ein User eingeloggt ist; sonst false.
     */
    function isLoggedIn() {
        'use strict';
        if (expired()) {
            return false;
        }
        return cookie_1.default.getCookie(authorization) !== null;
    }
    exports_1("isLoggedIn", isLoggedIn);
    /**
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *         sonst false.
     */
    function isAdmin() {
        'use strict';
        if (expired()) {
            return false;
        }
        // z.B. 'admin,mitarbeiter'
        const rolesStr = cookie_1.default.getCookie(roles);
        if (rolesStr === null) {
            return false;
        }
        // z.B. ['admin', 'mitarbeiter']
        const rolesArray = rolesStr.split(',');
        return rolesArray !== null
            && rolesArray.find(r => r === 'admin') !== undefined;
    }
    exports_1("isAdmin", isAdmin);
    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    function getAuthorization() {
        'use strict';
        return cookie_1.default.getCookie(authorization);
    }
    exports_1("getAuthorization", getAuthorization);
    /**
     * @return Ist JWT abgelaufen oder noch g&uuml;ltig
     */
    function expired() {
        'use strict';
        if (shared_1.BASE_URI.startsWith(shared_1.HTTPS)) {
            return false;
        }
        const expirationStr = cookie_1.default.getCookie(expiration);
        const expirationNumber = parseInt(expirationStr, 10);
        const current = Math.floor(Date.now() / 1000);
        if (current > expirationNumber) {
            logout();
            return true;
        }
        return false;
    }
    return {
        setters:[
            function (cookie_1_1) {
                cookie_1 = cookie_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            loginUri = `${shared_1.BASE_URI}login`;
            authorization = 'authorization';
            roles = 'roles';
            expiration = 'expiration';
        }
    }
});

//# sourceMappingURL=../maps/iam/iam.js.map
