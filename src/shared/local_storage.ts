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

// http://www.rajdeepd.com/articles/chrome/localstrg/LocalStorageSample.htm

import {isPresent} from './functions';

class LocalStorage {
    private _items: any = {};

    constructor() { console.debug('LocalStorage.constructor()'); }

    public get length(): number { return Object.keys(this._items).length; }

    getItem(key: string): string {
        const value: any = this._items.key;
        return isPresent(value) ? String(value) : null;
    }

    setItem(key: string, value: any): void { this._items.key = value; }

    removeItem(key: string): void { delete this._items.key; }

    clear(): void {
        Object.keys(this._items).forEach((key: string) => {
            this._items.key = undefined;
            delete this._items.key;
        });
    }

    key(i: number): string {
        i = i || 0;
        return Object.keys(this._items)[i];
    }

    toString(): string {
        return `LocalStorage: _items=${JSON.stringify(this._items)}`;
    }
}

export const localStorage: LocalStorage = new LocalStorage();
