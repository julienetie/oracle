'use strict';

let webdriverio = require('webdriverio');
let callbackURL = 'http://localhost:8000/examples/callbacks.html';
let chai = require('chai');
var expect = chai.expect;
var client;


before(() => {
  client = webdriverio.remote({
    desiredCapabilities: {
      browserName: 'chrome'
    }
  });
  return client.init();
});


after(() => {
  return client.end();
});


describe('my webdriverio tests', function() {
  this.timeout(99999999);
  it('Should match title', function() {
    return client
      .url(callbackURL)
      .getTitle().then((title) => {
        console.log(title);
        expect(title).to.equal('Oracle - JavaScript Media Queries: Callback example');
      });
  });
});
