const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'krig19is@cmrit.ac.in',
    pass: 'Krishna45@',
  },
});

app.post('/send-emails', async (req, res) => {
  const { recipients, subject, body } = req.body;

  const mailOptions = {
    from: 'krig19is@cmrit.ac.in',
    to: recipients.join(','),
    subject: subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Emails sent successfully.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
