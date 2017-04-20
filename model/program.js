var mongoose = require('mongoose')
var ProgramSchema = require('../schema/program')
var Program = mongoose.model('program', ProgramSchema)

module.exports = Program