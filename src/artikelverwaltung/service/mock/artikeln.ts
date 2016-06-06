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

import {IArtikelServer} from '../../model/artikel';

/**
 * Array f&uuml;r das Mocking von B&uuml;chern
 */
const ARTIKELN: Array<IArtikelServer> = [
    {
      _id: '000000000000000000000001',
      bezeichnung: 'Bett',
      rating: 4,
      kategorie: 'SCHLAFZIMMER',
      preis: 199.99,
      ausgesondert: true,
    },
    {
      _id: '000000000000000000000002',
      bezeichnung: 'Stuhl',
      rating: 4,
      kategorie: 'BUERO',
      preis: 59.99,
      ausgesondert: true,
    },
    {
      _id: '000000000000000000000003',
      bezeichnung: 'Lavalampe',
      rating: 4,
      kategorie: 'KINDERZIMMER',
      preis: 15.99,
      ausgesondert: true,
    },
    {
      _id: '000000000000000000000004',
      bezeichnung: 'Computer',
      rating: 4,
      kategorie: 'BUERO',
      preis: 499.99,
      ausgesondert: true,
    },
    {
      _id: '000000000000000000000005',
      bezeichnung: 'Duschvorhang',
      rating: 3,
      kategorie: 'BAD',
      preis: 19.99,
      ausgesondert: true,
    }
];

export default ARTIKELN;
