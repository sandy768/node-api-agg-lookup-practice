const express = require('express');
const route = express.Router();

const {addCompany, addBikeDetails, getAllcompanyDetails, getAlldetails} = require('../Controller/adminController');

route.post("/addCompany",addCompany);

route.get("/allCompanies",getAllcompanyDetails);

route.post("/addBikeDetails",addBikeDetails);

route.get("/allDetails",getAlldetails);



module.exports = route;