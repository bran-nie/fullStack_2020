const mongoose = require('mongoose');
// const config = require('../utils/config');
// const logger = require('../utils/logger');

// mongoose.set('useFindAndModify', false);
// const url = config.MONGODB_NOTE_URI;

// logger.info('connecting to', url);

// mongoose
//     .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         logger.info('connected to MongoDB');
//     })
//     .catch((error) => {
//         logger.error('error connecting to MongoDB:', error.message);
//     });

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Note', noteSchema);
