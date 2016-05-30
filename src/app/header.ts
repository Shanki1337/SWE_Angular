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

import Logo from './logo';
import Login from './login';
import Logout from './logout';

/**
 * Komponente f&uuml;r die Kopfleiste mit dem Tag &lt;app-header&gt;.
 */
@Component({
    selector: 'app-header',
    template: `
        <!-- Bootstrap 4:
                xs:      -  480px ("extra small")
                sm:      -  767px ("small")
                md:  768 -  991px ("medium")
                lg:  992 - 1199px ("large")
                xl: 1200 px       ("extra large")
        -->
        <header class="col-xs-12 jz-app-header">
            <div class="clearfix">
                <div class="pull-left">
                    <logo></logo>
                </div>
                <div class="pull-right">
                    <login></login>
                    <logout></logout>
                </div>
            </div>
        </header>
    `,
    styleUrls: ['./app/header.min.css'],
    // styles: [
    //     `header {
    //         background-color: #BED6F8;
    //         background-position: left top;
    //         background-repeat: repeat-x;
    //         background-image: url(/img/gradientBlueSky.png);
    //      }`
    // ],
    directives: [Logo, Login, Logout]
})
export default class Header {
    constructor() { console.log('Header.constructor()'); }
}
