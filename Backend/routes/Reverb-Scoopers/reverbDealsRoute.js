
const reverbDealsRouter = require('express').Router();
const ctrl = require('../../controllers/homePageCtrl');



// DELETE THIS
const { loginAuth,
  getProductsList,
  comparisonShopping,
  priceGuideHelper,
  getCompShopData,
  getSingleProduct,
  sendText, } = require("../../helpers/index.js");


// Example Router:
/*
'use strict';
const homePageRouter = require('express').Router();
const { addFantasyTeam } = require("../controllers/teamCtrl");

homePageRouter.post("/fantasyTeam", addFantasyTeam);

module.exports = homePageRouter;
*/


// "/scoop/home"
reverbDealsRouter.get('/', function (req, res, next) {
  loginAuth().then(token => {
    getProductsList(token.access_token, "/api/handpicked/deals")
    .then(dataFromAPI=>{
      let promiseArray1 = [];
      productsArray = [];
      for(let i = 0; i < dataFromAPI.listings.length; i++){
        promiseArray1.push(getSingleProduct(token.access_token, dataFromAPI.listings[i]._links.self.href));
      }
      Promise.all(promiseArray1).then(listings=>{
        let promiseArray2 = [];
        let listingsWithPriceGuideData = listings.filter((listing)=>listing.SCOOP.hasPriceGuide).map(listing=>priceGuideHelper(listing));

        // i know this isnt being assigned to anything.
        // im just doing it to create promiseArray2
        listings
        .filter((listing)=>listing.SCOOP.hasCompShop)
        .map(listing=>{
          promiseArray2.push(getCompShopData(token.access_token, listing));
        });
        Promise.all(promiseArray2)
        .then(listingsWithCompShopData=>{
          // sendText();
          let allListings = listingsWithPriceGuideData.concat(listingsWithCompShopData);
          res.send({
            products: allListings,
          });
        })
      })
    })
  })
})

exports = module.exports = reverbDealsRouter;