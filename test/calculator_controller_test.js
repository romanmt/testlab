var helper  = require('./test_helper.js')
  , express = require('express')
  , it      = helper.it(exports);

var app = express.createServer();

app.post('/calculator/add', function (req, res) {
    res.send('5');
});
  
it('POST /calculator/add with 2,3 returns 5', function (test) {
    test.response(app,
        { url     : '/calculator/add'
        , method  : 'POST'
        , data    : JSON.stringify("1,2")
        , headers : {'Content-Type' : "application/json" }}, 
        { status  : 200,
          body    : "5",
          headers : {
            'Content-Type': 'application/json' }
        });
    test.finish();
});
