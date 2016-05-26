// ==UserScript==
// @name         Smartthings Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @version      0.1
// @description  fix CSS for smartthings api site
// @author       HJ Cross
// @match        https://graph.api.smartthings.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

$( document ).ready(function() {
    addCSSRule(document.styleSheets[0], ".gradient-top-bar", "height: 80px !important;");
    addCSSRule(document.styleSheets[0], ".navbar .nav", "width: 100% !important;");
    addCSSRule(document.styleSheets[0], ".hidden-sm.hidden-xs", "display:none !important;");
    addCSSRule(document.styleSheets[0], ".nav.main li", "margin-top: 3px !important;");
    addCSSRule(document.styleSheets[0], ".nav.main li.active", "background-color:#aaa !important;");
    addCSSRule(document.styleSheets[0], ".nav.main li.active a:after", "display:none !important;");
    addCSSRule(document.styleSheets[0], ".nav.main li.active a", "color:white !important;");
    document.querySelector('.nav.main li.active a').style.setProperty("color", "white", "important");
});
