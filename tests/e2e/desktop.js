'use strict';

this.ContentsTest = (browser) => {
    browser
      .url('http://localhost:8000/callbacks.html')
      .pause(1000)
      .assert.title('Oracle - JavaScript Media Queries: Callback example')
      // .assert.containsText('#content', 'Hello, Nightwatch.js!')
      .end();
}
