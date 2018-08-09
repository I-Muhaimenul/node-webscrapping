const request = require('request')
const cheerio = require('cheerio')

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        //use cherio to get full html page
        const $ = cheerio.load(html)

        //taking all from targetting class/id from html page
        const sitHeading = $('.site-heading')
        //taking only htnl portion
        console.log(sitHeading.html())
        //taking only texts
        console.log(sitHeading.text())
        //target html element
        console.log(sitHeading.find('h1').text())
        //target child element
        console.log(sitHeading.children('h1').text())
        //target next of child element
        console.log(sitHeading.children('h1').next().text())
        //target parent of child element
        console.log(sitHeading.children('h1').parent().text())

        $('.nav-item a').each((i, el) => {
            const item = $(el).text()
            console.log(item)
        })
    }
})