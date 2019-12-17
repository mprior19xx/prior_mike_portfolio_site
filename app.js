const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// set the port
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sends email when contact form is submitted
app.post('/contact', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'mprior.designs@gmail.com',
               pass: 'Throwaway143'
           }
    });

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: "mprior.designs@gmail.com",
        pass: "Throwaway143"
        }
    })

    // Specify what the email will look like
    const mailOutput = {
        from: "noreply@mprior.designs.ca", // This is ignored by Gmail
        to: "mprior.designs@gmail.ca",
        subject: "You've got a new message from MPrior Designs",
        text: `Message From: ${req.body.firstName} ${req.body.lastName} (${req.body.email})\nSubject: ${req.body.subject}\n\n${req.body.message}`
    }

      // Attempt to send the email
      smtpTrans.sendMail(mailOutput, (error, response) => {
        if (error) {
            console.log(error);
            res.render("contact", { msg: "Whoops! Something went wrong and your message wasn't delivered." });
        }
        else {
            console.log(mailOutput);
            res.render("contact", {msg: "The carrier pigeon is on its way!" });
        }
    })
})

app.use((req, res, next) => {
    var err = new Error("-Error 404-");
    err.customMessage = "You have encountered an error, please try again.";
    app.use((err, req, res, next) => {

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

}) 
})