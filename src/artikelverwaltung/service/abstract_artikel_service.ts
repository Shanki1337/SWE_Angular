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

import Artikel from '../model/artikel';
import {IArtikelForm} from '../model/artikel';

/**
 * Abstrakte Klasse f&uuml;r die Service-Klasse zu B&uuml;cher wie auch
 * f&uuml;r eine Mock-Klasse.
 */
abstract class AbstractArtikelService {
    /**
     * {method} find
     * Artikel suchen
     * @param {Object} suchkriterien Die Suchkriterien
     */
    abstract find(suchkriterien: IArtikelForm): void;

    /**
     * {method} findById
     * Ein Artikel anhand der ID suchen
     * @param {string} id Die ID des gesuchten Artikels
     * @param {Function} errorFn Eine Function fuer status !== OK
     */
    abstract findById(id: string): void;

    abstract observeArtikels(
        observerFn: (artikel: Array<Artikel>) => void, thisArg: any): void;
    abstract observeArtikel(
        observerFn: (artikelS: Artikel) => void, thisArg: any): void;
    abstract observeError(
        observerFn: (err: string|number) => void, thisArg: any): void;

    /**
     * Ein neues Artikel anlegen
     * @param neuesArtikel Das JSON-Objekt mit dem neuen Artikel
     * @param successFn Die Callback-Function fuer den Erfolgsfall
     * @param errorFn Die Callback-Function fuer den Fehlerfall
     */
    /* abstract save(
         neuerArtikel: Artikel, successFn: (location: string) => void,
         errorFn: (status: number, text: string) => void): void;

     /**
      * Ein vorhandenes Artikel aktualisieren
      * @param artikelS Das JSON-Objekt mit den aktualisierten Artikeldaten
      * @param successFn Die Callback-Function fuer den Erfolgsfall
      * @param errorFn Die Callback-Function fuer den Fehlerfall
      */
    /* abstract update(
         artikelS: Artikel, successFn: () => void,
         errorFn: (status: number, text: string) => void): void;

     /**
      * Ein Artikel l&ouml;schen
      * @param artikelS Das JSON-Objekt mit dem zu loeschenden Artikel
      * @param successFn Die Callback-Function fuer den Erfolgsfall
      * @param errorFn Die Callback-Function fuer den Fehlerfall
      */
    /* abstract remove(
         artikelS: Artikel, successFn: () => void,
         errorFn: (status: number) => void): void;

     /**
      * Ein Balkendiagramm erzeugen und bei einem Tag <code>canvas</code>
      * einf&uuml;gen.
      * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
      */
    /* abstract setBarChart(chartElement: HTMLCanvasElement): void;

     /**
      * Ein Liniendiagramm erzeugen und bei einem Tag <code>canvas</code>
      * einf&uuml;gen.
      * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
      */
    /*  abstract setLinearChart(chartElement: HTMLCanvasElement): void;

      /**
       * Ein Tortendiagramm erzeugen und bei einem Tag <code>canvas</code>
       * einf&uuml;gen.
       * @param chartElement Das HTML-Element zum Tag <code>canvas</code>
       */
    /*  abstract setPieChart(chartElement: HTMLCanvasElement): void;
  }
  */
}
export default AbstractArtikelService;
