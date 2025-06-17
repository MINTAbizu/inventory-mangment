const nodemailer = require('nodemailer');

// Create reusable transporter object
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Email templates
const emailTemplates = {
    welcome: (name) => ({
        subject: 'Welcome to Our Platform!',
        html: `
            <h1>Welcome ${name}!</h1>
            <p>Thank you for joining our platform. We're excited to have you on board!</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
        `
    }),
    
    passwordReset: (resetLink) => ({
        subject: 'Password Reset Request',
        html: `
            <h1>Password Reset</h1>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetLink}">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    }),
    
    emailVerification: (verificationLink) => ({
        subject: 'Verify Your Email',
        html: `
            <h1>Email Verification</h1>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
        `
    }),
    
    orderConfirmation: (orderDetails) => ({
        subject: 'Order Confirmation',
        html: `
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <h2>Order Details:</h2>
            <ul>
                ${orderDetails.items.map(item => `
                    <li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>
                `).join('')}
            </ul>
            <p>Total: $${orderDetails.total}</p>
            <p>Order ID: ${orderDetails.orderId}</p>
        `
    })
};

// Email sending function
const sendEmail = async ({ to, template, data }) => {
    try {
        // Get template
        const emailTemplate = emailTemplates[template](data);
        
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send email');
    }
};

// Specific email sending functions
const sendWelcomeEmail = async (userEmail, userName) => {
    return sendEmail({
        to: userEmail,
        template: 'welcome',
        data: { name: userName }
    });
};

const sendPasswordResetEmail = async (userEmail, resetLink) => {
    return sendEmail({
        to: userEmail,
        template: 'passwordReset',
        data: { resetLink }
    });
};

const sendVerificationEmail = async (userEmail, verificationLink) => {
    return sendEmail({
        to: userEmail,
        template: 'emailVerification',
        data: { verificationLink }
    });
};

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    return sendEmail({
        to: userEmail,
        template: 'orderConfirmation',
        data: { orderDetails }
    });
};

module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendVerificationEmail,
    sendOrderConfirmationEmail
}; 