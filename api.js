const express = require('express')
const app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

const cheerio = require('cheerio')
// const request = require('request')
const axios = require('axios')

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; font-size: 3rem;">Hello World!</h1>')
})

app.get('/api/pic', (req, res) => {
    axios.get()
})

app.get('/api/movies', (req, res) => {
    axios.get('http://www.atmovies.com.tw/movie/next/0/').then(result => {
        let html = result.data
        let $ = cheerio.load(html)
        let list = []
        $(".c-section ul.filmListAll li").each((index, item) => {
            list.push({
                imgUrl: $(item).find('a img').attr('src').trim() ,
                name:  $(item).find('a img').attr('alt')
            })
        })
        res.send({list})
    })
    // request({
    //     url: 'http://www.atmovies.com.tw/movie/next/0/',
    //     method: 'GET'
    // }, function(error, response, body) {
    //     if(error || !body) return;
    //     let $ = cheerio.load(body);
    //     let list = []
    //     $(".content-left ul.filmNextListAll li").each(function(index, item) {
    //         const temData = {
    //             imgUrl: $(item).find('a img').attr('src') ,
    //             name:  $(item).find('a img').attr('alt')
    //         }
    //         // console.log(temData)
    //         list.push(temData)
    //     })
    //     res.send(list)
    // })
})


const POST = process.env.POST || 3300
let server = app.listen(POST, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
});