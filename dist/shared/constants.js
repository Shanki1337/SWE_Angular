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
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HTTPS, HTTP, SCHEME, PORT, SERVERNAME, BASE_PATH, BASE_URI, PATH_KATALOG, PATH_ARTIKEL, PATH_BUECHER;
    return {
        setters:[],
        execute: function() {
            exports_1("HTTPS", HTTPS = 'https');
            exports_1("HTTP", HTTP = 'http');
            SCHEME = HTTPS;
            PORT = 8443;
            SERVERNAME = 'localhost';
            BASE_PATH = '/shop/rest/';
            /**
             * Basis-URI, wenn der eigentliche Server verwendet wird.
             */
            exports_1("BASE_URI", BASE_URI = `${SCHEME}://${SERVERNAME}:${PORT}${BASE_PATH}`);
            /**
             * Pfad f&uuml;r den Zugriff auf B&uuml;cher, ausgehend von der Basis-URI.
             */
            exports_1("PATH_KATALOG", PATH_KATALOG = `katalog`);
            exports_1("PATH_ARTIKEL", PATH_ARTIKEL = `artikel`);
            exports_1("PATH_BUECHER", PATH_BUECHER = `buecher`);
        }
    }
});

//# sourceMappingURL=../maps/shared/constants.js.map
