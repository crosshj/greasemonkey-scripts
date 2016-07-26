

// https://pokevision.com


// ==UserScript==
// @name         PokeVision Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts/
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/pokevision.user.js
// @downloadURL  https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/pokevision.user.js
// @version      0.0.2
// @description  fix some issues pokevision
// @author       crosshj
// @match        *pokevision.com*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://github.com/crosshj/greasemonkey-scripts/raw/master/utils/changeCSS.js
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';
    document.addEventListener("DOMNodeInserted", function(event) {
        console.log("-----DOMNodeInserted", event );
        console.log("-----Stylesheets", document.styleSheets.length);
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOM fully loaded and parsed");
        addGlobalStyle('main.home-sidebar { height: 1px; width:1px !important; overflow: hidden !important; padding: 0px !important; margin-top: 200px; }');
    });

    $(document).ready(function() {
        document.title = '- PokeVision -';
    });

})();
