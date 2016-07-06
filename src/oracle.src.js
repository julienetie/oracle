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


is.anArrayContainingObject = function(value) {
    return value.constructor === Array && value[0].constructor === {}.constructor;
}


is.fortuneTruthy = function(value, i) {
    return window.getComputedStyle(value, null).getPropertyValue('width') === (i + 1) + 'px';
}


is.indexOf = function(str, substr) {
    return str.indexOf(substr) >= 0;
}


function triggerEventOrCallback(eventTarget, trigger) {console.log(eventTarget)
    if (is.string(trigger)) { 
        // Needs to migrate for optimization
        var event = new CustomEvent(trigger, {});
        eventTarget.dispatchEvent(event);
    } else {
        trigger();
    }
}


function detectChanges(config, fortunes, mediaQueries) {
    var eventTarget = config.eventTarget || document;
    var trig = function() {
        fortunes.forEach(function(fortune, i) {
            if (is.fortuneTruthy(fortune, i)) {
                if (mediaQueries[i].hasOwnProperty('truthy')) {
                    triggerEventOrCallback(eventTarget , mediaQueries[i].truthy);
                }
            } else {
                if (mediaQueries[i].hasOwnProperty('falsy')) {
                    triggerEventOrCallback(eventTarget, mediaQueries[i].falsy);
                }
            }
        })
    }
    var incept = config.incept === undefined ? true : config.incept;
    trig();
    resizilla(trig, (config.debounce || 200), incept);
}


function createMediaQueryDetector(body, config, head, i, mediaQueries, mediaQuery, style) {
    // Create fortune element and append to the body
    fortune = document.createElement('div');
    statement = '{\n' + '#⌘' + i + '{width:' + (i + 1) + 'px;}' + '\n}';

    fortune.style.position = 'absolute';
    fortune.id = '⌘' + i;
    fortune.style.zIndex = -1000;
    body.appendChild(fortune);
    var regex = /[+-]?\d+(\.\d+)?/g;
    var nonNumeric = /[^\d.]/g;
    var mediaQueryValue;

    if (is.indexOf(mediaQuery.media, 'em')) {
        mediaQueryValue = mediaQuery.media.split('and').map(function(queryComponent) {
            var originalNumber = queryComponent.replace(nonNumeric, '');
            var newNumber = Math.floor(originalNumber * 16);
            return queryComponent.replace(originalNumber + 'em', newNumber + 'px');
        }).join('and');
    } else {
        mediaQueryValue = mediaQuery.media;
    }

    if (style.styleSheet) {
        style.styleSheet.cssText += '\n' + mediaQueryValue + statement;
    } else {
        style.textContent += '\n' + mediaQueryValue + statement;
    }

    fortunes.push(fortune);

    if (i === mediaQueries.length - 1) {
        detectChanges(config, fortunes, mediaQueries);
    }
}


function setupMediaQueriesCheck(body, config, head, mediaQueries, style) {
    mediaQueries.forEach(function(mediaQuery, i, mediaQueries) {
        createMediaQueryDetector(body, config, head, i, mediaQueries, mediaQuery, style);
    });
}


function oracle(mediaQuery, truthy, falsy, config) {
    var body = document.body;
    var head = document.getElementsByTagName('head')[0];
    var mediaQueries;
    var options;
    // Create style element and append to the head
    var style = document.createElementNS(document.documentElement.namespaceURI, "style");

    head.appendChild(style);

    if (typeof mediaQuery === 'string' && is.stringOrFunction(truthy)) {
        var singleOptions = {
            media: mediaQuery,
            truthy: truthy
        }

        if (is.stringOrFunction(falsy)) {
            singleOptions.falsy = falsy;
            // config === config
            options = config;
        }else{
             // falsy === config
             options = falsy;
        }

        mediaQueries = [singleOptions];
    }

    if (is.anArrayContainingObject(mediaQuery)) {
        mediaQueries = mediaQuery;
        // truthy === config
        options = truthy;
    }

    if(options){

    }else{
        options = {};
    }

    setupMediaQueriesCheck(body, options, head, mediaQueries, style);
}
