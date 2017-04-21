var express = require('express')
var Program = require('./model/program')
var iqiyi = require('./crawler/iqiyi')
var tencent = require('./crawler/tencent')
var router = express.Router()

router.get('/', function (req, res) {
    Program.fetch(function (err, programs) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '首页',
            programs: programs
        })
    })
})

router.get('/add', function (req, res) {
    res.render('update', {
        title: "新增节目",
        program: {
            name: "",
            url_iqiyi: "",
            url_tencent: "",
            channel: ""
        }
    })
})

router.post('/program/update', function (req, res) {
    var _id = req.body._id
    var programObj = req.body
    var _program

    if (_id !== 'undefined') {
        Program.findById(_id, function (err, program) {
            if (err) {
                console.log(err)
            }

            _program = _.extend(program, programObj)
            _program.save(function (err, program) {
                if (err) {
                    console.log(err)
                }

                res.redirect('/')
            })
        })
    } else {
        iqiyi.getSourceId(programObj.name, function (sourceId) {
            _program = new Program({
                name: programObj.name,
                channel: programObj.channel,
                url_iqiyi: programObj.url_iqiyi,
                url_tencent: programObj.url_tencent,
                source_id: sourceId
            })

            _program.save(function(err, program) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/')
            })
        })
    }
})

router.post('/program/count/iqiyi', function (req, res) {
    var ids = req.body.ids
    
    Program.find({_id: {"$in": ids}}, {}, function (err, programs) {
        var result = []
        programs.forEach(function (_program){
            iqiyi.getIds(_program.source_id, function(ids) {
                iqiyi.getCountById(ids, function (count, times) {
                    result.push({
                        name: _program.name,
                        channel: _program.channel,
                        count: count,
                        times: times
                    })
                    if (result.length == programs.length) {
                        res.send(result)
                    }
                })
            })
        })
    })
})

router.post('/program/count/tencent', function (req, res) {
    var ids = req.body.ids
    
    Program.find({_id: {"$in": ids}}, {}, function (err, programs) {
        var result = []
        programs.forEach(function (_program){
            tencent.getCountByUrl(_program.url_tencent, function (count, times) {
                result.push({
                    name: _program.name,
                    channel: _program.channel,
                    count: count,
                    times: times
                })
                if (result.length == programs.length) {
                    res.send(result)
                }
            })
        })
    })
})


module.exports = router