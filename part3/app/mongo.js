// node mongo.js bran123npc "phonebook-app" bran 132
// node mongo.js bran123npc "note-app" bran

const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    );
    process.exit(1);
}

const password = process.argv[2];
console.log('--- password: ', password);
const dbName = process.argv[3];
console.log('--- dbName: ', dbName);

// const url = `mongodb+srv://bran:${password}@fullstack-2020.0aset.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const url = `mongodb+srv://bran:${password}@cluster0.ezinn.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`;
console.log('--- url', url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

if (dbName === 'note-app') {
    console.log('--- in note-app');
    const noteContent = process.argv[4];

    const noteSchema = new mongoose.Schema({
        content: String,
        date: Date,
        important: Boolean,
    });

    const Note = mongoose.model('Note', noteSchema);
    if (noteContent) {
        const note = new Note({
            content: noteContent,
            date: new Date(),
            important: Math.random() > 0.5,
        });

        note.save().then((result) => {
            console.log('note saved!', note.important);
            mongoose.connection.close();
        });
    } else {
        Note.find({}).then((result) => {
            result.forEach((note) => {
                console.log(note.content, note.important);
            });
            mongoose.connection.close();
        });
    }
} else if (dbName === 'phonebook-app') {
    console.log('--- in phonebook-app');
    const noteName = process.argv[4];
    const noteNumber = process.argv[5];
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
        date: Date,
    });

    const Person = mongoose.model('Person', personSchema);
    if (noteName && noteNumber) {
        const person = new Person({
            name: noteName,
            number: noteNumber,
            date: new Date(),
        });

        person.save().then((result) => {
            console.log('added ', result.name, result.number, 'to phonebook');
            mongoose.connection.close();
        });
    } else {
        Person.find({}).then((result) => {
            result.forEach((person) => {
                console.log(person.name, person.number);
            });
            mongoose.connection.close();
        });
    }
}
