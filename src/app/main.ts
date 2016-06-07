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

/* tslint:disable:max-line-length */
import {Component} from 'angular2/core';
import {ChartService} from '../shared/shared';
import ArtikelService from '../artikelverwaltung/service/artikel_service';

/* tslint:enable:max-line-length */

/**
 * Komponente f&uuml;r den Hauptteil einer Seite mit dem Tag &lt;app-main&gt;.
 */
@Component({
    selector: 'app-main',
    // Provider fuer die Main-Komponente und ihre Kindkomponenten,
    // d.h. Singletons innerhalb dieses Teilbaums
    providers: [
        ChartService, ArtikelService
    ],
    template: `
        <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9 col-xl-9">
            <!-- Abstand: margin top 1 rem -->
            <!-- http://v4-alpha.getbootstrap.com/components/utilities -->
            <div class="m-t-1">
                <!-- Komponente fuer das Routing, d.h. Platzhalter fuer den -->
                <!-- Austausch der HTML-Templates (= Fragmente) -->
                <!-- FIXME router-outlet wird zu router-viewport, -->
                <!--       RouterOutlet zu RouterViewport -->
                <!--       https://github.com/angular/angular/issues/4679 -->
                <!-- viewport: framed area on a display screen for viewing information -->
                <router-outlet></router-outlet>
            </div>
        </main>
    `
})
export default class Main {
    constructor() { console.log('Main.constructor()'); }
}
