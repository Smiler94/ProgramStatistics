var superagent = require('superagent')
var cheerio = require('cheerio')
var util = require('../public/util')
// var urls = [
//     'https://v.qq.com/x/cover/kruhigtunugwbab/x0023osxaj9.html',//最强大脑
//     'https://v.qq.com/x/cover/4n8r5plkg2t1sb5/v0022zox2oi.html',
//     'https://v.qq.com/x/cover/i6hjg9s9hjsjw95/t0023yqrxsc.html',
//     'https://v.qq.com/x/cover/05x8e8vlm5snc72/j00230hndkk.html',
//     'https://v.qq.com/x/cover/87jky8z3mz9e0o7/b0023ac3im8.html',
//     'https://v.qq.com/x/cover/nbsljfz1fkvmdao/g0023ykibaq.html',
//     'https://v.qq.com/x/cover/4ouos7mp4jkr14m/y0023k9suci.html',
//     'https://v.qq.com/x/cover/zd8gebdiid269c6/o00230b2yvz.html',//王牌对王牌
//     'https://v.qq.com/x/cover/pngwi7jiyp3sw0b/w00224hx300.html',
//     'https://v.qq.com/x/cover/9b9x1xqtag90i8o/d002378iabz.html',//中国式相亲
//     'https://v.qq.com/x/cover/kruhigtunugwbab/x0023osxaj9.html',//最强大脑
//     'https://v.qq.com/x/cover/orjl6thbzv1woid/v0023lkhsmf.html',//放开我北鼻
//     'https://v.qq.com/x/cover/l8vvq6441lqp32d/l002335vnkt.html',//拜托了冰箱
//     'https://v.qq.com/x/cover/0wy7ceoiax7r3ao/i0023bae20f.html',//高能少年团
//     'https://v.qq.com/x/cover/l8vvq6441lqp32d/l002335vnkt.html',//拜托了冰箱
//     'https://v.qq.com/x/cover/um5it8gba6jden2/x0023f9vzp7.html',//奔跑吧
//     'https://v.qq.com/x/cover/co6o7vvd3dp4tg3/u0023ldkp4k.html',//金曲捞
//     'https://v.qq.com/x/cover/01tn45w64lygzhr/j0023wdemll.html',//诗书中华
//     'https://v.qq.com/x/cover/ga12wc6c1wd51kk/p0023u3mawj.html',//跨界歌王
// ]
// urls.forEach(function(url){
//     superagent.get(url).end(function (err, res) {
//         var $ = cheerio.load(res.text)
//         var total = 0;
//         var count = 0;
//         $('.mod_playlist').eq(0).find('.list_item .figure .figure_meta .figure_count .num').each(function(idx ,element) {
//             $element = $(element)
//             var txt = $element.text()
//             var now = 0
//             if (txt.indexOf('万') > 0) {
//                 now = parseFloat(txt.replace('万', '')) * 10000
//             } else if(txt.indexOf('亿') > 0) {
//                 now = parseFloat(txt.replace('亿', '')) * 100000000
//             } else {
//                 now = parseFloat(txt)
//             }
//             total += now
//             count ++
//         })
//         console.log({
//             title: trim($('.album_title').text()),
//             channel: '',
//             total: total,
//             count: count
//         })
//     })
// })
// function trim(str)
// {
//     return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
// }
exports.getCountByUrl = function(url, callback) {
    superagent
        .get(url)
        .end(function (err, res) {
            if (err) {
                console.log('can\'t get the resource')
            }
            var $ = cheerio.load(res.text)
            var count = 0;
            var times = 0;
            $('.mod_playlist').eq(0).find('.list_item .figure .figure_meta .figure_count .num').each(function(idx ,element) {
                $element = $(element)
                var txt = $element.text()
                var now = 0
                if (txt.indexOf('万') > 0) {
                    now = parseFloat(txt.replace('万', '')) * 10000
                } else if(txt.indexOf('亿') > 0) {
                    now = parseFloat(txt.replace('亿', '')) * 100000000
                } else {
                    now = parseFloat(txt)
                }
                count += now
                times ++
            })
            callback(count, times)
    })
}
