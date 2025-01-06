const adminLoginModel = require('../../models/adminLoginModels')
const nodemailer = require('nodemailer');

const otpStore = new Map();


const forgetPasswordGenrateOtpController = async (req, res) => {
    try{
        console.log(req.body)
        const { email } =  req.body;

        if (!email) {
            return res.status(400).json({ message: 'Invailed Email.' });
        }

        const preData = await adminLoginModel.find({email: req.body.email});
        if(preData.length === 0) return res.status(404).json({message:'email not registered'})

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

const verifyOtpController = async (req, res) =>{
    try {
        const { email, otp } = req.body;
        console.log('Email--', email, 'OTP', otp )
        if (!email || !otp) {
          return res.status(400).json({ message: "Email and OTP are required" });
        }
    
        // Find the user by email
        const user = await adminLoginModel.findOne({ email });
        console.log("user=>", user)
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Check if OTP is valid and not expired   
        const sentOtp = otpStore.get(req.body.email);
        if(Number(req.body.otp) !== sentOtp) return res.status(401).json({message: 'invalid otp'});


        if (user.otpExpiresAt < new Date()) {
          return res.status(400).json({ message: "OTP has expired" });
        }
    
        // Clear OTP after successful verification
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        const { _id } = user._doc;
    
        return res.status(200).json({ message: "OTP verified successfully", _id });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to verify OTP" });
      }
};

const PasswordUpdateController = async (req, res) => {
    try{
        console.log(req.body)
        // const data = await adminLoginModel.findOne({ _id: req.body._id});
       
        const data = await adminLoginModel.updateOne(
           
            { _id: req.body._id},
            { $set:{password: req.body.newpassword}}
        );
        res.status(200).json({message: 'newpassword Updated successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

module.exports ={
    forgetPasswordGenrateOtpController,
    verifyOtpController,
    PasswordUpdateController 
}