/* eslint-disable no-undef */
require('dotenv').config();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
let MONGODB_URI = process.env.MONGODB_URI;
if (MODE === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
    PORT,
    MODE,
    MONGODB_URI,
};

// const MONGODB_NOTE_URI = process.env.MONGODB_NOTE_URI;
// const MONGODB_BLOG_URI = process.env.MONGODB_BLOG_URI;
// const MONGODB_PHONEBOOK_URI = process.env.MONGODB_PHONEBOOK_URI;
