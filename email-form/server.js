const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5500;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // In case you need to parse JSON data
app.use(cors()); // Enable CORS

app.post("/send-email", (req, res) => {
  const { name, email, subject } = req.body;

  // Set up transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: "your-email@gmail.com", // Your email
      pass: "your-email-password", // Your email password
    },
  });

  // Email options
  let mailOptions = {
    from: email,
    to: "nicolemagallanes026@gmail.com",
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${subject}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
