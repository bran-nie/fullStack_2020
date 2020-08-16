/* eslint-disable no-undef */
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_NOTE_URI = process.env.MONGODB_NOTE_URI;
const MONGODB_PHONEBOOK_URI = process.env.MONGODB_PHONEBOOK_URI;
const MONGODB_BLOG_URI = process.env.MONGODB_BLOG_URI;

module.exports = {
    PORT,
    MONGODB_NOTE_URI,
    MONGODB_PHONEBOOK_URI,
    MONGODB_BLOG_URI,
};
