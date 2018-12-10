const fs = require('fs');
const path = require('path');
var http = require('http');
var url = require('url');
var util = require('util');
//var superagent = require('superagent');
//var express = require('express');
// var router = express.Router();
var baseUrl = 'https://e.dianping.com/poi/ecom/ajax/getCities?parentId=';
var loginPageUrl = 'https://epassport.meituan.com/api/account/login?service=poiecom&bg_source=1&loginContinue=https:%2F%2Fe.dianping.com%2Fpoi%2Fecom%2Fcommon%2Fsetcookie&loginType=account';
var pageUrls = []   //接口的集合
fs.readFile('my.json',function(err,data) {
    if (err) {
        return console.error(err);
    }
    var city = data.toString();//将二进制的数据转换为字符串
    city = JSON.parse(city)
     myAa(city.data,'10000001/','0')
})

// let mmm = ''
// function myAa(arr, pId, m){
//     mmm += pId
//     arr.forEach(function (e, index) {
//         let onePath = e.parentId;
//         let mm = e.id+'';
//         yyPath = mmm + mm ;
//         let myPath = path.resolve(yyPath);
//         fs.existsSync(myPath) == false && mkdirs(myPath ,JSON.stringify(arr));
//
//         // if(e.children && e.children.code == '200'){
//         //     myAa(e.children.data, e.children.data[0].parentId+'/',index + '',)
//         // }
//
//     })
// }
function myAa(arr, data){
    arr.forEach(function (e, index) {
        if (!data) {
            var yyPath = '10000001/'
        } else {
            var yyPath = data
        }
        let myPath = null
        let onePath = e.id+'';
        if(e.children && e.children.code == '200'){
            yyPath += onePath + '/';
            myPath = path.resolve(yyPath);
            myAa(e.children.data, yyPath)
        } else {
            yyPath += onePath + '/';
            myPath = path.resolve(yyPath);
        }
        fs.existsSync(myPath) == false && mkdirs(myPath,JSON.stringify(arr));
    })
}
//递归新建文件夹
function mkdirs(dirpath, myJson) {
    var file = path.join(path.dirname(dirpath), '/index.json')
    if (!fs.existsSync(path.dirname(dirpath))) {
        mkdirs(path.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);
    fs.writeFile(file, myJson, function(err) {
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
//     .send({captchaCode: "",
//         captchaToken: "",
//         error: "账号或密码错误",
//         isFetching: false,
//         login: "19991893781",
//         loginType: "account",
//         part_key: "",
//         password: "52885288abcd",
//         rohrToken: "eJy1k21P2zAQx7+LJfpmVuunxEmlamrDU6u1QBfKNoamENxgaOMocQoFIe277YvtnEJhEpP2ZlIU/e5897/zXfKIyuEV6j6i+SLJUJcSQgR/wmilStRFtE3aPsLIVnDkCSGY5wec+hKj9I1PEhJ4HKPLcraLuueCEMwDcuEcU7DPKQsIDgh4NihpeIGZgMfFDCEEXVtbVN1ORxVJVRWmtO2l0rZO8nZqlp0kTU2d206da6tXamEynX+sVLnSqeoVRisIaqUmtzqvVa/R2uH9HbYPj2pf6SQvdJ45KXBAvHNvDHgvTQ5QKZsac6tV6zL7UZm6BGXaaipFfxN+0yLYz01utKy5VXlrDlXyuc56l1Vl9HzdqpKlMqUG0R6Fuf7brf/rdRGsYBm7FTBKYSMc2mKUbcltiTliHmZcOuKOGp8PGdR9ICyQmBHiKJSYhgKIe0Cei+Mhw5S4XC48TFlDNMRUbDIExDXVJMfUb/Q8iJNNNUEwDRpikBF6DflA8rkrGgYNiT9IvkP+OyS2RF8o2KoE7IXkVkUKN7LbZmS/fuLh5Pg0hrPvNSGUbM3Zls6fCZKSt3PGg9M4Ppq8tv7qoD7MS9DXROsSncAYfkoIqHSWA6nR3ez+Zu8oi/rjwVUkx7u7n/nXeJTdZ9FsWl4vxMlaHVqqxosHEqtw8GkVDYb2ZjK1D8MPo5PRwd6wLCJKaP+6szouoqKozuanZ6Ep2eHB4tvNSb0f3+19Ce9G8/11n6On3xBCKlw=",
//         success: "",
//         verifyRequestCode: "",
//         verifyResponseCode: "",
//         verifyType: null})
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


