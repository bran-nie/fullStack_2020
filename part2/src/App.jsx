import React from 'react';
import NoteApp from './note';
import Course from './components/Course';
import PhoneBook from './phoneBook';

const App = (props) => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];
    const showNote = false;
    const showPhoneBook = true;
    return (
        <>
            {showPhoneBook && <PhoneBook />}
            <h1>Web development curriculum</h1>
            <div className="course">
                {courses.map((course) => {
                    return <Course course={course} key={course.id} />;
                })}
            </div>
            {showNote && <NoteApp notes={props.notes} />}
        </>
    );
};

export default App;
