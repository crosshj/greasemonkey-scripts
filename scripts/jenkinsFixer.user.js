// ==UserScript==
// @name         Jenkins Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts/
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/jenkinsFixer.user.js
// @downloadURL  https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/jenkinsFixer.user.js
// @version      0.1.5
// @description  Fix some Jira issues
// @author       HJ Cross
// @include      /.*ci\..*\.com/.*$/
// @run-at document-start
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';



// https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// make builds box bigger
addGlobalStyle('form tbody:first-child td.setting-main select { height: 450px; min-width: 640px; }');

