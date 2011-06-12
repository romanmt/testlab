require('./test_helper.js');

it('GET /calculator/add with 2,3 returns 5', function (test) {
    assert.response(app,
        { url     : '/calculator/add'
        , method  : 'POST'
        , data    : JSON.stringify("1,2")
        , headers : {'Content-Type' : "application/json" }}, 
        { status  : 200,
          body    : "5",
          headers : {
            'Content-Type': 'application/json' }
        });
});
