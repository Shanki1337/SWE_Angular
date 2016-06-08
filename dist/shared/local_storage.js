/*
 * Copyright (C) 2016 Juergen Zimmermann, Hochschule Karlsruhe
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
System.register(['./functions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var functions_1;
    var LocalStorage, localStorage;
    return {
        setters:[
            function (functions_1_1) {
                functions_1 = functions_1_1;
            }],
        execute: function() {
            class LocalStorage {
                constructor() {
                    this._items = {};
                    console.debug('LocalStorage.constructor()');
                }
                get length() { return Object.keys(this._items).length; }
                getItem(key) {
                    const value = this._items.key;
                    return functions_1.isPresent(value) ? String(value) : null;
                }
                setItem(key, value) { this._items.key = value; }
                removeItem(key) { delete this._items.key; }
                clear() {
                    Object.keys(this._items).forEach((key) => {
                        this._items.key = undefined;
                        delete this._items.key;
                    });
                }
                key(i) {
                    i = i || 0;
                    return Object.keys(this._items)[i];
                }
                toString() {
                    return `LocalStorage: _items=${JSON.stringify(this._items)}`;
                }
            }
            exports_1("localStorage", localStorage = new LocalStorage());
        }
    }
});

//# sourceMappingURL=../maps/shared/local_storage.js.map
