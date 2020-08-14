const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_PHONEBOOK_URI;

console.log('connecting to', url);

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

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
