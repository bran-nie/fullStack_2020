import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};
const Person = ({ person }) => {
    const { name, number } = person;
    return (
        <p>
            {name} {number}
        </p>
    );
};
const Persons = ({ persons }) => {
    return persons.map((person) => <Person key={person.id} person={person} />);
};

const PersonForm = (props) => {
    const { name, nameHandle, number, numberHandle, handleSubmit } = props;
    return (
        <form>
            <div>
                name: <input value={name} onChange={nameHandle} />
                <br />
                number:
                <input value={number} onChange={numberHandle} />
            </div>
            <div>
                <Button text="add" handleClick={handleSubmit} />
            </div>
        </form>
    );
};

const FilterPersons = (props) => {
    const { filterName, handleFilterNameChange, filterPersons } = props;
    return (
        <div className="search">
            <span>filter shown with</span>
            <input value={filterName} onChange={handleFilterNameChange} />
            <Persons persons={filterPersons} />
        </div>
    );
};

const PhoneBook = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterPersons, setFilterPersons] = useState([]);

    useEffect(() => {
        console.log('phone effect');
        axios.get('http://localhost:3002/persons').then((res) => {
            console.log(res.data);
            setPersons(res.data);
        });
    }, []);

    const resetInput = () => {
        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);
    const handleFilterNameChange = (e) => {
        const v = e.target.value;
        setFilterName(v);
        let filter = [];
        if (v) {
            filter = persons.filter((person) => {
                return person.name.toLowerCase().includes(v.toLowerCase());
            });
        }
        setFilterPersons(filter);
    };
    const addPerson = (e) => {
        e.preventDefault();
        // 此处用some，效率比较好，some在return true时，就会终止遍历
        const personExist = persons.some((person) => {
            return person.name === newName;
        });
        if (personExist) {
            alert(`${newName} is already added to phonebook`);
            resetInput();
            return;
        }
        const newPerson = {
            id: persons.length + 1,
            name: newName,
            number: newNumber,
            date: new Date().toISOString(),
        };

        setPersons(persons.concat(newPerson));
        resetInput();
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterPersons
                filterName={filterName}
                handleFilterNameChange={handleFilterNameChange}
                filterPersons={filterPersons}
            />
            <h3>Add a new</h3>
            <PersonForm
                name={newName}
                nameHandle={handleNameChange}
                number={newNumber}
                numberHandle={handleNumberChange}
                handleSubmit={addPerson}
            />
            <h3>Persons</h3>
            <Persons persons={persons} />
        </div>
    );
};

export default PhoneBook;
