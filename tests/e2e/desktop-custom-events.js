'use strict';

var windowHeight = 500;
var delay = 1500;

function testTitle(value) {
    console.log('\n\n▀▄▀▄ ' + value.toUpperCase() + ' ▀▄▀▄\n\n');
}

function getViewportSize() {
    return window.outerWidth - window.innerWidth;
}

var results = {}

module.exports = {
    after: (client) => {
        client.end();
    },
    'Oracle - JavaScript Media Queries: Custom event example': (client) => {
        /**
         * Oracle Callbacks page.
         */
        client
            // .url('http://localhost:8000/examples/custom-events.html')
            .url('http://julienetienne.co.uk/oracle/examples/custom-events.html')
            .pause(delay)
            .assert.title('Oracle - JavaScript Media Queries: Custom event example')
            .resizeWindow(0, 500)


        /**
         * Width 640px.
         */
        .perform(function(client, done) {
                testTitle('@media only screen and (max-width: 40em)');
                done();
            })
            .execute(getViewportSize, function(result) {
                client.resizeWindow(640 + result.value, windowHeight);
                return client;
            })
            .pause(delay)
            .perform(function(client, done) {
                results.mobile = client.expect.element('section div:nth-child(1) span:nth-child(2)').text.to.contain('TRUTHY');
                results.tablet = client.expect.element('section div:nth-child(2) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopSmall = client.expect.element('section div:nth-child(3) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopMedium = client.expect.element('section div:nth-child(4) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopLarge = client.expect.element('section div:nth-child(5) span:nth-child(2)').text.to.contain('FALSY');
                done();
            })
            .pause(delay)


        /**
         * Min width 641px --> Max Width 1024px.
         */
        .perform(function(client, done) {
                testTitle('@media only screen and (min-width: 40.063em) and (max-width: 64em)');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(641 + result.value, windowHeight);
                return client;
            })
            .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('TRUTHY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1024 + result.value, windowHeight);
                return client;
            })
        .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('TRUTHY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
            .pause(delay)


        /**
         * Min width 1025px --> Max Width 1440px.
         */
        .perform(function(client, done) {
                testTitle('@media only screen and (min-width: 64.063em) and (max-width: 90em)');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1025 + result.value, windowHeight);
                return client;
            })
        .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('TRUTHY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
        .pause(delay)
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1440 + result.value, windowHeight);
                return client;
            })
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('TRUTHY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
        .pause(delay)


        /**
         * Min width 1441px --> Max Width 1920px.
         */
        .perform(function(client, done) {
                testTitle('@media only screen and (min-width: 90.063em) and (max-width: 120em)');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1441 + result.value, windowHeight);
                return client;
            })
        .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('TRUTHY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1920 + result.value, windowHeight);
                return client;
            })
            .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('TRUTHY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
            .pause(delay)

        /**
         * Min width 1921px.
         */
        .perform(function(client, done) {
                testTitle('@media only screen and (min-width: 120.063em)');
                done();
            })
            .execute(getViewportSize, [], function(result) {
                client.resizeWindow(1921 + result.value, windowHeight);
                return client;
            })
            .pause(delay)
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('TRUTHY');
                done();
            })
            .pause(delay)
    }
}
