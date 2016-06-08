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
System.register(['angular2/core', './such_kriterien', './such_ergebnis', '../../../shared/shared'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, such_kriterien_1, such_ergebnis_1, shared_1;
    var SucheArtikel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (such_kriterien_1_1) {
                such_kriterien_1 = such_kriterien_1_1;
            },
            function (such_ergebnis_1_1) {
                such_ergebnis_1 = such_ergebnis_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * Komponente f&uuml;r das Tag <code>&lt;suche-buecher&gt;</code>, die aus den
             * Kindkomponenten f&uuml;r diese Tags besteht:
             * <ul>
             *  <li> <code>such-kriterien</code>
             *  <li> <code>such-ergebnis</code>
             * </ul>
             */
            let SucheArtikel = class SucheArtikel {
                constructor() {
                    this.waiting = false;
                    console.log('SucheArtikel.constructor()');
                }
                // Methode zum "LifeCycle Hook" OnDestroy:
                // wird direkt vor dem Garbage Collector aufgerufen
                // node_modules\angular2\ts\src\core\linker\interfaces.ts
                ngOnDestroy() { console.log('SucheArtikel.onDestroy()'); }
                /**
                 * Das Attribut <code>waiting</code> wird auf den Wert des boole'schen
                 * Ereignisses <code>$event</code> gesetzt. Diese Methode wird aufgerufen,
                 * wenn in der Kindkomponente f&uuml;r <code>such-kriterien</code> das
                 * Ereignis ausgel&ouml;st wird. Der aktuelle Wert vom Attribut
                 * <code>&lt;waiting&gt;</code> wird an die Kindkomponente f&uuml;r
                 * <code>&lt;such-ergebnis&gt;</code> weitergereicht.
                 * @param $event
                 */
                setWaiting($event) { this.waiting = $event; }
                toString() { return 'SucheArtikel'; }
            };
            __decorate([
                shared_1.log, 
                __metadata('design:type', Function), 
                __metadata('design:paramtypes', [Boolean]), 
                __metadata('design:returntype', void 0)
            ], SucheArtikel.prototype, "setWaiting", null);
            SucheArtikel = __decorate([
                core_1.Component({
                    selector: 'suche-artikel-id',
                    directives: [such_kriterien_1.default, such_ergebnis_1.default],
                    template: `
        <such-kriterien (waiting)="setWaiting($event)"></such-kriterien>
        <such-ergebnis [waiting]="waiting"></such-ergebnis>

        <!-- alternative Syntax:
                eigenes Ereignis "waiting" (ausgeloest in SuchKriterien):
                <such-kriterien on-waiting="setWaiting($event)"></such-kriterien>

                Property "waiting" in der Komponentenklasse
                <such-ergebnis bind-waiting="waiting"></such-ergebnis>
        -->
    `
                }), 
                __metadata('design:paramtypes', [])
            ], SucheArtikel);
            exports_1("default", SucheArtikel);
        }
    }
});

//# sourceMappingURL=../../../maps/artikelverwaltung/component/suche_artikel_id/suche_artikel_id.js.map
