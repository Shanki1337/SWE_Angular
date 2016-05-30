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

// angelehnt an
// https://github.com/ng-book/angular2-rxjs-chat/blob/master/app/ts/util/uuid.ts
// node-uuid https://github.com/broofa/node-uuid funktioniert nicht im Browser
// uuid https://www.npmjs.com/package/uuid ist ein Fork von node-uuid
export function uuid(): string {
    'use strict';
    let result: string = '';

    for (let i: number = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }

        /* tslint:disable:max-line-length */
        /* tslint:disable:no-bitwise */
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const random: number = Math.random() * 16 | 0;
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                      .toString(16);
        /* tslint:enable:no-bitwise */
        /* tslint:enable:max-line-length */
    }

    return result;
};
