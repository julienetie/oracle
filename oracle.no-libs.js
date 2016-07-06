(function (window) {

/**
 * Oracle fasade for triggering events and callbacks on media query changes.
 * @type {Object}
 */
var is = {};
var fortune;
var statement;
var fortunes = [];

is.string = function(value) {
    return typeof value === 'string';
}

is.stringOrFunction = function(value) {
    return typeof value === 'string' || value === 'function';
}

is.arrayContainingObject = function(value) {
    return value.constructor === Array && value[0].constructor === {}.constructor;
}

is.fortuneTruthy = function(value, i) {
    return window.getComputedStyle(value, null).getPropertyValue('width') === (i + 1) + 'px';
}

function triggerEventOrCallback(trigger) {
    if (is.string(trigger)) {
        // Needs to migrate for optimization
        var event = new CustomEvent(trigger, {});
        document.dispatchEvent(event);
    } else {
        trigger();
    }
}


function detectChanges(fortunes, mediaQueries) {
var trig = function() {
        fortunes.forEach(function(fortune, i) {
            if (is.fortuneTruthy(fortune, i)) {
                if (mediaQueries[i].hasOwnProperty('truthy')) {
                    triggerEventOrCallback(mediaQueries[i].truthy);
                }
            } else {
                if (mediaQueries[i].hasOwnProperty('falsy')) {
                    triggerEventOrCallback(mediaQueries[i].falsy);
                }
            }
        })
    } 

    trig();
    resizilla(trig, 200, true);
}


function createMediaQueryDetector(body, head, i, mediaQuery, mediaQueries, style) {
    // Create fortune element and append to the body
    fortune = document.createElement('div');
    statement = '{\n' + '#⌘' + i + '{width:' + (i + 1) + 'px;}' + '\n}';

    fortune.style.position = 'absolute';
    fortune.id = '⌘' + i;
    fortune.style.zIndex = -1000;
    body.appendChild(fortune);

    if (style.styleSheet) {
        style.styleSheet.cssText += '\n' + mediaQuery.media + statement;
    } else {
        style.textContent += '\n' + mediaQuery.media + statement;
    }

    fortunes.push(fortune);

    if (i === mediaQueries.length - 1) {
        detectChanges(fortunes, mediaQueries);
    }
}


function setupMediaQueriesCheck(body, head, mediaQueries, style) {
    mediaQueries.forEach(function(mediaQuery, i, mediaQueries) {
        createMediaQueryDetector(body, head, i, mediaQuery, mediaQueries, style);
    });
}


function oracle(mediaQuery, truthy, falsy) {
    var body = document.body;
    var head = document.getElementsByTagName('head')[0];
    var mediaQueries;

    // Create style element and append to the head
    var style = document.createElementNS(document.documentElement.namespaceURI, "style");

    head.appendChild(style);

    if (typeof mediaQuery === 'string' && isStringOrFunction(truthy)) {
        var singleOptions = {
            media: mediaQuery,
            truthy: truthy
        }

        if (is.stringOrFunction(falsy)) {
            singleOptions.falsy = falsy;
        }

        mediaQueries = [singleOptions];
    }

    if (is.arrayContainingObject(mediaQuery)) {
        mediaQueries = mediaQuery;
    }
    setupMediaQueriesCheck(body, head, mediaQueries, style);
}

// Node.js/ CommonJS
if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = exports = oracle;
}

// AMD
else if (typeof define === 'function' && define.amd) {
    define(function() {
        return oracle;
    });
}

// Default to window as global
else if (typeof window === 'object') {
    window.oracle = oracle;
}
/* global -module, -exports, -define */

}((typeof window === "undefined" ? {} : window)));
