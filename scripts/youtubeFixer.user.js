// ==UserScript==
// @name         Youtube Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @version      0.1
// @description  fix youtube site
// @author       HJ Cross
// @match       *://www.youtube.com/*
// @grant        none
// @run-at      document-end
// ==/UserScript==


function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}

// I don't want to see annotations
addCSSRule(document.styleSheets[0], ".annotation.annotation-type-custom.iv-branding", "display: none !important;");
