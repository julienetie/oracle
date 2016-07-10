'use strict';

var windowHeight = 500;

function testTitle(value) {
    console.log('\n\n▀▄▀▄ ' + value.toUpperCase() + ' ▀▄▀▄\n\n');
}

function getViewportSize() {
    return window.outerWidth - window.innerWidth;//document.documentElement.clientWidth;
}

var results = {}

module.exports = {
    after: (client) => {
        client.end();
    },
    'Oracle - JavaScript Media Queries: Callback example': (client) => {
        /**
         * Oracle Callbacks page.
         */
        client
            .url('http://localhost:8000/examples/callbacks.html')
            .pause(1000)
            .assert.title('Oracle - JavaScript Media Queries: Callback example')
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
            .perform(function(client, done) {
                results.mobile = client.expect.element('section div:nth-child(1) span:nth-child(2)').text.to.contain('TRUTHY');
                results.tablet = client.expect.element('section div:nth-child(2) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopSmall = client.expect.element('section div:nth-child(3) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopMedium = client.expect.element('section div:nth-child(4) span:nth-child(2)').text.to.contain('FALSY');
                results.desktopLarge = client.expect.element('section div:nth-child(5) span:nth-child(2)').text.to.contain('FALSY');
                done();
            })


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
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('TRUTHY');
                results.desktopSmall.text.to.contain('FALSY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })


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
            .perform(function(client, done) {
                results.mobile.text.to.contain('FALSY');
                results.tablet.text.to.contain('FALSY');
                results.desktopSmall.text.to.contain('TRUTHY');
                results.desktopMedium.text.to.contain('FALSY');
                results.desktopLarge.text.to.contain('FALSY');
                done();
            })
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


        /**
         * Min width 1025px --> Max Width 1440px.
         */
        // .perform(function(client, done) {
        //         testTitle('@media only screen and (min-width: 64.063em) and (max-width: 90em)');
        //         done();
        //     })
        //     .execute(getViewportSize, [], function(result) {
        //         client.resizeWindow(1025 + result.value, windowHeight);
        //         return client;
        //     })
        //     .perform(function(client, done) {
        //             testTitle('min-width: 64.063em');
        //             done();
        //         })
        //     .perform(function(client, done) {
        //         results.mobile.text.to.contain('FALSY');
        //         results.tablet.text.to.contain('FALSY');
        //         results.desktopSmall.text.to.contain('TRUTHY');
        //         results.desktopMedium.text.to.contain('FALSY');
        //         results.desktopLarge.text.to.contain('FALSY');
        //         done();
        //     }).pause(2000)
        //     .execute(getViewportSize, [], function(result) {
        //         client.resizeWindow(1440 + result.value, windowHeight);
        //         return client;
        //     }).pause(2000)
        //     .perform(function(client, done) {
        //             testTitle('max-width: 90em');
        //             done();
        //         })
        //     .pause(2000)
        //     .perform(function(client, done) {
        //         results.mobile.text.to.contain('FALSY');
        //         results.tablet.text.to.contain('FALSY');
        //         results.desktopSmall.text.to.contain('TRUTHY');
        //         results.desktopMedium.text.to.contain('FALSY');
        //         results.desktopLarge.text.to.contain('FALSY');
        //         done();
        //     })

    }
}




// this.ResizeWindow = (client) => {
//     client
//         .resizeWindow(800, 600)
//         .pause(2000)
//         .end();
// }
