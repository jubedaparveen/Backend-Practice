const adminLoginModel = require('../../models/adminLoginModels');
const nodemailer = require('nodemailer');

const otpStore = new Map();

//Admin Registered Api
// why req and res not require in this Api because this Api not integrated  with Admin panel [(req, res) its need only when Api integrated with UI)]

const registerAdmin = async ()=>{
    try{
        // Firstly checked wether data is available in database or not
        const adminData = await adminLoginModel.find();

        //checked admin data (!== 0) means adnin is already registered 
        if(adminData.length !== 0) return console.log(adminData[0]);

        const newAdmin = new adminLoginModel({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        });

        const response = await newAdmin.save();

        console.log('admin registered',response);
    }
    catch(error){
        console.log(error);
    }
};

// Admin Login Api
const adminLoginController = async (req, res) =>{
    try{
        const adminData = await adminLoginModel.findOne({email: req.body.email});

        if(!adminData) return res.status(401).json({message: 'Invalid Email '});

        if(adminData.password !== req.body.password) return res.status(401).json({message:'invalid password'});
        res.status(200).json({message:'success', data: adminData});
    }
    catch(error){
        console.log(error)
    }
};

const genrateOtpController = async (req, res) => {
    try{
        const otp = Math.floor(Math.random() * 1000000);

        otpStore.set(req.body.email, otp);

        setTimeout(()=>{
            otpStore.delete(req.body.email);
        },120000);

        const transport = nodemailer.createTransport({
           service: 'gmail',
           auth:{
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD
           }
        });

        const options = {
            from: process.env.APP_EMAIL,
            to: req.body.email,
            subject: 'OTP',
            text: `Your OTP is ${otp}`
        };

        transport.sendMail(options, (error, decode)=>{
            if(error) return res.status(500).json({message:'error'});
            res.status(200).json({message: 'otp sent'});
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'});
    }
};

const verifyOtpEmailUpdateController = async (req, res) => {
    try{
        const sentOtp = otpStore.get(req.body.email);

        if(Number(req.body.otp) !== sentOtp) return res.status(401).json({message: 'invalid otp'});

        const data = await adminLoginModel.updateOne(
            { email: req.body.email},
            { $set:{email: req.body.newemail}}
        );

        res.status(200).json({messahe: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}


module.exports = {
    registerAdmin,
    adminLoginController,
    genrateOtpController,
    verifyOtpEmailUpdateController
};