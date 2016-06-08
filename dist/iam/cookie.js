// https://github.com/BCJTI/ng2-cookies/blob/master/src/services/cookie.ts
// 8.2.2016
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cookie;
    return {
        setters:[],
        execute: function() {
            /**
             * Class Cookie - Holds static functions to deal with Cookies
             */
            class Cookie {
                /**
                 * Retrieves a single cookie by it's name
                 *
                 * @param  {string} name Identification of the Cookie
                 * @returns The Cookie's value
                 */
                static getCookie(name) {
                    const myWindow = window;
                    name = myWindow.escape(name);
                    const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
                    const result = regexp.exec(document.cookie);
                    return (result === null) ? null : myWindow.unescape(result[1]);
                }
                /**
                 * Save the Cookie
                 *
                 * @param  {string} name Cookie's identification
                 * @param  {string} value Cookie's value
                 * @param  {number} expires Cookie's expiration date in days from now.
                 *      If it's undefined the cookie is a session Cookie
                 * @param  {string} path Path relative to the domain where the cookie should
                 *       be avaiable. Default /
                 * @param  {string} domain Domain where the cookie should be avaiable.
                 *      Default current domain
                 */
                static setCookie(name, value, expires, path, domain) {
                    let myWindow = window;
                    let cookieStr = `${myWindow.escape(name)}=${myWindow.escape(value)};`;
                    if (expires) {
                        const expiresDate = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                        cookieStr += `expires=${expiresDate.toUTCString()};`;
                    }
                    if (path) {
                        cookieStr += `path=${path};`;
                    }
                    if (domain) {
                        cookieStr += `domain=${domain};`;
                    }
                    document.cookie = cookieStr;
                }
                /**
                 * Removes specified Cookie
                 *
                 * @param  {string} name Cookie's identification
                 * @param  {string} path Path relative to the domain where the cookie should
                 *      be avaiable. Default /
                 * @param  {string} domain Domain where the cookie should be avaiable.
                 *      Default current domain
                 */
                static deleteCookie(name, path, domain) {
                    // If the cookie exists
                    if (Cookie.getCookie(name)) {
                        Cookie.setCookie(name, '', -1, path, domain);
                    }
                }
            }
            exports_1("default", Cookie);
        }
    }
});

//# sourceMappingURL=../maps/iam/cookie.js.map
