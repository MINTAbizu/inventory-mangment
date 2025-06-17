const nodemailer = require('nodemailer');

const sendEmail = async (subject, send_to, send_from, message) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            debug: true, // show debug output
            logger: true // log information to the console
        });

        // Verify connection configuration
        await transporter.verify();

        // Email options
        const options = {
            from: send_from,
            to: send_to,
            subject: subject,
            html: message,
        };

        // Send email
        const info = await transporter.sendMail(options);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};

module.exports = sendEmail;