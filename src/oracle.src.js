// var fortune = document.createElement('div');
// fortune.id = 'fortune';
// fortune.style.position = 'absolute';
// fortune.style.zIndex = -100;

// document.body.appendChild(fortune)

// var mediaQueries = document.createElement('style');
// var head = document.getElementsByTagName('head')[0];
// /// instance 0
// var i = 0;
// i++;
// console.log(i)
// var defualtCSS = '#fortune{width: 0;}';
// var setter = '{ #fortune{ width: ' + i + 'px; background: red;} }';

// mediaQueries.innerHTML = '@media only screen and (max-width: 40em)' + setter;
// head.appendChild(mediaQueries);

// window.onresize = function() {
//     var fortuneWidth = window.getComputedStyle(fortune, null).getPropertyValue('width');
//     if (fortuneWidth === i + 'px') {
//         console.log('Media query true');
//     } else {
//         console.log('Media query false');
//     }
// }
var is = {};
var exit = true;
is.stringOrFunction = function(value) {
    return typeof value === 'string' || value === 'function';
}

is.arrayContainingObject = function(value) {
    return value.constructor === Array && value[0].constructor === {}.constructor;
}

// function detectChanges() {
//     window.onresize = function() {
//         var fortuneWidth = window.getComputedStyle(fortune, null).getPropertyValue('width');
//         if (fortuneWidth === i + 'px') {
//             console.log('Media query true');
//         } else {
//             console.log('Media query false');
//         }
//     }
// }

function createMediaQueryDetector(body, head, i, mediaQuery, mediaQueries, style) {
    // Create fortune element and append to the body
    var fortune = document.createElement('div');
    var width = i + 1;
    var statement = '{\n' + '#⌘' + i + '{width:' + width + 'px;}' + '\n}';

    fortune.style.position = 'absolute';
    fortune.id = '⌘' + i;
    fortune.style.zIndex = -1000;
    body.appendChild(fortune);
    style.innerHTML += '\n' + mediaQuery.media + statement;

    if(exit){
        detectChanges();
        exit = false;
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
    var style = document.createElement('style');

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
