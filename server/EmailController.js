const nodemailer = require('nodemailer');
const twilio = require('twilio');

const { EMAIL, PASSWORD, AUTHTOKEN, ACCOUNTSID } = process.env;

module.exports = {
    email: async (req, res) => {
        const { rec_name, rec_email, phone_number, school, player_email, player_name } = req.body;
        // try/catch is used to handle errors without the use of .then and .catch
        try {
            //The transporter is essentially the email that you are using to send
            //emails to your users. This is done using NodeMailers createTransport
            //method, passing it an object containing the information needed to 
            //sign into the email.
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                //host: 'smtp.mail.yahoo.com'
                port: 587,
                //yahoo 465
                //gmailPORT --> port: 587
                service: 'gmail',
                //service: 'gmail'
                secure: true,
                requireTLS: true,
                //gmailONLY --> requireTLS: true
                //You should include your email and password for this email account
                //to your .env file to keep that information secure
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            //info gets defined the result of the sendMail method. This method is 
            //attached to your transporter upon its creation. sendMail needs to be
            //passed an object that contains information about the email itself, 
            //meaning the from and to categories, the subject, and the body of the
            //email.
            let info = await transporter.sendMail({
                from: `${rec_name} <${EMAIL}>`,
                to: player_email,
                subject: 'HighRecruits Recruiter info',
                //text is for plain text support if the html cannot load properly
                text: 'This is a NodeMailer Test',
                //html contains the body of your email, and can use html tags to
                //structure it, and inline styling to style it. IF you are using an
                //image, you should pass the src that is provided below, and then
                //give the actual image a value in the attachments array below.
                html: `<div>${player_name}</div>
                       <div>My name is ${rec_name}, I am a recruter for ${school}, I saw your HighRecruiter profile and would be intrested in talking to you more and seeing you play sometime.</div>
                       <div>Here is my contact info, hope to hear from you soon.</div>
                       <div>${rec_email}</div>
                       <div>${phone_number}</div>`,
                //attachments include files attached to the email, as well as sources
                //for your images.
                // attachments: [
                //     {
                //         filename: 'license.txt',
                //         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                //     },
                //     {
                //         cid: 'unique@nodemailer.com',
                //         path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                //     }
                // ]
            }, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }
    },
    text: (req, res) => {
        const { rec_name, rec_email, phone_number, school, player_name,player_phone } = req.body;
        //const accountSid = 'AC3b5c5fdc870ae280795c95ce2521513b'; // Your Account SID from www.twilio.com/console
        //const authToken = '227ddf3ee99702591da12b4d71b4a62c';   // Your Auth Token from www.twilio.com/console

        const client = new twilio(ACCOUNTSID, AUTHTOKEN);
        console.log('hit');
        client.messages.create({
            body: `${player_name},
            My name is ${rec_name}, I am a recruter for ${school}, I saw your HighRecruiter profile and would be intrested in talking to you more and seeing you play sometime. Here is my contact info, hope to hear from you soon. ${rec_email}, ${phone_number}`,
            to: `+1${player_phone}`,  // Text this number
            from: '+13343676024' // From a valid Twilio number
        })
            .then((message) => console.log(message.sid))
            .catch(err => console.log(err))
    }

}