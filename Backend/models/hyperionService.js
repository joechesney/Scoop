
const request = require('request');

module.exports = (access_token) => {
  return new Promise((resolve, reject) => {

    let options = {
      url: `https://reverb.com/api/listings?query=hyperion&page=1&per_page=40`,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
        'Authorization': `Bearer ${access_token}`
      },
      "Content-Type": "application/hal+json",
      "Accept": "application/hal+json",
      "Accept-Version": "3.0",
    }
    request(options, (error, response, html) => {
      if (!error && response) {
        response.body = JSON.parse(response.body); //THIS WORKS!
        // console.log('response : ', response);
        resolve (response);
      } else {
        reject (error)
      }
    })
  })
}
