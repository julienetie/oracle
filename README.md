
##Oracle detects CSS media queries in JavaScript.

[![Build Status](https://travis-ci.org/julienetie/oracle.svg?branch=master)](https://travis-ci.org/julienetie/oracle)

(Working alpha API, tested in the latest Chrome only)

Oracle is expected to be widely supported on modern browsers and devices as it does not make use of 
the matchMedia() API but instead retrieves the computed value of a declaired media query via its 
computed value as being truthy or falsy.

- A callback or custom event can be set for truthy or falsy query detection.
- Mulitple media queries can be set
- Set the debounce delay when resizing
- set the throttle delay of custom events/ callback functions.

MIT License 

Copyright (c) 2016 Julien Etienne
