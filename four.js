var http = require('https')
var Promise = require('bluebird')
var cheerio = require('cheerio')
var url = 'https://www.imooc.com/learn/348'
var baseUrl = 'https://www.imooc.com/learn/'
var videoIds = [348, 259, 197]
function filter(html) {
    var $ = cheerio.load(html)
    var chapters = $('.course-chapters')
    var title = $('#main h2').text()
    var courseData = {
        videos:[],
        title:title
    }
    chapters.each(function (item) {
        var chapter = $(this)
        var mtitle = chapter.find('h3').text()
        var chapterData = {
            title: mtitle
        }
        courseData.videos.push(chapterData)
    })
    return courseData
}

function printInfo(myData) {
    myData.forEach(function (item) {
        console.log(item.title + '\n')
        item.videos.forEach(function (mitem) {
            console.log(mitem.title + '\n')
        })
    })
    // myData.videos.forEach(function (item) {
    //     console.log(item.title + '\n')
    // })
}


function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log('正在爬取' + url)
        http.get(url, function (res) {
            var html = ''
            res.on('data', function (data) {
                html += data
            })
            res.on('end', function () {
                resolve(html)
              //  var myData = filter(html)
              //  printInfo(myData)
            })
        }).on('error', function (e) {
            reject(e)
            console.log('出错')
        })
    })
}
var fetchCourseArray = []
videoIds.forEach(function (id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id))
})
Promise
    .all(fetchCourseArray)
    .then(function (pages) {
        var coursesData = []
        pages.forEach(function (html) {
            var course = filter(html)
            coursesData.push(course)
        })
        // coursesData.sort(function (a,b) {
        //     return a.number<b.number
        // })
        printInfo(coursesData)
    })


