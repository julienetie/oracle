var webdriverio = require('webdriverio'),
  assert = require('assert');

describe('my webdriverio tests', function() {

  this.timeout(99999999);
  var client;

  before(function() {
    client = webdriverio.remote({
      desiredCapabilities: {
        browserName: 'chrome'
      }
    });
    return client.init();
  });

  it('Github test', function() {
    return client
      .url('https://github.com/')
      .getTitle().then(function(title) {
        console.log(title)
        assert(title === 'How people build software · GitHub');
      });
  });

  after(function() {
    return client.end();
  });
});
