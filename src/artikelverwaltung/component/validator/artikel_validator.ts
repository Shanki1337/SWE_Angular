/**
 * Created by Jannick.
 */

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

import {Control} from 'angular2/common';
import {isBlank} from '../../../shared/shared';

/**
 * Beispiel f&uuml;r eine Klasse mit eigenen Validierungsfunktionen.
 * Die Validierungsfunktionen sind f&uuml;r Formulare, in denen Daten erfasst
 * oder ge&auml;ndert werden.
 */
export default class ArtikelValidator {
    // Rueckgabewert null bedeutet valid

    /**
     * Validierung, ob die Bezeichnung eines Artikels plausibel ist.
     * @param control Das Control-Objekt innerhalb eines Formulars
     * @return null, wenn die Bezeichnung valide ist. Ansonsten ein JSON-Objekt
     *         mit den Verst&ouml;&szlig;en.
     */
    static bezeichnung(control: Control): {[key: string]: boolean} {
        // Ein Name muss existieren und das 1. Zeichen muss ein Buchstabe,
        // Ziffer oder _ sein
        const invalid: boolean =
            isBlank(control.value) || control.value.match(/^\w.*/) === null;
        return invalid ? {invalidTitel: true} : null;
    }
}
