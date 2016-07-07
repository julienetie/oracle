/* jshint ignore:start */
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
