const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

async function siteStatus() {
  const res = await fetch('https://hicetnunc.xyz')
  return res
}

async function feedStatus() {
  const res = await fetch('https://51rknuvw76.execute-api.us-east-1.amazonaws.com/dev/feed', {
    'headers': {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua': '\'Google Chrome\';v=\'89\', \'Chromium\';v=\'89\', \';Not A Brand\';v=\'99\'',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site'
    },
    'referrer': 'https://www.hicetnunc.xyz/',
    'referrerPolicy': 'strict-origin-when-cross-origin',
    'body': '{\'counter\':0}',
    'method': 'POST',
    'mode': 'cors'
  })
  return res

}

/* GET home page. */
router.get('/', async function (req, res, next) {

  let site = await siteStatus()
  let feed = await feedStatus()

  const emojiSite = ( site.ok ) ? '👍':'👎'
  const emojiFeed = ( feed.ok ) ? '👍':'👎'

  const data = {
    site: {
      emoji: emojiSite,
      status: site.status,
      statusText: site.statusText
    },
    feed: {
      emoji: emojiFeed,
      status: feed.status,
      statusText: feed.statusText
    }
  }
  res.render('index', data)

})

module.exports = router