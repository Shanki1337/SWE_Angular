/*
 * Sven Baumann
 */

// "core" enthaelt Funktionalitaet, damit die Webanwendung im Browser laeuft
import {Component, Input} from 'angular2/core';
// "common" enthaelt Direktiven (z.B. ngFor, ngIf), Form Controls und Pipes
import {CORE_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import ArtikelService from '../../service/artikel_service';
import Artikel from '../../model/artikel';

/**
 * Komponente f&uuml;r das Tag <code>gefundene-bueche</code>
 */
@Component({
    selector: 'gefundene-artikel',
    directives: [CORE_DIRECTIVES],
    templateUrl: '/artikelverwaltung/component/pos_artikel/pos_artikel.html'
})
export default class GefundeneArtikel {
    // Property Binding: <gefundene-buecher [buecher]="...">
    // Decorator fuer ein Attribut. Hier: siehe InputMetadata in
    // node_modules\angular2\ts\src\core\metadata\directives.ts
    @Input() artikel: Array<Artikel>;

    constructor(
        private _artikelService: ArtikelService, private _router: Router) {
        console.log('GefundeneArtikel.constructor()');
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Buch in der Detailsseite anzeigen.
     * @param buch Das ausgew&auml;hlte Buch
     */
    toString(): String { return 'GefundeneArtikel'; }
}
