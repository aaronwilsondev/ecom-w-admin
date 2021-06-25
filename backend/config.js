import dotenv from "dotenv";

dotenv.config();

export default {
    Port: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/ella-crafts",
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    accessKeyId: process.env.accessKeyId || "accessKeyId",
    secretAccessKey: process.env.secretAccessKey || "secretAccessKey",
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || "mailgunApiKey",
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || "mailgunDomain",

}


// curl -s --user 'api:b2ad9800b79308f82316db1ffb32ed69-24e2ac64-245d2b15' \
// https://api.eu.mailgun.net/v3/emsiart.com/messages \
// -F from='Excited User <mailgun@emsiart.com>' \
// -F to=aaronwilson1234@outlook.ie \
// -F subject='Hello' \
// -F text='Testing some Mailgun awesomeness!'

/*mailgun testdata */