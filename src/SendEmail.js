import React from 'react'
import axios from 'axios'

function SendEmail() {


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: 'cfihimalay@gmail.com', // Change to your recipient
  from: 'indianjerseygang@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  return (
    <div>SendEmail</div>
  )
}

export default SendEmail