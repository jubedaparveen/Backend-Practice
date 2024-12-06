const nodemailer = require('nodemailer');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const otpStore = new Map();

const genrateOtpWeb = async (req, res) => {
    try {
        const otp = Math.floor(Math.random() * 1000000);

        otpStore.set(req.body.email, otp);

        setTimeout(() => {
            otpStore.delete(req.body.email);
        }, 120000);

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
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

        transport.sendMail(options, (error, decode) => {
            if (error) return res.status(500).json({ message: 'error' });
            res.status(200).json({ message: 'otp sent' });
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' });
    }
};

const registerUser = async (req, res) => {
    try {
        const {otp, ...dataWithoutOtp} = req.body;

        const sentOtp = otpStore.get(req.body.email);

        if (Number(req.body.otp) !== sentOtp) return res.status(401).json({ message: 'invalid otp' });

        const dataToSave = new User(dataWithoutOtp);

        const data = await dataToSave.save();

        jwt.sign(data._doc , process.env.JWT_KEY, { expiresIn: '10d' }, (error, token)=>{
            if(error) console.log(error);

            if(error) return res.status(500).json({message: 'try after some time'});

            res.status(200).json({ messahe: 'success', auth: token});
        })

      
    }
    catch (error) {
        console.log(error);
        if(error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) return  res.status(400).json({ message: 'email already registered' });
        res.status(500).json({ message: 'internal server error' });
    }
}

const verifyJwt = async(req, res) => {
    try{
        console.log('verify called');

        res.status(200).json({message:'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

module.exports = {
    genrateOtpWeb,
    registerUser,
    verifyJwt
}