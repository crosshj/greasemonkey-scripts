// ==UserScript==
// @name         DK Forums Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *forums.dungeonkeeper.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @run-at document-start
// ==/UserScript==


(function() {
    'use strict';

    document.addEventListener("DOMNodeInserted", function(event) {
        console.log("-----DOMNodeInserted");
        // remove header
        if((document.getElementById('dkheader'))){
            console.log('--- found dkheader');
            //(elem=document.getElementById('dkheader')).parentNode.removeChild(elem);
            //(elem=document.getElementById('dkheader')).parentNode.style.visibility = "hidden";
        }
    });

    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("DOM fully loaded and parsed");
        //debugger;
        // TODO: want to avoid showing/loading images at all
        var images = document.getElementsByTagName('img');
        //debugger;
        for (var n = images.length; n--> 0;) {
            var img = images[n];
            //if (img.getAttribute("src").toLowerCase().indexOf("logo.png") !== -1){
            //img.setAttribute("src", "");
            //}
        }
        $('#logodk img').attr("src");
    });

    $(document).ready(function(){
        var $searchbox = $('#search-box').clone();

        // change BG
        document.getElementById('bodybg').style.background="#333333";

        // make entire page background same as main BG and add margin
        $('body').css("background","rgb(51, 51, 51)")
            .css("margin-top","20px")
            .css("margin-bottom","20px");

        // remove header
        var elem=document.getElementById('dkheader');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }

        // remove footer & fix bottom padding
        elem=document.getElementById('dkfooter');
        if (elem) {
            elem.parentNode.removeChild(elem);
        }
        document.getElementById('wrap').style.paddingBottom="20px";

        // remove row icons & adjust left margin
        $('.row .icon').css("background-image","none");
        $('.row .icon dt').css("padding-left","10px");

        // remove post profile images
        $('.postprofile img').remove();

        // hide weird thing at bottom
        $('#bottom').parent().hide();

        // add search back and style
        $searchbox.css("margin-top","19px")
            .css("margin-left","19px")
            .css("margin-right","20px");
        $('#wrap').prepend($searchbox);
        document.title='- dk -';
    });

})(); 