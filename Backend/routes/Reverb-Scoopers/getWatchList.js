const { Router } = require('express');
const watchlistRouter = Router();
// This file will mainly contain a function to grab the
// watched items ids and names from the url "https://reverb.com/my/feed/customize"

// it will get this data and send it to the 'getPrices' module

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

watchlistRouter.get('/', function (req, res) {

});

exports = module.exports = watchlistRouter;