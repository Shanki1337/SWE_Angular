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

// In Anlehnung an:
// http://html5hive.org/getting-started-with-angular-2#crayon-560cd5f774dd7156114609

/**
 * Decorator f&uuml;r eine Methode, um in der Konsole folgendes zu
 * protokollieren:
 * <ul>
 *  <li> Methodenaufruf:&nbsp;&nbsp;&nbsp; &gt;
 *       <i>Klassenname</i>.<i>Methodenname</i>; zzgl. aktuelle Argumente
 *  <li> Methodenende:&nbsp;&nbsp;&nbsp; &lt;
 *       <i>Klassenname</i>.<i>Methodenname</i> zzgl. R&uuml;ckgabewert
 * </ul>
 */
export function log(
    target: any /* Function */, key: string, descriptor: any): MethodDecorator {
    'use strict';
    const originalMethod: any = descriptor.value;

    // keine Arrow Function wg. this im Funktionsrumpf
    descriptor.value = function(...args: any[]): any {
        const klasseAsString: string = target.toString();
        // indexOf: Zaehlung ab 0. -1 bedeutet nicht enthalten
        // bei Klassen mit toString() werden ggf. Attributwerte nach einem ":""
        // ausgegeben
        const positionColon: number = klasseAsString.indexOf(':');
        const klassenname: string = positionColon === -1 ?
            klasseAsString :
            klasseAsString.substring(0, positionColon);

        if (args.length === 0) {
            console.log(`> ${klassenname}.${key}()`);
        } else {
            console.log(`> ${klassenname}.${key}():`, args);
        }

        const result: any = originalMethod.apply(this, args);

        if (result === undefined) {
            console.log(
                `< ${klassenname}.${key}(): result = void || undefined`);
        } else {
            console.log(`< ${klassenname}.${key}(): result =`, result);
        }

        return result;
    };
    return descriptor;
}
