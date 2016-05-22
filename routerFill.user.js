// ==UserScript==
// @name         Router Fill
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @version      0.1
// @description  auto fill and auto login for RT-AC68
// @author       HJ Cross
// @match        http://192.168.1.1/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://crypto.stanford.edu/sjcl/sjcl.js
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_registerMenuCommand
// ==/UserScript==

// credit for encrypt/decrypt/store vars 
// http://stackoverflow.com/questions/15268645/storing-user-input-in-a-greasemonkey-script-on-install

var encKey  = GM_getValue ("encKey",  "");
var usr     = GM_getValue ("lognUsr", "");
var pword   = GM_getValue ("lognPwd", "");
var autoLogin = GM_getValue ("autoLogin", false);

if ( ! encKey) {
    encKey  = prompt (
        'Script key not set for ' + location.hostname + '. Please enter a random string:',
        ''
    );
    GM_setValue ("encKey", encKey);

    usr     = pword = "";   // New key makes prev stored values (if any) unable to decode.
}
usr         = decodeOrPrompt (usr,   "U-name", "lognUsr");
pword       = decodeOrPrompt (pword, "P-word", "lognPwd");
autoLogin   = decodeOrPrompt (autoLogin, "AutoLogin", "autoLogin");

function decodeOrPrompt (targVar, userPrompt, setValVarName) {
    if (targVar) {
        targVar     = unStoreAndDecrypt (targVar);
    }
    else {
        targVar     = prompt (
            userPrompt + ' not set for ' + location.hostname + '. Please enter it now:',
            ''
        );
        GM_setValue (setValVarName, encryptAndStore (targVar) );
    }
    return targVar;
}

function encryptAndStore (clearText) {
    return  JSON.stringify (sjcl.encrypt (encKey, clearText) );
}

function unStoreAndDecrypt (jsonObj) {
    return  sjcl.decrypt (encKey, JSON.parse (jsonObj) );
}

//-- Add menu commands that will allow U and P to be changed.
GM_registerMenuCommand ("Change Username", changeUsername);
GM_registerMenuCommand ("Change Password", changePassword);
GM_registerMenuCommand ("Change Auto Login", changeAutoLogin);

function changeUsername () {
    promptAndChangeStoredValue (usr,   "U-name", "lognUsr");
}

function changePassword () {
    promptAndChangeStoredValue (pword, "P-word", "lognPwd");
}

function changeAutoLogin () {
    promptAndChangeStoredValue (autoLogin, "AutoLogin", "autoLogin");
}

function promptAndChangeStoredValue (targVar, userPrompt, setValVarName) {
    targVar     = prompt (
        'Change ' + userPrompt + ' for ' + location.hostname + ':',
        targVar
    );
    GM_setValue (setValVarName, encryptAndStore (targVar) );
}

(function() {
    'use strict';
    var userNameEl = document.getElementById('login_username');
    if (userNameEl && usr){
        userNameEl.value=usr;
    }
    var pwordEl = document.querySelector('input[type="password"]');
    if (pwordEl && pword){
        pwordEl.value=pword;
    }
    if (autoLogin && autoLogin.toLowerCase() === 'true') {
        login();
    }
})();
