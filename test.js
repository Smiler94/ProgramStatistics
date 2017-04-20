var iqiyi = require('./crawler/iqiyi')
var tencent = require('./crawler/tencent')

tencent.getCountByUrl('https://v.qq.com/x/cover/um5it8gba6jden2/x0023f9vzp7.html', function (counts, times) {
    console.log(counts)
    console.log(times)
})