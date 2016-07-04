var fortune = document.createElement('div');
fortune.id = 'fortune';
fortune.style.position = 'absolute';
fortune.style.zIndex = -100;

document.body.appendChild(fortune)

var mediaQueries = document.createElement('style');
var head = document.getElementsByTagName('head')[0];
/// instance 0
var i = 0;
i++;
console.log(i)
var defualtCSS = '#fortune{width: 0;}';
var setter = '{ #fortune{ width: ' + i + 'px; background: red;} }';

mediaQueries.innerHTML = '@media only screen and (max-width: 40em)' + setter;
head.appendChild(mediaQueries);

window.onresize = function() {
    var fortuneWidth = window.getComputedStyle(fortune, null).getPropertyValue('width');
    if (fortuneWidth === i + 'px') {
        console.log('Media query true');
    } else {
        console.log('Media query false');
    }
}



function oracle(mediaQuery, truthyTrigger, falsyTrigger){
// Check if mediaQuery is a string or object
    if(typeof mediaQuery === 'string' && ){

    }

// If media query is a string, trigger should exist as a string or function 
// 
// If trigger is a string, create event to be fired, the event will be postfixed with -true or -false

// If trigger is a function, the function will be called as a callback if true, the second trigger function is 
// called if false.
}

/*
var fortune = document.createElement('div');
fortune.id = 'fortune';
fortune.style.position = 'absolute';
fortune.style.zIndex = -100;

document.body.appendChild(fortune)

var mediaQueries = document.createElement('style');
var head = document.getElementsByTagName('head')[0];
/// instance 0
var i = 0;
i++;
console.log(i)
var defualtCSS = '#fortune{width: 0;}';
var setter = '{ #fortune{ width: ' + i + 'px; background: red;} }';

mediaQueries.innerHTML = '@media only screen and (max-width: 40em)' + setter;
head.appendChild(mediaQueries);

window.onresize = function() {
    var fortuneWidth = window.getComputedStyle(fortune, null).getPropertyValue('width');
    if (fortuneWidth === i + 'px') {
        console.log('Media query true');
    } else {
        console.log('Media query false');
    }
}



function oracle(mediaQuery, truthyTrigger, falsyTrigger){
// Check if mediaQuery is a string or object
    if(typeof mediaQuery === 'string' && ){

    }

// If media query is a string, trigger should exist as a string or function 
// 
// If trigger is a string, create event to be fired, the event will be postfixed with -true or -false

// If trigger is a function, the function will be called as a callback if true, the second trigger function is 
// called if false.
}
*/
