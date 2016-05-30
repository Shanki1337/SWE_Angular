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

import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

/**
 * Komponente f&uuml;r die Darstellung einer Fehlermeldung durch das Tag
 * &lt;error-message [text]="..."&gt;
 */
@Component({
    selector: 'error-message',
    template: `
        <div class="text-danger" *ngIf="text !== null">
            <h4><i class="fa fa-exclamation-circle"></i> {{text}}</h4>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class ErrorMessage {
    // Property Binding: <error-message [text]="...">
    // siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() text: string;

    constructor() { console.log('ErrorMessage.constructor()'); }
}
