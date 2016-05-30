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

import {IBuchServer} from '../../model/buch';

/**
 * Array f&uuml;r das Mocking von B&uuml;chern
 */
const BUECHER: Array<IBuchServer> = [
    {
      _id: '000000000000000000000001',
      titel: 'Alpha',
      rating: 4,
      art: 'DRUCKAUSGABE',
      verlag: 'OREILLY',
      datum: '2014-02-01',
      preis: 11.1,
      rabatt: 0.011,
      lieferbar: true,
      schlagwoerter: ['SCHNULZE']
    },
    {
      _id: '000000000000000000000002',
      titel: 'Beta',
      rating: 2,
      art: 'KINDLE',
      verlag: 'PACKT',
      datum: '2014-02-02',
      preis: 22.2,
      rabatt: 0.022,
      lieferbar: true,
      schlagwoerter: ['SCIENCE_FICTION']
    },
    {
      _id: '000000000000000000000003',
      titel: 'Gamma',
      rating: 1,
      art: 'DRUCKAUSGABE',
      verlag: 'PACKT',
      datum: '2014-02-03',
      preis: 33.3,
      rabatt: 0.033,
      lieferbar: true,
      schlagwoerter: ['SCHNULZE', 'SCIENCE_FICTION']
    },
    {
      _id: '000000000000000000000004',
      titel: 'Delta',
      rating: 3,
      art: 'DRUCKAUSGABE',
      verlag: 'OREILLY',
      datum: '2014-02-04',
      preis: 44.4,
      rabatt: 0.044,
      lieferbar: true,
      schlagwoerter: []
    },
    {
      _id: '000000000000000000000005',
      titel: 'Epsilon',
      rating: 2,
      art: 'KINDLE',
      verlag: 'PACKT',
      datum: '2014-02-05',
      preis: 55.5,
      rabatt: 0.055,
      lieferbar: true,
      schlagwoerter: ['SCIENCE_FICTION']
    }
];

export default BUECHER;
