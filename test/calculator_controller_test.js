var helper  = require('./test_helper.js')
  , express = require('express')
  , it      = helper.it(exports);

var app = express.createServer();

app.on('close', function(){
  console.log('Shutting down!');
});


app.post('/calculator/add', function (req, res) {
    res.send('hello');
});
  
it('GET /hello responds with hello', function (test) {
    test.response(app,
        { url     : '/hello'
        , method  : 'GET'
        }, 
        function (res) {
            res.body.should.equal('hello');
            test.finish();
        });
});
