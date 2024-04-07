// import nodemailer from 'nodemailer';
// import User from "@/models/userModel";
// import otpGenerator from 'otp-generator'; // Replace with your OTP generation function

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     // Generate a random OTP
//     const otp = otpGenerator.generate(8, { digits: true });


//     // Save the OTP and expiry time in the user model
//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: otp,
//         verifyTokenExpiry: Date.now() + 3600000, // 1 hour in milliseconds
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordOTP: otp,
//         forgotPasswordOTPExpiry: Date.now() + 3600000,
//       });
//     }

//     var transport = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "915f80286b0a1c",
//           pass: "5446765403362e"
//         }
//       });

//     const mailOptions = {
//       from: 'pratap@gmail.com',
//       to: email,
//       subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//       text: `Your ${emailType === "VERIFY" ? "verification" : "password reset"} OTP is ${otp}. This OTP is valid for 1 hour.`,
//     };

//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };


import nodemailer from 'nodemailer';
import { PrismaClient } from "@prisma/client";
import otpGenerator from 'otp-generator'; // Replace with your OTP generation function
// import { env } from 'process';

const prisma = new PrismaClient();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate a random OTP
    const otp = otpGenerator.generate(8, { digits: true });

    // Update user data with OTP and expiry based on emailType
    await prisma.user.update({
      where: { id: userId }, // Use Prisma-generated ID
      data: {
        ...(emailType === "VERIFY" ? { verifyToken: otp, verifyTokenExpiry: new Date(Date.now() + 3600000) } : {}), // 1 hour in milliseconds
        ...(emailType === "RESET" ? { forgotPasswordOTP: otp, forgotPasswordOTPExpiry: new Date(Date.now() + 3600000) } : {}),
      },
    });

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "915f80286b0a1c",
        pass: process.env.MAILER
      }
    });

    const mailOptions = {
      from: 'pratap@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: `Your ${emailType === "VERIFY" ? "verification" : "password reset"} OTP is ${otp}. This OTP is valid for 1 hour.`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
