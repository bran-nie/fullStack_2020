const data = require('./phonebook.json')['data'];
let persons = data;

const obj = {
    getAllPersons: (req, res) => {
        res.json(persons);
    },
    getPerson: (req, res) => {
        const id = Number(req.params.id);
        const person = persons.find((p) => p.id === id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    },
    deletePerson: (req, res) => {
        const id = Number(req.params.id);
        persons = persons.filter((p) => p.id !== id);

        res.status(204).end();
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
        const exist = persons.some((p) => p.name === name);
        if (exist) {
            return res.status(400).json({
                error: 'phonebook had this name',
            });
        }
        const person = {
            name,
            number,
            date: new Date(),
            id: persons[persons.length - 1].id + 1,
        };
        persons = persons.concat(person);

        res.json(person);
    },
    updatePerson: (req, res) => {
        const body = req.body;
        console.log(body);
        const person = {
            ...body,
            date: new Date(),
        };

        persons = persons.map((p) => (p.id === person.id ? person : p));

        res.json(person);
    },

    getInfo: (req, res) => {
        const len = persons.length;
        const date = new Date().toString();
        res.send(
            `<h2>Phonebook has info for ${len} people</h2><h3>${date}</h3>`
        );
    },
};

const controller = () => {
    return { ...obj };
};

module.exports = controller;
