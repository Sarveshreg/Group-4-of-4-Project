require('dotenv').config();
let cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARYNAME, 
    api_key: process.env.CLOUDINARYAPIKEY, 
    api_secret: process.env.CLOUDINARYAPISECRET,
    secure:true
})

module.exports = {cloudinary};
