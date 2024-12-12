const nodemailer = require('nodemailer');
const otpStore = new Map();

const genrateOtpWebsiteController = async (req, res) => {
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

module.exports = {
    genrateOtpWebsiteController
}