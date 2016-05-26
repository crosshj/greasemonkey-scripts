// ==UserScript==
// @name         OpenJSCAD Fixer
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @version      0.1
// @description  Prompts before navigating away so designs are not lost
// @author       HJ Cross
// @match        http://openjscad.org/
// @include     /^.*/openjscad\.org/.*$/
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


var confirmOnPageExit = function (e) {
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'Any text will block the navigation and display a prompt';

    // For IE6-8 and Firefox prior to version 4
    if (e)
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};

window.onbeforeunload = confirmOnPageExit;

// re-draw on CTRL-S instead of trying to save page HTML
$(document).keydown(function(e) {
    if ((e.which == '115' || e.which == '83' ) && (e.ctrlKey || e.metaKey))
    {
        e.preventDefault();
        if (!!editor){
            (function(editor) {
                var src = editor.getValue();
                if(src.match(/^\/\/\!OpenSCAD/i)) {
                    editor.getSession().setMode("ace/mode/scad");
                    src = openscadOpenJscadParser.parse(src);
                } else {
                    editor.getSession().setMode("ace/mode/javascript");
                }
                gMemFs = [];
                gProcessor.setJsCad(src);
            })(editor);
        } else {
            alert('TECH ERROR : Could not finder editor object.');
        }
        return false;
    }
    return true;
});

function addCSSRule(sheet, selector, rules, index) {
    if("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }
}

$( document ).ready(function() {
    $('#menu').hide();
    $('#header img').hide();
    $('#footer').hide();
    $('.ace_gutter').css('margin-left','-11px');
    $('.ace_scroller').css('margin-left','-15px');
    $('#filedropzone').css('padding','4px');
    $('#editor').css('width','42%');
    $('#tail').css('margin','4px');
    $('#tail').css('bottom','0px');

    addCSSRule(document.styleSheets[0], ".ace_gutter-cell.ace_error, .ace_gutter-cell.ace_warning", "background-position: 9px center !important; background-size: 10px !important;");

});
