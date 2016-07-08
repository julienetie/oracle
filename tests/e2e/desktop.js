var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);

client
   .init()
   .url('http://localhost:8000/examples/callbacks.html')
   // .setValue('#search_form_input_homepage', 'WebdriverIO')

   .getTitle().then(function(title) {
       console.log('Title is: ' + title);
       
   }).then(fuction(){
      this.timeout(10000).end();
   })
   
// 
