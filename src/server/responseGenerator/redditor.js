const request = require('request-promise')
const Filter = require('bad-words')
const fs = require('fs')
const qs = require('querystring')
const clean = new Filter();

const redditor = (query) => {query = qs.stringify({q: query}); console.log(query); return request.get(`https://api.pushshift.io/reddit/comment/search/?${query}&html_decode`)
  .then((data)=>JSON.parse(data))
  .then((data)=>data.data
    .map((comment)=>comment.body.split('. '))
    .reduce((x, y)=>x.concat(y), [])
    .filter((string)=>
      string.includes('#') ? false :
      string.includes('|') ? false :
      string.includes('[') ? false :
      string.includes('^') ? false :
      string.includes('{') ? false :
      string.includes('*') ? false :
      string.includes('/') ? false :
      clean.isProfane(string) ? false : true)
    .map((string)=> string.trim())
    .map((string)=>string.replace(/^\w\s!'",.?/gi, '')
      .replace([/-|\\|\[|\]|\{|\}|\\\\|&gt;|&gt|\\n/gi], '')
      .replace(/(?:https?|ftp):\/\//gi, ''))
    .map((string)=>string.split('\n').join(' ')
      .split('  ').join(' ')
      .split('\\').join('')
      .split('  ').join(' ')))
  .then((text) =>
    text[Math.floor(Math.random() * text.length) + 1]
  )
}

module.exports.redditor = redditor
