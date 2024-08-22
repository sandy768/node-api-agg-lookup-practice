const companyModel = require('../Model/companyDetails');
const bikeModel = require('../Model/bikesModel');


const addCompany = async(req,res)=>{
    try{
        console.log("The Company Details Collected From the Postman: ",req.body);

        if(!req.body.companyName){
            return res.status(401).json({
                success:false,
                message:"Company name is a required field"
            })
        }else if(!req.body.company_CEO){
            return res.status(401).json({
                success:false,
                message:"Company CEO name is a required field"
            })
        }else if(!req.body.mainBranch_City){
            return res.status(401).json({
                success:false,
                message:"Company main Branch city name is a required field"
            })
        }else{
            let formData = new companyModel({
                companyName : req.body.companyName,
                company_CEO : req.body.company_CEO,
                mainBranch_City : req.body.mainBranch_City
            });

            let saveData = await formData.save();
            if(saveData){
                console.log("The Company Details has been Saved Success");
                
                return res.status(200).json({
                    success: true,
                    message:"Company Details has been Saved SuccessFully"
                })
            }
        }
    }catch(error){
        console.log("Failed to save Company Details: ",error);
        return res.status(401).json({
            success:true,
            message:"Failed To save Company Details: "+ error
        })
        
    }
}

const getAllcompanyDetails = async(req,res)=>{
    try{
        console.log("Searching Company Details: ");
        
        let companyDetails = await companyModel.find();
        console.log("All Company details are: ",companyDetails);
        
        if(companyDetails){
            return res.status(200).json({
                success:true,
                message:"All Company Details are Fetched Successfully From the Database",
                company_details: companyDetails
            })
        }

    }catch(error){
        console.log("Failed To fetch Company Details: ",error);
        return res.status(401).josn({
            success:false,
            message:"Failed to fetched Company Details from the database "+error 
        })
        
    }
}

const addBikeDetails = async(req,res)=>{
    try{
        console.log("The Bike Details Collected From Postman: ",req.body);
        if(!req.body.bikeName){
            return res.status(401).json({
                success:false,
                message:"Bike Name is a required field"
            });
        } else if(!req.body.bikePrice){
            return res.status(401).json({
                success:false,
                message:"Bike Price is a required field"
            });
        } else if(!req.body.engineModel){
            return res.status(401).json({
                success:false,
                message:"Bike Engine model is a required field"
            });
        }else if(!req.body.bikeCompany_Id){
            return res.status(401).json({
                success:false,
                message:"Bike Company id is a required filed"
            })
        } else {
            let formdata = new bikeModel({
                bikeName : req.body.bikeName,
                bikePrice : req.body.bikePrice,
                engineModel : req.body.engineModel,
                bikeCompany_Id : req.body.bikeCompany_Id
            });
            let saveDetails = await formdata.save();
            if(saveDetails){
                console.log("The bike details has been saved Successfully");
                return res.status(200).json({
                    success:true,
                    message:"The bike Details has been saved Successfully"
                });  
            }
        }
    }catch(error){
        console.log("Failed To save bike details in to the Database: ",error);
        return res.status(401).json({
            success:false,
            message:"Failed to save Bike details: "+error
        })
    }
}

const getAlldetails = async(req,res)=>{
    try{
        let fullDetails = await bikeModel.aggregate([
            {
                $lookup:{
                    from:'company_details',
                    localField:'bikeCompany_Id',
                    foreignField:'_id',
                    as:'AllDetails'
                }
            },
            {
                $unwind:{
                    path:"$AllDetails"
                }
            },
            {
                $project:{
                    createdAt:0,
                    updatedAt:0,
                    "AllDetails.createdAt":0,
                    "AllDetails.updatedAt":0

                }
            }
        ])
        console.log("The merged Details are: ",fullDetails);
        return res.status(200).json({
            success:true,
            message:"All Details are Fetched Successfully",
            full_details : fullDetails
        })
        

    }catch(error){
        console.log("Failed To fetch all details from the Database: ",error);
        return res.status(401).json({
            success:false,
            message:"Failed to Fetch all Details From Databse: "+error
        })
        
    }
}



module.exports = {addCompany,addBikeDetails,getAllcompanyDetails,getAlldetails};