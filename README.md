![img](http://i67.tinypic.com/18onc8.jpg)
#Responsive CSS Media Queries for JavaScript 

Oracle does not make use of the matchMedia() API but instead retrieves the computed value of a declaired media query via its 
computed value as being truthy or falsy.

Features:
- A callback or custom event can be set for truthy or falsy query detection.
- Mulitple media queries can be set
- Set the debounce delay when resizing

Examples:
### [Callbacks](http://julienetienne.co.uk/oracle/examples/callbacks.html)
```javascript
  oracle(
        [{
            media: '@media only screen and (max-width: 40em)',
            truthy: function() {
                updateTruthy(divs[0]);
            },
            falsy: function() {
                updateFalsy(divs[0]);
            },
        }, {
            media: '@media only screen and (min-width: 40.063em) and (max-width: 64em)',
            truthy: function() {
                updateTruthy(divs[1]);
            },
            falsy: function() {
                updateFalsy(divs[1]);
            },
        }]
    );
```
### [Custom Events](http://julienetienne.co.uk/oracle/examples/custom-events.html)
```javascript
oracle(
        [{
            media: '@media only screen and (max-width: 640px)',
            truthy: 'truthy-0',
            falsy: 'falsy-0'
        }, {
            media: '@media only screen and (min-width: 641px) and (max-width: 1024px)',
            truthy: 'truthy-1',
            falsy: 'falsy-1'
        }, {
            media: '@media only screen and (min-width: 1025px) and (max-width: 1440px)',
            truthy: 'truthy-2',
            falsy: 'falsy-2'
        }, {
            media: '@media only screen and (min-width: 1441px) and (max-width: 1920px)',
            truthy: 'truthy-3',
            falsy: 'falsy-3'
        }, {
            media: '@media only screen and (min-width: 1921px)',
            truthy: 'truthy-4',
            falsy: 'falsy-4'
        }]
    );
```




MIT License 

Copyright (c) 2016 Julien Etienne
