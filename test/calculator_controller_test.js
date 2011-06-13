var helper  = require('./test_helper.js')
  , express = require('express')
  , it      = helper.it(exports);

var app = express.createServer();

app.on('close', function(){
  console.log('Shutting down!');
});

app.get('/hello', function (req, res) {
    res.send('hello');
});
 
app.get('/world', function(req, res) {
    res.send('world');
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

it('GET /world responds with world', function (test) {
    test.response(app,
                  { url : '/world'
                  , method : 'GET'},
                 function (res) {
                    res.body.should.equal('world');
                    test.finish();
                 });
});
