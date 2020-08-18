/* eslint-disable no-undef */
require('dotenv').config();
console.log(process.env.NODE_ENV);

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
    PORT,
    MONGODB_URI,
};

// const MONGODB_NOTE_URI = process.env.MONGODB_NOTE_URI;
// const MONGODB_BLOG_URI = process.env.MONGODB_BLOG_URI;
// const MONGODB_PHONEBOOK_URI = process.env.MONGODB_PHONEBOOK_URI;
