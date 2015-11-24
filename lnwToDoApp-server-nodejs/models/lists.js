var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Lists = new Schema({
        description : String,
        ownerID : String
        // date : {type: Date, default: Date.now()}
});    
    
module.exports = mongoose.model('lists', Lists);