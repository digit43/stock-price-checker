'use strict';

const goodModel = require('../models/goods');
const ipModel = require('../models/ip');

function addLikeIps(req, res, next) {
  const ip = req.headers['x-forwarded-for'];

  let {stock, like} = req.query;

  if (stock && like === "true") {
    if (typeof stock === "string") {
      stock = [stock];
    }
    
    ipModel.find({ip, stock}, function(err, docs) {
      const ipStocks = docs.map(item => item.stock);
      const filteredStock = stock.filter(item => !ipStocks.includes(item));
      const insertData = filteredStock.map(item => ({
        ip,
        stock: item,
      }));
      ipModel.insertMany(insertData, function(err, docs) {

        let updatePromises = docs.map(doc => {
          return goodModel.findOneAndUpdate({name: doc.stock}, {
            $push: { likes: doc._id }
          });
        });

        Promise.all(updatePromises).then(values => {
          next();
        });
      });
    });
  } else {
    next();
  }
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get([addLikeIps], async function (req, res){
      const {stock} = req.query;

      goodModel.find({name: stock}, async function(err, docs) { 
        // console.log(docs)
        if (docs.length === 1) {
            return res.json({
              stockData: {
                stock: docs[0].name,
                price: docs[0].price,
                likes: docs[0].likes.length,
              }
            })
        } 

        if (docs.length === 2) {
          return res.json({ stockData: [{
              stock: docs[0].name,
              price: docs[0].price,
              rel_likes: docs[0].likes.length - docs[1].likes.length
            },{
              stock: docs[1].name,
              price: docs[1].price,
              rel_likes: docs[1].likes.length - docs[0].likes.length
            }]
          })
        }
      });

   
    });
    
};
