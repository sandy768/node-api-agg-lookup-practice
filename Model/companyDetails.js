const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName:{
        type:String,
        required:true
    },
    company_CEO:{
        type:String,
        required:true
    },
    mainBranch_City:{
        type:String,
        required:true
    },

},
{
    timestamps:true,
    versionKey:false
});

const companyModel = new mongoose.model("company_details",companySchema);
module.exports = companyModel;