import React from 'react';

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};
const Header = (props) => <h1>{props.course}</h1>;
const Content = (props) => {
    return (
        <div>
            <Part
                name={props.parts[0].name}
                exercises={props.parts[0].exercises}
            />
            <Part
                name={props.parts[1].name}
                exercises={props.parts[1].exercises}
            />
            <Part
                name={props.parts[2].name}
                exercises={props.parts[2].exercises}
            />
        </div>
    );
};
const Total = (props) => {
    const total = props.parts.reduce((pre, next) => {
        return pre + next.exercises;
    }, 0);
    return <footer>Number of exercises {total}</footer>;
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    };

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

const Unicafe = () => {
    return (
        <>
            <div>unicafe</div>
        </>
    );
};

export default Unicafe;
