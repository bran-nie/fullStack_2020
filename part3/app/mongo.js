const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    );
    process.exit(1);
}

const password = process.argv[2];
const noteContent = process.argv[3];

console.log('--- password: ', password);
console.log(noteContent);

const url = `mongodb+srv://bran:${password}@fullstack-2020.0aset.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

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
