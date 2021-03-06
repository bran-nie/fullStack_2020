import React, { useState, useEffect } from 'react';
import Notification, { NotificationType } from '../components/Notification';
import api from '../services/phoneBooks';

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};
const Person = ({ person, handleDel }) => {
    const { name, number } = person;
    return (
        <p>
            {name} {number}
            <Button text="del" handleClick={handleDel} />
        </p>
    );
};
const Persons = ({ persons, delPerson }) => {
    const fn = (person) => {
        return () => {
            delPerson(person);
        };
    };
    return persons.map((person) => (
        <Person key={person.id} person={person} handleDel={fn(person)} />
    ));
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
    const {
        filterName,
        handleFilterNameChange,
        filterPersons,
        delPerson,
    } = props;
    return (
        <div className="search">
            <span>filter shown with</span>
            <input value={filterName} onChange={handleFilterNameChange} />
            <Persons persons={filterPersons} delPerson={delPerson} />
        </div>
    );
};

const PhoneBook = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterPersons, setFilterPersons] = useState([]);
    const defaultMsgObj = {
        msg: null,
        type: NotificationType.Success,
    };
    const [msgObj, setMsgObj] = useState(defaultMsgObj);

    useEffect(() => {
        api.getAll().then((data) => {
            setPersons(data);
        });
    }, []);

    useEffect(() => {
        let filter = [];
        if (filterName) {
            filter = persons.filter((person) => {
                return person.name
                    .toLowerCase()
                    .includes(filterName.toLowerCase());
            });
        }
        setFilterPersons(filter);
    }, [filterName, persons]);

    const resetInput = () => {
        setNewName('');
        setNewNumber('');
    };

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);
    const handleFilterNameChange = (e) => setFilterName(e.target.value);

    const addPerson = (e) => {
        e.preventDefault();
        // 此处用some，效率比较好，some在return true时，就会终止遍历且返回值是布尔值。PS： 后面为了更新用户，用find方法
        // const existPerson = persons.some((person) => {
        //     return person.name === newName;
        // });
        const existPerson = persons.find((person) => {
            return person.name === newName;
        });
        if (existPerson) {
            const addConfirm = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one`
            );
            if (addConfirm) {
                api.update(existPerson.id, {
                    ...existPerson,
                    number: newNumber,
                })
                    .then((res) => {
                        setMsgObj({
                            msg: `Updated ${newName}`,
                            type: NotificationType.Success,
                        });
                        setPersons(
                            persons.map((p) =>
                                p.id === existPerson.id ? res : p
                            )
                        );
                        resetInput();
                    })
                    .catch((error) => {
                        console.log(`Updated ${newName} error`, error);
                        setMsgObj({
                            msg: `Updated ${newName} error, Information of ${newName} has already been removed from server`,
                            type: NotificationType.Error,
                        });
                    });
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
                date: new Date().toISOString(),
            };
            api.create(newPerson).then((data) => {
                setPersons(persons.concat(data));
                resetInput();
                setMsgObj({
                    msg: `Added ${newName}`,
                    type: NotificationType.Success,
                });
            });
        }
    };
    const delPerson = ({ id, name }) => {
        const confirm = window.confirm(`Delete ${name}?`);
        if (confirm) {
            api.del(id)
                .then((res) => {
                    setPersons(persons.filter((p) => p.id !== id));
                    setMsgObj({
                        msg: `Del ${name} success`,
                        type: NotificationType.Success,
                    });
                })
                .catch((error) => {
                    console.log(`del ${name} error`, error);
                    setMsgObj({
                        msg: `Information of "${name}" has already been removed from server`,
                        type: NotificationType.Error,
                    });
                });
        }
    };

    return (
        <>
            <div>
                <h1>Phonebook</h1>
                <FilterPersons
                    filterName={filterName}
                    handleFilterNameChange={handleFilterNameChange}
                    filterPersons={filterPersons}
                    delPerson={delPerson}
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
                <Persons persons={persons} delPerson={delPerson} />
            </div>
            <Notification message={msgObj.msg} type={msgObj.type} />
        </>
    );
};

export default PhoneBook;
