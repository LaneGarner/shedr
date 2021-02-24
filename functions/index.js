const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
require('dotenv').config();

const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shedrapp@gmail.com",
      pass: process.env.SHEDR_PASS, // naturally, replace both with your real credentials or an application-specific password
    }
  });

exports.submit = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return;
    }

    const mailOptions = {
      from: req.body.email,
      replyTo: req.body.email,
      to: "b.lane.garner@gmail.com",
      subject: `from my website ${req.body.email}`,
      text: req.body.message,
      html: `<p>${req.body.message}</p>`,
    };
    mailTransport.sendMail(mailOptions);
    res.status(200).end();
  });
});
