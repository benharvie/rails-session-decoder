var secret = '52541783ebfc236dc27e1d83cba2a4144b484897995bdf4d9a9977623987ee10b6e690d3c4218ebc50eccfb68f5babc3db0fcb131d3fbbce142803a03ac500db';

var should = require('should'),
    sut = require('./index')(secret);


var cookie = 'N0paYjIyWTNIOWgxV2VON0RCM1AvenZzQVNFeWY0elBoQkZ5SnN4OVAybXZQMEErV0VGa1luM2VmYTg4cEk0Y2paVUtMUW8xbEQyUE5VbFJ1OTZUeWJiODdYNkxZSWxvYUtiaE1ucy9LM1BMUy8yd0N0ZExZQzYzUVFsaGZ4M044MjdOdWNJYWhMbW5HOTJpY2UzQUdBPT0tLWtuWk9IWVJpakpWak5oSmZ2d2VLbWc9PQ==--d4292397f777c8f79655884b3fcc241e4bc2fcf5';
var session = JSON.parse('{"session_id":"1cc5440b929e539280d94888629565d1","_csrf_token":"CzzmfmhiXOMfGDsL4wkUNsvgyjG7215I73e6bXX1MlQ="}');

describe('Constructor', function() {
  it('stores the secret', function() {
    sut.secret.should.be.exactly(secret);
  })
});

describe('Defaults', function(){

  it('has the correct cookieSalt', function() {
    sut.cookieSalt.should.be.exactly('encrypted cookie');
  });

  it('has the correct signedCookieSalt', function() {
    sut.signedCookieSalt.should.be.exactly('signed encrypted cookie');
  });

  it('has the correct iterations', function() {
    sut.iterations.should.be.exactly(1000);
  });

  it('has the correct keyLength', function() {
    sut.keyLength.should.be.exactly(64);
  });
});

describe('#decodeCookie', function() {
  it('returns error when the cookie is not provided', function (done) {
    sut.decodeCookie(null, function(err, result) {
      err.should.be.ok;

      done();
    })
  });

  it('returns error when the format invalid', function (done) {
    sut.decodeCookie('InvalidCookie', function(err, result) {
      err.should.be.ok;

      done();
    })
  });

  it('returns the expected values', function (done) {
    sut.decodeCookie(cookie, function(err, result) {
      (err == null).should.be.true;

      JSON.parse(result).should.eql(session);

      done();
    })
  })
});