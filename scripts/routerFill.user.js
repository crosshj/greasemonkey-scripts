// ==UserScript==
// @name         Router Fill
// @namespace    https://github.com/crosshj/greasemonkey-scripts
// @version      0.2
// @description  auto fill and auto login for RT-AC68, also for VMWare ESXi Web Client 6.0
// @author       HJ Cross
// @match        http://192.168.1.1/*
// @match        http://router.asus.com/*
// @match        *://192.168.1.168/ui/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://crypto.stanford.edu/sjcl/sjcl.js
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_registerMenuCommand
// ==/UserScript==

// credit for encrypt/decrypt/store vars to http://stackoverflow.com/questions/15268645/storing-user-input-in-a-greasemonkey-script-on-install

var encKey  = GM_getValue ("encKey" + location.hostname,  "");
var usr     = GM_getValue ("lognUsr" + location.hostname, "");
var pword   = GM_getValue ("lognPwd" + location.hostname, "");
var autoLogin = GM_getValue ("autoLogin" + location.hostname, false);

if ( ! encKey) {
    encKey  = prompt (
        'Script key not set for ' + location.hostname + '. Please enter a random string:',
        ''
    );
    GM_setValue ("encKey" + location.hostname, encKey);

    usr     = pword = "";   // New key makes prev stored values (if any) unable to decode.
}
usr         = decodeOrPrompt (usr,   "U-name", "lognUsr" + location.hostname);
pword       = decodeOrPrompt (pword, "P-word", "lognPwd" + location.hostname);
autoLogin   = decodeOrPrompt (autoLogin, "AutoLogin", "autoLogin" + location.hostname);


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
    promptAndChangeStoredValue (usr,   "U-name", "lognUsr" + location.hostname);
}

function changePassword () {
    promptAndChangeStoredValue (pword, "P-word", "lognPwd" + location.hostname);
}

function changeAutoLogin () {
    promptAndChangeStoredValue (autoLogin, "AutoLogin", "autoLogin" + location.hostname);
}

function promptAndChangeStoredValue (targVar, userPrompt, setValVarName) {
    targVar     = prompt (
        'Change ' + userPrompt + ' for ' + location.hostname + ':',
        targVar
    );
    GM_setValue (setValVarName, encryptAndStore (targVar) );
}

function sendKeys(str, el){
    el.value = str;
    var evt= new Event('change');
    el.dispatchEvent(evt);
}

function autoLoginGo() {
    'use strict';
    var interval = 100;
    var maxElapsed = 50;
    var waitForUserField = function(callback){
        var elapsed = 0;
        var checkExist = setInterval(function() {
            elapsed += 1;
            var userNameEl = document.getElementById('login_username') || document.getElementById('username');
            if (userNameEl || elapsed > maxElapsed) {
                callback(userNameEl);
                clearInterval(checkExist);
            }
        }, interval);
        return;
    };

    waitForUserField(function(userNameEl){
        if (userNameEl && usr){
            sendKeys(usr, userNameEl);
        }
        var pwordEl = document.querySelector('input[type="password"]');
        if (pwordEl && pword){
            sendKeys(pword, pwordEl);
        }
        if (autoLogin && autoLogin.toLowerCase() === 'true' && typeof login !== "undefined") {
            login();
        }
    });
}

function hashHandler(){
    if (location.hash === "#/login") {
        autoLoginGo();
    }
}

(function(){
    window.addEventListener("hashchange", hashHandler, false);
    if (location.hostname === "192.168.1.168" && location.hash !== "#/login") {
        return;
    }
    autoLoginGo();
})();
