var http = require('https')
var cheerio = require('cheerio')
var url = 'https://www.imooc.com/learn/348'
function filter(html) {
    var $ = cheerio.load(html)
    var chapters = $('.course-chapters')
    var courseData = []
    chapters.each(function (item) {
        var chapter = $(this)
        var title = chapter.find('h3').text()
        var chapterData = {
            title: title
        }
        courseData.push(chapterData)
    })
    return courseData
}
function printInfo(myData) {
    myData.forEach(function (item) {
        console.log(item.title + '\n')
    })
}
http.get(url, function (res) {
    var html = ''
    res.on('data', function (data) {
        html += data
    })
    res.on('end', function () {
        var myData = filter(html)
        printInfo(myData)
    })
}).on('error', function () {
    console.log('出错')
})
