// ==UserScript==
// @name         People Fluent Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts/
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/peopleFluent.user.js
// @downloadURL  https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/peopleFluent.user.js
// @version      0.0.4
// @description  fixes some issues with People Fluent site
// @author       crosshj
// @match        *vms.peopleclick.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://github.com/crosshj/greasemonkey-scripts/raw/master/utils/changeCSS.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('input[type="password"]').forEach(function(item){
        item.autocomplete = "on";
    });
    document.querySelectorAll('input[type="password"]#orgField').forEach(function(item){
        item.type="text";
    });

})();
