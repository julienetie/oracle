// Event listener polyfill
!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
        var target = this;

        registry.unshift([target, type, listener, function (event) {
            event.currentTarget = target;
            event.preventDefault = function () { event.returnValue = false };
            event.stopPropagation = function () { event.cancelBubble = true };
            event.target = event.srcElement || target;

            listener.call(target, event);
        }]);

        this.attachEvent("on" + type, registry[0][3]);
    };

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
            }
        }
    };

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
    };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

// Resizilla
! function(n) {
    function e() {
        return Date.now() || (new Date).getTime()
    }

    function t(n) {
        function e() {
            function n(n, e, t) {
                return n || e ? (console.warn(t), !0) : !1
            }

            function e() {
                return c ? n(t, i, u) : !1
            }
            var t = window.webkitRequestAnimationFrame,
                i = window.requestAnimationFrame,
                r = screen.width <= 768 ? !0 : !1,
                a = !(t && i),
                o = window.performance ? !1 : !0,
                u = "setTimeout is being used as a substitiue forrequestAnimationFrame due to a bug within iOS 6 builds",
                c = a && r && o;
            return e()
        }

        function t(n) {
            clearTimeout(n)
        }

        function i(n) {
            var e = Date.now(),
                t = Math.max(h + 16, e);
            return setTimeout(function() {
                n(h = t)
            }, t - e)
        }

        function r() {
            return Array.prototype.filter ? (s = window["request" + f] || window[l.filter(function(n) {
                return void 0 !== window[n + d] ? n : void 0
            }) + d] || i, e() ? i : s) : i
        }

        function a() {
            function n(n, e) {
                for (var t; e < n.length; e++)
                    if (window[n[e]]) {
                        t = window[n[e]];
                        break
                    }
                return t
            }
            var i = [];
            return Array.prototype.map ? (l.map(function(n) {
                return ["Cancel", "CancelRequest"].map(function(e) {
                    i.push(n + e + f)
                })
            }), w = window["cancel" + f] || n(i, 0) || t, e() ? t : w) : t
        }

        function o() {
            return b ? i : r()
        }

        function u() {
            return a()
        }

        function c() {
            b ? (window.requestAnimationFrame = i, window.cancelAnimationFrame = t) : (window.requestAnimationFrame = r(), window.cancelAnimationFrame = a())
        }
        var s, w, m, l = ["moz", "webkit"],
            f = "AnimationFrame",
            d = "Request" + f,
            h = 0,
            v = window.mozRequestAnimationFrame,
            p = window.mozCancelAnimationFrame,
            b = v && !p;
        switch (Date.now || (Date.now = function() {
            return (new Date).getTime()
        }), n) {
            case "request":
            case "":
                m = o();
                break;
            case "cancel":
                m = u();
                break;
            case "native":
                c();
                break;
            default:
                throw new Error("RequestFrame parameter is not a type.")
        }
        return m
    }
    var i = t("request"),
        r = t("cancel"),
        a = function(n, t) {
            function r(n) {
                return this.k = this.k ? null : n, this.k += 1
            }

            function a() {
                this.delta = e() - o, this.callHandler = this.delta >= t ? n.call() : i(a)
            }
            var o = e();
            return i(a), r(0)
        };
    n.resizilla = function(n, e, t) {
        function i() {
            var i;
            return function() {
                var o = this,
                    u = arguments,
                    c = function() {
                        i = 0, t || n.apply(o, u)
                    };
                this.instant = t && !i, r(i), i = a(c, e), this.instant && n.apply(o, u)
            }
        }
        var o = i(arguments),
            u = function(n) {
                this.addEventListener ? this.addEventListener("resize", n, !0) : this.attachEvent("onresize", n)
            };
        (screen.width > 1023 || this.mobile) && u.call(this, o)
    }, resizilla.enableMobileResize = function() {
        n.mobile = !0
    }
}(window);


(function() {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

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
    resizilla(function() {
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
    }, 200, true);
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
