var assert = require('assert');

describe('read page title of http://webdriver.io', () => {
    it('webdriver.io has the expected page title', function * () {
        return browser
            .url('http://webdriver.io')
            .getTitle().then((title) => {
                assert.equal(title, 'WebdriverIO - Selenium 2.0 javascript bindings for nodejs');
            });
    });

    it('should be possible to reach the Developer Guide via a click', function * () {
        yield browser.click('a[href="/guide.html"');

        var devGuideTitle = yield browser.getTitle();
        assert.equal(devGuideTitle, 'WebdriverIO - Developer Guide');
    });
});
