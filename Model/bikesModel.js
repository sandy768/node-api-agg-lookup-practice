const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikesSchema = new Schema({
    bikeName:{
        type:String,
        required: true
    },
    bikePrice:{
        type:Number,
        required:true
    },
    engineModel:{
        type:String,
        required:true
    },
    bikeCompany_Id:{
        type:Schema.Types.ObjectId,
        ref:'company_details'
        
    }
},
{
    timestamps:true,
    versionKey:false
});

const bikeModel = new mongoose.model("bike_details",bikesSchema);
module.exports = bikeModel;