const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Viewing one stock: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({stock: "GOOG"})
      .end(function(err, res) {
        assert.equal(res.status, 200, "Response status is always 200.");
        assert.property(res.body, "stockData");
        assert.property(res.body["stockData"], "stock");
        assert.property(res.body["stockData"], "likes");
        assert.property(res.body["stockData"], "price");
      });
    done();
  });

  test("Viewing one stock and liking it: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({stock: "GOOG", like: "true"})
      .end(function(err, res) {
        assert.equal(res.status, 200, "Response status is always 200.");
        assert.property(res.body, "stockData");
        assert.property(res.body["stockData"], "stock");
        assert.property(res.body["stockData"], "likes");
        assert.property(res.body["stockData"], "price");
      });
    done();
  })

  test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({stock: "GOOG", like: true})
      .end(function(err, res) {
        assert.equal(res.status, 200, "Response status is always 200.");
        assert.property(res.body, "stockData");
        assert.property(res.body["stockData"], "stock");
        assert.property(res.body["stockData"], "likes");
        assert.property(res.body["stockData"], "price");
      });
    done();
  })

  test("Viewing two stocks: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({stock: ["GOOG", "MSFT"]})
      .end(function(err, res) {
        assert.equal(res.status, 200, "Response status is always 200.");
        assert.property(res.body, "stockData");
        assert.isArray(res.body["stockData"]);
        assert.equal(res.body["stockData"].length, 2);
      });
    done();
  })

  test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({stock: ["GOOG", "MSFT"]})
      .end(function(err, res) {
        assert.equal(res.status, 200, "Response status is always 200.");
        assert.property(res.body, "stockData");
        assert.isArray(res.body["stockData"]);
        assert.equal(res.body["stockData"].length, 2);
      });
    done();
  })
});
