// ==UserScript==
// @name         Youtube Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/youtubeFixer.user.js
// @downloadURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/youtubeFixer.user.js
// @version      0.2
// @description  try to take over the world!
// @author       Harrison Cross
// @include      http://www.youtube.com/*
// @include      https://www.youtube.com/*
// @exclude      http://www.youtube.com/embed/*
// @exclude      https://www.youtube.com/embed/*
// @match        http://www.youtube.com/*
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle ( `
       #comments, #related {
           display: none !important;
       }
       .annotation.annotation-type-custom.iv-branding { 
           display: none !important;
       }
   `);

})();
