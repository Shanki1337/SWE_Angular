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

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import {Component, Input} from 'angular2/core';
// "common" enthaelt Direktiven (z.B. ngFor, ngIf), Form Controls und Pipes
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'waiting',
    template: `
        <!-- Template Binding durch die Direktive ngIf -->
        <!-- Eine Direktive ist eine Komponente ohne View -->
        <div *ngIf="activated">
            <i class="fa fa-spin fa-spinner"></i>
            Die Daten werden geladen. Bitte warten ...
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Waiting {
    // Property Binding: <waiting [activated]="...">
    // siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() activated: boolean;

    constructor() { console.log('Waiting.constructor()'); }
}
