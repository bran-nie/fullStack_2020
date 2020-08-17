const mongoose = require('mongoose');
// const config = require('../utils/config');
// const logger = require('../utils/logger');

// mongoose.set('useFindAndModify', false);
// const url = config.MONGODB_PHONEBOOK_URI;

// logger.info('connecting to', url);

// mongoose
//     .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         logger.info('connected to MongoDB,');
//     })
//     .catch((error) => {
//         logger.error('error connecting to MongoDB:', error.message);
//     });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Person', personSchema);
