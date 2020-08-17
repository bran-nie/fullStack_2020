/* eslint-disable no-undef */
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NOTE_URI = process.env.MONGODB_NOTE_URI;
const MONGODB_BLOG_URI = process.env.MONGODB_BLOG_URI;
const MONGODB_PHONEBOOK_URI = process.env.MONGODB_PHONEBOOK_URI;

module.exports = {
    PORT,
    MONGODB_URI,
    MONGODB_NOTE_URI,
    MONGODB_BLOG_URI,
    MONGODB_PHONEBOOK_URI,
};
