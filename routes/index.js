const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

async function siteStatus() {
  try {
  const res = await fetch('https://hicetnunc.xyz')
  return res
  } catch (error) {
    console.log(error)
    return null
  }
}

async function feedStatus() {
                           
  const res = await fetch('https://51rknuvw76.execute-api.us-east-1.amazonaws.com/dev/feed', {
    'body': '{\'counter\':0}',
    'method': 'POST'
  })

  return res

}

router.get('/', async function (req, res, next) {

  const site = await siteStatus()
  const feed = await feedStatus()

  console.log(feed)

  const emojiSite = ( site !== null && site.ok ) ? '👍':'👎'
  const emojiFeed = ( feed.ok ) ? '👍':'👎'

  const data = {
    site: {
      emoji: emojiSite,
      status: ( site !== null && site.ok ) ? site.status :'hicetnunc.xyz is down',
      statusText: ( site !== null && site.ok ) ? site.statusText :'👎'
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