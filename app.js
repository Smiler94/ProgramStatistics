var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var _ = require('underscore')
var webRouter = require('./web_router')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/program')


var iqiyi = require('./crawler/iqiyi')
var tencent = require('./crawler/tencent')
app.set('views', './view/pages') // 设置模板目录
app.set('view engine', 'jade') // 设置模板引擎

app.use(bodyParser.urlencoded({exnteded: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/')))
app.listen(port)

app.use('/', webRouter)