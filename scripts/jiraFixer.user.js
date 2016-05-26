// ==UserScript==
// @name         Jira Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       crosshj
// @match        https://*.atlassian.net/secure/RapidBoard.jspa*
// @run-at document-idle
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

GH.WorkView.openOrCloseDetailView = function(story){
    document.querySelector('#ghx-detail-view').style.display="none";
    GH.WorkView.isVisible=false;
    console.log(story);
    window.open(location.origin+'/browse/'+story, '_blank');
}

/*
document.querySelectorAll('#ghx-pool').addEventListener("DOMSubtreeModified",function(){
    var issueLinks = document.querySelectorAll('.js-key-link');
    for (var i  = 0; i < issueLinks.length; i++){
        issueLinks[i].addEventListener("click",function(e){
            e.target.setAttribute("target","_blank");
            e.stopPropagation();
        });
    }
});

document.querySelector('#ghx-detail-view').addEventListener("transitionend",function(e){
    debugger;
});

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        console.log('style changed!');
    });
});

var target = document.getElementById('ghx-detail-view');
observer.observe(target, { attributes : true, attributeFilter : ['style'] });
*/
