const Person = require('../models/phonebook');

const obj = {
    getAllPersons: (req, res) => {
        Person.find({}).then((persons) => {
            console.log('--- get all persons', persons.length);
            res.json(persons);
        });
    },
    getPerson: (req, res, next) => {
        Person.findById(req.params.id)
            .then((person) => {
                if (person) {
                    res.json(person);
                } else {
                    res.status(404).end();
                }
            })
            .catch((error) => next(error));
    },
    deletePerson: (req, res, next) => {
        Person.findByIdAndRemove(req.params.id)
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => next(error));
    },
    createPerson: (req, res) => {
        const body = req.body;
        console.log(body);

        const { name, number } = body;
        if (!name) {
            return res.status(400).json({
                error: 'name must be unique',
            });
        }
        if (!number) {
            return res.status(400).json({
                error: 'number must be unique',
            });
        }

        const person = new Person({
            name,
            number,
            date: new Date(),
        });
        person.save().then((newPerson) => {
            res.json(newPerson);
        });
    },
    updatePerson: (req, res, next) => {
        const body = req.body;
        console.log(body);
        const person = {
            ...body,
        };
        Person.findByIdAndUpdate(req.params.id, person, { new: true })
            .then((updatedPerson) => {
                res.json(updatedPerson);
            })
            .catch((error) => next(error));
    },

    getInfo: (req, res) => {
        Person.find({}).then((persons) => {
            const len = persons.length;
            const date = new Date().toString();
            res.send(
                `<h2>Phonebook has info for ${len} people</h2><h3>${date}</h3>`
            );
        });
    },
};

const controller = () => {
    return { ...obj };
};

module.exports = controller;
