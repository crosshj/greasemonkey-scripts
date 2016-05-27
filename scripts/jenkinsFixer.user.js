// ==UserScript==
// @name         Jenkins Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts/
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/jenkinsFixer.user.js
// @downloadURL  https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/jenkinsFixer.user.js
// @version      0.1.8
// @description  Fix some Jira issues
// @author       HJ Cross
// @match        http://ci.*.com*
// @include      /^http?://ci\..*\.com.*$/
// @run-at document-start
// @grant        none
// @require      https://github.com/crosshj/greasemonkey-scripts/raw/master/utils/changeCSS.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

// make builds box bigger
addGlobalStyle('form tbody:first-child td.setting-main select { height: 450px; min-width: 640px; }');

