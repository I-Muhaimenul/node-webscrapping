const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
//express default filesystem
const fs = require('fs')
const writeStream = fs.createWriteStream('post.csv')

const mongoUri = 'mongodb://muhaimenul:873965ove@ds119652.mlab.com:19652/practice'
mongoose.Promise = global.Promise
mongoose.connect(mongoUri, { useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err))

const Post = require('./model/post')



//write headers
writeStream.write(`Title,Link,Date \n`)

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        //use cherio to get full html page
        const $ = cheerio.load(html)

        
        $('.post-preview').each((i, el) => { 
            const title = $(el).find('.post-title').text().replace(/\s\s+/g, '') //or h1
            const link = $(el).find('a').attr('href')
            const date = $(el).find('.post-date').text().replace(/,/, '')
            //write row to csv
            writeStream.write(`${title}, ${link}, ${date} \n`)
            console.log('Scrapping Done')
            
            //save to database
            var newPost = Post({
                title: title,
                link: link,
                date: date
              })
            newPost.save().then( result => console.log(result)).catch(err => console.log(err))
        })

        console.log('Scrapping Done')
    }
})