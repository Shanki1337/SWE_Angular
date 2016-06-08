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
System.register(['angular2/core', 'angular2/router', './header', './nav', './main', './footer', './routes'], function(exports_1, context_1) {
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
    var core_1, router_1, header_1, nav_1, main_1, footer_1, routes_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (nav_1_1) {
                nav_1 = nav_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (footer_1_1) {
                footer_1 = footer_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            }],
        execute: function() {
            // "Composite Pattern" bei UIs: Eine UI-Komponente besteht aus wiederum aus
            // einfachen UI-Komponenten, z.B. ein Suchformular besteht aus einem Label,
            // einem Eingabefeld und einem Button.
            // Eine Komponente bei Angular ist an das MVC-Pattern angelehnt und besteht aus
            // HTML-Tags (= View) einschl. der Dialogsteuerung (= Controller) mit dem Model
            // als Bindeglied.
            // Controller sind klein ("Thin Controllers") und die Anwendungslogik wird
            // in die Service-Klassen ausgelagert.
            // Innerhalb der Wurzelkomponente werden die Kindkomponenten geladen.
            // https://angular.io/docs/js/latest/api/annotations/ComponentAnnotation-class.html
            // Metadaten-Annotationen in AngularJS sind z.B. @Component.
            // Annotationen sind ein Spezialfall der Decorators, die es ab ES 7 geben wird:
            // Ein Decorator erweitert die vorhandene Funktionalitaet von einer Klasse oder
            // einer Methode oder einem Attribut oder einem Methodenargument.
            // siehe https://github.com/wycats/javascript-decorators
            // Generierter Code einschl. IIFE durch einen Transpiler z.B.:
            // var App = (function() {
            //     function App() {/* Konstruktor */}
            //     ...
            //     App = __decorate([
            //         angular2_1.Component({
            //             selector: 'app',
            //             template: "...",
            //             directives: [...]
            //         }),
            //         __metadata('design:paramtypes', [])
            //     ], App);
            //     return App;
            // })();
            /**
             * Wurzelkomponente mit dem Tag &lt;app&gt;
             */
            let App = class App {
                constructor() {
                    console.log('App.constructor()');
                }
            };
            App = __decorate([
                core_1.Component({
                    // Schnittstelle der View fuer Wiederverwendung in anderen Komponenten:
                    // durch das Tag <app> in index.html, d.h. CSS-Selector wird spezifiziert
                    // Schreibweise innerhalb von HTML:         kebab-case
                    // Schreibweise innerhalb von TypeScript:   CamelCase
                    // Beispiel:
                    //   <app>
                    //       <app-header>
                    //           ...
                    //       </app-header>
                    //       <app-nav>
                    //           ...
                    //       </app-nav>
                    //       <app-main>
                    //           <router-viewport>
                    //               <suche-buecher>
                    //                   <such-kriterien>
                    //                       ...
                    //                   </such-kriterien>
                    //                   <gefundene-buecher>
                    //                       ...
                    //                   </gefundene-buecher>
                    //               </suche-buecher>
                    //           <router-viewport>
                    //       </app-main>
                    //       <app-footer>
                    //           ...
                    //       </app-footer>
                    //   </app>
                    selector: 'app',
                    // Verwendete Komponenten im Template (= View) s.u.
                    // Komponenten sind Direktiven zzgl. einer eigenen View
                    directives: [header_1.default, nav_1.default, main_1.default, footer_1.default],
                    // "template - A document or file having a preset format, used as a
                    // starting point for a particular application so that the format does not
                    // have to be recreated each time it is used."
                    // Siehe http://www.thefreedictionary.com/template
                    // HTML-Templates ~ View bei MVC: das Model referenzieren u. den Controller
                    // aufrufen.
                    // Multi-line Strings fuer kleine Inline-Templates.
                    // Vorteile:  alles auf einen Blick und keine separate HTML-Datei
                    // Nachteile: kein Syntax-Highlighting, kein Autovervollstaendigen
                    // VS Code soll kuenftig Syntax-Highlighting und IntelliSense koennen:
                    // https://github.com/angular/angular/blob/master/CHANGELOG.md#features-4
                    //
                    // Composed DOM: Der Baum und die Tags, die im Browser dargestellt werden
                    // Light DOM:    Der Baum, in den der Shadow-DOM eingefuegt wird,
                    //               z.B. <suche>
                    // Shadow DOM:   Der Baum, der innerhalb des Light DOM eingefuegt wird,
                    //               z.B. das Template aus SucheTitel.
                    //               Dieser Baum ist zunaechst vor dem Endbenutzer verborgen
                    // http://webcomponents.org/polyfills/shadow-dom
                    // http://w3c.github.io/webcomponents/spec/shadow
                    // https://github.com/angular/angular/issues/2529
                    template: `
        <div class="row">
            <!-- Eigene Komponente fuer die Kopfleiste -->
            <app-header></app-header>
        </div>
        <div class="row">
            <!-- Eigene Komponente fuer die Navigationsleiste -->
            <app-nav></app-nav>
            <!-- Eigene Komponente fuer den Haupteil: austauschbar durch Routing -->
            <app-main></app-main>
        </div>
        <div class="row">
            <!-- Eigene Komponente fuer die Fussleiste -->
            <app-footer></app-footer>
        </div>
    `
                }),
                router_1.RouteConfig(routes_1.APP_ROUTE_DEFINITIONS), 
                __metadata('design:paramtypes', [])
            ], App);
            exports_1("default", App);
        }
    }
});

//# sourceMappingURL=../maps/app/app.js.map
