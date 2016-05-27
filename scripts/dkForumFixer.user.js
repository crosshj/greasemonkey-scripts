// ==UserScript==
// @name         DK Forums Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts/
// @updateURL    https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/dkForumFixer.user.js
// @downloadURL  https://github.com/crosshj/greasemonkey-scripts/raw/master/scripts/dkForumFixer.user.js
// @version      0.1.3
// @description  fix some issues with DK Forum site (hard to browse at work / annoying issues)
// @author       crosshj
// @match        *forums.dungeonkeeper.com/*
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
        // remove header
        if ((document.getElementById('dkheader'))) {
            console.log('--- found dkheader');
            //(elem=document.getElementById('dkheader')).parentNode.removeChild(elem);
            //(elem=document.getElementById('dkheader')).parentNode.style.visibility = "hidden";
        }
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOM fully loaded and parsed");
        addGlobalStyle('#bodybg { background: rgb(51, 51, 51) !important; }');
        //debugger;
        // TODO: want to avoid showing/loading images at all
        var images = document.getElementsByTagName('img');
        //debugger;
        for (var n = images.length; n-- > 0;) {
            var img = images[n];
            //if (img.getAttribute("src").toLowerCase().indexOf("logo.png") !== -1){
            //img.setAttribute("src", "");
            //}
        }
        $('#logodk img').attr("src");
    });

    $(document).ready(function() {
        var $searchbox = $('#search-box').clone();

        // change BG
        document.getElementById('bodybg').style.background = "#333333";

        // make entire page background same as main BG and add margin
        $('body').css("background", "rgb(51, 51, 51)")
            .css("margin-top", "20px")
            .css("margin-bottom", "20px")
            .css("min-width", "0px");

        // remove header
        var elem = document.getElementById('dkheader');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }

        // remove footer & fix bottom padding
        elem = document.getElementById('dkfooter');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
        document.getElementById('wrap').style.paddingBottom = "20px";

        // remove row icons & adjust left margin
        $('.row .icon').css("background-image", "none");
        $('.row .icon dt').css("padding-left", "10px");

        // remove post profile images
        $('.postprofile img').remove();

        // hide weird thing at bottom
        $('#bottom').parent().hide();

        // add search back and style
        $searchbox.css("margin-top", "19px")
            .css("margin-left", "19px")
            .css("margin-right", "20px");
        $('#wrap').prepend($searchbox);
        $('#wrap').width('900px');
        document.title = '- dk -';
    });

})();
