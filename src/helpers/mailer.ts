import nodemailer from "nodemailer";
import User from "@/models/odel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour}
      });
    } else if (emailType === "RESET") {
      const user = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour}
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "182620321f6005",
        pass: "cb570f1064af02",
      },
    });
    const mailOptions = {
      from: "akhand@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType == "RESET" ? "forgotpassword" : "verifyemail"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
