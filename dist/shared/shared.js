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
System.register(['./chart_service', './constants', './error_message', './functions', './log', './mock', './waiting'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (chart_service_1_1) {
                exportStar_1(chart_service_1_1);
            },
            function (constants_1_1) {
                exportStar_1(constants_1_1);
            },
            function (error_message_1_1) {
                exportStar_1(error_message_1_1);
            },
            function (functions_1_1) {
                exportStar_1(functions_1_1);
            },
            function (log_1_1) {
                exportStar_1(log_1_1);
            },
            function (mock_1_1) {
                exportStar_1(mock_1_1);
            },
            function (waiting_1_1) {
                exportStar_1(waiting_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=../maps/shared/shared.js.map
