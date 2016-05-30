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

/**
 * Komponente f&uuml;r die Fu&szlig;leiste mit dem Tag &lt;app-footer&gt;.
 */
@Component({
    selector: 'app-footer',
    template: `
        <footer class="col-xs-12">
            <span>
                <strong><i class="fa fa-copyright"></i> J&uuml;rgen Zimmermann</strong>
            </span>
        </footer>
    `
})
export default class Footer {
    constructor() { console.log('Footer.constructor()'); }
}
