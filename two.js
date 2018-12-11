const fs = require('fs');
const path = require('path');
var http = require('http');
var url = require('url');
var util = require('util');
var superagent = require('superagent');
//var express = require('express');
// var router = express.Router();
var baseUrl = 'https://e.dianping.com/poi/ecom/ajax/getCities?parentId=';
var loginPageUrl = 'https://epassport.meituan.com/api/account/login';
var pageUrls = []   //接口的集合
fs.readFile('my.json', function (err, data) {
    if (err) {
        return console.error(err);
    }
    var city = data.toString();//将二进制的数据转换为字符串
    city = JSON.parse(city)
    //  myAa(city.data, '10000001/')
})
function myAa(arr, parentPath) {
    arr.forEach(function (e, index) {
        var yyPath = parentPath
        let onePath = e.id + '';
        yyPath += onePath + '/';
        let myPath = path.resolve(yyPath);
        fs.existsSync(myPath) == false && mkdirs(myPath, myPath);
        if (e.children && e.children.code == '200' && e.children.flag) {
            myAa(e.children.data, yyPath)
        }
    })
}
//递归新建文件夹
function mkdirs(dirpath, myJson) {
    console.log(dirpath)
    //判断他的文件夹是否存在
    if (!fs.existsSync(path.dirname(dirpath))) {
        mkdirs(path.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);  //同步地创建目录
    file(dirpath + '', myJson)
}

function file(dirname, myJson) {
    var file = path.join(dirname, '/index.json')
    fs.writeFile(file, myJson, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('文件创建成功，地址：' + file);
    })
}

//  let myPath = path.resolve('path1/path2/path3');
//  fs.existsSync(myPath) == false && mkdirs(myPath);

//console.log(aa)
// superagent
//     .post(loginPageUrl)
//     .send({
//         captchaCode: "",
//         error: "",
//         isFetching: false,
//         login: "18551547098",
//         loginType: "account",
//         part_key: "",
//         password: "52885288abcd",
//         rohrToken:"eJx9km1v2jAUhf+LpfJlEdiJTRIkNEGAFjTawVK6rUJTCE4wBTtKHCit+t93HV7Eh26SlTw+9+Rcv+Qd5cMlar2jZBOlqEUwxtT5sNCO56iFSB3Xm8hCuoASo5QRxyU+ocRC8bVmE9r0LbTIZz3UegbRamJ/boQpzJ+J7WHLw3huHREy5pZNYRjPECxopXVWtBoNnkVFkalc17dc6DKS9VhtG1Ecq1LqRimFFju+UamQXwue70TM25kSHEy1WEktZMnbVdaN07mxBzB4fSkimQmZmigQwG/k4wSeWyUBCq5jpV4Ery3SP4Uqc0gmtapT8K/gqyXC/LTIY5ZWL1zWEugiE5G2F0WhRHKoFdGWq1xAaJvAuSLY/zY0+6cOsYjngvY52f8l5xNiF3LPRC959KIxCmTumDZNlRmCKyKeY8g3PgzEiGcR1/gYXBxxjY85TSDbEIW+zcpnujGv8oHGTA+GjVb18Pwzuc6ZmH3yVfs9EsEncnzoy3xDnlsRHNmLOTJ4R9dHZ3Ufw/Dh3tT1uT6Gfxg+LUQqgfhoP3td9x/SoDPuLgN33Ov9cH6Fo/Q1DWbTfLWhkwO/04SPN2845H732y7oDvX6fqrfhl9Gk9Ftf5hnAcGks2rsvmdBlhVPyeOTr3L77nbzez0pB+G+/9Pfj5LBoeOgj7/v0Oek",
//         success: "",
//         verifyRequestCode: "",
//         verifyResponseCode: "",
//         verifyType: null
//        })
//     .set('Accept','application/json')
//     .end(function(res){
//         console.log('111111')
//         console.log(res)
// })
//获取GET请求内容
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//     res.end(util.inspect(url.parse(req.url, true)));
// }).listen(3000);

// router.post('/getCities',function(req, res, next){
//   var pageLength = req.body.data.length;
// for( var _i = 1; _i <= 3 ; _i++){ //
//  pageUrls.push(baseUrl + req.body.data[i].id );
//pageUrls.push(baseUrl + '10000001' )
// console.log(pageUrls);
// };
//  pageUrls.forEach(function (pageUrl) {
//      console.log(pageUrl)
//      superagent.get(pageUrl).end(function (err,pres) {
//          console.log(pres);
//      })
//  })

// })

