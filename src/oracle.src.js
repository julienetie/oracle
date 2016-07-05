/**
 * EventDispatcher
 * @author mrdoob / http://mrdoob.com/
 */
var EventDispatcher=function(){};Object.assign(EventDispatcher.prototype,{addEventListener:function(i,t){void 0===this._listeners&&(this._listeners={});var e=this._listeners;void 0===e[i]&&(e[i]=[]),-1===e[i].indexOf(t)&&e[i].push(t)},hasEventListener:function(i,t){if(void 0===this._listeners)return!1;var e=this._listeners;return void 0!==e[i]&&-1!==e[i].indexOf(t)?!0:!1},removeEventListener:function(i,t){if(void 0!==this._listeners){var e=this._listeners,s=e[i];if(void 0!==s){var n=s.indexOf(t);-1!==n&&s.splice(n,1)}}},dispatchEvent:function(i){if(void 0!==this._listeners){var t=this._listeners,e=t[i.type];if(void 0!==e){i.target=this;var s=[],n=0,r=e.length;for(n=0;r>n;n++)s[n]=e[n];for(n=0;r>n;n++)s[n].call(this,i)}}}});

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

            }
        }


        function detectChanges(fortunes, mediaQueries) {
            window.onresize = function() {
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
        }

        function createMediaQueryDetector(body, head, i, mediaQuery, mediaQueries, style) {
            // Create fortune element and append to the body
            fortune = document.createElement('div');
            statement = '{\n' + '#⌘' + i + '{width:' + (i + 1) + 'px;}' + '\n}';

            fortune.style.position = 'absolute';
            fortune.id = '⌘' + i;
            fortune.style.zIndex = -1000;
            body.appendChild(fortune);
            style.innerHTML += '\n' + mediaQuery.media + statement;
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
